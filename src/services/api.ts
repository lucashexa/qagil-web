import axios from 'axios';

export const apiLocal = axios.create({
  baseURL: 'http://localhost:3333',
});

export const apiQuser = axios.create({
  baseURL:
    'https://cors-anywhere.herokuapp.com/http://18.230.153.28:8000/quser',
});

export const apiQevent = axios.create({
  baseURL:
    'https://cors-anywhere.herokuapp.com/http://18.230.153.28:8000/qevent',
});
