import { useContext, useEffect } from "react";
import { MovieContext } from "../../context/MoviesContext";
import CreateMovies from "../../components/CreateMovies";

const LikedMovies = () => {
	const { likedMovies } = useContext(MovieContext);
	useEffect(() => {
		console.log(likedMovies);
		renderLikedMovies();
	}, [likedMovies]);

	const renderLikedMovies = () => {
		return (
			<article className='likedMovies-list'>
				<CreateMovies movies={likedMovies} />
			</article>
		);
	};

	return (
		<section className='likedMovies-container'>
			<div className='likedMovies-header'>
				<h2 className='likedMovies-title'>Liked movies</h2>
			</div>
			{renderLikedMovies()}
		</section>
	);
};

export default LikedMovies;
