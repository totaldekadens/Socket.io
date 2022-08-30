import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { SocketInfoProvider } from './components/context/socketInfoProvider';



ReactDOM.createRoot(document.getElementById('root')).render(
    <SocketInfoProvider>
        <App />
    </SocketInfoProvider>
    
)
