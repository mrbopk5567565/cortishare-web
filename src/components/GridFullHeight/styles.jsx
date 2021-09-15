import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => 
  createStyles({
    root: {
      height: 'auto !important',
      height: '100%',
      minHeight: '100vh',
      '@media only screen and (max-width: 768px)': {
        minHeight: '50vh !important',
      }
    }
  }),
  {
    name: 'GridFullHeight',
    index: 1,
  }
);
  
export default useStyles;
