import React, { useState } from 'react';
import { useSocket } from '../providers/SocketProvider';

const UsernameInput: React.FunctionComponent<{ }> = () => {
    const socket = useSocket(); 

    const [name, setName] = useState('');

    const join = () => {
        socket.emit('login', {
            userId: name
        });
    };

    return (
        <div className="flex">
            <input className="border p-2 rounded mr-2 block w-full" type="text" placeholder="Naam" value={name} onChange={e => setName(e.target.value)} />

            <button className="bg-blue-400 rounded text-white px-4 py-2" type="button" onClick={() => join()}>
                Join
            </button>
        </div>
    );
};

export default UsernameInput;