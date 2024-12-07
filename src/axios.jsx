import axios from 'axios'

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use(res => {
    res.headers['x-rapidapi-key'] = '89ca432844msh0b8095c811b7436p13abccjsnd068462c6ad7';
    res.headers['x-rapidapi-host'] = 'covid-193.p.rapidapi.com';
    return res;
  })

export default axiosInstance
