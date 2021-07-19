import axios from 'axios';

interface ServerData {
  body: string
  query: number
  header: string
}

const call = method => async (url, { body, query, headers }: any = {}) => {
  const response = await axios({
    method,
    baseURL: `http://192.168.43.138:3003${url}`,
    data: body,
    headers,
    params: query
  });
  return response.data;
};

export default {
  get: call('GET'),
  post: call('POST'),
  put: call('PUT'),
  delete: call('DELETE')
};