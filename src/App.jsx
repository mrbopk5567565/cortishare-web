import React, { useEffect } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import Routes from 'routers';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { HelmetMetaData } from "./components";
import ScrollToTop from 'utils/scrollToTop'
import { mixPanel } from 'services/mixpanel';
//require('dotenv').config({ path: process.env.NODE_ENV === 'development' ? '.env.development' : '.env.production' });
import { startWatchStorage } from './services/configApi';

const mapStateToProps = (state) => {
  return {
  };
};

const App = ({ history }) => {

  useEffect(() => {
    mixPanel.init();
    trackingUser();
    startWatchStorage();
  }, [])

  const trackingUser = () => {
    let customerData = localStorage.getItem('customer') || "null";
    try{
      customerData = JSON.parse(customerData);
    }catch(e){ customerData = null}
    const isLoggedIn = Boolean(localStorage.getItem('accessToken'))
    
    if(customerData && isLoggedIn){
      mixPanel.identify(customerData.customerId);
      mixPanel.people.set({
        '$name': customerData.userName,
        '$email': customerData.email
      })
    }
  }

  return (
    <div style={{ height: '100%' }}>
      <ConnectedRouter history={history}>
        <HelmetMetaData></HelmetMetaData>
        <ScrollToTop/>
        <Routes />
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {/* Same as */}
      </ConnectedRouter>
    </div>
  );
};

export default connect(mapStateToProps)(App);
