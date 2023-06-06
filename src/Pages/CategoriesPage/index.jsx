import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMoviesByCategory, getCategoriesList } from "../../services/api";
import GenericList from "../../components/GenericList";

const CategoriesPage = () => {
	const { category } = useParams();

	const [movies, setMovies] = useState([]);
	const [categories, setCategories] = useState([]);
	const [catName, setCatName] = useState("");

	useEffect(() => {
		const getMovies = async () => {
			const res = await getMoviesByCategory(category);
			setMovies(res);
		};
		getMovies();
	}, []);

	useEffect(() => {
		const getCategories = async () => {
			const res = await getCategoriesList(category);
			setCategories(res);
			setCatName(res.find(cat => cat.id === Number(category))?.name);
			document.documentElement.style.setProperty("--color-category", `var(--color-${category})`);
			console.log(res);
		};

		getCategories();
		return () => {
			document.documentElement.style.setProperty("--color-category", `var(--primary-color`);
		};
	}, []);

	return (
		<>
			{catName && <h1 className='header-title header-title--categoryView'>{catName}</h1>}
			{movies && <GenericList movies={movies} />}
		</>
	);
};

export default CategoriesPage;
