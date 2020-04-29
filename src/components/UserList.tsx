import React, { useState, useEffect } from 'react';
import { useSocket } from '../providers/SocketProvider';
import { ReactComponent as Empty } from './../assets/empty.svg';
import { ReactComponent as Call } from './../assets/call.svg';


interface User {
    socketId: string;
    userId: string;
}

const UserList: React.FunctionComponent<{ }> = () => {
    const socket = useSocket();

    const [users, setUsers] = useState<Array<User>>([
        { userId: 'test', socketId: 'test' },
        { userId: 'test henk', socketId: 'test' },
        { userId: 'jan de vries', socketId: 'test' },
        { userId: 'leon horlings', socketId: 'test' },
        { userId: 'test', socketId: 'test' }
    ]);

    useEffect(() => {
        // fetch('http://localhost:5000/users').then(async (res) => {
        //     const data = await res.json();

        //     setUsers(data);
        // });
        
        // socket.on('user_connected', (user: User) => {
        //     setUsers([ ...users, user ]);
        // });
    }, []);

    return (
        <div >
            {users.length > 0 ? users.map((user, i) => (
                <div className={(i !== users.length - 1 ? 'border-b border-gray-300' : '') + " py-2 px-2 flex justify-between"} key={i}>
                    {user.userId}

                    <Call className="w-5 h-5 cursor-pointer" onClick={() => alert('bellen')} />
                </div>
            )) : (
                <div className="text-center">
                    <span className="font-bold text-xl">
                        Geen mensen
                    </span>

                    <Empty className="w-full h-auto p-10" />
                </div>
            )}
        </div>
    );
};

export default UserList;