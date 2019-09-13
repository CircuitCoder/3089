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
