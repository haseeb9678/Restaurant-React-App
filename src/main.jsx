import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FoodContextProvider } from './contexts/foodData.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FoodContextProvider>
      <App />
    </FoodContextProvider>
  </StrictMode>,
)
