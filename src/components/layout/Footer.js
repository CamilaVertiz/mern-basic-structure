import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    textAlign: 'center',
    marginTop: 'auto',
    backgroundColor: theme.palette.primary.main,
    position: 'fixed',
    bottom: 0,
    width: '100%',
    color: 'white',
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
      <footer className={classes.footer}>
          <Typography variant="body1">© 2020 Copyright</Typography>
          <Typography variant="body2"> Made with <span>☕</span> & <span>❤️</span></Typography>
      </footer>
  );
};

export default Footer