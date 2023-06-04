const CategoryContainer = ({ id, name, handleClick }) => {
	return (
		<div
			className='category-container'
			onClick={handleClick}>
			<h3 className={`category-title id${id}`}>{name}</h3>
		</div>
	);
};

export default CategoryContainer;
