
// .loadingc img {
//   width: 32px;
//   height: 32px;
//   animation: loader 1.2s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
// }
import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'config/theme';

const useStyles = makeStyles(() =>
  createStyles({
    loadingWrapper: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      marginTop: 25,
      '& img': {
        width: 40,
        height: 40,
        animation: 'loader 1.2s infinite cubic-bezier(0.215, 0.61, 0.355, 1)'
      }
    },
    drawer: {
      '& img': {
        borderRadius: '50%',
      }
    }
  })
)

export default useStyles;
