import axios from 'axios';
import https from 'https';

import { store } from "react-notifications-component";

import config from '../../config';
// content type
axios.defaults.headers.post['Content-Type'] = 'application/json';
//axios.defaults.baseURL = config.API_URL;

// intercepting to capture errors
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {

        // Any status codes that falls outside the range of 2xx cause this function to trigger
        let message;

        if (error && error.response && error.response.status === 404) {
            // window.location.href = '/not-found';
        } else if (error && error.response && error.response.status === 403) {
            store.addNotification({
              title: "Error: " + error.response.status,
              message: error.response.data.message ? error.response.data.message : "Authorization required",
              type: "danger",
              insert: "top",
              container: "top-right",
              animationIn: ["animated", "fadeIn"],
              animationOut: ["animated", "fadeOut"],
              dismiss: { duration: 5000 },
              dismissable: { click: true }
            });
            localStorage.removeItem(AUTH_SESSION_KEY);
            if(error.response.data.message == 'Forbidden'){
              window.location.href = '/account/login';
            }
            return Promise.reject(error.response.data.message);

        } else {
          if(error.response){
            switch (error.response.status) {
                case 401:
                    message = 'Invalid credentials';
                    break;
                case 403:
                    message = 'Access Forbidden';
                    break;
                case 404:
                    message = 'Sorry! the data you are looking for could not be found';
                    break;
                default: {
                    message =
                        error.response && error.response.data ? error.response.data['message'] : error.message || error;
                }
            }
            let errorMessage = error.response.data.error  ? (error.response.data.error.message ? error.response.data.error.message : " ") : "Bad Request"
            if(error.response.data.message){
              errorMessage = error.response.data.message
            }
            if(error.response.data.message != 'Method not found'){
              store.addNotification({
                title: "Error: " + error.response.status,
                message: errorMessage,
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: { duration: 5000 },
                dismissable: { click: true }
              });
            }
            if(error.response.data.message == 'Method not found'){
              store.addNotification({
                title: "Error: Method not found." ,
                message: "Please update mtc-jsonrpc module. Run in MyTonCtrl > installer > enable JR",
                type: "warning",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: { duration: 5000 },
                dismissable: { click: true }
              });
            }
            }
            return Promise.reject(message);
        }
    }
);

const AUTH_SESSION_KEY = 'hyper_user';

/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token) => {
    if (token) axios.defaults.headers.common['Authorization'] = token;
    else delete axios.defaults.headers.common['Authorization'];
};

const getUserFromSession = () => {
    const user = localStorage.getItem(AUTH_SESSION_KEY);
    return user ? (typeof user == 'object' ? user : JSON.parse(user)) : null;
};

class APICore {
    /**
     * Fetches data from given url
     */
    get = (url, params) => {
        let headers = {}
        let response;
        if (params) {
            var queryString = params
                ? Object.keys(params)
                      .map((key) => key + '=' + params[key])
                      .join('&')
                : '';
            let domain = (new URL(url));

            response = axios.get(`${url}?${queryString}`, {headers, params});
        } else {
            response = axios.get(`${url}`, {transformRequest: (data, headers) => {
                  delete headers.common['Authorization'];
                  return data;
              }}, headers);
        }
        return response;
    };

    getFile = (url, params) => {
        let response;
        if (params) {
            var queryString = params
                ? Object.keys(params)
                      .map((key) => key + '=' + params[key])
                      .join('&')
                : '';
            response = axios.get(`${url}?${queryString}`, { responseType: 'blob' });
        } else {

            response = axios.get(`${url}`, { responseType: 'blob' });
        }
        return response;
    };

    getMultiple = (urls, params) => {
        const reqs = [];
        let queryString = '';
        if (params) {
            queryString = params
                ? Object.keys(params)
                      .map((key) => key + '=' + params[key])
                      .join('&')
                : '';
        }

        for (const url of urls) {
            reqs.push(axios.get(`${url}?${queryString}`));
        }
        return axios.all(reqs);
    };

    /**
     * post given data to url
     */
    create = (url, data) => {
        return axios.post(url, data);
    };

    /**
     * post jsonrpc given data to url
     */
    sendJRPC = (url, data, params = []) => {
      const httpsAgent = new https.Agent({ rejectUnauthorized: false });
        return axios.post(
            config.SERVER_URL+'/api/v1/admin/proxy',
            JSON.stringify({jsonrpc: "2.0", id: 0, method: data, params: params}, { httpsAgent }),
      /*    {transformRequest: (data, headers) => {
            delete headers.common['Authorization'];
            return data;
          }}*/
        )
    };
    sendAuth = (url, data, params = []) => {
      const httpsAgent = new https.Agent({ rejectUnauthorized: false });
        return axios.post(
          config.SERVER_URL+'/api/v1/admin/'+data,
          JSON.stringify({jsonrpc: "2.0", id: 0, method: data, params: params}, { httpsAgent }),
      /*    {transformRequest: (data, headers) => {
            delete headers.common['Authorization'];
            return data;
          }}*/
        )
    };


    /**
     * Updates patch data
     */
    updatePatch = (url, data) => {
        return axios.patch(url, data);
    };

    /**
     * Updates data
     */
    update = (url, data) => {
        return axios.put(url, data);
    };

    /**
     * Deletes data
     */
    delete = (url) => {
        return axios.delete(url);
    };

    /**
     * post given data to url with file
     */
    createWithFile = (url, data) => {
        const formData = new FormData();
        for (const k in data) {
            formData.append(k, data[k]);
        }

        const config = {
            headers: {
                ...axios.defaults.headers,
                'content-type': 'multipart/form-data',
            },
        };
        return axios.post(url, formData, config);
    };

    /**
     * post given data to url with file
     */
    updateWithFile = (url, data) => {
        const formData = new FormData();
        for (const k in data) {
            formData.append(k, data[k]);
        }

        const config = {
            headers: {
                ...axios.defaults.headers,
                'content-type': 'multipart/form-data',
            },
        };
        return axios.patch(url, formData, config);
    };

    isUserAuthenticated = () => {
        const user = this.getLoggedInUser();
        if (!user || (user && !user.token)) {
            return false;
        }

    /*    const decoded = jwtDecode(user.token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            console.warn('access token expired');
            return false;
        } else {
            return true;
        }*/
        return true;
    };



    setLoggedInUser = (session) => {

        if (session) {
          localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
          localStorage.setItem('URL', config.SERVER_URL);
          axios.defaults.baseURL = config.SERVER_URL;
        }
        else {
            localStorage.removeItem(AUTH_SESSION_KEY);
        }
    };

    /**
     * Returns the logged in user
     */
    getLoggedInUser = () => {
        return getUserFromSession();
    };

    setUserInSession = (modifiedUser) => {
        let userInfo = localStorage.getItem(AUTH_SESSION_KEY);
        if (userInfo) {
            const { username, token } = JSON.parse(userInfo);
            this.setLoggedInUser({ token, ...username, ...modifiedUser });
        }
    };
    removeSession = () => {
        localStorage.removeItem(AUTH_SESSION_KEY);
    };
}

/*
Check if token available in session
*/
let user = getUserFromSession();
if (user) {
    const { token, api } = user;
    if (token) {
        axios.defaults.baseURL = config.SERVER_URL;
        setAuthorization(token);
    }
}



export { APICore, setAuthorization };
