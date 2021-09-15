import { APIInstance } from '../configApi';

// const PIXEL_ID = 871002270492319;
// const TOKEN = "EAAM6ABSX0p0BAHODFQUBYWZAYygvMiZCRWf7nBekZBuJFBNqr5aETTDOdHYIHV4lEW0P0YZATS7PlUblo4FDRhItWjPZCeUPJGHiOxLa71u4VETtEKb1WKYrZCWVgd9aZBGPHTKnwH4HvBjCcwvFjB2ZBDClZCkl7EVQ9kV3xJ7rdQb2SavzMVqxsBgMNegwxkBoZD";
// const dataExample = {
//   openSignUp: {
//     "data": [
//       {
//         "event_name": "Open Sign Up",
//         "event_time": 1625638116,
//         "event_source_url": "http:\/\/jaspers-market.com\/product\/123",
//         "user_data": {
//           // "client_ip_address": "192.19.9.9",
//           // "client_user_agent": "test ua",
//           "em": [
//             "309a0a5c3e211326ae75ca18196d301a9bdbd1a882a4d2569511033da23f0abd"
//           ],
//           "ph": [
//             "254aa248acb47dd654ca3ea53f48c2c26d641d23d7e2e93a1ec56258df7674c4",
//             "6f4fcb9deaeadc8f9746ae76d97ce1239e98b404efe5da3ee0b7149740f89ad6"
//           ],
//           "fbc": "fb.1.1554763741205.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890",
//           "fbp": "fb.1.1558571054389.1098115397"
//         },
//         "custom_data": {
//           "value": 100.2,
//           "currency": "USD",
//           "content_ids": [
//             "product.id.123"
//           ],
//           "content_type": "product"
//         },
//         "opt_out": false
//       },
//     ]
//   },
// }

// export const ConversionsAPIFacebook = async (data = dataExample) => {
//   const res = await APIInstance.post(
//     `https://graph.facebook.com/v10.0/${PIXEL_ID}/events?access_token=${TOKEN}`, data.openSignUp);
//   return res;
// };


// 'use strict';
const bizSdk = require('facebook-nodejs-business-sdk');
// const request = require('request')
const Content = bizSdk.Content;
const CustomData = bizSdk.CustomData;
const DeliveryCategory = bizSdk.DeliveryCategory;
const EventRequest = bizSdk.EventRequest;
const UserData = bizSdk.UserData;
const ServerEvent = bizSdk.ServerEvent;

const pixel_id = 871002270492319;
const access_token = 'EAAM6ABSX0p0BAHODFQUBYWZAYygvMiZCRWf7nBekZBuJFBNqr5aETTDOdHYIHV4lEW0P0YZATS7PlUblo4FDRhItWjPZCeUPJGHiOxLa71u4VETtEKb1WKYrZCWVgd9aZBGPHTKnwH4HvBjCcwvFjB2ZBDClZCkl7EVQ9kV3xJ7rdQb2SavzMVqxsBgMNegwxkBoZD';
const api = bizSdk.FacebookAdsApi.init(access_token);

let current_timestamp = Math.floor(new Date() / 1000);

export const ConversionsAPIFacebook = async (data) => {
  let fbp = document.cookie.split(';').filter(c => c.includes('_fbp=')).map(c => c.split('_fbp=')[1]);
  let fbc = document.cookie.split(';').filter(c => c.includes('_fbc=')).map(c => c.split('_fbc=')[1]);
  fbp = (fbp.length && fbp[0]) || null;
  fbc = (fbc.length && fbc[0]) || null;

  if (!fbc && window.location.search.includes('fbclid=')) {
    fbc = 'fb.1.' + (+new Date()) + '.' + window.location.search.split('fbclid=')[1];
  }

  const userData = (new UserData())
    .setEmails(data.user_data.email)
    // .setPhones(['12345678901', '14251234567'])
    .setPhones(null)
    // It is recommended to send Client IP and User Agent for Conversions API Events.
    // .setClientIpAddress(request.connection.remoteAddress)
    .setClientUserAgent(navigator.userAgent)
    .setFbp(fbp)
    .setFbc(fbc);

  // const content = (new Content())
  //   .setId('product123')
  //   .setQuantity(1)
  //   .setDeliveryCategory(DeliveryCategory.HOME_DELIVERY);

  const customData = (new CustomData())
    // .setContents([content])
    // .setCurrency('usd')
    // .setValue(123.45)
    .setContentName(data.custom_data && data.custom_data.content_name ? data.custom_data.content_name : '')

  const serverEvent = (new ServerEvent())
    .setEventName(data.event_name)
    .setEventTime(current_timestamp)
    .setUserData(userData)
    .setCustomData(customData)
    .setEventSourceUrl(window.location.origin + window.location.pathname)
    .setActionSource('website');

  const eventsData = [serverEvent];

  var normalized_events = [];

  for (var i = 0; i < eventsData.length; i++) {
    var event = eventsData[i];
    var normalized_event = event.normalize.call(event);
    normalized_events.push(normalized_event);
  }

  let mainBodyData = {
    "data": normalized_events,
    // "test_event_code": 'TEST82937',
  }

  // console.log('eventsData', eventsData)
  // console.log('eventsData', mainBodyData)
  // return

  if (process.env.NODE_ENV === 'production') {
    const res = await APIInstance.post(`${process.env.REACT_APP_API}/api/app/analytic/Conversions`, mainBodyData);
    return res

    // const res = await APIInstance.post(
    //   `https://graph.facebook.com/v11.0/${pixel_id}/events?access_token=${access_token}`, mainBodyData);
    // return res;
  }
  return

  // const eventRequest = (new EventRequest(access_token, pixel_id))
  //   .setEvents(eventsData);

  // eventRequest.execute().then(
  //   response => {
  //     // console.log('Response: ', response);
  //   },
  //   err => {
  //     console.error('Error: ', err);
  //   }
  // )
};

/*
  More info:
  https://fixel.ai/blog/creating-a-simple-conversions-api-for-your-facebook-pixel-events/
*/