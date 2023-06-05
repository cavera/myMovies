import { useState, useEffect } from "react";
import CreateMovies from "../../components/CreateMovies";
import TrendingPreviewHeader from "../../components/TrendingPreviewHeader";
import { getTrendingMovies } from "../../services/api";

const TrendingPreview = () => {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		const getMovies = async () => {
			const res = await getTrendingMovies();
			setMovies(res);
		};
		getMovies();
	}, []);

	return (
		<section className='trendingPreview-container'>
			<TrendingPreviewHeader />

			<article className='trendingPreview-movieList'>{movies && <CreateMovies movies={movies} />}</article>
		</section>
	);
};

export default TrendingPreview;
