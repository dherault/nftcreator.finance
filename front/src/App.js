import './App.css'

import { Provider as StateProvider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import theme from './theme'
import store from './state'

import Home from './scenes/Home'

function App() {
  return (
    <StateProvider store={store}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </StateProvider>
  )
}

export default App
