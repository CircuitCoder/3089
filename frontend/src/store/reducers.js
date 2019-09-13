export function user(state = null, action) {
  if(action.type === 'LOGIN')
    return action.payload;
  if(action.type === 'LOGOUT')
    return null;

  return state;
}

export function data(state = null, action) {
  if(action.type === 'UPDATE')
    return action.data;
  return state;
}
