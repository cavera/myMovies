import { Routes, Route, HashRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./Pages/HomePage";

import "../styles/app.scss";

const App = () => {
	return (
		<HashRouter>
			<Navbar />
			<Routes>
				<Route
					path='/'
					element={<HomePage />}
				/>
			</Routes>
		</HashRouter>
	);
};

export default App;
