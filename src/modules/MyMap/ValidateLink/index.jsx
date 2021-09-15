import React, { useEffect, memo } from 'react';
import { useDispatch, connect, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { VALIDATE_LINK_REQUEST } from 'redux/reducers/map/actionTypes'

const ValidateLink = memo((props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { inviteByLink } = useSelector((state) => state.map.inviteCollab)
  const { token } = useParams()

  useEffect(() => {
    dispatch({
      type: VALIDATE_LINK_REQUEST,
      payload: { token },
      history,
    })
  }, [])

  return (
    <>
    </>
  );
})

export default connect()(ValidateLink);
