import { useEffect, useState, useRef } from 'react';
import { Toaster } from 'react-hot-toast';
import ProductListing from './modules/ProductsListing';
import logo from './logo.svg';
import { getCookie, setCookie } from './common/cookie';
import { useToken } from './api';
import { WebSocketContextProvider } from './common/Contexts/WebSocketContext';
import './App.css';

function App() {
	const { getToken, state } = useToken();
	const [socket, setSocket] = useState(null);
	// const [pingTimeout, setPingTimeout] = useState(null)

	const pingTimeoutRef = useRef(null);

	const [updates, setUpdates] = useState({
		freshProductListTicker: 0,
	});

	// console.log('🚀 ~ file: App.js ~ line 10 ~ App ~ state', state);
	useEffect(() => {
		const authCookie = getCookie('_auth');
		// console.log('🚀 ~ file: App.js ~ line 16 ~ useEffect ~ authCookie', authCookie);

		if (!authCookie) {
			getToken();
		}
		// if(!authCookie) {
		//   setCookie("__auth")
		// }

		const socketNew = new WebSocket(process.env.REACT_APP_WS_CONNECTION);

		setSocket(socketNew);

		// Connection opened

		socketNew.addEventListener('open', function (event) {
			socketNew.send('Hello Server!');
		});

		// debugger;
		function heartbeat() {
			clearTimeout(pingTimeoutRef.current);

			// Use `WebSocket#terminate()`, which immediately destroys the connection,
			// instead of `WebSocket#close()`, which waits for the close timer.
			// Delay should be equal to the interval at which your server
			// sends out pings plus a conservative assumption of the latency.

			pingTimeoutRef.current = setTimeout(() => {
				socketNew.send('Hello Server! PING');
			}, 30000 + 1000);
		}

		socketNew.onopen = heartbeat;
		socketNew.onping = heartbeat;

		socketNew.onclose = function clear() {
			clearTimeout(pingTimeoutRef.current);
		};

		// Listen for messages
		socketNew.addEventListener('message', function (event) {
			console.log('Message from server ', event.data);

			try {
				const parseEventData = JSON.parse(event.data);

				const type = parseEventData?.type;

				switch (type) {
					case 'UPDATE_PRODUCT_LISTING':
						{
							setUpdates(c => {
								return {
									...c,
									freshProductListTicker: c.freshProductListTicker + 1,
								};
							});
						}
						break;
					default:
						return;
				}
			} catch (e) {}

			// {"type":"UPDATE_PRODUCT_LISTING"}
		});

		return () => {};
		//getCookie()
	}, []);

	const authToken = getCookie('_auth');

	if (!authToken) {
		return null;
	}
	return (
		<WebSocketContextProvider
			value={{
				setSocket,
				socket,
				updates,
			}}
		>
			<div className="App">
				<ProductListing />
				<Toaster />
			</div>
		</WebSocketContextProvider>
	);
}

export default App;
