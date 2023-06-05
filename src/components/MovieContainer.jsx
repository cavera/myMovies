import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
const MovieContainer = ({ src, name, id }) => {
	const navigate = useNavigate();

	return (
		<div
			className='movie-container'
			onClick={() => {
				navigate(`/movie/${id}`);
			}}>
			<img
				src={src}
				alt={name}
				className='movie-img'
			/>
			<FavBtn />
		</div>
	);
};

const FavBtn = () => {
	return (
		<button className='fav-btn'>
			<Icon icon='ic:baseline-favorite' />
		</button>
	);
};

export default MovieContainer;
