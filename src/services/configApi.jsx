import axios from 'axios';
import * as CONSTANTS from 'constants/index';

let isRefreshing = false;
let failedQueue = [];

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
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedQueue.push({resolve, reject})
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return APIInstance(originalRequest);
        }).catch(err => {
          return null
        })
      }

      originalRequest._retry = true;
      setIsRefreshing(true)
      // isRefreshing = true;

      return new Promise(function (resolve, reject) {
        getNewToken()
          .then(token => {
            setToken(token)
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            processQueue(null, token);
            return resolve(APIInstance(originalRequest));
          })
          .catch((err) => {
            localStorage.clear();
            window.location = "/";
            return reject(err);
          })
          .finally(() => { setIsRefreshing(false) })
      })
      
    }
    return Promise.reject(error);
    
  }
);

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  })
  
  failedQueue = [];
}

const getNewToken = async () => {
  let customerData = localStorage.getItem('customer') || "null";
  try{
    customerData = JSON.parse(customerData);
  }catch(e){ customerData = null}

  if(!customerData || (!!customerData && !customerData.refreshToken)){
    return Promise.reject({error: 'refreshToken invalid'})
  }

  const tokenData = await APIInstance.post('/api/TokenAuth/RefreshToken', { refreshToken: customerData.refreshToken }).catch(() => null);

  if(!tokenData){
    return Promise.reject({error: 'refreshToken invalid'})
  }
  const token = tokenData.result.token;
  customerData.token = token;
  localStorage.setItem('accessToken', token);
  localStorage.setItem('customer', JSON.stringify(customerData))
  setToken(token);
  return token;

}

export const startWatchStorage = () => {
  window.addEventListener("storage", (event) => {
    if (event.storageArea == localStorage) {
      let v;
      try { v = JSON.parse(event.newValue); }
      catch (e) { v = event.newValue; }
      // console.log(event);
      if(event.key === CONSTANTS.isRefreshing){
        isRefreshing = v;
        if(!v && !!failedQueue?.length){
          let token = localStorage.getItem('accessToken')
          processQueue(null, token);
        }
      }
    }
  });
}

const setIsRefreshing = (status) => {
  isRefreshing = status;
  localStorage.setItem(CONSTANTS.isRefreshing, status.toString());
}
