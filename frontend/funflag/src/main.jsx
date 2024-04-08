import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import flagsmith from "flagsmith";
import { FlagsmithProvider } from 'flagsmith/react';

import { ThemeProvider } from "@material-tailwind/react";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <FlagsmithProvider
        options={{
          environmentID: 'TuJQrfZyLBkSnm7SSzhjjr',
        }}
        flagsmith={flagsmith}>
        <App />
      </FlagsmithProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
