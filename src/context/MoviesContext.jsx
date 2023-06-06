import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const MovieContext = createContext();

export const MovieContextProvider = ({ children }) => {
	const [likedMovies, saveLikes, removeLikes] = useLocalStorage("liked_movies");
	return (
		<MovieContext.Provider
			value={{
				likedMovies,
				saveLikes,
				removeLikes,
			}}>
			{children}
		</MovieContext.Provider>
	);
};
