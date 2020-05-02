export interface IAppState {
    sessionId: string;
    name: string;
}

export type Action = { type: 'SET_NAME'; name: string };
