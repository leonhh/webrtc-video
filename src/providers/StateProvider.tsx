import React, { useState, createContext, useLayoutEffect, useEffect, useContext, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IAppState } from './state/interface';
import reducer from './state/reducer';

const StateContext = createContext(null);

const AppStateProvider = (props: any) => {
    const initialState: IAppState = {
        sessionId: uuidv4(),
        name: '',
    };

    return <StateContext.Provider value={useReducer(reducer, initialState)} {...props} />;
};

function useAppState(): SocketIOClient.Socket {
    const context = useContext(StateContext);

    if (context === undefined || context === null) {
        throw new Error(`useSocket must be used within a SocketProvider`);
    }

    return context;
}

export { AppStateProvider, useAppState };
