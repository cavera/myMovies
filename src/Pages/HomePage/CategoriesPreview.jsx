import { useEffect, useState } from "react";
import CreateCategories from "../../components/CreateCategories";
import { getCategoriesList } from "../../services/api";

const CategoriesPreview = () => {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const getCategories = async () => {
			const res = await getCategoriesList();
			setCategories(res);
		};
		getCategories();
	}, []);

	return (
		<section className='categoriespreview-container'>
			<h2 className='categoriesPreview-title'>Categories</h2>

			<article className='categoriesPreview-list'>{categories && <CreateCategories genres={categories} />}</article>
		</section>
	);
};

export default CategoriesPreview;
