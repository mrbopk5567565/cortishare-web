import axios from 'axios';

export const APIInstance = axios.create({
  baseURL: process.env.REACT_APP_API,
});
let token = localStorage.getItem('accessToken')

export const setToken = (token) => {
  APIInstance.defaults.headers.common['Authorization'] = token;
  APIInstance.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
  APIInstance.defaults.headers.common['Time-Zone'] = Intl.DateTimeFormat().resolvedOptions().timeZone;
};


setToken(`Bearer ${token}`);

// guide use refresh token
// https://stackoverflow.com/questions/47216452/how-to-handle-401-authentication-error-in-axios-and-react/47218004#47218004?newreg=0726c8101143446bb1cdbce08880a787
// let authTokenRequest
// function getAuthToken() {
//   if (!authTokenRequest) {
//     authTokenRequest = requestNewToken();
//     authTokenRequest.then(resetAuthTokenRequest, resetAuthTokenRequest);
//   }
//   return authTokenRequest;
// }

APIInstance.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  error => {
    if (error.response.status === 401) {
      localStorage.clear()
      window.location = "/";

      // return getAuthToken().then(response => {
      //   // update the error config with new token
      //   error.config.__isRetryRequest = true;
      //   error.config.headers.token= localStorage.getItem("accessToken");
      //   return client(error.config);
      //  });
    }
    return Promise.reject(error);
  }
);
