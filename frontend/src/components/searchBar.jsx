import { useState, useEffect, useRef } from "react";
import { api } from "../utils/api";
import { motion } from "framer-motion";
import axios from "axios";
import '../styles/searchBar.css';


export default function SearchBar({searchVal, setSearchVal, setLocations, searched, setSearched}) {
    
    const inputRef = useRef(null);
    const [firstSearch, setFirstSearch] = useState(false);

    

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

    return (
        <form
         className="search_container"
         onSubmit={(e) => handleSubmit(e)}
         >
            <motion.input
             ref={inputRef}
             className="search_bar"
             initial={false}
             animate={firstSearch ? { y: 0 } : { y: 300 }}
             transition={{
                type: "spring",
                duration: 0.2,
                stiffness: 500,
                damping: 35
             }}
             type="search"
             name="search"
             id="search"
             placeholder="City Name or Zip Code"
             enterKeyHint="search"
             onChange={(e) => setSearchVal(e.target.value)}
             />
             <button type="submit" className="sr-only">Search</button>
        </form>

    ) 
    
}