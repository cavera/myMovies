import { useEffect, useState } from "react";
import { api, language, endpoints } from "../services/api";

const useCategories = () => {
	const [genres, setGenres] = useState([]);

	useEffect(() => {
		api(endpoints.CATEGORIES_LIST, {
			params: {
				language,
			},
		}).then(res => {
			setGenres(res.data.genres);
		});
	}, []);

	return { genres };
};

export default useCategories;
