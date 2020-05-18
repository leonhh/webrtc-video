import { IAppState, Action } from './interface';

export const reducer = (state: IAppState, action: Action): IAppState => {
    switch (action.type) {
        case 'SET_NAME':
            return {
                ...state,
                name: action.payload.name,
            };

        case 'SET_SOCKET':
            return {
                ...state,
                socket: action.payload.socket,
            };

        case 'CALL':
            return {
                ...state,
                activeCall: {
                    caller: action.payload.caller,
                    recipient: action.payload.recipient,
                },
            };

        case 'HANGUP':
            return {
                ...state,
                activeCall: undefined,
            };

        case 'SET_NAME_IS_SAVED':
            return {
                ...state,
                nameIsSaved: action.payload.isSaved,
            };

        default:
            throw new Error(`Action type not found`);
    }
};

export default reducer;
