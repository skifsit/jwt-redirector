import jwtDecode from 'jwt-decode';

export interface JWTRedirectI {
  protocol: string;
  host: string;
  port?: string;
  path?: string;
}

export interface JWTPayloadI {
  peer_id: string;
  user_id: string;
  redirect: JWTRedirectI;
}

try {
  const urlParams = new URLSearchParams(window.location.search);
  const jwt = urlParams.get('jwt');
  if (!jwt) {
    throw new Error('Search does not have jwt key!');
  }
  const decoded: JWTPayloadI | null = jwtDecode(jwt);
  if (decoded && typeof decoded === 'object') {
    if (!decoded.redirect) {
      throw new Error('Decoded JWT object does not contain redirect!');
    }
    const { protocol, host, port, path } = decoded.redirect;
    const url = `${protocol ? protocol : ''}${host}${path ? path : ''}${port ? `:${port}` : ''}${
      path ? path : ''
    }?jwt=${jwt}`;
    console.log(url);
    // window.location.replace(url);
  } else {
    throw new Error('Decoded JWT is not an object!');
  }
} catch (e) {
  alert(e.message || e);
}
