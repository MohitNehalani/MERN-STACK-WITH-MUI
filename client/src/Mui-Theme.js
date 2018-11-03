import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette:{
        primary: {main: '#999592'},
        secondary: {main: '#272723'},
        type: 'light',
        background:{
            paper:'#fafafa'
        },
        cyan:'#00ACC1'
    },
    typography: {
        useNextVariants: true,
    },
    zIndex: {
        drawer: 1000,
    }
})


export default theme;
