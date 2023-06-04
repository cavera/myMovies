import GenericList from "../../components/GenericList";
import { endpoints } from "../../services/api";
import useMovies from "../../hooks/useMovies";

const TrendsPage = () => {
	const { movies } = useMovies(endpoints.DISCOVER_MOVIES);
	return (
		<>
			<h1 className='header-title header-title--categoryView'>Tendences</h1>
			<GenericList movies={movies} />
		</>
	);
};

export default TrendsPage;
