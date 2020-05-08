import React, { useEffect } from 'react';
import UsernameInput from './components/UsernameInput';
import UserList from './components/UserList';
import Card from './components/Card';
import Page from './components/Page';
import { useAppState } from './providers/StateProvider';
import CallScreen from './components/CallScreen';
import { useSocket } from './providers/SocketProvider';

const App: React.FunctionComponent<{}> = () => {
    const socket = useSocket();
    const [state] = useAppState();

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
