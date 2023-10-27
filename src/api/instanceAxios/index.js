import axios from 'axios';

// eslint-disable-next-line no-undef
 const {REACT_APP_HOST, REACT_APP_PORT, REACT_APP_MAIN_API_ROUTE} = process.env;


 const API_URL = `http://${REACT_APP_HOST}:${REACT_APP_PORT}/${REACT_APP_MAIN_API_ROUTE}`;

// eslint-disable-next-line no-undef

const $api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
  });


  $api.interceptors.request.use((config) => {
    const sessionClientToken = JSON.parse(window.sessionStorage.getItem('JWT')) ;
    const localclientToken = JSON.parse(window.localStorage.getItem('JWT'));

    const clientToken = sessionClientToken ? sessionClientToken : localclientToken;
    if (clientToken) {
      config.headers.Authorization = `Bearer ${clientToken}`;
    }
    return config;
  });  

  $api.interceptors.response.use(
    (config) => config,
    (error) => {
      if (error.response.data) {
         return Promise.reject(error.response.data)
    }
      return Promise.reject(error);
    }
);


export async function getApiStatus() {
    const response = await $api.get('/');
    return response.data;
}

export async function login(email, password) {
  
    const response = await $api.post('/login', {
        email,
        password,
    });

    
    return response;
}
export async function getUser(id) {
    const response = await $api.get(`/user/${id}`);

    return response;
}


export async function signin(email, password, firstName, lastName) {
    const response = await $api.post('/registration', {
        email,
        password,
        firstName, 
        lastName
    });
    return response;
}

export async function update(userId, dataToUpdate) {
    const response = await $api.post(`/user/${userId}`, dataToUpdate);
    return response;
}
  
export async function getPassengers(data) {
    const response = await $api.post('/passengers', data);
    return response;
}