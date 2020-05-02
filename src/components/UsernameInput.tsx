import React, { useState } from 'react';
import { useSocket } from '../providers/SocketProvider';
import { useAppState } from '../providers/StateProvider';

const UsernameInput: React.FunctionComponent<{}> = () => {
    const socket = useSocket();
    const [state, dispatch] = useAppState();

    const join = () => {
        // socket.emit('login', {
        //     userId: name
        // });
    };

    return (
        <div className="flex">
            <input
                className="border p-2 rounded mr-2 block w-full"
                type="text"
                placeholder="Naam"
                value={state.name}
                onChange={e => dispatch({ type: 'SET_NAME', name: e.target.value })}
            />

            <button className="bg-blue-400 rounded text-white px-4 py-2" type="button" onClick={() => join()}>
                Join
            </button>
        </div>
    );
};

export default UsernameInput;
