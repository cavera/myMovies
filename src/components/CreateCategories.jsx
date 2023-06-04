import CategoryContainer from "./CategoryContainer";
import { useNavigate } from "react-router-dom";

const CreateCategories = ({ genres }) => {
	const navigate = useNavigate();

	const handleClick = id => {
		navigate(`/category/${id}`);
	};

	return (
		<>
			{genres.map(genre => {
				return (
					<CategoryContainer
						key={genre.id}
						id={genre.id}
						name={genre.name}
						handleClick={() => {
							handleClick(genre.id);
						}}
					/>
				);
			})}
		</>
	);
};

export default CreateCategories;
