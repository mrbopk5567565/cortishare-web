import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import images from 'config/images';

const useStyles = makeStyles((theme) => ({
	root: {
		position: 'relative',
	},
	dropdown: {
		position: 'absolute',
		top: 46,
		right: -85,
		zIndex: 1,
		borderRadius: 8,
		padding: theme.spacing(1),
		backgroundColor: '#E5F1F4',
		minWidth: 300,
		textAlign: 'center',
		'& a': {
			color: '#0070C9',
		},
		'@media(max-width: 600px)': {
			minWidth: 180,
			fontSize: 13,
			top: 30,
			right: 2,
		},
        /* [themeDefault.breakpoints.down('xs')]: {
			 top: 30,
			 right: 2,
		 }, */

	},
	buttonCustom: {
		border: 'none',
		padding: '0px 0px',
		backgroundColor: '#FFF !important',
		cursor: 'pointer',
		width: 24,
		'& img': {
			width: 22
		},

	}
}));

function ClickAway({ postDetail }) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleClick = () => {
		setOpen((prev) => !prev);
	};

	const handleClickAway = () => {
		setOpen(false);
	};

	function isValidURL(string) {
		var res = /(http(s)?:\/\/.)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
		const matches = string.match(res);
		if (!matches) return '//' + string
		return string
	};

	return (
		<ClickAwayListener onClickAway={handleClickAway}>
			<div className={classes.root}>
				<button type="button" onClick={handleClick} className={classes.buttonCustom}>
					<img src={images.icLinkPost} alt="icLinkPost" />
				</button>
				{open ? (
					<div className={classes.dropdown}>
						<a target="_blank" href={isValidURL(postDetail.url)}>{postDetail.url}</a>
					</div>
				) : null}
			</div>
		</ClickAwayListener>
	)
}

export default ClickAway;