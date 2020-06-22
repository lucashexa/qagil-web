import axios from 'axios';

export const apiLocal = axios.create({
  baseURL: `${process.env.REACT_APP_API_AUTH}`,
});

export const apiQuser = axios.create({
  baseURL: `https://cors-anywhere.herokuapp.com/${process.env.REACT_APP_QUSER_URL}`,
});

export const apiQevent = axios.create({
  baseURL: `https://cors-anywhere.herokuapp.com/${process.env.REACT_APP_QEVENT_URL}/v1/company`,
});

//
export const apiQimage = axios.create({
  baseURL: `https://cors-anywhere.herokuapp.com/${process.env.REACT_APP_QIMAGE_URL}`,
});
