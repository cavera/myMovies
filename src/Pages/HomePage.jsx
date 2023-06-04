const HomePage = () => {
	return (
		<>
			<section
				id='trendingPreview'
				className='trendingPreview-container'>
				<div className='trendingPreview-header'>
					<h2 className='trendingPreview-title'>Tendences</h2>
					<button className='trendingPreview-btn'>View more</button>
				</div>

				<article className='trendingPreview-movieList'>
					<div className='movie-container loading'></div>
					<div className='movie-container loading'></div>
					<div className='movie-container loading'></div>
					{/* <div className="movie-container">
				<img src="" alt="" className="movie-img">
			</div> */}
				</article>
			</section>
			<section
				id='categoriesPreview'
				className='categoriespreview-container'>
				<h2 className='categoriesPreview-title'>Categories</h2>

				<article className='categoriesPreview-list'>
					<div className='category-container'>
						<h3
							id='id28'
							className='category-title'>
							Action
						</h3>
					</div>
				</article>
			</section>
		</>
	);
};

export default HomePage;
