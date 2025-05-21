/**
 * Enterprise-level middleware utilities for handling high volumes of data processing
 * and ensuring consistent performance even under heavy load
 */

// Simple in-memory request deduplication cache
const requestCache = new Map<string, {
  data: any;
  expiry: number;
}>();

// Default cache TTL in milliseconds (5 minutes)
const DEFAULT_CACHE_TTL = 5 * 60 * 1000;

/**
 * Cache wrapper for expensive operations
 * Handles deduplication of identical requests within the TTL window
 */
export function withCache<T>(
  key: string,
  operation: () => Promise<T>,
  ttl: number = DEFAULT_CACHE_TTL
): Promise<T> {
  const now = Date.now();
  
  // Check if we have a valid cached result
  const cached = requestCache.get(key);
  if (cached && cached.expiry > now) {
    console.log(`Cache hit for key: ${key}`);
    return Promise.resolve(cached.data);
  }
  
  // Execute the operation and cache the result
  return operation().then(result => {
    requestCache.set(key, {
      data: result,
      expiry: now + ttl
    });
    return result;
  });
}

/**
 * Batch processor for handling many similar requests efficiently
 * Useful for processing multiple credit score requests in batches
 */
export class BatchProcessor<T, R> {
  private queue: { input: T; resolve: (result: R) => void; reject: (error: Error) => void }[] = [];
  private timer: ReturnType<typeof setTimeout> | null = null;
  private processing = false;
  
  constructor(
    private processBatch: (inputs: T[]) => Promise<R[]>,
    private options: {
      maxBatchSize: number;
      maxWaitTime: number;
    } = { maxBatchSize: 50, maxWaitTime: 100 }
  ) {}
  
  /**
   * Add an item to the batch queue
   */
  public add(input: T): Promise<R> {
    return new Promise<R>((resolve, reject) => {
      this.queue.push({ input, resolve, reject });
      
      // If we've reached max batch size, process immediately
      if (this.queue.length >= this.options.maxBatchSize) {
        this.processQueue();
        return;
      }
      
      // Otherwise, set a timer to process the queue after maxWaitTime
      if (!this.timer && !this.processing) {
        this.timer = setTimeout(() => this.processQueue(), this.options.maxWaitTime);
      }
    });
  }
  
  /**
   * Process all items in the queue
   */
  private async processQueue() {
    if (this.processing || this.queue.length === 0) return;
    
    // Clear the timer
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    
    this.processing = true;
    
    // Take items from the queue
    const batch = this.queue.splice(0, this.options.maxBatchSize);
    const inputs = batch.map(item => item.input);
    
    try {
      // Process the batch
      const results = await this.processBatch(inputs);
      
      // Resolve all promises
      batch.forEach((item, index) => {
        item.resolve(results[index]);
      });
    } catch (error) {
      // Reject all promises on error
      batch.forEach(item => {
        item.reject(error as Error);
      });
    } finally {
      this.processing = false;
      
      // If there are more items in the queue, process them
      if (this.queue.length > 0) {
        this.processQueue();
      }
    }
  }
}

/**
 * Rate limiter to prevent overloading the system
 * Useful for limiting API requests or expensive operations
 */
export class RateLimiter {
  private tokens: number;
  private lastRefill: number;
  private waiting: { resolve: () => void }[] = [];
  
  constructor(
    private maxTokens: number,
    private refillRate: number, // tokens per millisecond
    private refillInterval: number = 1000 // milliseconds
  ) {
    this.tokens = maxTokens;
    this.lastRefill = Date.now();
  }
  
  /**
   * Acquire a token from the bucket
   * Returns a promise that resolves when a token is available
   */
  public async acquire(cost: number = 1): Promise<void> {
    this.refill();
    
    if (this.tokens >= cost) {
      this.tokens -= cost;
      return Promise.resolve();
    }
    
    // Wait for tokens to become available
    return new Promise(resolve => {
      this.waiting.push({ resolve });
      
      // Set a timer to check for available tokens
      setTimeout(() => this.checkWaiting(), this.refillInterval);
    });
  }
  
  /**
   * Refill tokens based on elapsed time
   */
  private refill() {
    const now = Date.now();
    const elapsed = now - this.lastRefill;
    
    if (elapsed > 0) {
      // Add tokens based on elapsed time and refill rate
      const newTokens = elapsed * this.refillRate;
      this.tokens = Math.min(this.maxTokens, this.tokens + newTokens);
      this.lastRefill = now;
    }
  }
  
  /**
   * Check waiting promises and resolve them if tokens are available
   */
  private checkWaiting() {
    this.refill();
    
    // Process waiting requests in FIFO order
    while (this.waiting.length > 0 && this.tokens >= 1) {
      const request = this.waiting.shift();
      this.tokens -= 1;
      request?.resolve();
    }
    
    // If there are still waiting requests, check again after refill interval
    if (this.waiting.length > 0) {
      setTimeout(() => this.checkWaiting(), this.refillInterval);
    }
  }
}
