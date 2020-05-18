import React from 'react';
import ReactDOM from 'react-dom';
import './assets/main.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { SocketProvider } from './providers/SocketProvider';
import { AppStateProvider } from './providers/StateProvider';

ReactDOM.render(
    <React.StrictMode>
        <AppStateProvider>
            <SocketProvider>
                <App />
            </SocketProvider>
        </AppStateProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
