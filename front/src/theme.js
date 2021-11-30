import { deepPurple, pink } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: deepPurple[500],
    },
    secondary: {
      main: pink[500],
    },
  },
  components: {
    MuiTypography: {
      variants: [
        {
          props:
          {
            color: 'gradient1',
          },
          style: {
            background: `linear-gradient(to right, ${deepPurple[500]} 0%, ${pink[500]} 75%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          },
        },
        {
          props:
          {
            color: 'gradient2',
          },
          style: {
            background: `linear-gradient(to right, ${pink[500]} 0%, ${deepPurple[500]} 75%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          },
        },
      ],
    },
  },
})

export default theme
