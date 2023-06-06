import { useRef, useEffect, useState } from "react";

export const useIntersectionObserver = (opts = {}) => {
	const ref = useRef(null);
	const { root = null, rootMargin = "0px", threshold = 1 } = opts;
	const [entry, setEntry] = useState(null);

	useEffect(() => {
		const hnode = ref?.current;

		if (!hnode || typeof IntersectionObserver !== "function") {
			return;
		}

		const callbackFn = ([entry]) => {
			setEntry(entry);
		};
		const documentObserver = new IntersectionObserver(callbackFn, { threshold, root, rootMargin });
		documentObserver.observe(hnode);

		return () => {
			setEntry(null);
			documentObserver.unobserve(hnode);
		};
	}, [threshold, root, rootMargin]);

	return [ref, entry];
};
