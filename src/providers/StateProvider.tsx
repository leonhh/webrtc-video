import React, { createContext, useContext, useReducer, Dispatch, ReducerAction } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IAppState } from './state/interface';
import reducer from './state/reducer';

const StateContext = createContext(null);

const AppStateProvider = (props: any) => {
    const initialState: IAppState = {
        socket: '',
        sessionId: uuidv4(),
        activeCall: undefined,
        name: '',
        nameIsSaved: false,
    };

    return <StateContext.Provider value={useReducer(reducer, initialState)} {...props} />;
};

function useAppState(): [IAppState, Dispatch<ReducerAction<any>>] {
    const context = useContext(StateContext);

    if (context === undefined || context === null) {
        throw new Error(`useSocket must be used within a SocketProvider`);
    }

    return context;
}

export { AppStateProvider, useAppState };
