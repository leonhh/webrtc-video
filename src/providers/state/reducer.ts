import { IAppState, Action } from './interface';

export const reducer = (state: IAppState, action: Action) => {
    switch (action.type) {
        case 'SET_NAME':
            return {
                ...state,
                name: action.name,
            };
        default:
            throw new Error();
    }
};

export default reducer;
