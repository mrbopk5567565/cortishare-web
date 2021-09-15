import React, { lazy, Suspense } from 'react';
import { GridFullHeight } from 'components';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import PrivateRoute from './PrivateRoute'
import { stubFalse } from 'lodash';
import useLocationBlocker from 'utils/useLocationBlocker'
// import {isLoggedIn} from 'helpers'

const Home = lazy(() => import('modules/Home'));
const Header = lazy(() => import('components/Header'));
const Recent = lazy(() => import('modules/Home/Recent'));
const MapDetail = lazy(() => import('modules/MyMap'));
const ValidateLink = lazy(() => import('modules/MyMap/ValidateLink'));
const Dashboard = lazy(() => import('modules/Dashboard'));
const Discover = lazy(() => import('modules/Discover'));
const Public = lazy(() => import('modules/Discover/Public'));
const LinkingMinds = lazy(() => import('modules/Discover/LinkingMinds'));
const Profile = lazy(() => import('modules/Discover/Profile'));
const MyMap = lazy(() => import('modules/MyMap/MyMap'));
const Following = lazy(() => import('modules/Following'));
const MyProfile = lazy(() => import('modules/Profile/MyProfile'));
const EditProfile = lazy(() => import('modules/Profile/EditProfile'));
const ForgotPassword = lazy(() => import('modules/ForgotPassword/pages'));
const VerifyEmail = lazy(() => import('modules/VerifyEmail'));
const UnsubcribeEmail = lazy(() => import('modules/UnsubcribeEmail'));
const BillingDetails = lazy(() => import('modules/BillingDetails'));
const SignUpPage = lazy(() => import('modules/SignUpPage'));
const LoginPage = lazy(() => import('modules/LoginPage'));
const Payment = lazy(() => import('modules/Payment'));
const Routes = props => {
  const matchMindMapDetail = useRouteMatch('/board/:mapId');
  const matchCreatePost = useRouteMatch('/new-post/board/:mapId/node/:nodeId');
  const matchEditPost = useRouteMatch('/edit-post');
  const matchPost = useRouteMatch('/post/:id');
  const matchDashboard = useRouteMatch('/');
  const matchForgotPassword = useRouteMatch('/forgot-password');
  const matchVerifyEmail = useRouteMatch('/verify_email');
  const matchLogin = useRouteMatch('/login');
  const matchSignUp = useRouteMatch('/sign-up');
  const matchPayment = useRouteMatch('/payment');

  useLocationBlocker()

  let customer = !['null', null, ''].includes(localStorage.getItem('customer'));

  const isLoggedIn = Boolean(localStorage.getItem('accessToken') && customer)

  return (
    <Suspense
      fallback={
        <GridFullHeight
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <CircularProgress style={{ color: '#E9781C' }} />
        </GridFullHeight>
      }
    >
      {/* {(!matchMindMapDetail && !matchDiscover && !matchPost && !matchCreatePost) && <Header />} */}
      {
        (
          !matchForgotPassword &&
          !matchMindMapDetail &&
          isLoggedIn &&
          !matchPost &&
          !matchCreatePost &&
          !matchEditPost &&
          !matchVerifyEmail &&
          !matchLogin &&
          !matchSignUp &&
          !matchPayment
        ) && <Header />}
      <Switch>
        {isLoggedIn ?
          <PrivateRoute isLoggedIn={isLoggedIn} exact path='/' component={Home} />
          :
          <Route exact path="/" component={SignUpPage} />
        }
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/verify_email" component={VerifyEmail} />
        <Route exact path='/board/:mapId' component={MapDetail} />
        <Route exact path='/board/:mapId/node/:nodeId' component={MapDetail} />
        <Route exact path='/board/:mapId/post/:postId' component={MapDetail} />
        <Route exact path='/validate-link/:token' component={ValidateLink} />
        <Route exact path='/unsubcribe-email' component={UnsubcribeEmail} />
        <Route exact path='/sign-up' component={SignUpPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/payment" component={Payment} />

        <PrivateRoute isLoggedIn={isLoggedIn} exact path='/recent' component={Recent} />
        {/* <PrivateRoute isLoggedIn={isLoggedIn} exact path='/board/:mapId' component={MapDetail} /> */}
        {/* <PrivateRoute isLoggedIn={isLoggedIn} exact path='/board/:mapId/node/:nodeId' component={MapDetail} /> */}
        {/* <PrivateRoute isLoggedIn={isLoggedIn} exact path='/post/:id' component={MapDetail} /> */}

        {/* 
          when use PrivateRoute: Component MapDetail is created new --> run dispacth: RESET_MAP
        */}
        {/* <PrivateRoute isLoggedIn={isLoggedIn} exact path='/new-post/board/:mapId/node/:nodeId' component={MapDetail} /> */}
        {isLoggedIn ?
          <Route isLoggedIn={isLoggedIn} exact path='/new-post/board/:mapId/node/:nodeId' component={MapDetail} />
          :
          <Redirect to="/" />
        }

        {/* <PrivateRoute isLoggedIn={isLoggedIn} exact path='/edit-post/:id/board/:mapId/node/:nodeId' component={MapDetail} /> */}
        {isLoggedIn ?
          <Route isLoggedIn={isLoggedIn} exact path='/edit-post/:postId/board/:mapId/node/:nodeId' component={MapDetail} />
          :
          <Redirect to="/" />
        }

        {/* <PrivateRoute isLoggedIn={isLoggedIn} exact path='/dashboard' component={Dashboard} /> */}
        {/* <PrivateRoute isLoggedIn={isLoggedIn} exact path='/board/:mapId/RequestAccess' component={MapDetail} /> */}
        <PrivateRoute isLoggedIn={isLoggedIn} exact path='/search' component={Discover} />
        <PrivateRoute isLoggedIn={isLoggedIn} exact path='/search/linking-minds' component={LinkingMinds} />
        <PrivateRoute isLoggedIn={isLoggedIn} exact path='/search/profile/:id' component={Profile} />
        <PrivateRoute isLoggedIn={isLoggedIn} exact path='/board' component={MyMap} />
        <PrivateRoute isLoggedIn={isLoggedIn} exact path='/following' component={Following} />
        <PrivateRoute isLoggedIn={isLoggedIn} exact path='/profile' component={MyProfile} />
        <PrivateRoute isLoggedIn={isLoggedIn} exact path='/profile/edit' component={EditProfile} />
        <PrivateRoute isLoggedIn={isLoggedIn} exact path='/profile/billing' component={BillingDetails} />

      </Switch>
    </Suspense>
  )
};

export default connect(null)(Routes);
