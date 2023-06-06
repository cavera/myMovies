import { useNavigate } from "react-router-dom";
import { base_img_url, base_size_detail } from "../services/api";
import { FavBtn } from "./FavBtn";

const MovieContainer = ({ movie }) => {
	const navigate = useNavigate();

	const { title, id, poster_path } = movie;
	const img_url = `${base_img_url + base_size_detail + poster_path}`;

	return (
		<div className='movie-container'>
			<img
				src={img_url}
				alt={title}
				className='movie-img'
				onClick={() => {
					navigate(`/movie/${id}`);
				}}
			/>
			<FavBtn movie={movie} />
		</div>
	);
};

export default MovieContainer;
