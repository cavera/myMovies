import CreateMovies from "./CreateMovies";

const GenericList = ({ movies }) => {
	return (
		<section className='genericList-container'>
			<CreateMovies movies={movies} />
			{/* <div className='movie-container loading'></div> */}
		</section>
	);
};

export default GenericList;
