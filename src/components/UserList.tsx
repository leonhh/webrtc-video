import React, { useState, useEffect } from 'react';
import { useSocket } from '../providers/SocketProvider';
import { ReactComponent as Empty } from './../assets/empty.svg';
import { ReactComponent as Call } from './../assets/call.svg';
import { useAppState } from '../providers/StateProvider';
import { call } from '../providers/state/actions';
import { User } from '../interfaces/user';

const UserList: React.FunctionComponent<{}> = () => {
    const socket = useSocket();
    const [state, dispatch] = useAppState();
    const [users, setUsers] = useState<Array<User>>([]);

    useEffect(() => {
        fetch('http://localhost:5000/users').then(async res => {
            setUsers(await res.json());
        });

        socket.on('users-list-update', (data: Array<User>) => setUsers(data));
    }, []);

    return (
        <div>
            {users.length > 0 ? (
                users.map((user, i) => (
                    <div
                        className={
                            (i !== users.length - 1 ? 'border-b border-gray-300' : '') +
                            ' py-2 px-2 flex justify-between'
                        }
                        key={i}
                    >
                        {user.name}

                        <Call className="w-5 h-5 cursor-pointer" onClick={() => dispatch(call(user, user))} />
                    </div>
                ))
            ) : (
                <div className="text-center">
                    <span className="font-bold text-xl">Oh no, no one&apos;s here</span>

                    <Empty className="w-full h-auto p-10" />
                </div>
            )}
        </div>
    );
};

export default UserList;
