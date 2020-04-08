import axios from 'axios';
import config from '@/config';
import qs from 'qs';

const axiosInstance = axios.create();

const request = async ({action, options}) => {
  return await axiosInstance.post(
    (config.production ? '' : config.hostname) + '/api.php?action=' + action,
    qs.stringify(options)
  );
};

export default request;