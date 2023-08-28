import socketClient from "socket.io-client";
import {useAuth} from './AuthProvider';
import {createContext, useContext} from 'react';

const SERVER = "localhost:3369";
const SockContext = createContext({});

const useSock = () => useContext(SockContext);

const  SockProvider = (props: any) => {
    let { children } = props;
    const {token} = useAuth();
    if (!token) {
        //TODO if no token then refuse con
    }
    const socket = socketClient(SERVER, {auth: {token: token}, autoConnect: false});
    
    /* function setSockHandler(event, fn) {
        socket.on(event, fn);
    }

    function removeSockHandler(event, fn) {
        (fn) ? socket.off(event, fn) : socket.off(event);
    }

    function connectSock() {
        socket.connect();
    }

    function disconnectSock() {
        socket.disconnect();
    }
    
    let provide = {
        socket,
        setSockHandler,
        removeSockHandler,
        connectSock,
        disconnectSock
    } */

    return (
        <SockContext.Provider value={socket}>
            {children}
        </SockContext.Provider>
    )
}

export { SockProvider, useSock };