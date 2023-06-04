import { useNavigate } from "react-router-dom";

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
			<i className='i ic:baseline-favorite'></i>
		</button>
	);
};

export default MovieContainer;
