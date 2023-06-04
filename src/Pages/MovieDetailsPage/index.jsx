import { useParams } from "react-router-dom";
import useMovieDetails from "../../hooks/useMovieDetails";
import { endpoints } from "../../services/api";
import CreateCategories from "../../components/CreateCategories";

const MovieDetailsPage = () => {
	const params = useParams();
	const { movie } = useMovieDetails(`${endpoints.MOVIE}${params.movie}`);

	console.log(movie);

	return (
		<section className='movieDetail-container'>
			<h1 className='movieDetail-title'>{movie.title}</h1>
			<span className='movieDetail-score'>{movie.vote_average?.toFixed(1)}</span>
			<p className='movieDetail-description'>{movie.overview}</p>

			<article className='categories-list'>
				{/* <div className='category-container loading'></div> */}
				{/* <CreateCategories genres={movie.genres} /> */}
			</article>

			<article className='relatedMovies-contaner'>
				<h2 className='relatedMovies-title'>Related Movies</h2>
				<div className='relatedMovies-list'>
					<div className='movie-container loading'></div>
				</div>
			</article>
		</section>
	);
};

export default MovieDetailsPage;
