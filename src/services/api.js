import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

const base_img_url = "https://image.tmdb.org/t/p/";
const time_window = "week";
const base_size = "w300";
const base_size_detail = "original";
let language = "en";

const endpoints = {
	TRENDING_MOVIES: `trending/movie/${time_window}`,
	CATEGORIES_LIST: `/genre/movie/list`,
	DISCOVER_MOVIES: `discover/movie`,
	MOVIE: `movie/`,
};

const api = axios.create({
	baseURL: "https://api.themoviedb.org/3/",
	params: {
		api_key: API_KEY,
		include_adult: false,
	},
	headers: {
		"Content-Type": "application/json;charset=utf-8",
	},
});

export { api, language, base_img_url, base_size_detail, endpoints };
