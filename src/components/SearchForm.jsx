import { Icon } from "@iconify/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchForm = () => {
	const [query, setQuery] = useState("");
	const navigate = useNavigate();
	return (
		<form className='header-searchForm'>
			<input
				type='text'
				placeholder='Find your next flick'
			/>
			<button
				onClick={() => {
					navigate(`/search/${query}`);
				}}>
				<Icon icon='ic:baseline-search' />
			</button>
		</form>
	);
};

export default SearchForm;
