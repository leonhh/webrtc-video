import React from 'react';
import { useSocket } from '../providers/SocketProvider';
import { useAppState } from '../providers/StateProvider';
import { setName, setNameIsSaved } from '../providers/state/actions';

const UsernameInput: React.FunctionComponent<{}> = () => {
    const socket = useSocket();
    const [state, dispatch] = useAppState();

    const join = () => {
        socket.emit('login', {
            name: state.name,
            sessionId: state.sessionId,
        });

        dispatch(setNameIsSaved(true));
    };

    return (
        <div className="flex">
            {state.nameIsSaved ? (
                <>
                    <strong>Logged in as: </strong>
                    <span>
                        {` `}
                        {state.name}
                    </span>
                </>
            ) : (
                <>
                    <input
                        className="border p-2 rounded mr-2 block w-full"
                        type="text"
                        placeholder="Naam"
                        value={state.name}
                        onChange={(e) => dispatch(setName(e.target.value))}
                    />

                    <button className="bg-blue-400 rounded text-white px-4 py-2" type="button" onClick={() => join()}>
                        Join
                    </button>
                </>
            )}
        </div>
    );
};

export default UsernameInput;
