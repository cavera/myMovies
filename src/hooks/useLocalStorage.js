import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const useLocalStorage = key => {
	const [state, setState] = useState(JSON.parse(localStorage.getItem(key)) || []);

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(state));
	}, [state]);

	const addStateItem = item => {
		setState([...state, { ...item, uuid: uuidv4() }]);
	};
	const removeStateItem = id => {
		const filtered = state.filter(stateItem => stateItem.id !== id);
		setState(filtered);
	};

	return [state, addStateItem, removeStateItem];
};

export default useLocalStorage;
