import auth0 from 'auth0-js';

export const domain = 'dev-kh9yo0ig.auth0.com';

export const auth0Manage = (token) => {
  const auth0Manage = new auth0.Management({
    domain,
    token,
  });
  return auth0Manage;
};

var webAuth = new auth0.WebAuth({
  clientID: '69gSfRxXGxWLtVJ4ySGIeLfVmrr7TznV',
  domain,
  redirectUri:
    process.env.NODE_ENV === 'production'
      ? 'https://register.monk8s.com/auth_response'
      : 'http://localhost:3000/auth_response',
  responseType: 'token',
});

export default webAuth;

// let see all sdk method at https://auth0.com/docs/libraries/auth0js/v9
