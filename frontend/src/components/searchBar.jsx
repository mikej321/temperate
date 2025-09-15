import { useState, useEffect, useRef } from "react";
import axios from "axios";
import '../styles/searchBar.css';

export default function SearchBar({searchVal, setSearchVal, setLocations, setSearched}) {

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocations([]);
        e.target[0].value = '';
        
        const { data } = await axios.post('/search', {
            searchVal,
        })

        /* properties in this object are
        
          name: "area name",
          admin1: "state name",
          admin2: "district name",
          country: "United States",
          lat: "latitude",
          lon: "longitude"
        
        */

        const results = data.data.results;

        setSearched(true);

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
            <input
             className="search_bar"
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