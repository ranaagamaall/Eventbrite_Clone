import React, { useState, useEffect } from "react";
import classes from "./home.module.css";
import NavBar from "../../layouts/nav/NavBar";
import Categories from "./categories/Categories";
// import EventCard from "../../generic components/event card/EventCard";
import Banner from "./banner/Banner";
import FilterTabs from "./filter_tabs/FilterTabs";
import EventList from "../../generic components/Event List/EventList";
import axios from "../../requests/axios";
import routes from "../../requests/routes";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/userSlice";
import FilterTabsData from"../../assets/data/FilterTabsData";

/**
 * Component that returns Home Page
 *
 * @component
 * @example
 * return(<HomePage />)
 */
const HomePage = () => {
  const user = useSelector((state) => state.user);
  const id = user.id;
  const [location, setLocation] = useState([]);
  const [category, setCategory] = useState("All");
  const [time, setTime] = useState("");
  const [city, setCity] = useState("");
  const [online,setOnline] = useState("");

  const dispatch = useDispatch();

  /**
   * function that sends the request that switchs user type from creator to user
   * @namespace switchUSer
   */
  async function switchUSer() {
    let response = "";
    try {
      response = await axios.get(routes.creatorToUser + "/" + id);
      dispatch(
        userActions.creator({
          isCreator: response.data.isCreator,
        })
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  }

  /**
   * function that switches to user type if user type is 'creator'
   * @namespace checkUser
   */
  const checkUser = () => {
    if (user.loggedIn && user.isCreator) {
      switchUSer();
    }
  };

  useEffect(() => {
    checkUser();
    console.log(user);
  }, [user]);

  return (
    <div className={classes.container}>
      <NavBar/>
      <Banner />

      <div className={classes.containerbox}>
        <FilterTabs setLocation={setLocation} setCategory={setCategory} setTime={setTime} setOnline={setOnline} city={city} FilterTabsData={FilterTabsData}/>
        <Categories />
        <EventList location={location} category={category} time={time} online={online} detectCity={setCity} city={city}/>
      </div>
    </div>
  );
};

export default HomePage;
