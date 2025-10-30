import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import "../styles/hurricaneCenter.css";

export default function HurricaneCenter({ hurricaneData, setHurricaneData }) {
  const [stormData, setStormData] = useState([]);
  const [stormFilteredByName, setStormFilteredByName] = useState([]);
  const [currentConditions, setCurrentConditions] = useState(null);
  const [clickedHurricaneIndex, setClickedHurricaneIndex] = useState(0);

  const activeStorm =
    currentConditions && currentConditions[clickedHurricaneIndex]
      ? currentConditions[clickedHurricaneIndex]
      : null;

  /* To do this properly, I'll have to grab the storm names of 
    each storm in my hurricanes state.
    
    After I get the storm names for each storm, I'll have to create
    new arrays that will hold the data for each storm. These arrays
    will go into a main array state that will hold each storms
    array.

    Once that's done, I'll loop over each individual array within the
    bigger array and grab the data that way. This will allow me to be
    able to display storm data per storm and not in a clump like the 
    source data is.
    
    */

  /* Okay, I've now got stormData set up with the names of the storms.
    What I think I'll need to do next is to filter the hurricaneData state
    by the names in these storms. I can place them in a new state for
    this. */

  useEffect(() => {
    if (!hurricaneData) return;
    const stormNames = [];

    for (let hurricane of hurricaneData) {
      const hurricaneProperties = hurricane["properties"];
      /* Pushing the names of the storms to an array but only
            if that storm is an actual hurricane (depressions will
            have STORMTYPE as " " and STORMSRC as " ". There stormname
            will also be a number, as it hasn't been named yet). */
      if (
        !stormNames.includes(hurricaneProperties["STORMNAME"]) &&
        hurricaneProperties["STORMTYPE"] !== " " &&
        hurricaneProperties["STORMSRC"] !== " "
      ) {
        stormNames.push(hurricaneProperties["STORMNAME"]);
      }
    }

    setStormData(stormNames);

    /* Now I'll filter the hurricaneData based on the names
        within the stormData state. Find a way to set these
        filters to a variable that will hold the array
        containing all data pertaining to each storm (each storm
        has multiple elements displaying a forecast of data)
        
        // Pseudo code for filtering based on name of storm
        for (let storm of stormData) {
            setStormFilteredByName((prev) => [...prev, [hurricaneData.filter((el) => el['properties']['STORMNAME'] == storm ))]]
        }

        I may have to alter code if it's not entirely correct BUT the central
        idea is each storms data will be set in it's own array within a state
        array. This will make it to where I'm able to loop over each of these
        arrays within the array state to display the data I want pertaining
        to individual storms instead of having the data show in a clump.
        
        */
  }, [hurricaneData]);

  useEffect(() => {
    if (!stormData || stormData.length == 0) return;
    let tempArr = [];

    // Separate the storm systems into their own set of arrays
    for (let stormSystem of stormData) {
      // Filter by asking if the storm name in stormData matches the storm name in the main hurricaneData arr
      const indSysArr = hurricaneData.filter(
        (el, index) => el["properties"]["STORMNAME"] == stormSystem
      );
      // Push it to the temp array
      tempArr.push(indSysArr);
    }

    // After the storms are filtered, push the entire temp arr to the state arr
    // for operations to be performed on it afterwards
    setStormFilteredByName(tempArr);
  }, [stormData]);

  useEffect(() => {
    if (!stormFilteredByName || stormFilteredByName.length == 0) return;

    // Grab the first element of each arr in stormFilteredByName
    // and put it into it's own state. This will be what's shown by default

    const tempArr = [];
    for (let stormArr of stormFilteredByName) {
      tempArr.push(stormArr[0]);
    }

    setCurrentConditions(tempArr);
  }, [stormFilteredByName]);

  function handleHurricaneIconClick(index) {
    if (!index) return;

    setClickedHurricaneIndex(index);
  }

  return (
    <div className="hurricane_center_container">
      <div className="hurricane_svg_container">
        {currentConditions &&
          currentConditions.map((el, i) => {
            return (
              <svg
                onClick={() => setClickedHurricaneIndex(i)}
                fill="#03213A"
                key={i}
                width={
                  el["properties"]["MAXWIND"] >= 157
                    ? "50px"
                    : el["properties"]["MAXWIND"] >= 130
                    ? "48px"
                    : el["properties"]["MAXWIND"] >= 111
                    ? "46px"
                    : el["properties"]["MAXWIND"] >= 96
                    ? "44px"
                    : el["properties"]["MAXWIND"] >= 74
                    ? "42px"
                    : "40px"
                }
                viewBox="0 0 32 32"
                id="icon"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <style>{".cls-1{fill:none;}"}</style>
                </defs>
                <title>hurricane</title>
                <path d="M22.6521,4.1821l-2.177,2.5142L19.0713,8.3174,20.7864,9.605A7.9361,7.9361,0,0,1,23.9963,16l.0008.0576.0017.0415c.018.4317.2412,10.1113-14.6538,11.7222l2.18-2.5176,1.4039-1.6211L11.2139,22.395A7.9361,7.9361,0,0,1,8.0037,16l-.0008-.0576-.0017-.0415C7.9832,15.47,7.7605,5.8071,22.6521,4.1821M24.9978,2c-.0164,0-.0327,0-.0493.001C5.2532,2.9146,6.0037,16,6.0037,16a9.975,9.975,0,0,0,4.0095,7.9946L6.2368,28.3555A1.0044,1.0044,0,0,0,7.0022,30c.0164,0,.0327,0,.0493-.001C26.7468,29.0854,25.9963,16,25.9963,16a9.9756,9.9756,0,0,0-4.0092-7.9946l3.7761-4.3609A1.0044,1.0044,0,0,0,24.9978,2Z" />
                <rect
                  id="_Transparent_Rectangle_"
                  data-name="<Transparent Rectangle>"
                  className="cls-1"
                  width="32"
                  height="32"
                />
              </svg>
            );
          })}
      </div>
      {activeStorm && (
        <div className="hurricane">
          {(() => {
            const properties = activeStorm["properties"];
            const name = properties["STORMNAME"];
            const category = properties["MAXWIND"] >= 157
                ? 5
                : properties["MAXWIND"] >= 130
                ? 4
                : properties["MAXWIND"] >= 111
                ? 3
                : properties["MAXWIND"] >= 96
                ? 2
                : properties["MAXWIND"] >= 74
                ? 1
                : null;
            const label =
              properties["MAXWIND"] >= 157
                ? "Category 5 Hurricane"
                : properties["MAXWIND"] >= 130
                ? "Category 4 Hurricane"
                : properties["MAXWIND"] >= 111
                ? "Category 3 Hurricane"
                : properties["MAXWIND"] >= 96
                ? "Category 2 Hurricane"
                : properties["MAXWIND"] >= 74
                ? "Category 1 Hurricane"
                : "Tropical Storm";
            const forecastDate = properties["DATELBL"];
            const maxwinds = properties["MAXWIND"];
            const windGust = properties["GUST"];

            return (
              <>
                <div className="hurricane_details_container">
                  <p className="hurricane_name">
                    {properties["MAXWIND"] <= 74
                      ? "Tropical Storm"
                      : "Hurricane"}{" "}
                    <span className="hurricane_name_identifier">{name}</span>
                  </p>
                  <p className="hurricane_category">{label}</p>
                  <p className="forecast_date">
                    Issued on{" "}
                    <span className="forecast_date_identifier">{forecastDate}</span>
                  </p>
                  <div className="hurricane_wind_info">
                    <p className="sustained_winds_info">
                      Sustained winds of{" "}
                      <span className="sustained_winds_info_identifier">{maxwinds}</span>{" "}
                      mp/h
                    </p>
                    <p>
                      With gusts up to{" "}
                      <span className="gust_info">{windGust}</span> mp/h
                    </p>
                  </div>
                  <div className="large_hurricane_svg_container">
                    <motion.svg
                      fill="#03213A"
                      className="large_hurricane_svg"
                      viewBox="0 0 32 32"
                      id="icon"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <style>{".cls-1{fill:none;}"}</style>
                      </defs>
                      <title>hurricane</title>
                      <motion.path
                       d="M22.6521,4.1821l-2.177,2.5142L19.0713,8.3174,20.7864,9.605A7.9361,7.9361,0,0,1,23.9963,16l.0008.0576.0017.0415c.018.4317.2412,10.1113-14.6538,11.7222l2.18-2.5176,1.4039-1.6211L11.2139,22.395A7.9361,7.9361,0,0,1,8.0037,16l-.0008-.0576-.0017-.0415C7.9832,15.47,7.7605,5.8071,22.6521,4.1821M24.9978,2c-.0164,0-.0327,0-.0493.001C5.2532,2.9146,6.0037,16,6.0037,16a9.975,9.975,0,0,0,4.0095,7.9946L6.2368,28.3555A1.0044,1.0044,0,0,0,7.0022,30c.0164,0,.0327,0,.0493-.001C26.7468,29.0854,25.9963,16,25.9963,16a9.9756,9.9756,0,0,0-4.0092-7.9946l3.7761-4.3609A1.0044,1.0044,0,0,0,24.9978,2Z"
                        />
                      <motion.rect
                        id="_Transparent_Rectangle_"
                        data-name="<Transparent Rectangle>"
                        className="cls-1"
                        width="32"
                        height="32"
                      />
                    </motion.svg>
                    <p className="hurricane_category_identifier">{category}</p>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}
