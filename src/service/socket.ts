import { io } from 'socket.io-client';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const URL = process.env.REACT_APP_BACKEND_URL!;

export const socket = io(URL);
