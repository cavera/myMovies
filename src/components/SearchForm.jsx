import { Icon } from "@iconify/react";

const SearchForm = () => {
	return (
		<form className='header-searchForm'>
			<input
				type='text'
				placeholder='Find your next flick'
			/>
			<button>
				<Icon icon='ic:baseline-search' />
			</button>
		</form>
	);
};

export default SearchForm;
