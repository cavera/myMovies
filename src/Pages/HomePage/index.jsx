import SearchForm from "../../components/SearchForm";
import TrendingPreview from "./TrendingPreview";
import CategoriesPreview from "./CategoriesPreview";
// import LikedMovies from "./LikedMovies";

const HomePage = () => {
	return (
		<>
			<SearchForm />
			<TrendingPreview />
			<CategoriesPreview />
			{/* <LikedMovies /> */}
		</>
	);
};

export default HomePage;
