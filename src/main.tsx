
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create a function to ensure animations run smoothly after page load
const renderApp = () => {
  createRoot(document.getElementById("root")!).render(<App />);
};

// Render the app
renderApp();
