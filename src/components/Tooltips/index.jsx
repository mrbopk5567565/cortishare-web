import React, { memo } from 'react';
import { Tooltip, Zoom } from '@material-ui/core';
import useStyles from './styles';
import clsx from 'clsx';

const Tooltips = memo((props) => {
  const classes = useStyles();
  const { children, title } = props;

  return (
    <>
      {children &&
        <Tooltip
          title={title}
          classes={{
            popper: classes.popperCustom,
            tooltip: classes.tooltipCustom,
            arrow: classes.arrowCustom,
          }}
          TransitionComponent={Zoom} 
          arrow
          placement="top"
          // #ff
          // PopperProps={{
          //   popperOptions: {
          //     modifiers: {
          //       offset: {
          //         enabled: true,
          //         offset: '40px, 40px',
          //       },
          //     },
          //   },
          // }}
        >
          {children}
        </Tooltip>
      }
    </>
  );
});
export default Tooltips;



