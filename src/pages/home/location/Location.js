import React, { useState, useEffect, useRef } from "react";
import classes from "./location.module.css";
import { FaChevronDown } from "react-icons/fa";
// import axios from "../../../requests/axios";
// import routes from "../../../requests/routes";

/**
 * Component that renders and detects geolocation section in landing page
 *
 * @component
 * @example
 * return(<Location />)
 */

const Location = (props) => {
  const [location, setLocation] = useState([]);
  const [dropList, setDropList] = useState(false);
  const containerRef = useRef();

  /**
   * Function that Detects device geolocation
   * @namespace handleLocation
   * @param   {none}
   * @returns {void}
   */
  const handleLocation = async() => {
    await navigator.geolocation.getCurrentPosition(function (position) {
      props.onDetect([position.coords.latitude, position.coords.longitude])
    });     
  };

  useEffect(() => {
    (async () => {
      await handleLocation();
    })();
  }, []);


  useEffect(() => {
    window.onclick = (event) => {
      if (containerRef.current) {
        if (containerRef.current.contains(event.target)) {
          setDropList(true);
        }
        else {
          setDropList(false);
        }
      } else {
        setDropList(false);
      }
    };
  }, []);

  return (
    <div className={classes.component}>
      <h3 className={classes.title}>Popular in</h3>
      <div className={classes.container}>
        <div
          className={classes.dropContainer}
          onClick={() => setDropList(!dropList)}
          ref={containerRef}>
          <FaChevronDown className={classes.arrow} />
          <input
            type="text"
            className={classes.default}
            placeholder={"Choose a location"}
            value={props.city}
            data-testid="LocationInput"
            onInput={(e) => setLocation(e.target.value)}
          />
        </div>
        <ul
          className={classes.dropList}
          style={dropList ? { display: "unset" } : { display: "none" }}>
          <li onClick={handleLocation}>
            <svg viewBox="0 0 24 24">
              <g stroke="none" stroke-width="1" fill-rule="evenodd">
                <path d="M11 18.93A7.005 7.005 0 015.07 13H3v-2h2.07A7.005 7.005 0 0111 5.07V3h2v2.07A7.005 7.005 0 0118.93 11H21v2h-2.07A7.005 7.005 0 0113 18.93V21h-2v-2.07zM12 17a5 5 0 100-10 5 5 0 000 10zm0-3a2 2 0 110-4 2 2 0 010 4z"></path>
              </g>
            </svg>
            Use my current location
          </li>
          <li
            data-testid="OnlineEventsbtn"
            onClick={() => setLocation("Online events")}
          >
            <svg x="0" y="0" viewBox="0 0 24 24">
              <g>
                <path d="M19 4v1H5V4H3v16h2v-1h14v1h2V4h-2zm0 13H5V7h14v10z"></path>
              </g>
              <path d="M10 15l5-3-5-3z"></path>
            </svg>
            Browse online events
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Location;
