import { useEffect, useState } from "react";
import { api, language } from "../services/api";

const useMovieDetails = (endpoint, parameters = {}) => {
	const [movie, setMovie] = useState([]);

	const api_params = { language, ...parameters };

	useEffect(() => {
		api(endpoint, {
			params: api_params,
		}).then(res => {
			setMovie(res.data);
		});
	}, []);

	return { movie };
};

export default useMovieDetails;
