import { useParams } from "react-router-dom";
import { endpoints } from "../../services/api";
import useMovies from "../../hooks/useMovies";
import useCategories from "../../hooks/useCategories";
import GenericList from "../../components/GenericList";

const CategoriesPage = () => {
	const { category } = useParams();
	const { genres } = useCategories();
	const { movies } = useMovies(endpoints.DISCOVER_MOVIES, { with_genres: category });

	const categoryName = genres.filter(genre => genre.id === Number(category))[0]?.name;

	return (
		<>
			<h1 className='header-title header-title--categoryView'>{categoryName}</h1>
			<GenericList movies={movies} />
		</>
	);
};

export default CategoriesPage;
