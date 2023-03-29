import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {socket} from "./socket";

export interface SocketState {
    connected: boolean;
}

const initialState: SocketState = {
    connected: socket.connected,
}

export const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        setSocketConnection: (state, action: PayloadAction<boolean>) => {
            state.connected = action.payload
        },
    },
});

// Action creators are generated for each case reducer function
export const { setSocketConnection } = socketSlice.actions
