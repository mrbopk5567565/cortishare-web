import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'config/theme';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: 'absolute',
      width: 142,
      transform: 'translateX(-100%)',
      height: 'fit-content',
      background: '#FFFFFF',
      // padding: '10px 20px',
      alignItems: 'center',
      border: `1px solid #FAFAFA`,
      boxShadow: `0px 4px 4px rgba(202, 202, 202, 0.25)`,
      borderRadius: 5,
    },
    itemDropdown: {
      cursor: 'pointer',
      fontSize: 14,
      color: '#000000',
      padding: 16,
      borderBottom: `1px solid rgba(181,181,181, 0.5)`,
      '&:last-child': {
        borderBottom: 'unset',
      },
    },
    active: {
      color: theme.mainColor
    },
    owner: {
      color: theme.privateColor
    }
  }),
  {
    name: 'Dropdown',
    index: 1,
  }
);

export default useStyles;
