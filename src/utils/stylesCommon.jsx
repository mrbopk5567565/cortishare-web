import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'config/theme';

const layout = {
  widthItem: 300,
  padding: 120,
}

const useStylesCommon = makeStyles((themeDefault) =>
  createStyles({
    layoutDefault: {
      width: '100%',
      // padding: '0 45px',
      padding: '0px',
    },
    layout: {
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      [themeDefault.breakpoints.down(`${300 * 16 + 120}`)]: {
        width: 300 * 15 - 20,
      },
      [themeDefault.breakpoints.down(`${300 * 15 + 120}`)]: {
        width: 300 * 14 - 20,
      },
      [themeDefault.breakpoints.down(`${300 * 14 + 120}`)]: {
        width: 300 * 13 - 20,
      },
      [themeDefault.breakpoints.down(`${300 * 13 + 120}`)]: {
        width: 300 * 12 - 20,
      },
      [themeDefault.breakpoints.down(`${300 * 12 + 120}`)]: {
        width: 300 * 11 - 20,
      },
      [themeDefault.breakpoints.down(`${300 * 11 + 120}`)]: {
        width: 300 * 10 - 20,
      },
      [themeDefault.breakpoints.down(`${300 * 10 + 120}`)]: {
        width: 300 * 9 - 20,
      },
      [themeDefault.breakpoints.down(`${300 * 9 + 120}`)]: {
        width: 300 * 8 - 20,
      },
      [themeDefault.breakpoints.down(`${300 * 8 + 120}`)]: {
        width: 300 * 7 - 20,
      },
      [themeDefault.breakpoints.down(`${300 * 7 + 120}`)]: {
        width: 300 * 6 - 20,
      },
      [themeDefault.breakpoints.down(`${300 * 6 + 120}`)]: {
        width: 300 * 5 - 20,
      },
      [themeDefault.breakpoints.down(`${300 * 5 + 120}`)]: {
        width: 300 * 4 - 20,
      },
      // [themeDefault.breakpoints.down(`${300 * 4 + 120}`)]: {
      //   width: 300 * 3 - 20,
      // },
      [themeDefault.breakpoints.down(`${300 * 3.5 + 120}`)]: {
        width: 300 * 3 - 20,
      },
      [themeDefault.breakpoints.down(`${300 * 3 + 120}`)]: {
        width: 300 * 2 - 20,
      },
      [themeDefault.breakpoints.down('960')]: {
        width: 600 - 20,
      },
      [themeDefault.breakpoints.down('650')]: {
        width: '100%'
      },
      [themeDefault.breakpoints.down('xs')]: {
        width: '100%'
      },
    },
    layoutGridDefault: {
      width: '100%',
      padding: '0 45px',
    },
    layoutGrid: {
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      [themeDefault.breakpoints.down('4319')]: {
        width: 3900 - 20,
      },
      [themeDefault.breakpoints.down(`${255 * 16 + 30}`)]: {
        width: `${255 * 15 - 20}px`,
      },
      [themeDefault.breakpoints.down(`${255 * 15 + 30}`)]: {
        width: `${255 * 14 - 20}px`,
      },
      [themeDefault.breakpoints.down(`${255 * 14 + 30}`)]: {
        width: `${255 * 13 - 20}px`,
      },
      [themeDefault.breakpoints.down(`${255 * 13 + 30}`)]: {
        width: `${255 * 12 - 20}px`,
      },
      [themeDefault.breakpoints.down(`${255 * 12 + 30}`)]: {
        width: `${255 * 11 - 20}px`,
      },
      [themeDefault.breakpoints.down(`${255 * 11 + 30}`)]: {
        width: `${255 * 10 - 20}px`,
      },
      [themeDefault.breakpoints.down(`${255 * 10 + 30}`)]: {
        width: `${255 * 9 - 20}px`,
      },
      [themeDefault.breakpoints.down(`${255 * 9 + 30}`)]: {
        width: `${255 * 8 - 20}px`,
      },
      [themeDefault.breakpoints.down(`${255 * 8 + 30}`)]: {
        width: `${255 * 7 - 20}px`,
      },
      [themeDefault.breakpoints.down(`${255 * 7 + 30}`)]: {
        width: `${255 * 6 - 20}px`,
      },
      [themeDefault.breakpoints.down(`${255 * 6 + 30}`)]: {
        width: `${255 * 5 - 20}px`,
      },
      [themeDefault.breakpoints.down(`${255 * 5 + 30}`)]: {
        width: `${255 * 4 - 20}px`,
      },
      [themeDefault.breakpoints.down(`${255 * 4 + 30}`)]: {
        width: `${255 * 3 - 20}px`,
      },
      [themeDefault.breakpoints.down('sm')]: {
        width: `${255 * 3 - 20}px`,
      },
      [themeDefault.breakpoints.down('795')]: {
        width: `${255 * 2 - 20}px`,
      },
      [themeDefault.breakpoints.down('xs')]: {
        width: `${255 * 2 - 20}px`,
      },
      [themeDefault.breakpoints.down('500')]: {
        width: '100%',
      },
    },
  }),
  {
    name: 'stylesCommon',
    index: 1,
  }
);

export default useStylesCommon;
