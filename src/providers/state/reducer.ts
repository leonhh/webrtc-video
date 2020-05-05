import { IAppState, Action } from './interface';

export const reducer = (state: IAppState, action: Action): IAppState => {
    switch (action.type) {
        case 'SET_NAME':
            return {
                ...state,
                name: action.payload.name,
            };

        case 'CALL':
            return {
                ...state,
                activeCall: {
                    caller: action.payload.caller,
                    recipient: action.payload.recipient,
                },
            };
        default:
            throw new Error(`Action type not found`);
    }
};

export default reducer;
