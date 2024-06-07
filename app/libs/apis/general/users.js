/* eslint-disable camelcase */
import instance from './instance';

const users = {
  GetUsers: (token) => {
    return instance.get('users/', {
      headers: { Authorization: `Bearer ${token}` }
    })
  },
  GetUser: (token, id) => {
    return instance.get(`users/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }
};

export default users
