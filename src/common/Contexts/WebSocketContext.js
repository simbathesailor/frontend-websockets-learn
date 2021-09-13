import React from 'react';

const WebSocketContext = React.createContext({});

const WebSocketContextProvider = WebSocketContext.Provider;
const WebSocketContextConsumer = WebSocketContext.Consumer;

export { WebSocketContextProvider, WebSocketContextConsumer, WebSocketContext };
