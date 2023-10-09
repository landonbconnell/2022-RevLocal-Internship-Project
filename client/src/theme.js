import { createTheme } from '@mui/material/styles'
import './style/App.css'

const theme = createTheme({
  typography: {
    fontFamily: ['"Roboto Mono"', 'monospace'].join(',')
  },
  components: {
    MuiGrid: {
      defaultProps: {
        sx: { padding: '0rem' }
      }
    }
  }
})
// const themeOptions = createTheme({
//   palette: {
//     primary: {
//       main: '#b388ff',
//       light: '#e7b9ff',
//       dark: '#805acb',
//       contrastText: '#ffffff'
//     },
//     secondary: {
//       main: '#311b92',
//       light: '#6746c3',
//       dark: '#000063'
//     }
//   }
// })
export default theme
