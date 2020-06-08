import axios from 'axios';

export const apiLocal = axios.create({
  baseURL: 'http://localhost:3333',
});

export const apiQuser = axios.create({
  baseURL: 'http://18.230.153.28:8000/quser',
});
