import MovieContainer from "./MovieContainer";

const CreateMovies = ({ movies }) => {
	return (
		<>
			{movies.map(movie => {
				return (
					<MovieContainer
						key={movie.id}
						movie={movie}
					/>
				);
			})}
		</>
	);
};

export default CreateMovies;
