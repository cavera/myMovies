// the API_KEY comes from the secret.js file
const base_img_url = "https://image.tmdb.org/t/p/";
const time_window = "day";
const base_size = "w300";
const base_size_detail = "original";
const language = "en";

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
// UTILS
function showMovies(movies, container) {
	container.innerHTML = "";
	movies.map(movie => {
		const movieContainer = document.createElement("div");
		const movieImg = document.createElement("img");

		movieImg.classList.add("movie-img");
		movieImg.src = `${base_img_url}${base_size}${movie.poster_path}`;
		movieImg.alt = `${movie.id}${movie.original_title}`;

		movieContainer.classList.add("movie-container");
		movieContainer.append(movieImg);
		movieContainer.addEventListener("click", () => {
			location.hash = `movie=${movie.id}`;
		});

		container.appendChild(movieContainer);
	});
}

function showCategories(genres, container) {
	container.innerHTML = "";
	genres.map(genre => {
		const genreContainer = document.createElement("div");
		const genreTitle = document.createElement("h3");
		const titleText = document.createTextNode(genre.name);

		genreContainer.classList.add("category-container");
		genreTitle.classList.add("category-title");
		genreTitle.classList.add(`id${genre.id}`);
		// genreTitle.id = `id${genre.id}`;

		genreTitle.append(titleText);

		genreTitle.addEventListener("click", () => {
			location.hash = `category=${genre.id}-${genre.name}`;
		});

		genreContainer.appendChild(genreTitle);
		container.appendChild(genreContainer);
	});
}

async function getTrendingMoviesPreview() {
	const { data } = await api(`trending/movie/${time_window}`, { params: { language } });

	const movies = data.results;

	showMovies(movies, trendingMoviesPreviewList);
}
async function getCategoriesPreview() {
	const { data } = await api(`/genre/movie/list`, { params: { language } });

	const genres = data.genres;

	showCategories(genres, categoriesPreviewList);
}
async function getMoviesByCategory(id) {
	const { data } = await api(`discover/movie`, {
		params: {
			with_genres: id,
			// page: 2,
			language,
		},
	});

	const movies = data.results;

	showMovies(movies, genericSection);
}
async function getMoviesByQuery(query) {
	const { data } = await api(`search/movie`, {
		params: {
			query,
			language,
		},
	});

	const movies = data.results;

	showMovies(movies, genericSection);
}
async function getTrendingMovies() {
	const { data } = await api(`trending/movie/${time_window}`, { params: { language } });

	const movies = data.results;

	showMovies(movies, genericSection);
}
async function getMovieById(id) {
	const { data } = await api(`movie/${id}`, { params: { language } });

	movieDetailTitle.innerHTML = data.title;
	movieDetailDescription.innerHTML = data.overview;
	movieDetailScore.innerHTML = Number(data.vote_average).toFixed(1);

	// headerSection.style.backgroundImage = `url(${base_img_url}${base_size_detail}${data.poster_path})`;

	showCategories(data.genres, movieDetailList);
	getRelatedMoviesById(id);
	const imagenes = getImagesById(id).then(images => {
		console.log(images);
		const bgURL = images.length > 0 ? images[0].file_path : data.poster_path;
		headerSection.style.backgroundImage = `url(${base_img_url}${base_size_detail}${bgURL})`;
	});

	// console.log(data);
}

async function getRelatedMoviesById(id) {
	const { data } = await api(`movie/${id}/recommendations`);

	const movies = data.results;

	showMovies(movies, relatedMoviesContaner);
}
async function getImagesById(id) {
	// const res = await api(`movie/${id}/images`);
	const { data } = await api("movie/" + id + "/images", { params: { include_image_language: language } });
	const images = data.backdrops;
	console.log({ data });
	return images;
}
