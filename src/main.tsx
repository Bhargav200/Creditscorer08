
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Remove App.css import since we're using Tailwind for styling
createRoot(document.getElementById("root")!).render(<App />);
