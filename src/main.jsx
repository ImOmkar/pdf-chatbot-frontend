import React from "react"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {
    Toaster
}
from "react-hot-toast"

createRoot(document.getElementById('root')).render(
  <React.StrictMode>

      <App />

      <Toaster

          position="top-right"

          toastOptions={{

              duration: 3500,

              style: {

                  background: "#0f172a",

                  color: "#fff",

                  border:
                      "1px solid #334155"

              }

          }}

      />

  </React.StrictMode>
)
