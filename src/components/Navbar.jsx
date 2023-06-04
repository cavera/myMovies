const Navbar = () => {
	return (
		<header
			id='header'
			className='header-container'>
			<nav className='header-nav'>
				<span className='header-arrow inactive'>
					<i className='i ic:round-arrow-back-ios-new'></i>
				</span>
				<h1 className='header-title'>myMovies</h1>
			</nav>
			<h1 className='header-title header-title--categoryView inactive'>{/* Action */}</h1>
			<form
				id='searchForm'
				className='header-searchForm'>
				<input
					type='text'
					placeholder='Find your next flick'
				/>
				<button id='searchBtn'>
					<i className='i ic:baseline-search'></i>
				</button>
			</form>
		</header>
	);
};

export default Navbar;
