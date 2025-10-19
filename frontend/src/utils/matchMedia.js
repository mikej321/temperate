import { useEffect, useState } from "react";

export function useMediaQuery(query) {
    const getMatch = () => typeof window !== "undefined" ? window.matchMedia(query).matches : false;

    const [matches, setMatches] = useState(getMatch);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const mql = window.matchMedia(query);
        const onChange = (e) => setMatches(e.matches);
        mql.addEventListener("change", onChange);
        setMatches(mql.matches);
        return () => mql.removeEventListener("change", onChange);
    }, [query]);

    return matches;
}