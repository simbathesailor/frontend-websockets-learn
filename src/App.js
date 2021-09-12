import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import ProductListing from './modules/ProductsListing';
import logo from './logo.svg';
import { getCookie, setCookie } from './common/cookie';
import { useToken } from './api';
import './App.css';

function App() {
	const { getToken, state } = useToken();
	console.log('🚀 ~ file: App.js ~ line 10 ~ App ~ state', state);
	useEffect(() => {
		const authCookie = getCookie('_auth');
		console.log('🚀 ~ file: App.js ~ line 16 ~ useEffect ~ authCookie', authCookie);

		if (!authCookie) {
			getToken();
		}
		// if(!authCookie) {
		//   setCookie("__auth")
		// }
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
		//getCookie()
	}, []);

	const authToken = getCookie('_auth');

	if (!authToken) {
		return null;
	}
	return (
		<div className="App">
			<ProductListing />
			<Toaster />
		</div>
	);
}

export default App;
