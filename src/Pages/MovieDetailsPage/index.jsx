import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, base_img_url, base_size_detail, getSimilarMovies, language, getRecomendedMovies } from "../../services/api";
import CreateCategories from "../../components/CreateCategories";
import CreateMovies from "../../components/CreateMovies";

const MovieDetailsPage = () => {
	const params = useParams();

	const [movie, setMovie] = useState({});
	const [similar, setSimilar] = useState([]);
	const [recommended, setRecommended] = useState([]);

	useEffect(() => {
		const getSimilar = async () => {
			const res = await getSimilarMovies(params.movie);
			setSimilar(res);
		};
		const getRecommended = async () => {
			const res = await getRecomendedMovies(params.movie);
			setRecommended(res);
		};
		const getMovie = async () => {
			const res = await getMovieDetails(params.movie);
			setMovie(res);
			console.log(res);
			getSimilar();
			getRecommended();
		};

		getMovie();

		window.scrollTo({
			top: 0,
		});
	}, [params.movie]);
	//TODO: movie.budget.toLocaleString(language, { style: "currency", currency: "USD" })
	return (
		<>
			<div
				className='movieDetail-background'
				style={{
					backgroundImage: `url(${base_img_url + base_size_detail + movie.backdrop_path})`,
				}}></div>
			<section className='movieDetail-container'>
				{movie && (
					<>
						<div className='movieDetail-top'>
							{movie.poster_path && (
								<div className='movie-poster'>
									<img
										src={`${base_img_url}${base_size_detail}${movie.poster_path}`}
										alt={movie.title}
									/>
								</div>
							)}
							<div className='movieDetail-data'>
								<div className='container-flex'>
									<h1 className='movieDetail-title'>{movie.title}</h1>
									<div className='movieDetail-score'>
										<span className='score'>{movie.vote_average?.toFixed(1)}</span>
										<span className='votes'>{movie.vote_count} votes</span>
									</div>
								</div>
								{movie.tagline && <span>{movie.tagline}</span>}
								<p className='movieDetail-description'>{movie.overview}</p>

								<span>Relase date: {movie.release_date}</span>
								<span>Original language: {movie.original_language}</span>
								{movie.original_title !== movie.title && <span>Original title: {movie.original_title}</span>}
								{/* <span>Popularity: {movie.popularity}</span> */}
								<span>Budget: {movie.budget}</span>
								<span>Revenue: {movie.revenue}</span>

								<article className='categories-list'>{movie.genres && <CreateCategories genres={movie.genres} />}</article>
							</div>
						</div>
						{similar && similar.length > 0 && (
							<article className='relatedMovies-contaner'>
								<h2 className='relatedMovies-title'>Similar Movies</h2>
								<div className='relatedMovies-list'>
									{/* <div className='movie-container loading'></div> */}
									<CreateMovies movies={similar} />
								</div>
							</article>
						)}
						{recommended && recommended.length > 0 && (
							<article className='relatedMovies-contaner'>
								<h2 className='relatedMovies-title'>Recommended Movies</h2>
								<div className='relatedMovies-list'>
									{/* <div className='movie-container loading'></div> */}
									<CreateMovies movies={recommended} />
								</div>
							</article>
						)}
					</>
				)}
			</section>
		</>
	);
};

export default MovieDetailsPage;
