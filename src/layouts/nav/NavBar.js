import React from "react";
import classes from "./navbar.module.css";
import navData from "../../assets/data/navData";
import logo from "../../assets/brand/envie.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/userSlice";

/**
 * Component that renders nav bar
 * @component
 * @example
 * return (
 *   <NavBar />
 * )
 */
const NavBar = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const logged = user.token ? true : false;
  const email = logged ? user.email : "";
  const page = logged ? navData.homeUser : navData.homeAttendee;

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

  const handleLogout = () => {
    dispatch(userActions.logout());

    setTimeout(navigate("/login"), 5000);
  };

  return (
    <div className={classes.nav}>
      <NavLink to="/" activeClassName={classes.activeLink}>
        <div className={classes.logoContainer}>
          <img className={classes.logo} src={logo} alt="logo" />
        </div>
      </NavLink>
      {/* {console.log(page)} */}

      <div className={classes.routes}>
        {display && (
          <ul>
            {page[0].map((element, index) => {
              return (
                <div className={classes.list}>
                  <li
                    className={`${classes.navItem} ${
                      element.color ? classes.blue : ""
                    }`}
                  >
                    <NavLink
                      to={element.route}
                      activeClassName={classes.activeLink}
                    >
                      <div className={classes.wrapper}>
                        {element.icon}
                        <div>
                          {element.title}{" "}
                          {element.list && (
                            <KeyboardArrowDownIcon className={classes.arrow} />
                          )}
                        </div>
                      </div>
                    </NavLink>

                    {element.list && (
                      <ol className={classes.dropDown}>
                        {element.list.map((item, index) => {
                          return (
                            <li className={classes.navSubItem}>
                              <NavLink
                                to={item.route}
                                activeClassName={classes.activeLink}
                              >
                                <div>{item.title}</div>
                              </NavLink>
                            </li>
                          );
                        })}
                      </ol>
                    )}
                  </li>
                </div>
              );
            })}
          </ul>
        )}
        {!logged && !display && (
          <ul>
            <div className={classes.list}>
              <li className={`${classes.navItem} ${classes.navcollapse} `}>
                <MoreVertIcon className={classes.dots} />
                <ol className={classes.dropDown}>
                  {page[0].map((item, index) => {
                    return (
                      <li
                        className={`${classes.navSubItem} ${
                          item.color ? classes.blue : ""
                        }`}
                      >
                        <NavLink
                          to={item.route}
                          activeClassName={classes.activeLink}
                        >
                          {" "}
                          {item.title}{" "}
                        </NavLink>
                      </li>
                    );
                  })}
                </ol>
              </li>
            </div>
          </ul>
        )}
        <ul>
          {page[1].map((element, index) => {
            return (
              <>
                <li className={classes.navItem}>
                  <NavLink
                    to={element.route}
                    activeClassName={classes.activeLink}
                  >
                    <div className={classes.wrapper}>
                      {element.icon}
                      <div>
                        {element.inlineIcon} {element.title} {display && email}{" "}
                        {element.list && display && (
                          <KeyboardArrowDownIcon className={classes.arrow} />
                        )}
                      </div>
                    </div>
                  </NavLink>

                  {element.list && (
                    <ol className={classes.dropDown}>
                      {element.list.map((item, index) => {
                        return item.title === "Log out" ? (
                          <li
                            className={classes.navSubItem}
                            onClick={() => handleLogout()}
                          >
                            <div className={classes.activeLink}>
                              {" "}
                              {item.title}{" "}
                            </div>
                          </li>
                        ) : (
                          <li
                            className={`${classes.navSubItem} ${
                              item.color ? classes.blue : ""
                            }`}>
                            <NavLink
                              to={item.route}
                              activeClassName={classes.activeLink}>
                              {item.title}
                            </NavLink>
                          </li>
                        );
                      })}
                    </ol>
                  )}
                </li>
              </>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
