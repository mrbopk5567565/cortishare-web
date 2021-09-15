import { createStyles, makeStyles } from '@material-ui/core/styles';
import themeConfig from 'config/theme';

const useStyles = makeStyles((theme) =>
    createStyles({
        layoutLogin: {
            height: '-webkit-fill-available'
        },
        root: {
            '& > button': {
                background: 'white',
                color: themeConfig.mainColor,
                marginRight: 10,
                '&:hover': {
                    background: themeConfig.mainColor,
                    color: 'white',
                }
            }
        },
        container: {
            width: '45%',
            height: 840,
            maxWidth: 'inherit',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            overflowY: 'hidden !important',
            [theme.breakpoints.down("xs")]: {
                margin: 'unset',
                width: '100%',
                // padding: '20px 10%',
                height: '-webkit-fill-available',
                borderRadius: 'unset',
            }
        },
        paperScrollPaper: {
            [theme.breakpoints.down("xs")]: {
                maxHeight: 'unset',
            },
        },
        containerBody: {
            padding: 0,
            width: '100%',
            position: 'relative',
        },
        buttonClose: {
            position: 'absolute',
            top: 20,
            right: 20,
            cursor: 'pointer',
            [theme.breakpoints.down("xs")]: {
                top: 35,
            },
        },

        layoutContainer: {
            width: '80%',
            margin: '0 auto',
            [theme.breakpoints.down("sm")]: {
                width: '80%',
                flexWrap: 'unset!important',
            }
        },
        layoutFooter: {
            // height: '12%',
            padding: '30px 0px 50px 0px',
            background: '#ffffff',
            [theme.breakpoints.down("sm")]: {
                position: 'absolute',
                bottom: 0,
            }
        },
        containerLogoLogin: {
            width: '50%',
            margin: '0 auto',
            padding: '30px 0 50px',
            [theme.breakpoints.down("xs")]: {
                width: '80%',
                padding: '50px 0',
            }
        },
        textWelcome: {
            color: '#333333',
            textAlign: 'center',
            fontSize: 30,
            margin: '45px 0',
            fontWeight: 'bold',
            display: 'contents',
            wordBreak: 'break-word',
            '& > p': {
                marginTop: '40px'
            },
        },
        textThank: {
            textAlign: 'center',
            marginTop: '59px',
        },
        buttonLogin: {
            margin: '130px 0px 35px',
            [theme.breakpoints.down("sm")]: {
                marginTop: 120,
            }
        },
        textButton: {
            '& > span': {
                fontSize: 14,
                padding: '8px 21px',
            },
        },
    }),
    {
        name: 'VerifyApp',
        index: 1,
    }
);

export default useStyles;
