import { useState, useEffect } from "react";
import GenericList from "../../components/GenericList";
import { getTrendingMovies } from "../../services/api";

const TrendsPage = () => {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		const getMovies = async () => {
			const res = await getTrendingMovies();
			setMovies(res);
		};
		getMovies();
	}, []);
	return (
		<>
			<h1 className='header-title header-title--categoryView'>Tendences</h1>
			{movies && <GenericList movies={movies} />}
		</>
	);
};

export default TrendsPage;
