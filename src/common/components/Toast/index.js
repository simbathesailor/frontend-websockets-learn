import toast, { Toaster } from 'react-hot-toast';

export function notify({ message, options = {} }) {
	if (options.type && toast[options.type]) {
		toast[options.type](message);
	}
	toast(message, options);
}
