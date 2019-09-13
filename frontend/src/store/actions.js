import { get } from '../util';

export const login = payload => ({
  type: 'LOGIN',
  payload,
});

export const logout = () => ({
  type: 'LOGOUT',
});

export const fakeLogin = () => ({
  type: 'LOGIN',
  payload: {
    name: '喵喵',
    isAdmin: true,
  },
});

export const update = data => ({
  type: 'UPDATE',
  data,
});

export const refresh = () =>
  async (dispatch, getState) => {
    dispatch(update(null));
    const { user } = getState();
    let token = null;
    if(user) token = user.token;

    const resp = await get('/reservation', token);

    dispatch(update(resp));
  };
