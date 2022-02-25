import axios from 'axios'
import Cookies from 'js-cookie'


// axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
// axios.defaults.baseURL = 'https://jwt-axios-test.herokuapp.com/api';


axios.defaults.headers.common['Authorization'] = 'Bearer ' + Cookies.get('_myapp_token')
