import { apiQuser } from '../services/api';
import { useUserBackend } from '../hooks/userBackend';

const backendUserInformations = async (email: any) => {
  const config = {
    headers: {
      apikey: 'a6ad62eb-d6d7-4b05-85fa-d1da8c5d7c6e',
      'Content-Type': 'application/json',
    },
    params: {
      email,
    },
  };

  const userBack = await apiQuser.get('/v1/user/search', config);
  return userBack;
};

export default backendUserInformations;
