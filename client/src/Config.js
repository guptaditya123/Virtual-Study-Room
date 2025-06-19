export const SOCKET_URL = process.env.NODE_ENV === 'production'
  ? window.location.origin // Uses current domain in production
  : 'http://localhost:4000'; // Local development