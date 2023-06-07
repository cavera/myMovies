import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { base_img_url, base_size_detail } from "../services/api";
import { FavBtn } from "./FavBtn";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const MovieContainer = ({ movie }) => {
	const { title, id, poster_path } = movie;
	const navigate = useNavigate();
	const [ref, entry] = useIntersectionObserver();
	const [imgUrl, setImgUrl] = useState(`${base_img_url + base_size_detail + poster_path}`);

	// useEffect(() => {
	// 	if (entry?.isIntersecting) {
	// 		setImgUrl(`${base_img_url + base_size_detail + poster_path}`);
	// 	}
	// }, [ref, entry]);

	return (
		<div
			className='movie-container'
			ref={ref}>
			<img
				src={imgUrl}
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
