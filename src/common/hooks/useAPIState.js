import React from 'react';

function useAPIState(initialState = {}) {
	const [state, setState] = React.useState({
		data: {},
		isFetching: false,
		isFetched: false,
		isFailure: false,
		...initialState,
	});
	function setLoading(data) {
		setState({
			...state,
			data: data ? { ...state.data, ...data } : state.data,
			isFetching: true,
			isFetched: false,
			isFailure: false,
		});
	}
	function setFailure(data) {
		setState({
			...state,
			data: data ? { ...state.data, ...data } : state.data,
			isFetching: false,
			isFetched: true,
			isFailure: true,
		});
	}
	function setSuccess(data) {
		setState({
			...state,
			data: data ? { ...state.data, ...data } : state.data,
			isFetching: false,
			isFetched: true,
			isFailure: false,
		});
	}
	function updateData(data) {
		setState({
			...state,
			data: data ? { ...state.data, ...data } : state.data,
		});
	}

	function resetData() {
		setState({
			data: {},
			isFetching: false,
			isFetched: false,
			isFailure: false,
			...initialState,
		});
	}
	return {
		setLoading,
		setFailure,
		setSuccess,
		updateData,
		resetData,
		state,
	};
}

export default useAPIState;
