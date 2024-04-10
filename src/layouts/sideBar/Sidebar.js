import React from "react";
import classes from "./sidebar.module.css";
import sideBarCreator from "../../assets/data/sideBarCreator";
import { NavLink } from "react-router-dom";
import logo from "../../assets/brand/logo.png";
import { useLocation } from 'react-router-dom';

/**
 * Component that renders creator side bar
 * @component
 * @example
 * return (
 *   <SideBar />
 * )
 */
const SideBar = (props) => {

    const { pathname } = useLocation();
    const list = sideBarCreator.list;

  return (
    <div className={props.show?classes.smallScreenSideBar:classes.sideBar}>
        <div className={classes.logoContainer}>
            <img src={logo} alt="logo" className={classes.logo}/>
        </div>
        <ul className={classes.iconsList}>
            {list.map((item) => {
                return(
                    <li key={item.key} className={classes.iconContainer}>
                        <NavLink 
                            to={item.route} className={({ isActive }) => isActive ? `${classes.activeLink}` : `${classes.normalLink}`}
                            isActive={() => ['/events', '/events/:id'].includes(pathname)} 
                            >
                            <li className={classes.iconItem}>
                                {item.icon}
                            </li>
                            <p>{item.title}</p>
                        </NavLink>
                    </li>
                );
            })}
        </ul>
    </div>
  );
};

export default SideBar;
