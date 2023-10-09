import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { store } from './store/store'
import { Provider } from 'react-redux'
import theme from './theme'
import { ThemeProvider } from '@mui/material/styles'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  //<React.StrictMode>

  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>

  //</React.StrictMode>
)
