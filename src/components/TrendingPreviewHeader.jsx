import { Link } from "react-router-dom";

const TrendingPreviewHeader = () => {
	return (
		<div className='trendingPreview-header'>
			<h2 className='trendingPreview-title'>Tendences</h2>
			<Link to={"/trends"}>
				<button className='trendingPreview-btn'>View more</button>
			</Link>
		</div>
	);
};

export default TrendingPreviewHeader;
