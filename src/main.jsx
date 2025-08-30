import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FoodContextProvider } from './contexts/foodData.jsx'
import { InfoContextProvider } from './contexts/userInfo.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FoodContextProvider>
      <InfoContextProvider>
        <App />
      </InfoContextProvider>

    </FoodContextProvider>
  </StrictMode>,
)
