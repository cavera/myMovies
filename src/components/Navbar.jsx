import { useNavigate, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
const Navbar = () => {
	const navigate = useNavigate();
	const location = useLocation();

	let hideArrow = location.pathname === "/";

	const backArrow = !hideArrow ? (
		<span
			className='header-arrow'
			onClick={() => {
				navigate(-1);
			}}>
			<Icon icon='ic:round-arrow-back-ios-new' />
		</span>
	) : null;

	return (
		<header className='header-container'>
			<nav className='header-nav'>
				{backArrow}
				<h1
					className='header-title'
					style={{ cursor: "pointer" }}
					onClick={() => navigate("/")}>
					myMovies
				</h1>
			</nav>
		</header>
	);
};

export default Navbar;
