import { useEffect, useState } from "react";
import GenericList from "../../components/GenericList";
import { getMoviesByQuery } from "../../services/api";
import { useParams } from "react-router-dom";

const SearchPage = () => {
	const [movies, setMovies] = useState([]);
	const { search } = useParams();

	useEffect(() => {
		const getMovies = async () => {
			const res = await getMoviesByQuery(search);
			setMovies(res);
			console.log(res);
		};

		getMovies();
	}, []);

	return <>{movies && <GenericList movies={movies} />}</>;
};

export default SearchPage;
