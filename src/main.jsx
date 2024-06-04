import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import PharmaContextProvider from './Context/PharmaContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
 <BrowserRouter> 
 <PharmaContextProvider>
    <App />
  </PharmaContextProvider> 
 
 </BrowserRouter>

  
)
