import React, { useState, createContext, useLayoutEffect, useEffect, useContext } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext(null);

const SocketProvider = (props: any) => {
    return <SocketContext.Provider value={io.connect('http://localhost:5000')} {...props} />;
};

function useSocket(): SocketIOClient.Socket {
    const context = useContext(SocketContext);

    if (context === undefined || context === null) {
        throw new Error(`useSocket must be used within a SocketProvider`);
    }

    return context;
}

export { SocketProvider, useSocket };
