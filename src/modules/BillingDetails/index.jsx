import React, { useState, useEffect, useRef } from 'react';
import { Text, LayoutMap, Layout, Inputs, Buttons } from 'components'
import { Box, Grid, Hidden } from '@material-ui/core';
import useStyles from './styles'
import images from 'config/images'
import clsx from 'clsx'
import { HANDLE_GET_BILLING_DETAIL_REQUEST } from 'redux/reducers/profile/actionTypes'
import { useDispatch, connect, useSelector } from 'react-redux';
import { checkPaymentStatus } from 'helpers'
import moment from 'moment'
const BillingDetails = () => {
  const classes = useStyles()
  const dispatch = useDispatch();
  const billingDetail = useSelector((state) => state.profile.billingDetail)
  const { plan, payment, info } = useSelector((state) => state.profile)
  const page = 1;
  const size = 10;
  useEffect(() => {
    dispatch({
      type: HANDLE_GET_BILLING_DETAIL_REQUEST,
      payload: {
        "page": page,
        "size": size
      }
    })
  }, [])
  const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY")
  }
  const renderTypeOfPlan = () => {
    if (checkPaymentStatus({ customer: info, payment: payment }) == 2) {
      return { name: payment.planName, price: payment.planPrice, description: payment.planName && payment.planName.split(' ')[1] }
    } else {
      return { name: plan.isUnlimitedPlan === true ? "Unlimited Plan" : "Free Plan", price: plan.price, description: plan.typeBilling === "free" ? "Month" : plan.typeBilling }
    }
  }
  return (
    <Layout>
      <Grid xs={12} md={9} item>
        <Text size='biger' color='normal' type='bold'>Billing Details</Text>
        <div className={classes.plan}>
          <Text size='small' color='tooBlur'>Your plan</Text>
          <Text size='large' color='normal' type='bold'>{renderTypeOfPlan().name} <span className={classes.planPrice}>${renderTypeOfPlan().price} {renderTypeOfPlan().description}</span></Text>
        </div>
        <div className={classes.nextBilling}>
          <Text size="medium" color='normal'>Your next billing date is <span className={classes.billDate}>{moment(payment.nextBillingDatetime).format('DD MMMM YYYY')}</span></Text>
        </div>
        <div className={classes.bill}>
          <Text size='mini' color='tooBlur' >Membership fees are billed at the beginning of each period and may take a few days after the billing date to appear on your account.</Text>
          <Hidden smDown>
            <table className={classes.dataTable}>
              <thead>
                <tr>
                  <th className={clsx(classes.textLeft, classes.padLeftTable)}><Text type="normal" size='small' color='tooBlur'>Date</Text></th>
                  <th className={classes.textLeft}><Text type="normal" size='small' color='tooBlur'>Description</Text></th>
                  <th className={classes.textLeft}><Text type="normal" size='small' color='tooBlur'>Service Period</Text></th>
                  <th className={clsx(classes.textLeft, classes.padPayMethod)}><Text type="normal" size='small' color='tooBlur'>Payment Method</Text></th>
                  <th className={classes.textRight}><Text type="normal" size='small' color='tooBlur'>Subtotal</Text></th>
                  <th className={clsx(classes.textRight, classes.padRightTable)}><Text type="normal" size='small' color='tooBlur'>Total</Text></th>
                </tr>
              </thead>
              <tbody>
                {billingDetail.length === 0 && <div>You have Billing Details</div>}
                {billingDetail.map((item, idx) =>
                  <tr key={idx}>
                    <td className={classes.padLeftTable}><Text size="small" color='normal'> {formatDate(item.date)}</Text></td>
                    <td><Text size="small" color='normal'>{item.description}</Text></td>
                    <td><Text size="small" color='normal'>{formatDate(item.date)} - {formatDate(item.expiredDate)}</Text></td>
                    <td className={classes.padPayMethod}>
                      <Box display="flex">
                        <img src={images.icVisaTable} alt='' style={{ paddingRight: 12 }} />
                        <Text size="small" color='normal'>****_****_***-{item.cardNumber}</Text>
                      </Box>
                    </td>
                    <td className={classes.textRight} >
                      <Text size="small" color='normal'>${item.subtotal} <span className={classes.GST}></span></Text>

                    </td>
                    <td className={clsx(classes.textRight, classes.padRightTable)}><Text size="small" color='normal'>${item.total}</Text></td>
                  </tr>
                )}
              </tbody>
            </table>
          </Hidden>
          <Hidden mdUp>
            <div>
              {billingDetail.length === 0 && <div>You have Billing Details</div>}
              {billingDetail.map((item, idx) =>
                <Grid item key={idx}>
                  <div className={classes.dataTableMobile} style={{ background: 'transparent' }}>
                    <Grid container justify="space-between" style={{ background: 'transparent' }}>
                      <Text>{formatDate(item.date)}</Text>
                      <Grid className={classes.moneyGTS} style={{ background: 'transparent' }}>
                        <span>${item.subtotal}</span>
                      </Grid>
                    </Grid>
                    <Text>Unlimited Plan</Text>
                    <Text>{formatDate(item.date)} - {formatDate(item.expiredDate)}</Text>
                    <Box display="flex" style={{ background: 'transparent' }}>
                      <img src={images.icVisaTable} alt='' style={{ paddingRight: 12 }} />
                      <Text>****_****_***-{item.cardNumber}</Text>
                    </Box>
                  </div>
                </Grid>
              )}
            </div>
          </Hidden>
        </div>
      </Grid>
    </Layout>
  )
}

export default BillingDetails