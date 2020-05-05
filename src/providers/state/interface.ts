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
}

interface SetNameAction {
    type: 'SET_NAME';
    payload: {
        name: string;
    };
}

interface CallAction {
    type: 'CALL';
    payload: {
        caller: User;
        recipient: User;
    };
}

export type Action = SetNameAction | CallAction;
