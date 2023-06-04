import useCategories from "../../hooks/useCategories";
import CreateCategories from "../../components/CreateCategories";

const CategoriesPreview = () => {
	const { genres } = useCategories();
	return (
		<section className='categoriespreview-container'>
			<h2 className='categoriesPreview-title'>Categories</h2>

			<article className='categoriesPreview-list'>
				<CreateCategories genres={genres} />
			</article>
		</section>
	);
};

export default CategoriesPreview;
