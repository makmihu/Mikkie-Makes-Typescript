import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import {AuthProvider} from './context/authContext.tsx'
import { InventoryProvider } from './context/inventoryContext.tsx'
import { FunctionProvider } from './context/functionsContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
      <InventoryProvider>
      <FunctionProvider>
        <App />
      </FunctionProvider>  
      </InventoryProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)