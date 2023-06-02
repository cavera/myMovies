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

window.addEventListener("hashchange", navigator, false);
window.addEventListener(
	"DOMContentLoaded",
	() => {
		history.pushState({ loadURL: location.href }, null, "");
		navigator();
	},
	false
);

const routes = {
	trends: trendsPage,
	"search=": searchPage,
	"movie=": movieDetailsPage,
	"category=": categoriesPage,
};

function navigator() {
	console.log(location);

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

	searchFormInput.value = "";

	getTrendingMoviesPreview();
	getCategoriesPreview();
}

function trendsPage() {
	console.log("TRENDS");

	headerSection.classList.remove("header-container--long");
	headerSection.style.background = "";
	arrowBtn.classList.remove("inactive");
	arrowBtn.classList.remove("header-arrow--white");
	headerTitle.classList.add("inactive");
	headerCategoryTitle.classList.remove("inactive");
	searchForm.classList.add("inactive");

	trendingPreviewSection.classList.add("inactive");
	categoriesPreviewSection.classList.add("inactive");

	genericSection.classList.remove("inactive");
	movieDetailSection.classList.add("inactive");
	headerCategoryTitle.innerHTML = "Tendences";
	getTrendingMovies();
}
function searchPage() {
	console.log("SEARCH");

	headerSection.classList.remove("header-container--long");
	headerSection.style.background = "";
	arrowBtn.classList.remove("inactive");
	arrowBtn.classList.remove("header-arrow--white");
	headerTitle.classList.add("inactive");
	headerCategoryTitle.classList.add("inactive");
	searchForm.classList.remove("inactive");

	trendingPreviewSection.classList.add("inactive");
	categoriesPreviewSection.classList.add("inactive");

	genericSection.classList.remove("inactive");
	movieDetailSection.classList.add("inactive");

	const searchValue = location.hash.split("=")[1];
	searchFormInput.value = searchValue;
	getMoviesByQuery(searchValue);
}
function movieDetailsPage() {
	console.log("MOVIE DETAIL");

	headerSection.classList.add("header-container--long");
	headerSection.style.background = "";

	arrowBtn.classList.remove("inactive");
	arrowBtn.classList.add("header-arrow--white");

	headerTitle.classList.add("inactive");
	headerCategoryTitle.classList.add("inactive");
	searchForm.classList.add("inactive");

	trendingPreviewSection.classList.add("inactive");
	categoriesPreviewSection.classList.add("inactive");

	genericSection.classList.add("inactive");
	movieDetailSection.classList.remove("inactive");

	const movieId = location.hash.split("=")[1];
	getMovieById(movieId);
}
function categoriesPage() {
	console.log("CATEGORIES");

	headerSection.classList.remove("header-container--long");
	headerSection.style.background = "";
	arrowBtn.classList.remove("inactive");
	arrowBtn.classList.remove("header-arrow--white");
	headerTitle.classList.add("inactive");
	headerCategoryTitle.classList.remove("inactive");
	searchForm.classList.add("inactive");

	trendingPreviewSection.classList.add("inactive");
	categoriesPreviewSection.classList.add("inactive");

	genericSection.classList.remove("inactive");
	movieDetailSection.classList.add("inactive");

	const [id, name] = location.hash.split("=")[1].split("-");

	headerCategoryTitle.innerHTML = decodeURIComponent(name);
	// window.scrollTo(0, 0);
	getMoviesByCategory(id);
}
