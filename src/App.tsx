import React, { useEffect } from 'react';
import UsernameInput from './components/UsernameInput';
import UserList from './components/UserList';
import { useSocket } from './providers/SocketProvider';
import Card from './components/Card';

const App: React.FunctionComponent<{}> = () => {
  const socket = useSocket();


  return (
    <div className="bg-overlay h-100 bg-gray-100" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1498715880242-b861f6298237?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)', backgroundSize: 'cover', backgroundPosition: 'center center' }}>
      <Card>
        <UsernameInput />
      </Card>

      <Card>
        <UserList />
      </Card>
    </div>
  );
}

export default App;
