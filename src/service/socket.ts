import {io} from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.REACT_APP_BACKEND_URL!;

export const socket = io(URL);
