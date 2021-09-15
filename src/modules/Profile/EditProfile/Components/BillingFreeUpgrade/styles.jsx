import { createStyles, makeStyles } from "@material-ui/core/styles";
import themeConfig from "config/theme";
import theme from "config/theme";

const useStyles = makeStyles(() =>
  createStyles({
    billingFreeContainer: {
      background: theme.lightColor,
      padding: '25px 30px 25px 25px',
      marginBottom: 50,
      marginTop: 18,
      borderRadius: 10,
      '@media only screen and (max-width: 768px)': {
        marginBottom: 0,
      },
    },
    colorTitle: {
      color: theme.mainColor,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    description: {
      lineHeight: '19px',
      fontSize: 16,
      marginBottom: 32,
    },
    textUpgrade: {
      cursor: 'pointer',
      fontSize: 18
    }
  }),

  {
    name: "EditProfile",
    index: 1,
  }
);

export default useStyles;
