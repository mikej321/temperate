import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {formatDateCustom, displayTime} from "../utils/formatDate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';


export default function Navbar({ date, 
  time, 
  setTime, 
  pickedLocation, 
  name, 
  state, 
  stateAbbr,
  setSettingsClicked,
  dayNightClicked,
  setDayNightClicked,
  homeRef
}) {
  
  /* IMPORTANT
  
    Also, make it to where the recent searches populate immediately after you input something
    into the search. Right now, it requires a refresh before updating. This might involve
    messing with a useEffect dependency.

    When you hover over a specific card, I want to add an animation that scales the card (maybe by 1.2?)
    and *shakes* the card. I think this would be cool

    Add a flexbox container that will hold 'Nearby Locations'. The user will be able to click
    on this, which will change to recent locations that will be run by user's location stats.
    Add a framer motion animation for exits to make it look good. This will cut down on screen
    real estate
  */


    const [navClicked, setNavClicked] = useState(false);
    const {navDate, navYear} = formatDateCustom(date);
    const [stateAbb, setStateAbb] = useState(null);
    const [nextMode, setNextMode] = useState('night');
    
    const dayNightModeContainerRef = useRef(null);
    const mobileDayNightModeRef = useRef(null);

    const hamburgerRef = useRef(null);
    const settingsRef = useRef(null);

    const mobileMenuVariant = {
      'closed': {
        height: 0,
        transition: {
          duration: 0.2,
          ease: "easeInOut",
          when: "afterChildren",
          delayChildren: 0.3,
          staggerChildren: 0.05,
          staggerDirection: -1
        }
      },
      'open': {
        height: 300,
        transition: {
          duration: 0.2,
          ease: "easeInOut",
          when: "beforeChildren",
          staggerChildren: 0.1,
          delayChildren: 0.3
        }
      }
    }

    const mobileMenuChildrenVariant = {
      'closed': {
        opacity: 0,
        x: 10
      },
      'open': {
        opacity: 1,
        x: 0
      }
    }

    useEffect(() => {

    }, [])

    const handleDayNightClick = () => {
        setDayNightClicked((prev) => !prev);

        if (!homeRef.current.classList.contains('dark_mode')) {
          homeRef.current.classList.add('dark_mode');
          dayNightModeContainerRef.current.classList.add('clicked');
          setNextMode('day');
        } else if (homeRef.current.classList.contains('dark_mode')) {
          homeRef.current.classList.remove('dark_mode');
          dayNightModeContainerRef.current.classList.remove('clicked');
          setNextMode('night');
        }
        hamburgerRef.current.classList.remove('clicked');
        hamburgerRef.current.classList.add('closed');
        setNavClicked(false);
    }

    const handleNavClick = (e) => {

      if (!hamburgerRef.current.classList.contains('ready')) hamburgerRef.current.classList.add('ready');

      if (!navClicked) {
        setNavClicked(true);
        hamburgerRef.current.classList.remove('closed');
        hamburgerRef.current.classList.add('clicked');
      } else if (navClicked) {
        setNavClicked(false);
        hamburgerRef.current.classList.remove('clicked');
        hamburgerRef.current.classList.add('closed');
      }
    }

    useEffect(() => {
      const setNow = () => setTime(displayTime(new Date())); // I create a new date to put in displayTime here to update the time value for the page
      setNow(); // I set the time here for the first render

      let timer;
      const schedule = () => {
        const ms = 60000 - (Date.now() % 60000); // The formula for precisely displaying the time
        timer = setTimeout(() => {
          setNow(); // Display the new time value
          schedule(); // Run the function again
        }, ms); // The ms value precisely decides when the page should update the time
      }

      schedule(); // Run the schedule function to listen for minute changes to update the time

      return () => clearTimeout(timer);
    }, [])

    useEffect(() => {
      if (!state) return;

      setStateAbb(stateAbbr[state]);
    }, [state])

    const handleSettingsClicked = () => {
      if (!settingsRef.current) return;

      setSettingsClicked((prev) => !prev);
    }
    
  return (
    <div className="navbar">
      <div className="logo_container">
        <svg
          width="80"
          height="39"
          viewBox="0 0 80 39"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.93176 23.2727V25.1938H5.32979V33.1165H2.93766V25.1938H0.335693V23.2727H7.93176ZM16.4905 29.078C16.4905 29.3024 16.4766 29.5361 16.4486 29.7791H11.0348C11.0721 30.2653 11.226 30.6392 11.4965 30.9009C11.7763 31.1534 12.1167 31.2795 12.5177 31.2795C13.1145 31.2795 13.5296 31.0271 13.7627 30.5224H16.3088C16.1781 31.0365 15.9404 31.4993 15.5953 31.9105C15.2596 32.3219 14.8352 32.6444 14.3223 32.8781C13.8093 33.1119 13.2358 33.2286 12.6016 33.2286C11.8368 33.2286 11.156 33.0651 10.5592 32.7379C9.96235 32.4107 9.49603 31.9433 9.16027 31.3356C8.82459 30.728 8.65667 30.0175 8.65667 29.2042C8.65667 28.3909 8.81987 27.6804 9.14635 27.0728C9.48203 26.4652 9.94835 25.9977 10.5452 25.6705C11.1421 25.3434 11.8276 25.1798 12.6016 25.1798C13.357 25.1798 14.0285 25.3387 14.616 25.6565C15.2036 25.9744 15.6605 26.4278 15.987 27.0167C16.3227 27.6056 16.4905 28.2928 16.4905 29.078ZM14.0425 28.447C14.0425 28.0357 13.9026 27.7085 13.6228 27.4654C13.3431 27.2224 12.9933 27.1009 12.5736 27.1009C12.1726 27.1009 11.8322 27.2177 11.5524 27.4514C11.282 27.6851 11.1141 28.017 11.0488 28.447H14.0425ZM27.7128 25.2078C28.6827 25.2078 29.452 25.5023 30.0209 26.0912C30.5992 26.6801 30.8883 27.4982 30.8883 28.5451V33.1165H28.5101V28.8676C28.5101 28.3629 28.3749 27.9749 28.1044 27.7038C27.8433 27.4234 27.4796 27.2831 27.0133 27.2831C26.547 27.2831 26.1786 27.4234 25.9081 27.7038C25.6471 27.9749 25.5164 28.3629 25.5164 28.8676V33.1165H23.1384V28.8676C23.1384 28.3629 23.0031 27.9749 22.7326 27.7038C22.4716 27.4234 22.1078 27.2831 21.6415 27.2831C21.1752 27.2831 20.8068 27.4234 20.5364 27.7038C20.2752 27.9749 20.1447 28.3629 20.1447 28.8676V33.1165H17.7525V25.292H20.1447V26.2735C20.3872 25.9464 20.7042 25.6892 21.0959 25.5023C21.4876 25.306 21.9306 25.2078 22.4249 25.2078C23.0124 25.2078 23.5347 25.334 23.9916 25.5864C24.458 25.8389 24.8217 26.1988 25.0828 26.6661C25.3532 26.2362 25.7216 25.8856 26.188 25.6145C26.6543 25.3434 27.1625 25.2078 27.7128 25.2078ZM34.9534 26.3997C35.1865 26.0351 35.5083 25.7406 35.9187 25.5163C36.329 25.292 36.8092 25.1798 37.3596 25.1798C38.003 25.1798 38.5859 25.3434 39.1081 25.6705C39.6304 25.9977 40.0408 26.4652 40.3392 27.0728C40.6469 27.6804 40.8008 28.3863 40.8008 29.1902C40.8008 29.9942 40.6469 30.7046 40.3392 31.3216C40.0408 31.9292 39.6304 32.4014 39.1081 32.7379C38.5859 33.0651 38.003 33.2286 37.3596 33.2286C36.8186 33.2286 36.3384 33.1165 35.9187 32.8921C35.5083 32.6678 35.1865 32.378 34.9534 32.0227V36.8465H32.5612V25.292H34.9534V26.3997ZM38.3668 29.1902C38.3668 28.5919 38.1988 28.1245 37.8632 27.788C37.5367 27.4421 37.131 27.2691 36.6461 27.2691C36.1704 27.2691 35.7648 27.4421 35.429 27.788C35.1026 28.1339 34.9394 28.6059 34.9394 29.2042C34.9394 29.8025 35.1026 30.2746 35.429 30.6205C35.7648 30.9664 36.1704 31.1393 36.6461 31.1393C37.1217 31.1393 37.5274 30.9664 37.8632 30.6205C38.1988 30.2653 38.3668 29.7885 38.3668 29.1902ZM49.4142 29.078C49.4142 29.3024 49.4002 29.5361 49.3722 29.7791H43.9584C43.9956 30.2653 44.1495 30.6392 44.42 30.9009C44.6999 31.1534 45.04 31.2795 45.4412 31.2795C46.038 31.2795 46.4528 31.0271 46.6863 30.5224H49.2323C49.1016 31.0365 48.8638 31.4993 48.5188 31.9105C48.1832 32.3219 47.7587 32.6444 47.2459 32.8781C46.7326 33.1119 46.1591 33.2286 45.5252 33.2286C44.7602 33.2286 44.0796 33.0651 43.4827 32.7379C42.8858 32.4107 42.4196 31.9433 42.0838 31.3356C41.748 30.728 41.5802 30.0175 41.5802 29.2042C41.5802 28.3909 41.7434 27.6804 42.0698 27.0728C42.4056 26.4652 42.8718 25.9977 43.4688 25.6705C44.0656 25.3434 44.751 25.1798 45.5252 25.1798C46.2806 25.1798 46.9521 25.3387 47.5396 25.6565C48.1272 25.9744 48.584 26.4278 48.9106 27.0167C49.2463 27.6056 49.4142 28.2928 49.4142 29.078ZM46.9661 28.447C46.9661 28.0357 46.8262 27.7085 46.5464 27.4654C46.2666 27.2224 45.9169 27.1009 45.4972 27.1009C45.0959 27.1009 44.7558 27.2177 44.476 27.4514C44.2054 27.6851 44.0376 28.017 43.9724 28.447H46.9661ZM53.0684 26.596C53.3481 26.1661 53.6979 25.8295 54.1176 25.5864C54.5372 25.334 55.0032 25.2078 55.5164 25.2078V27.7459H54.859C54.2618 27.7459 53.8142 27.8768 53.516 28.1385C53.2175 28.3909 53.0684 28.8396 53.0684 29.4846V33.1165H50.6763V25.292H53.0684V26.596ZM56.184 29.1902C56.184 28.3863 56.3331 27.6804 56.6316 27.0728C56.9394 26.4652 57.3543 25.9977 57.8767 25.6705C58.3991 25.3434 58.9818 25.1798 59.6253 25.1798C60.1757 25.1798 60.6557 25.292 61.0662 25.5163C61.4859 25.7406 61.8076 26.0351 62.0314 26.3997V25.292H64.4236V33.1165H62.0314V32.0087C61.7984 32.3733 61.4719 32.6678 61.0522 32.8921C60.6417 33.1165 60.1617 33.2286 59.6113 33.2286C58.977 33.2286 58.3991 33.0651 57.8767 32.7379C57.3543 32.4014 56.9394 31.9292 56.6316 31.3216C56.3331 30.7046 56.184 29.9942 56.184 29.1902ZM62.0314 29.2042C62.0314 28.6059 61.8636 28.1339 61.5278 27.788C61.2012 27.4421 60.8004 27.2691 60.3247 27.2691C59.8492 27.2691 59.4435 27.4421 59.1077 27.788C58.7812 28.1245 58.6181 28.5919 58.6181 29.1902C58.6181 29.7885 58.7812 30.2653 59.1077 30.6205C59.4435 30.9664 59.8492 31.1393 60.3247 31.1393C60.8004 31.1393 61.2012 30.9664 61.5278 30.6205C61.8636 30.2746 62.0314 29.8025 62.0314 29.2042ZM70.5048 31.0832V33.1165H69.2878C68.4205 33.1165 67.7442 32.9061 67.2594 32.4855C66.7742 32.0555 66.532 31.359 66.532 30.3961V27.2831H65.5807V25.292H66.532V23.3849H68.9241V25.292H70.4909V27.2831H68.9241V30.4241C68.9241 30.6579 68.98 30.8262 69.0919 30.929C69.2039 31.0318 69.3901 31.0832 69.6516 31.0832H70.5048ZM79.1955 29.078C79.1955 29.3024 79.1815 29.5361 79.1536 29.7791H73.7399C73.777 30.2653 73.9309 30.6392 74.2015 30.9009C74.4812 31.1534 74.8214 31.2795 75.2227 31.2795C75.8194 31.2795 76.2343 31.0271 76.4677 30.5224H79.0137C78.883 31.0365 78.6452 31.4993 78.3003 31.9105C77.9645 32.3219 77.54 32.6444 77.0272 32.8781C76.514 33.1119 75.9405 33.2286 75.3066 33.2286C74.5415 33.2286 73.8609 33.0651 73.2642 32.7379C72.6671 32.4107 72.2011 31.9433 71.8653 31.3356C71.5296 30.728 71.3617 30.0175 71.3617 29.2042C71.3617 28.3909 71.5247 27.6804 71.8513 27.0728C72.1871 26.4652 72.6531 25.9977 73.2502 25.6705C73.8469 25.3434 74.5324 25.1798 75.3066 25.1798C76.062 25.1798 76.7335 25.3387 77.3211 25.6565C77.9086 25.9744 78.3654 26.4278 78.6919 27.0167C79.0277 27.6056 79.1955 28.2928 79.1955 29.078ZM76.7475 28.447C76.7475 28.0357 76.6076 27.7085 76.3278 27.4654C76.048 27.2224 75.6983 27.1009 75.2787 27.1009C74.8773 27.1009 74.5372 27.2177 74.2575 27.4514C73.9868 27.6851 73.819 28.017 73.7538 28.447H76.7475Z"
            fill="#0A191F"
          />
          <path
            d="M18.0043 16.9501C17.914 17.0648 17.8237 17.1794 17.7334 17.2941C19.0904 18.4324 20.6462 19.3253 22.2752 20.028C26.1894 21.7316 30.9487 22.1528 35.0398 20.2324C38.2961 18.7252 40.7562 15.8863 42.2019 12.6545C43.4961 9.52905 44.6184 5.19011 41.3486 1.98141L41.4268 2.05293C38.1499 -0.581667 34.4842 -0.257362 31.1188 0.837649C29.4568 1.46287 27.77 2.651 26.9024 4.47527C26.0204 6.301 26.1429 8.3222 26.6244 10.0281C26.8916 10.9873 27.2875 11.9102 27.7983 12.7614C31.0113 17.8686 36.8066 19.5746 41.953 20.4371C44.6418 20.848 47.3471 20.9764 50.0764 20.767L50.0688 20.7675C55.6214 20.2858 61.1655 19.4967 66.4599 17.4905C68.0219 16.77 70.0682 16.1323 70.6085 14.0945C70.4655 14.068 70.3222 14.0414 70.1788 14.0149C69.6044 15.4565 67.6608 15.9399 66.0971 16.4069C60.856 17.6973 55.3386 18.0439 49.9312 18.297L49.9237 18.2974C47.414 18.3918 44.8514 18.2218 42.3545 17.8389C37.5324 17.0754 32.4212 15.3106 30.0466 11.4072C29.6554 10.7549 29.354 10.056 29.1452 9.31726C26.7105 3.52437 35.936 0.839949 39.7755 3.70816L39.8536 3.77968C43.4511 7.68006 39.6542 16.1341 34.3592 18.8321C30.8272 20.7237 26.447 20.6599 22.5664 19.2762C20.9611 18.709 19.3886 17.9476 18.0043 16.9501Z"
            fill="#0A191F"
          />
        </svg>
      </div>
      <div
       className="hamburger_menu"
       ref={hamburgerRef}
       onClick={(e) => handleNavClick(e)}>
        <div className="bar bar_top"></div>
        <div className="bar bar_middle"></div>
        <div className="bar bar_bottom"></div>
      </div>
      <motion.div
       className="mobile_menu"
       variants={mobileMenuVariant}
       initial="closed"
       animate={navClicked ? "open" : "closed"}
       >
        <motion.a
         href=""
         variants={mobileMenuChildrenVariant}
         >Home</motion.a>
        <motion.a
         href=""
         variants={mobileMenuChildrenVariant}
         >Hourly</motion.a>
        <motion.a
         href=""
         variants={mobileMenuChildrenVariant}
         >Daily</motion.a>
        <motion.p
          ref={mobileDayNightModeRef}
          onClick={handleDayNightClick}
        >Switch to {nextMode} mode</motion.p>
      </motion.div>
      <div className="nav_links">
        <a href="">Home</a>
        <a href="">Hourly</a>
        <a href="">Daily</a>
      </div>
      <div className="date_time_container">
        <div className="date_container">
          <div className="date_day">{navDate}</div>
          <div className="date_year">{navYear}</div>
        </div>
        <div
         className="day_night_container"
         ref={dayNightModeContainerRef}
         onClick={handleDayNightClick}
         >
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.9535 27.8571C21.6598 27.8571 27.907 21.6211 27.907 13.9286C27.907 6.23603 21.6598 0 13.9535 0C6.24719 0 0 6.23603 0 13.9286C0 21.6211 6.24719 27.8571 13.9535 27.8571Z"
              fill="#FFFF00"
            />
          </svg>
          <svg
            width="18"
            height="24"
            viewBox="0 0 18 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.414062 22.7897C13.7429 19.0252 13.6054 8.1245 10.7663 0.06633C11.1827 0.28329 11.5911 0.52589 11.9896 0.79452C17.7141 4.65323 19.2265 12.4219 15.3678 18.1464C12.0264 23.1034 5.75306 24.9021 0.414062 22.7897Z"
              fill="#90A4AE"
            />
          </svg>
        </div>
        <div className="time_container">
            {/* real time goes here */}
            <div className="time">{time}</div>
        </div>
      </div>
      <div className="weather_alert_container">
        <p>Weather Alerts: </p>
        <p>0</p>
      </div>
      <div
       className="settings_container"
       ref={settingsRef}
       onClick={handleSettingsClicked}
       >
        <FontAwesomeIcon icon={faGear} size="2xl" />
      </div>
    </div>
  );
}
