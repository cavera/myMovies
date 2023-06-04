import useMovies from "../../hooks/useMovies";
import CreateMovies from "../../components/CreateMovies";
import TrendingPreviewHeader from "../../components/TrendingPreviewHeader";
import { endpoints } from "../../services/api";

const TrendingPreview = () => {
	const { movies } = useMovies(endpoints.TRENDING_MOVIES);
	return (
		<section className='trendingPreview-container'>
			<TrendingPreviewHeader />

			<article className='trendingPreview-movieList'>
				<CreateMovies movies={movies} />

				{/* <div className='movie-container loading'></div> */}
			</article>
		</section>
	);
};

export default TrendingPreview;
