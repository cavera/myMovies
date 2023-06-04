import { base_img_url, base_size_detail } from "../services/api";
import MovieContainer from "./MovieContainer";

const CreateMovies = ({ movies }) => {
	return (
		<>
			{movies.map(movie => {
				const img_url = `${base_img_url}${base_size_detail}${movie.poster_path}`;
				const title = movie.title;
				return (
					<MovieContainer
						key={movie.id}
						id={movie.id}
						src={img_url}
						name={title}
					/>
				);
			})}
		</>
	);
};

export default CreateMovies;
