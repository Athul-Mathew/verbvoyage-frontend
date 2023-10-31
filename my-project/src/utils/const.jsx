
import axios from 'axios';

import { BaseUrl } from './Config';

const createAxiosClient = (BaseUrl) => {
    console.log('reached here also :', BaseUrl);
    const client = axios.create({
        BaseUrl,
        timeout: 8000,
        timeoutErrorMessage: "Request timeout Please Try Again!!!"
    })
    console.log('Axios client created :', client);
    return client;
}

const userAxiosInstance = createAxiosClient(BaseUrl)
userAxiosInstance.interceptors.request.use(async (req) => {
    const modifiedReq = attachToken(req, "userJwt")
    return modifiedReq;
})
const attachToken = (req, tokenName) => {
    let authToken = localStorage.getItem(tokenName.access)
    
    if (authToken) {
        req.headers.Authorization = `Bearer ${authToken}`
    }
    return req
}



export { userAxiosInstance,createAxiosClient,attachToken}