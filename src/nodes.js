const $ = el => document.querySelector(el);

const BODY = $("body");

// Sections
const headerSection = $("#header");
const trendingPreviewSection = $("#trendingPreview");
const categoriesPreviewSection = $("#categoriesPreview");
const genericSection = $("#genericList");
const movieDetailSection = $("#movieDetail");
const likedSection = $("#liked");

// Lists and containers
const searchForm = $("#searchForm");
const trendingMoviesPreviewList = $(".trendingPreview-movieList");
const categoriesPreviewList = $(".categoriesPreview-list");
const movieDetailList = $("#movieDetail .categories-list");
const relatedMoviesContaner = $(".relatedMovies-list");
const relatedMoviesTitle = $(".relatedMovies-title");
const likedMoviesList = $(".likedMovies-list");

// elements
const headerTitle = $(".header-title");
const arrowBtn = $(".header-arrow");
const headerCategoryTitle = $(".header-title--categoryView");

const searchFormInput = $("#searchForm input");
const searchBtn = $("#searchBtn");

const trendingBtn = $(".trendingPreview-btn");

const movieDetailTitle = $(".movieDetail-title");
const movieDetailDescription = $(".movieDetail-description");
const movieDetailScore = $(".movieDetail-score");
