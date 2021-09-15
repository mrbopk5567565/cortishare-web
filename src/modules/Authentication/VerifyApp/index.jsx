import React, { useState, useEffect, useRef } from 'react';
import { Dialog, Grid, Hidden, DialogContent, Box } from '@material-ui/core';
import { Buttons, Text } from 'components'
import useStyles from './styles';
import Images from 'config/images'
import Login from '../Login'
import logoTextBlackHighRes from 'asset/img/ic-logoTextBlackHighRes.png';

const VerifyApp = ({ handleVerifyApp, openVerifyApp, handleLogin, verifyUserName }) => {
	const classes = useStyles();
	const [openLogin, setOpenLogin] = useState(false)

	const handleOpenVerifyApp = () => {
		handleVerifyApp(state => !state)
	}

	const handleOpenLogin = () => {
		handleLogin()
	}

	const handleCloseLogin = () => {
		setOpenLogin(false)
	}

	return (
		<div className={classes.root}>
			<Dialog
				open={openVerifyApp}
				onClose={handleOpenVerifyApp}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				classes={{
						paper: classes.container,
						paperScrollPaper: classes.paperScrollPaper,
				}}
			>
				<DialogContent classes={{ root: classes.containerBody }}>
					<Hidden smUp>
						<div className={classes.buttonClose} onClick={handleOpenVerifyApp}>
							<img src={Images.icCloseBig} />
						</div>
					</Hidden>
					<Grid
						container
						alignItems="center"
						direction="column"
						justify="space-between"
						classes={{ root: classes.layoutLogin }}
					>
						<Grid container alignItems="center" direction="column" justify="center" classes={{ root: classes.layoutContainer }} direction="column">
							<img src={logoTextBlackHighRes} className={classes.containerLogoLogin} />
							<Grid container alignItems="flex-start" justify="center">
							</Grid>
							<Grid className={classes.textWelcome}>
								<Text>Welcome {verifyUserName}!</Text>
							</Grid>
							<Grid className={classes.textThank}>
								<Text size="medium">Thank you for joining us at CortiShare! To complete setting up your account, please check your Email now and verify your Email address. </Text>
							</Grid>
							<Grid container item justify="center" alignItems="center" className={classes.buttonLogin}>
								<Buttons classes={{ root: classes.textButton }} onClick={handleOpenLogin}>Back to Login</Buttons>
							</Grid>
						</Grid>
					</Grid>
				</DialogContent>
				{openLogin && <Login openLogin={openLogin} handleClose={handleCloseLogin} />}
			</Dialog>
		</div>
	);
}

export default VerifyApp;