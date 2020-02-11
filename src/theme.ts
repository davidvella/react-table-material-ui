import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import grey from '@material-ui/core/colors/grey';

export const darkTheme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: grey[900]           
        },
        text: {
            primary:'#b6b6b6',
            secondary:grey[50]
        }
    },
    overrides: {
        MuiAppBar: {
          root: {
            'box-shadow':'none'
          }
        },

      }  
});
