import React, { useState } from "react";
import classes from "./genericFilterTabs.module.css";
import { NavLink } from "react-router-dom";
// import axios from "../../../requests/axios";
// import routes from "../../../requests/routes";

/**
 * Component that renders generic Filter tabs
 *
 * @component
 * @example
 * return(<GenericFilterTabs />)
 */

const GenericFilterTabs = (props) => {
  const page = props.FilterTabsData.FilterTabsInfo;
  const [clicked, setIndexClicked] = useState(0);

  function handleClick(i, title) {
    setIndexClicked(i);
    props.clickedItem(i);
  }

  return (
    <div className={classes.container}>
      <div className={classes.Filter}>
        <ul>
          {page[0].map((element, index) => {
            return (
              <div>
                <li className={`${classes.FilterItem}`}>
                  {/* <NavLink
                    to={element.route}
                    activeClassName={classes.activeLink}
                  > */}
                  <div>
                    <div
                      className={
                        index == clicked ? classes.clicked : classes.element
                      }
                      onClick={() => handleClick(index, element.title)}>
                      {element.title}
                    </div>
                  </div>
                  {/* </NavLink> */}
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default GenericFilterTabs;
