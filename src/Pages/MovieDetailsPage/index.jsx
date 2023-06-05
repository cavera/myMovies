import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, base_img_url, base_size_detail } from "../../services/api";
import CreateCategories from "../../components/CreateCategories";

const MovieDetailsPage = () => {
	const params = useParams();

	const [movie, setMovie] = useState({});

	useEffect(() => {
		const getMovie = async () => {
			const res = await getMovieDetails(params.movie);
			setMovie(res);
			console.log(res);
		};

		getMovie();
	}, []);

	return (
		<section className='movieDetail-container'>
			{movie && (
				<>
					<img
						src={`${base_img_url}${base_size_detail}${movie.poster_path}`}
						alt={movie.title}
						style={{ position: "fixed", bottom: "100%", width: "100%" }}
					/>
					<h1 className='movieDetail-title'>{movie.title}</h1>
					<span className='movieDetail-score'>{movie.vote_average?.toFixed(1)}</span>
					<p className='movieDetail-description'>{movie.overview}</p>
					<article className='categories-list'>
						{/* <div className='category-container loading'></div> */}
						{movie.genres.map(genre => console.log(genre.name))}
						<CreateCategories genres={movie.genres} />
					</article>
					<article className='relatedMovies-contaner'>
						<h2 className='relatedMovies-title'>Related Movies</h2>
						<div className='relatedMovies-list'>
							<div className='movie-container loading'></div>
						</div>
					</article>
				</>
			)}
		</section>
	);
};

export default MovieDetailsPage;
