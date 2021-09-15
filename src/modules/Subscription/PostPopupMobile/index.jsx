import React from 'react';
import { DialogContent, Grid } from '@material-ui/core';
import { Text } from 'components';
import useStyles from './styles';
import UnlimitedPlan from 'components/PopupUpgrade/components/UnlimitedPlan';
import Images from 'config/images';


const PostPopupMobile = ({ openUpgrade, handleClose }) => {
	const classes = useStyles();
	return (
		<Grid
			open={openUpgrade}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			classes={{ root: classes.container }}
		>
			<img src={Images.icCloseCircleFill} alt={Images.icCloseCircleFill} className={classes.iconClose} onClick={handleClose} />
			<DialogContent classes={{ root: classes.containerBody }}>
				<Grid container alignItems="center" justify="space-between" direction="column" classes={{ root: classes.layoutLeft }}>
					<Grid container alignItems="center" direction="row">
						<Grid className={classes.name} item xs={6}>
							Free Plan
						{/* <Text><span><b className={classes.name}>Standard lecturer</b></span></Text> */}
						</Grid>
						<Grid container classes={{ root: classes.priceMonthFee }} item xs={6} justify='center' direction='column'>
							<p className={classes.priceMonth}>$0.00 <span>Month</span></p>
							<Text classes={{ root: classes.titlePlan }}>Current Plan</Text>
						</Grid>
					</Grid>
					<Grid container alignItems="center" direction="row">
						<Grid classes={{ root: classes.numberMaps }}>
							<Text classes={{ root: classes.title }}>Number of Boards</Text>
							<p className={classes.priceNumber1}>1</p>
						</Grid>
						<Grid classes={{ root: classes.numberMaps }}>
							<Text classes={{ root: classes.title }}>Number of Collaborating Boards</Text>
							<p className={classes.priceNumber2}>1</p>
						</Grid>
					</Grid>
				</Grid>
				<Grid container alignItems="center" justify="space-between" direction="row" classes={{ root: classes.layoutRight }}>
					<Grid container alignItems="center" direction="row">
						<Text size="small">Unlimited Plan</Text>
						<Grid classes={{ root: classes.priceMonthFee }}>
							<p className={classes.price}>$48 / Year</p>
							<Text classes={{ root: classes.customText }} size="small">or 4.99 / month</Text>
						</Grid>
					</Grid>
					<Grid container alignItems="center" direction="row">
						<img src={Images.icPostPopup} alt="" />
						<Text size="small">Unlimited Boards and collaborations</Text>
					</Grid>
					<UnlimitedPlan handleClosePostPopup={handleClose} />
				</Grid>
			</DialogContent>
		</Grid>
	);
}

export default PostPopupMobile;