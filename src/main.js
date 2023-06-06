// the API_KEY comes from the secret.js file
const base_img_url = "https://image.tmdb.org/t/p/";
const time_window = "week";
const base_size = "w300";
const base_size_detail = "original";
// let language = navigator.language || "en";
let language = "en";

// DATOS
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

function likedMovies() {
	const item = JSON.parse(localStorage.getItem("liked_movies"));
	let movies;
	if (item) {
		movies = item;
	} else {
		movies = {};
	}
	return movies;
}

function likeMovie(movie) {
	const likedMoviesList = likedMovies();

	if (likedMoviesList[movie.id]) {
		likedMoviesList[movie.id] = undefined;
	} else {
		likedMoviesList[movie.id] = movie;
	}
	localStorage.setItem("liked_movies", JSON.stringify(likedMoviesList));
	getLikedMovies();
	getTrendingMoviesPreview();
}

// UTILS
let documentObserver = new IntersectionObserver(entries => {
	entries.forEach(entry => {
		// console.log(entry);
		const movieImage = entry.target;
		if (entry.isIntersecting) {
			movieImage.src = movieImage.dataset.image;
		}
	});
});

function showMovies(movies, container, { lazyLoad = false, clean = true } = {}) {
	if (clean) container.innerHTML = "";
	console.log("container", container);
	movies.map(movie => {
		const movieContainer = document.createElement("div");
		const movieImg = document.createElement("img");
		const imgURL = `${base_img_url}${base_size}${movie.poster_path}`;
		const fallbackImgURL = "https://images.pexels.com/photos/3709369/pexels-photo-3709369.jpeg?cs=srgb&dl=pexels-adrien-olichon-3709369.jpg&fm=jpg&w=640&h=960";
		movieImg.classList.add("movie-img");
		if (lazyLoad) {
			movieImg.dataset.image = imgURL;
		} else {
			movieImg.src = imgURL;
		}
		movieImg.alt = `${movie.original_title}`;
		movieContainer.classList.add("movie-container");
		movieContainer.append(movieImg);
		movieImg.addEventListener("click", () => {
			location.hash = `movie=${movie.id}`;
		});
		// movieImg.addEventListener("error", e => {
		// 	movieImg.src = fallbackImgURL;
		// });

		const likedMoviesList = likedMovies();

		const favMovieBtn = document.createElement("button");
		const favIcon = document.createElement("i");
		favIcon.classList.add("i", "ic:baseline-favorite");
		favMovieBtn.appendChild(favIcon);
		favMovieBtn.classList.add("fav-btn");

		if (likedMoviesList[movie.id]) {
			favMovieBtn.classList.add("fav-btn--favorited");
		} else {
			favMovieBtn.classList.remove("fav-btn--favorited");
		}

		favMovieBtn.addEventListener("click", () => {
			favMovieBtn.classList.toggle("fav-btn--favorited");
			likeMovie(movie);
		});

		movieContainer.appendChild(favMovieBtn);

		lazyLoad && documentObserver.observe(movieImg);

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

	showMovies(movies, trendingMoviesPreviewList, { lazyLoading: true });
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

	maxPages = data.total_pages;
	const movies = data.results;

	showMovies(movies, genericSection);
}

function getPaginatedMoviesByCategory(id) {
	return async function () {
		const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
		const isBottom = scrollTop + clientHeight >= scrollHeight - 15;
		const pageIsNotMax = page < maxPages;
		if (isBottom && pageIsNotMax) {
			page++;
			const { data } = await api(`discover/movie`, {
				params: {
					with_genres: id,
					page,
					language,
				},
			});
			const movies = data.results;

			showMovies(movies, genericSection, { lazyLoad: true, clean: false });
		}
	};
}

async function getMoviesByQuery(query) {
	const { data } = await api(`search/movie`, {
		params: {
			query,
			language,
		},
	});

	maxPages = data.total_pages;

	const movies = data.results;
	page = 1;
	showMovies(movies, genericSection, { lazyLoad: true });
}

function getPaginatedMoviesByQuery(query) {
	return async function () {
		const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
		const isBottom = scrollTop + clientHeight >= scrollHeight - 15;
		const pageIsNotMax = page < maxPages;

		if (isBottom && pageIsNotMax) {
			page++;
			const { data } = await api(`search/movie`, {
				params: {
					query,
					language,
					page,
				},
			});

			const movies = data.results;

			showMovies(movies, genericSection, { lazyLoad: true, clean: false });
		}
	};
}

async function getTrendingMovies() {
	const { data } = await api(`trending/movie/${time_window}`, { params: { language } });

	const movies = data.results;
	maxPages = data.total_pages;

	showMovies(movies, genericSection, { lazyLoad: true, clean: true });
}

async function getPaginatedTrendingMovies() {
	const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

	const isBottom = scrollTop + clientHeight >= scrollHeight - 15;
	const pageIsNotMax = page < maxPages;

	if (isBottom && pageIsNotMax) {
		page++;
		const { data } = await api(`trending/movie/${time_window}`, { params: { language, page: page } });
		const movies = data.results;

		showMovies(movies, genericSection, { lazyLoad: true, clean: false });
	}
}

async function getMovieById(id) {
	const { data } = await api(`movie/${id}`, { params: { language } });

	movieDetailTitle.innerHTML = data.title;
	movieDetailDescription.innerHTML = data.overview;
	movieDetailScore.innerHTML = Number(data.vote_average).toFixed(1);

	// headerSection.style.backgroundImage = `url(${base_img_url}${base_size_detail}${data.poster_path})`;

	showCategories(data.genres, movieDetailList);
	getRelatedMoviesById(id); //OK
	const imagenes = getImagesById(id).then(images => {
		console.log(images);
		const bgURL = images.length > 0 ? images[0].file_path : data.poster_path;
		headerSection.style.backgroundImage = `url(${base_img_url}${base_size_detail}${bgURL})`;
	});
}

async function getRelatedMoviesById(id) {
	// const { data } = await api(`movie/${id}/recommendations`);
	const { data } = await api(`movie/${id}/similar`);

	const movies = data.results;

	if (movies.length > 0) {
		showMovies(movies, relatedMoviesContaner);
		relatedMoviesTitle.classList.remove("inactive");
		relatedMoviesContaner.classList.remove("inactive");
	} else {
		relatedMoviesTitle.classList.add("inactive");
		relatedMoviesContaner.classList.add("inactive");
	}
}
async function getImagesById(id) {
	// const res = await api(`movie/${id}/images`);
	const { data } = await api("movie/" + id + "/images", { params: { include_image_language: language } });
	const images = data.backdrops;
	console.log({ data });
	return images;
}

function getLikedMovies() {
	const favoriteMovieList = Object.values(likedMovies());
	// if (favoriteMovieList) {
	showMovies(favoriteMovieList, likedMoviesList, { lazyLoad: true });
	// }
}
