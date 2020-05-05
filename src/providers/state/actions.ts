import { Action } from './interface';
import { User } from '../../interfaces/user';

export const setName = (name: string): Action => ({
    type: 'SET_NAME',
    payload: {
        name,
    },
});

export const call = (caller: User, recipient: User): Action => ({
    type: 'CALL',
    payload: {
        caller,
        recipient,
    },
});
