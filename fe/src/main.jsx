import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from 'react-redux'
import { store } from './redux/service/store.js'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from './components/ui/toaster.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
  <Provider store={store}>
  
  <App />
  <Toaster />
  </Provider>
  </BrowserRouter>

  
    
  </StrictMode>,
)
