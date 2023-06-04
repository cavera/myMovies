let page = 1;
let maxPages;
let infiniteScroll;

searchBtn.addEventListener("click", e => {
	e.preventDefault();
	location.hash = `search=${searchFormInput.value}`;
});
trendingBtn.addEventListener("click", () => {
	location.hash = "trends";
});
arrowBtn.addEventListener("click", () => {
	const stateLoad = history.state ? history.state.loadURL : "";

	if (stateLoad.includes("#")) {
		location.hash = "";
	} else {
		window.history.back();
	}
});

headerTitle.addEventListener("click", () => {
	location.hash = "home";
});

window.addEventListener("hashchange", navigator, false);
window.addEventListener(
	"DOMContentLoaded",
	() => {
		history.pushState({ loadURL: location.href }, null, "");
		navigator();
	},
	false
);

window.addEventListener("scroll", infiniteScroll, false);

const routes = {
	trends: trendsPage,
	"search=": searchPage,
	"movie=": movieDetailsPage,
	"category=": categoriesPage,
};

function navigator() {
	// console.log(location);

	if (infiniteScroll) {
		window.removeEventListener("scroll", infiniteScroll, { passive: false });
		infiniteScroll = undefined;
	}

	document.documentElement.style.setProperty("--color-category", `var(--text-color)`);

	if (location.hash.startsWith("#trends")) {
		trendsPage();
	} else if (location.hash.startsWith("#search=")) {
		searchPage();
	} else if (location.hash.startsWith("#movie=")) {
		movieDetailsPage();
	} else if (location.hash.startsWith("#category=")) {
		categoriesPage();
	} else {
		homePage();
	}

	// const route = location.hash.slice(1);
	// const page = routes[route] || homePage;
	// page();

	document.documentElement.scrollTop = 0;
	document.body.scrollTop = 0;

	if (infiniteScroll) {
		window.addEventListener("scroll", infiniteScroll, { passive: false });
	}
}

function homePage() {
	console.log("HOME");
	headerSection.classList.remove("header-container--long");
	headerSection.style.background = "";
	arrowBtn.classList.add("inactive");
	arrowBtn.classList.remove("header-arrow--white");
	headerTitle.classList.remove("inactive");
	headerCategoryTitle.classList.add("inactive");
	searchForm.classList.remove("inactive");

	trendingPreviewSection.classList.remove("inactive");
	categoriesPreviewSection.classList.remove("inactive");

	genericSection.classList.add("inactive");
	movieDetailSection.classList.add("inactive");

	likedSection.classList.remove("inactive");

	searchFormInput.value = "";

	getTrendingMoviesPreview(); //OK1
	getCategoriesPreview(); //OK1
	getLikedMovies();
}

function trendsPage() {
	console.log("TRENDS");

	headerSection.classList.remove("header-container--long");
	headerSection.style.background = "";
	arrowBtn.classList.remove("inactive");
	arrowBtn.classList.remove("header-arrow--white");
	headerTitle.classList.remove("inactive");
	headerCategoryTitle.classList.remove("inactive");
	searchForm.classList.add("inactive");

	trendingPreviewSection.classList.add("inactive");
	categoriesPreviewSection.classList.add("inactive");

	genericSection.classList.remove("inactive");
	movieDetailSection.classList.add("inactive");
	headerCategoryTitle.innerHTML = "Tendences";
	likedSection.classList.add("inactive");

	getTrendingMovies();
	infiniteScroll = getPaginatedTrendingMovies;
}
function searchPage() {
	console.log("SEARCH");

	headerSection.classList.remove("header-container--long");
	headerSection.style.background = "";
	arrowBtn.classList.remove("inactive");
	arrowBtn.classList.remove("header-arrow--white");
	headerTitle.classList.remove("inactive");
	headerCategoryTitle.classList.add("inactive");
	searchForm.classList.remove("inactive");

	trendingPreviewSection.classList.add("inactive");
	categoriesPreviewSection.classList.add("inactive");

	genericSection.classList.remove("inactive");
	movieDetailSection.classList.add("inactive");
	likedSection.classList.add("inactive");

	const searchValue = location.hash.split("=")[1];
	searchFormInput.value = searchValue;
	getMoviesByQuery(searchValue);

	infiniteScroll = getPaginatedMoviesByQuery(searchValue);
}
function movieDetailsPage() {
	console.log("MOVIE DETAIL");

	headerSection.classList.add("header-container--long");
	headerSection.style.background = "";

	arrowBtn.classList.remove("inactive");
	arrowBtn.classList.add("header-arrow--white");

	headerTitle.classList.remove("inactive");
	headerCategoryTitle.classList.add("inactive");
	searchForm.classList.add("inactive");

	trendingPreviewSection.classList.add("inactive");
	categoriesPreviewSection.classList.add("inactive");

	genericSection.classList.add("inactive");
	movieDetailSection.classList.remove("inactive");
	likedSection.classList.add("inactive");

	const movieId = location.hash.split("=")[1];
	getMovieById(movieId);
}
function categoriesPage() {
	console.log("CATEGORIES");

	headerSection.classList.remove("header-container--long");
	headerSection.style.background = "";
	arrowBtn.classList.remove("inactive");
	arrowBtn.classList.remove("header-arrow--white");
	headerTitle.classList.remove("inactive");
	headerCategoryTitle.classList.remove("inactive");
	searchForm.classList.add("inactive");

	trendingPreviewSection.classList.add("inactive");
	categoriesPreviewSection.classList.add("inactive");

	genericSection.classList.remove("inactive");
	movieDetailSection.classList.add("inactive");
	likedSection.classList.add("inactive");

	const [id, name] = location.hash.split("=")[1].split("-");

	document.documentElement.style.setProperty("--color-category", `var(--color-${id})`);

	headerCategoryTitle.innerHTML = decodeURIComponent(name);

	getMoviesByCategory(id);

	infiniteScroll = getPaginatedMoviesByCategory(id);
}
