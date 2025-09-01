import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FoodContextProvider } from './contexts/foodData.jsx'
import { InfoContextProvider } from './contexts/userInfo.jsx'
import { AdminInfoContextProvider } from './contexts/adminInfo.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FoodContextProvider>
      <InfoContextProvider>
        <AdminInfoContextProvider>
          <App />
        </AdminInfoContextProvider>
      </InfoContextProvider>

    </FoodContextProvider>
  </StrictMode>,
)
