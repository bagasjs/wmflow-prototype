import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Balance } from './libs/balance.js'

import './index.css'
import Home from './pages/Home.jsx'
import Ledger from "./pages/Ledger.jsx"
import Journal from './pages/Journal.jsx'

const balance = new Balance("http://127.0.0.1:8080")
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home balance={balance}/>
    },
    {
        path: "/ledger",
        element: <Ledger balance={balance}/>
    },
    {
        path: "/journal",
        element: <Journal balance={balance}/>
    },
])


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
