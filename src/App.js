import { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

useEffect(() => {
  
  const socket = new WebSocket('ws://localhost:8002');

    // Connection opened
    socket.addEventListener('open', function (event) {
        socket.send('Hello Server!');
    });

    // Listen for messages
    socket.addEventListener('message', function (event) {
        console.log("🚀 ~ file: index.html ~ line 22 ~ event", event)
        console.log('Message from server ', event.data);
    });
    
  return () => {
   
  }
}, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
