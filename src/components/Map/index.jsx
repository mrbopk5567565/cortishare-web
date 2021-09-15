import React, { memo, useRef, useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import useStyles from './styles';
import clsx from 'clsx';
import MindMap from './TreeTidy';

const Test = memo((props) => {
  const classes = useStyles();
  const { } = props;

  return (
    <div style={{width: '100vw', height: '100vh'}}>
      <h2>Chart Tree Tidy d3</h2>
      <MindMap/>
    </div>
  );
});

export default Test;



