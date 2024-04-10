import React from "react";
import classes from "./navbar.module.css";
import creatorNavData from "../../assets/data/creatorNavData";
import logo from "../../assets/brand/envie.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/userSlice";
import {AiOutlineAppstore} from 'react-icons/ai'
import SideBar from "../sideBar/Sidebar";

/**
 * Component that renders nav bar in creators view
 * @component
 * @example
 * return (
 *   <CreatorNav />
 * )
 */
const CreatorNav = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(useSelector((state) => state.user));
  const [sideBar,showSideBar] = useState(false)
  const logged = true;
  const email = logged ? user.email : "";
  const list = creatorNavData.list;

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const display = windowWidth > 940 ? true : false;

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  
  /**
 * handles logout by emptying user information in local storage
 * @namespace handleLogout
 */

  const handleLogout = () => {
    dispatch(userActions.logout());
    setTimeout(navigate("/login"), 5000);
  };

  return (
    <div className={classes.nav}>
      {sideBar && <SideBar show={sideBar}/>}
      <NavLink to="/" activeClassName={classes.activeLink}>
        <div className={classes.logoContainer}>
          <img className={classes.logo} src={logo} alt="logo" />
        </div>
      </NavLink>

      <div className={classes.routes}>
        <ul>
          <div className={classes.iconContainer} onClick={()=>showSideBar(!sideBar)}>
            <AiOutlineAppstore className={classes.icon}/>
          </div>
          <li className={`${classes.navItem} ${classes.navItemCreator}`}>
            <div className={`${classes.wrapper} ${classes.wrapperCreator}`}>
              <div className={classes.name}>
                <span className={classes.initials}>
                  {user.firstName[0]}
                  {user.lastName[0]}
                </span>
                {user.firstName} {user.lastName}
                <KeyboardArrowDownIcon className={classes.arrow} />
              </div>
            </div>

            <ol className={classes.dropDown}>
              {list.map((item, index) => {
                return (
                  <li className={`${classes.navSubItem} ${classes.dark}`} onClick={item.title === "Log out"? ()=>handleLogout(): undefined}>
                    <NavLink
                      to={item.route}
                      activeClassName={classes.activeLink}
                    >
                      {item.icon} {item.title}{" "}
                    </NavLink>
                  </li>
                );
              })}
            </ol>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CreatorNav;
