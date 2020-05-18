import React, { useEffect } from 'react';
import UsernameInput from './components/UsernameInput';
import UserList from './components/UserList';
import Card from './components/Card';
import Page from './components/Page';
import { useAppState } from './providers/StateProvider';
import CallScreen from './components/CallScreen';
import { useSocket } from './providers/SocketProvider';
import { call } from './providers/state/actions';
import { User } from './interfaces/user';

const App: React.FunctionComponent<{}> = () => {
    const socket = useSocket();
    const [state, dispatch] = useAppState();

    useEffect(() => {
        socket.on('start_call', (res: { caller: User; recipient: User }) => {
            dispatch(call(res.caller, res.recipient));
        });
    }, []);

    return (
        <Page>
            {state.activeCall && <CallScreen />}

            <Card>
                <UsernameInput />
            </Card>

            <Card>
                <UserList />
            </Card>
        </Page>
    );
};

export default App;
