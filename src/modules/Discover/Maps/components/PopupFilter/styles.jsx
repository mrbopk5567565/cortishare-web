import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'config/theme';

const useStyles = makeStyles(() =>
  createStyles({
    paperScrollPaper: {
      width: 400,
      minHeight: 500,
    },
    treeView: {
      maxHeight: 280,
      overflowY: 'scroll'
    },
    actions: {
      padding: '0 20px 50px 20px'
    },
    treeParent: {
      color: '#000',
      fontSize: 20,
      fontWeight: 'bold',
    },
    rootTextField: {
      border: '1px solid #F1F1F1',
      '& fieldset': {
        border: 'unset'
      },
    },
    treeSelected: {
      '& > :not(ul)': {
        '& > .MuiTreeItem-label': {
          color: '#0070C9',
        }
      },
      '& > .Mui-selected': {
        color: '#0070C9',
        '& > .MuiTreeItem-label': {
          color: '#0070C9',
        }
      }
    },
    actionLink: {
      color: '#0070C9',
      fontSize: 18,
      fontWeight: 'bold',
      cursor: 'pointer',
      paddingLeft: 12
    },
    categoryHasNoItem: {
      marginLeft: -5,
      cursor: 'pointer'
    },
    iconHasNoItem: {
      width: 21,
      marginLeft: -3,
    }
  }),
  {
    name: 'PopupFilterContainer',
    index: 1,
  }
);

export default useStyles;