import React from 'react'
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import UseStyles from './styles';
import { Text } from 'components';
import { useHistory } from 'react-router-dom';

const ViewInvoices = ({ description, date }) => {
  const classes = UseStyles();
  const history = useHistory();
  return (
    <div>
      <Grid classes={{ root: classes.viewInvoicesSection }}>
        <Grid item classes={{ root: classes.description }}>
          {description} <span className={classes.date}>{date}</span>
        </Grid>
        <Grid item>
          <Text classes={{ root: classes.viewInvoicesText }} handleClick={() => history.push('/profile/billing')}> View Invoices</Text>
        </Grid>
      </Grid>

    </div>
  )
}

export default connect()(ViewInvoices);
