import axios from 'axios';
import { baseApi } from '../common/constants/api_base';


export const instance = axios.create({ baseURL: baseApi });
