import { Routes, Route, HashRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./Pages/HomePage/";
import TrendsPage from "./Pages/TrendsPage";
import CategoriesPage from "./Pages/CategoriesPage";
import MovieDetailsPage from "./Pages/MovieDetailsPage";
import SearchPage from "./Pages/SearchPage";
import { MovieContextProvider } from "./context/MoviesContext";

import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/open-sans/400.css";

import "../styles/app.scss";

const App = () => {
	return (
		<MovieContextProvider>
			<HashRouter>
				<Navbar />
				<Routes>
					<Route
						path='/'
						element={<HomePage />}
					/>
					<Route
						path='trends'
						element={<TrendsPage />}
					/>
					<Route
						path='category/:category'
						element={<CategoriesPage />}
					/>
					<Route
						path='movie/:movie'
						element={<MovieDetailsPage />}
					/>
					<Route
						path='search/:search'
						element={<SearchPage />}
					/>
				</Routes>
				<Footer />
			</HashRouter>
		</MovieContextProvider>
	);
};

export default App;
