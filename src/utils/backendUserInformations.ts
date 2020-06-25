import { apiQuser } from '../services/api';

const backendUserInformations = async (email: any) => {
  const config = {
    headers: {
      apikey: process.env.REACT_APP_API_KEY,
      'Content-Type': 'application/json',
    },
    params: {
      email,
    },
  };

  const userBack = await apiQuser.get('/v1/user/search', config);
  console.log(userBack);
  return userBack;
};

export default backendUserInformations;
