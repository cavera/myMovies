import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

export const base_img_url = "https://image.tmdb.org/t/p/";
export const time_window = "week";
export const base_size = "w300";
export const base_size_detail = "original";
export let language = "en";

const endpoints = {
	TRENDING_MOVIES: `trending/movie/${time_window}`,
	CATEGORIES_LIST: `/genre/movie/list`,
	DISCOVER_MOVIES: `discover/movie`,
	MOVIE: `movie/`,
	SEARCH_MOVIE: `search/movie`,
	SIMILAR_MOVIES: `/similar`,
	RECOMMENDATIONS: `/recommendations`,
	IMAGES: `/images`,
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

export const getTrendingMovies = async () => {
	const res = await api.get(endpoints.TRENDING_MOVIES);
	return res.data.results;
};

export const getCategoriesList = async () => {
	const res = await api.get(endpoints.CATEGORIES_LIST);
	return res.data.genres;
};

export const getMoviesByCategory = async id => {
	const res = await api.get(endpoints.DISCOVER_MOVIES, {
		params: {
			language,
			with_genres: id,
		},
	});
	return res.data.results;
};

export const getMovieDetails = async id => {
	const res = await api.get(`${endpoints.MOVIE}${id}`);
	return res.data;
};

export const getMoviesByQuery = async query => {
	const res = await api.get(endpoints.SEARCH_MOVIE, {
		params: {
			language,
			query,
		},
	});
	return res.data.results;
};

export const getSimilarMovies = async id => {
	const res = await api.get(endpoints.MOVIE + id + endpoints.SIMILAR_MOVIES, { params: { language } });
	return res.data.results;
};
export const getRecomendedMovies = async id => {
	const res = await api.get(endpoints.MOVIE + id + endpoints.RECOMMENDATIONS, { params: { language } });
	return res.data.results;
};

// export default api;

export { api, endpoints };
