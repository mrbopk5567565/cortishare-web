import { createStyles, makeStyles } from '@material-ui/core/styles';
import theme from 'config/theme'
const useStyles = makeStyles((themeDefault) =>
  createStyles({
    plan: {
      padding: '36px 31px',
      background: theme.title,
      boxShadow: '0px 4px 15px rgba(160, 160, 160, 0.25)',
      borderRadius: 15,
      marginTop: 26
    },
    nextBilling: {
      background: theme.evenTable,
      padding: '71px 31px 28px 31px',
      position: 'relative',
      top: -43,
      borderRadius: 10,
      zIndex: -1,
      '@media only screen and (max-width: 500px)': {
        '& > p': {
          display: 'grid',
        },
      },
    },
    bill: {
      position: 'relative',
      top: -26,
      [themeDefault.breakpoints.down("sm")]: {
        '& > p': {
          marginBottom: 35,
        },
      },
      '& > div': {
        '& div:nth-child(even)': {
          background: theme.evenTable
        },
        '& div:nth-child(odd)': {
          background: theme.oddTable
        }
      }
    },
    dataTable: {
      marginTop: 40,
      borderCollapse: 'collapse',
      width: '100%',
      '& tr': {
        height: 60
      },
      '& > tbody': {
        '& tr:nth-child(even)': {
          background: theme.evenTable
        },
        '& tr:nth-child(odd)': {
          background: theme.oddTable
        }
      }
    },
    dataTableMobile: {
      fontSize: 15,
      padding: '18px 21px 0px 21px',
      '& > div': {
        paddingBottom: 18,
      },
    },
    moneyGTS: {
      textAlign: 'right',
      '& > span': {
        fontSize: 25,
        fontWeight: 'bold',
      },
    },
    textLeft: {
      textAlign: 'left'
    },
    textRight: {
      textAlign: 'right'
    },
    textCenter: {
      textAlign: 'center'
    },
    padRightTable: {
      paddingRight: 20
    },
    padLeftTable: {
      paddingLeft: 11
    },
    padPayMethod: {
      paddingLeft: 30
    },
    GST: {
      color: '#999!important'
    },
    planPrice: {
      marginLeft: 20,
      color: '#999!important',
      fontWeight: 'normal'
    },
    billDate: {
      fontWeight: 'bold',
      color: '#000!important'
    }
  })
)

export default useStyles;
