import { useEffect, useState, useContext } from "react";
import { MovieContext } from "../context/MoviesContext";
import { Icon } from "@iconify/react";
export const FavBtn = ({ movie }) => {
	const { likedMovies, saveLikes, removeLikes } = useContext(MovieContext);
	const [fav, setFav] = useState("");

	useEffect(() => {
		const isLiked = likedMovies.some(el => el.id === movie.id);
		const favState = isLiked ? "fav-btn--favorited" : "";
		setFav(favState);
	}, [likedMovies]);

	function handleFav(movie) {
		let isLiked = likedMovies.some(el => el.id === movie.id);
		if (isLiked) {
			removeLikes(movie.id);
		} else {
			saveLikes(movie);
		}
	}

	return (
		<button
			className={`fav-btn ${fav}`}
			onClick={() => handleFav(movie)}>
			<Icon icon='ic:baseline-favorite' />
		</button>
	);
};
