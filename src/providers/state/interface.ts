import { User } from '../../interfaces/user';

export interface IAppState {
    sessionId: string;
    activeCall:
        | {
              caller: User;
              recipient: User;
          }
        | undefined;
    name: string;
    nameIsSaved: boolean;
}

interface SetNameAction {
    type: 'SET_NAME';
    payload: {
        name: string;
    };
}

interface SetNameIsSavedAction {
    type: 'SET_NAME_IS_SAVED';
    payload: {
        isSaved: boolean;
    };
}

interface CallAction {
    type: 'CALL';
    payload: {
        caller: User;
        recipient: User;
    };
}

interface HangupAction {
    type: 'HANGUP';
}

export type Action = SetNameAction | SetNameIsSavedAction | CallAction | HangupAction;
