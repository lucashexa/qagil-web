import axios from 'axios';

export const apiLocal = axios.create({
  baseURL: 'http://localhost:3333',
});

export const apiQuser = axios.create({
  baseURL:
    'https://cors-anywhere.herokuapp.com/http://54.233.125.231:8080/quser',
});

export const apiQevent = axios.create({
  baseURL:
    'https://cors-anywhere.herokuapp.com/http://18.228.10.95:8080/qevent/v1/company',
});

export const apiQimage = axios.create({
  baseURL:
    'https://cors-anywhere.herokuapp.com/http://18.230.144.102:8080/qimage',
});
