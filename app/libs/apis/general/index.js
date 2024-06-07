import instance from './instance';

const general = {
  Login: async ({ email, password }) => {
    await instance.post(`login`, { email, password })
  }
}

export default general
