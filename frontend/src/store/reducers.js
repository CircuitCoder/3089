export function user(state = null, action) {
  if(action.type === 'LOGIN')
    return action.payload;
  if(action.type === 'LOGOUT')
    return null;

  return state;
}
