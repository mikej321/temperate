import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { api } from "../utils/api";
import { motion, AnimatePresence } from "framer-motion";
import { readHistory } from "../utils/historyStorage";
import useHistory from "../utils/useHistory";
import axios from "axios";
import '../styles/searchBar.css';


export default function SearchBar({open, setOpen, autoSuggestionOpen, setAutoSuggestionOpen, firstSearch, setFirstSearch, searchVal, setSearchVal, setLocations, searched, setSearched, setPickedLocation, setStorageLocations}) {

    const { history, pushHistory } = useHistory();
    
    const inputRef = useRef(null);
    const suggestionRef = useRef(null);

    const [hits, setHits] = useState(null);
    const [pickedZipCode, setPickedZipCode] = useState(null);
    const [target, setTarget] = useState(0);
    const [useAuto, setUseAuto] = useState(false);
    const abortRef = useRef(null);

    // Update's state and open's the dropdown results
    const onChange = (e) => {
        setSearchVal(e.target.value);
        setOpen(true);
        setAutoSuggestionOpen(true);
    }

    // Debounced fetch when searchVal changes
    useEffect(() => {
        const val = searchVal.trim();
        if (!val) {
            setHits(null);
            setOpen(false);
            return;
        }

        const timeout = setTimeout(async () => {
            try {
                abortRef.current?.abort();
                abortRef.current = new AbortController();

                const { data } = await axios.get("https://api.geoapify.com/v1/geocode/autocomplete", {
                    params: {
                        text: val,
                        filter: "countrycode:us",
                        limit: Number(7),
                        apiKey: import.meta.env.VITE_GEOAPIFY_KEY
                    },
                    signal: abortRef.current.signal
                })

                if (data.features.length == 0) {
                    return;
                } else {
                    setHits([data]);
                    setOpen(true);
                    setAutoSuggestionOpen(true);
                }



            } catch(err) {
                console.log(err.message);
            }
        }, 250);

        return () => clearTimeout(timeout);
    }, [searchVal])

    const handleSubmit = async (e) => {
        e.preventDefault();

        setOpen(false);

        inputRef.current?.blur();
        setTimeout(() => inputRef.current?.blur(), 0);

        setLocations([]);
        e.target[0].value = '';
        
        const { data } = await api.post('/search', {
            searchVal,
        })

        const results = data.data.results;

        setSearched(true);
        setFirstSearch(true);

        if (results !== undefined) {
            for (let area of results) {
                setLocations((prev) => ([
                    ...prev,
                    area
                ]))
            }
        }
    }

    const normalizeGeoapifyShape = (obj) => {
        return {
            name: obj.city || obj.town || obj.village || obj.hamlet || "",
            admin2: obj.city || obj.town || obj.village || obj.hamlet || "",
            admin1: obj.state_code || obj.state || "",
            lat: obj.lat,
            lon: obj.lon,
            country_code: obj.country_code,
            postcode: obj.postcode ?? null,
            country: obj.country,
            population: null,
            id: null,
            admin1_id: null,
            admin2_id: null,
            timezone: null,
            country_id: null,

        }
    }

    const handleLocation = async (postcode) => {
        setPickedZipCode(postcode);
        setOpen(false);
        setAutoSuggestionOpen(false);
    }

    useEffect(() => {
        if (!searchVal) {
            setOpen(false);
            setAutoSuggestionOpen(false);
        }
    }, [searchVal])

    
    useLayoutEffect(() => {
        const suggestions = suggestionRef.current;
        if (!suggestions) return;
        
        const prev = suggestions.style.height;
        suggestions.style.height = "auto"
        const natHeight = suggestions.scrollHeight;
        suggestions.style.height = prev;
        setTarget(natHeight);
    }, [hits, open])
    
    useEffect(() => {
        const suggestions = suggestionRef.current;
        if (!suggestions) return;
        
        const observer = new ResizeObserver(() => {
            if (open) setTarget(suggestions.scrollHeight);
        })
        
        observer.observe(suggestions);
        return () => observer.disconnect();
    }, [open])

    const hitVar = {
        initial: {
            height: 0,
            opacity: 0
        },
        animate: {
            height: useAuto ? "auto" : target,
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.07,
                delayChildren: 0.1,
                height: {
                            type: "spring",
                            stiffness: 500,
                            damping: 40
                        },
                        opacity: {
                            duration: 0.12
                        }
            }
        },
        exit: {
            height: 0,
            opacity: 0,
            transition: {
                when: "afterChildren",
                staggerChildren: 0.07,
                delayChildren: 0.1,
                height: {
                    type: "spring",
                    stiffness: 500,
                    damping: 40
                },
            }
        }
    }

    const childVar = {
        initial: {
            x: -10,
            opacity: 0
        },
        animate: {
            x: 0,
            opacity: 1
        },
        exit: {
            x: -10,
            opacity: 0
        }
    }
    
    return (
        <motion.form
        className="search_container"
        inherit={false}
        onSubmit={(e) => handleSubmit(e)}
        >
            <motion.input
             ref={inputRef}
             className="search_bar"
             type="search"
             name="search"
             id="search"
             placeholder="City Name or Zip Code"
             enterKeyHint="search"
             onChange={onChange}
             layout
             />
             <AnimatePresence>
                {hits && open && (
                    <motion.div
                     key="suggestions"
                     ref={suggestionRef}
                     variants={hitVar}
                     className="hit_container"
                     initial="initial"
                     animate="animate"
                     exit="exit"
                     onUpdate={() => {
                        if (open && useAuto) setUseAuto(false);
                     }}
                     onAnimationComplete={() => {
                        if (open) setUseAuto(true);
                     }}
                     >
                        {hits[0].features.map((hit) => {
                            const properties = hit?.properties;

                            return properties?.city ? <motion.div
                             key={properties.place_id ?? `${properties.county}-${properties.state_code}-${properties.postcode}`} 
                             className="hit"
                             variants={childVar}
                             onClick={() => {
                                handleLocation(properties?.postcode)
                                    .then(() => {
                                        setSearched(false);
                                        setFirstSearch(true);
                                        inputRef.current.value = '';
                                        const normalized = normalizeGeoapifyShape(properties);
                                        setPickedLocation(normalized);
                                        pushHistory({
                                            name: normalized?.name,
                                            lat: normalized?.lat,
                                            lon: normalized?.lon,
                                            admin1: normalized?.admin1,
                                            country: normalized?.country_code,
                                            temperature: null
                                        })
                                        setStorageLocations(readHistory());
                                    });
                            }
                            }
                            >{properties['city']}, {properties['state_code']} {properties['postcode']}</motion.div> : null
                        })}
                    </motion.div>
                )}
             </AnimatePresence>
             <button type="submit" className="sr-only">Search</button>
        </motion.form>

    ) 
    
}