import { useEffect, useState } from "react";
import { api, language } from "../services/api";

const useMovies = (endpoint, parameters = {}) => {
	const [movies, setMovies] = useState([]);
	const api_params = { language, ...parameters };

	useEffect(() => {
		api(endpoint, {
			params: api_params,
		}).then(res => {
			setMovies(res.data.results);
		});
	}, []);

	return { movies };
};

export default useMovies;
