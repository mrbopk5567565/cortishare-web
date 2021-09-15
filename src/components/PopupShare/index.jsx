import React, { memo, useEffect } from 'react';
import useStyles from './styles';
import clsx from 'clsx';
import { Text, Buttons } from 'components';
import {
  Grid
} from '@material-ui/core';
import Images from 'config/images'
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { useRouteMatch } from 'react-router-dom';

const PopupShare = memo((props) => {
  const classes = useStyles();
  const {
    handleClickAway,
    isHover,
    item
  } = props;
  
  const matchMapDetail = useRouteMatch('/board/:mapId')
  const matchNodeDetail = useRouteMatch('/board/:mapId/node/:nodeId')
  const matchPostDetail = useRouteMatch('/board/:mapId/post/:postId');
  let url;
  if(matchMapDetail?.isExact || matchNodeDetail?.isExact || matchPostDetail?.isExact) {
    url = String(window.location.href);
  } else {
    url = String(window.location.host)+ `/board/${item.id}`;
  }

  let title = item.title;
  const handleClick = (e, item) => {
    e.stopPropagation()
    item.onClick()
    handleClickAway()
  }

  return (
    <div className={clsx(classes.root)} >
      <Grid className={classes.shareBtn}
      >
        <FacebookShareButton
          quote={title}
          url={url}
        >
          <img src={Images.icFacebook} alt="icon-facebook" />
        </FacebookShareButton>
      </Grid>
      <Grid className={classes.shareBtn}
      >
        <WhatsappShareButton
          url={url}
          title={title}
          separator=":: "
          className={classes.shareBtn}
        >
          <img src={Images.icWhatsapp} alt="icon-whatsapp" />
        </WhatsappShareButton>
      </Grid>
      <Grid className={classes.shareBtn}
      >
        <TwitterShareButton
          url={url}
          title={title}
          className={classes.shareBtn}
        >
          <img src={Images.icTwitter} alt="icon-twitter" />
        </TwitterShareButton>
      </Grid>
    </div>
  );
});
export default PopupShare;



