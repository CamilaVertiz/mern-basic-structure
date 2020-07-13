import { createMuiTheme }  from '@material-ui/core/styles'

const basicTheme = createMuiTheme({
  palette: {
    primary: { 
        main: '#4F547D',
        dark: '#373a57',
        light: '#7278B3', 
    },    
    secondary: { 
        main: '#876BB3',
        dark: '#5F4B7D',
        light: '#AB6BB3',

    },
  },
})
export default basicTheme
