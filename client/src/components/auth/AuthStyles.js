export const styles = theme => ({
   layout: {
      display: 'block', // Fix IE 11 issue.
      boxSizing: 'border-box',
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up('xs')]: {
         width: 400,
         marginLeft: 'auto',
         marginRight: 'auto',
      },
      [theme.breakpoints.down('xs')]: {
         width: '90%',
         marginLeft: 'auto',
         marginRight: 'auto',
      },
   },
   errMsg: {
      color: theme.palette.error.main,
      fontSize: theme.typography.caption.fontSize
   },
   paper: {
      marginTop: theme.spacing.unit * 8,
      marginBottom: theme.spacing.unit * 8,
      display: 'flex',
      boxSizing: 'border-box',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
   },
   avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main,
   },
   form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing.unit,
   },
   submit: {
      marginTop: theme.spacing.unit * 3,
   },
   linkToRegister: {
      display: 'flex',
      flexFlow: 'column',
      fontWeight: 'bold',
      fontSize: 'medium',
      justifyContent: 'center',
      alignItems: 'center',
   }
});
