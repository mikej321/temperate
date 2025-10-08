import { useState, useEffect, useRef } from "react";
import { api } from "../utils/api";
import { motion, AnimatePresence } from "framer-motion";
import { readHistory } from "../utils/historyStorage";
import useHistory from "../utils/useHistory";
import axios from "axios";
import '../styles/searchBar.css';


export default function SearchBar({firstSearch, setFirstSearch, searchVal, setSearchVal, setLocations, searched, setSearched, setPickedLocation, setStorageLocations}) {

    const { history, pushHistory } = useHistory();
    
    const inputRef = useRef(null);

    const [hits, setHits] = useState(null);
    const [open, setOpen] = useState(false);
    const [pickedZipCode, setPickedZipCode] = useState(null);
    const abortRef = useRef(null);

    // Update's state and open's the dropdown results
    const onChange = (e) => {
        setSearchVal(e.target.value);
        setOpen(true);
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
                    }
                })

                if (data.features.length == 0) {
                    return;
                } else {
                    setHits([data]);
                    setOpen(true);
                }



            } catch(err) {
                console.log(err.message);
            }
        }, 250);

        return () => clearTimeout(timeout);
    }, [searchVal])

    const handleSubmit = async (e) => {
        e.preventDefault();

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
             />
             <AnimatePresence>
                {hits && open && (
                    <motion.div className="hit_container" style={{
                        position: firstSearch ? "absolute" : "static",
                        top: firstSearch && '70px',
                        left: firstSearch && "50%",
                        transform: firstSearch && "translateX(-50%)",
                        zIndex: firstSearch && 1000,
                        width: firstSearch && "80%"
                    }}>
                        {hits[0].features.map((hit) => {
                            const properties = hit?.properties;

                            return properties?.city ? <motion.div className="hit" onClick={() => {
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