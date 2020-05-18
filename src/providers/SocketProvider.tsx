import React, { createContext, useContext } from 'react';
import io from 'socket.io-client';
import { useAppState } from './StateProvider';
import { setSocket } from './state/actions';

const SocketContext = createContext(null);

const socket = io.connect('http://localhost:5000');

const SocketProvider = (props: any) => {
    const [, dispatch] = useAppState();

    socket.on('connect', () => {
        dispatch(setSocket(socket.id));
    });

    return <SocketContext.Provider value={socket} {...props} />;
};

function useSocket(): SocketIOClient.Socket {
    const context = useContext(SocketContext);

    if (context === undefined || context === null) {
        throw new Error(`useSocket must be used within a SocketProvider`);
    }

    return context;
}

export { SocketProvider, useSocket };
