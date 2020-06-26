import { apiQevent } from '../services/api';

const eventUserInformations = async (user_id: string) => {
  const config = {
    headers: {
      apikey: process.env.REACT_APP_API_KEY,
      user_id,
    },
  };

  const userEvents = await apiQevent.get('/event-by-user', config);
  console.log(userEvents);
  return userEvents;
};

export default eventUserInformations;
