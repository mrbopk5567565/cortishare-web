import React, { memo } from 'react';
import './styles.css'
import logo from '../../asset/img/ic-loading.gif'
const Loading = memo(({ type }) => {

  return (
    <div className={`${type && type} loading`}>
      <img src={logo} alt="loading" />
    </div>
  );
});
export default Loading;
