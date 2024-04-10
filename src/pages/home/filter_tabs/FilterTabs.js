import React, { useState } from "react";
import classes from "./FilterTabs.module.css";

import Location from "../location/Location";
import { NavLink } from "react-router-dom";
// import axios from "../../../requests/axios";
// import routes from "../../../requests/routes";

/**
 * Component that renders Filter tabs in Landing page
 *
 * @component
 * @example
 * return(<FilterTabs />)
 */

const FilterTabs = (props) => {
  const page = props.FilterTabsData.FilterTabsInfo;
  const [clicked, setIndexClicked] = useState(0);
  // const [events, setEvents] = useState([]);

  // const [city, setCity] = useState();


  //for selecting multiple filters ---- to make it usestate of indexclicked([1,0,0,0,0,0])---- if condition (clicked[index]==1)
  // function setclicked(index) {
  //   if (clicked[index] == 0) {
  //     let clickedcl = clicked;
  //     clickedcl[index] = 1;
  //     setIndexClicked((clicked) => [...clicked, clickedcl]);
  //   }
  // }
 
  function handleClick(i, title){
    setIndexClicked(i)

    const temp = title.replace("&", "%26")
    const filterOutPut = temp.split(" ").join("")

    if (i==2){
      props.setCategory("All")
      props.setTime("")
      props.setOnline("true")
    }
    else if (i == 3 || i==4 || i==5){
      props.setTime(filterOutPut.toLowerCase())
      props.setCategory("All")
      props.setOnline("")
    }
    else{
      props.setCategory(filterOutPut)
      props.setTime("")
      props.setOnline("")
    }
  }

  return (
    <div className={classes.container}>
      <Location onDetect={props.setLocation} city={props.city} />
      <div className={classes.Filter}>
        <ul>
          {page[0].map((element, index) => {
            return (
              <div>
                <li className={`${classes.FilterItem}`}>
                  <NavLink
                    to={element.route}
                    activeClassName={classes.activeLink}
                  >
                    <div>
                      <div
                        className={
                          index == clicked ? classes.clicked : classes.element
                        }
                        onClick={() => handleClick(index, element.title)}
                      >
                        {element.title}
                      </div>
                    </div>
                  </NavLink>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default FilterTabs;
