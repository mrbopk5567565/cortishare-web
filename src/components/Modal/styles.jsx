import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      marginLeft: isCard => isCard ? 0 : 8,
      marginRight: 8,
      width: 30,
    },
    dropdownInvite: {
      top: '-50px!important'
    },
    scale: {
      width: 8,
      position: 'absolute',
      top: '47%',
      right: 14,
      zIndex: 11,
      transform: 'translateX(50%)',
      margin: '0 !important',
      '& img': {
        width: '100%',
      },
      '& $containerIcon': {
        cursor: 'unset'
      }
    },
    scaleRight: {
      right: -14,
    },
    owner: {
      marginLeft: '16px !important',
      width: 'auto'
    },
    dropdown: {
      position: 'absolute',
      top: 50,
      right: 0,
      zIndex: 1,
    },
    dropdownScale: {
      top: 25,
    },
    card: {
      top: 37,
      right: 0,
    },
    cardShare: {
      top: 37,
      right: 0,
    },
    left: {
      left: 90,
    },
    containerIcon: {
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%'
    },
    navigation: {
      width: isCard => isCard ? 18 : 26,
      height: isCard => isCard ? 18 : 26,
    },
    iconControl: {
      width: 30,
      height: 30,
      background: 'white',
      borderRadius: 5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
  }),
  {
    name: 'Modal',
    index: 1,
  }
);

export default useStyles;