import { useEffect } from 'react';
import ProductListing from "./modules/ProductsListing"
import logo from './logo.svg';
import './App.css';

function App() {

useEffect(() => {
  
  // const socket = new WebSocket('ws://localhost:8002/live-updates');

  //   // Connection opened
  //   socket.addEventListener('open', function (event) {
  //       socket.send('Hello Server!');
  //   });

  //   // Listen for messages
  //   socket.addEventListener('message', function (event) {
  //       console.log("🚀 ~ file: index.html ~ line 22 ~ event", event)
  //       console.log('Message from server ', event.data);
  //   });

  // return () => {
   
  // }
}, [])

  return (
    <div className="App">
      <ProductListing />
    </div>
  );
}

export default App;
