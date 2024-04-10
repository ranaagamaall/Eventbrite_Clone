import React, { useState, useEffect } from "react";
import classes from "./creatorHome.module.css";
import CreatorNav from "../../layouts/nav/CreatorNav";
import axios from "../../requests/axios";
import routes from "../../requests/routes";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/userSlice";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import SideBar from "../../layouts/sideBar/Sidebar";
import CreatorBasicInfo from "../CreatorEventDetails/creatorBasicInfo/CreatorBasicInfo";


/**
 * Component that returns Creator's main page
 *
 * @component
 * @example
 * return(<CreatorHomePage />)
 */
const CreatorHomePage = () => {
  const user = useSelector((state) => state.user);
  const id = user.id;
  const [name, setName] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**
   * function that sends the request that switchs user type from user to creator
   * @namespace switchCreator
   */
  async function switchCreator() {
    let response = "";
    try {
      response = await axios.get(routes.userToCreator + "/" + id);
      dispatch(
        userActions.creator({
          isCreator: response.data.isCreator,
        })
      );
      setName([user.firstName, user.lastName]);
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  }

  /**
   * function that gaurds the creator route => navigates to login page if user not logged in, switches to creator type if user type is 'user'
   * @namespace checkCreator
   */
  // const checkCreator = () => {
  //   if (user.loggedIn) {
  //     if(!user.isCreator)
  //     {
  //       switchCreator();
  //     } 
  //   } else {
  //     navigate("/login");
  //   }
  // };

  // useEffect(() => {
  //   checkCreator();
  // }, []);

  return (
    <>
      <CreatorNav/>
      <NavLink to="/events">
        <a className={classes.events}> <KeyboardArrowDownIcon/> Events</a>
      </NavLink>
      <div className={classes.container}>
        <CreatorBasicInfo disable={false}/>
      </div>
    </>
  );
};

export default CreatorHomePage;
