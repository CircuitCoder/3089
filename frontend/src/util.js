import { BACKEND } from './config';

async function parseResp(resp) {
  const [, type] = resp.headers.get('Content-Type').match(/^([a-zA-Z0-9/]+)(; charset=.*)?$/);

  if(type === 'text/plain')
    return await resp.text();
  else if(type === 'application/json')
    return await resp.json();
  else
    return await resp.arrayBuffer();
}

function buildHeaders({ token }) {
  const headers = new Headers();

  if(token)
    headers.set('Authorization', `Bearer ${token}`);

  return headers;
}

export async function get(endpoint, token = null) {
  const headers = buildHeaders({ token });
  const resp = await fetch(BACKEND + endpoint, { headers });
  return await parseResp(resp);
}
