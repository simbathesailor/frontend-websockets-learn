import React from 'react';

function usePrevious(value) {
	const ref = React.useRef(value);
	React.useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}
export default usePrevious;
