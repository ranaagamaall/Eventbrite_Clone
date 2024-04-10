import React, { useEffect, useState } from "react";
import classes from "./userevent.module.css";
import NavBar from "../../layouts/nav/NavBar";
// import Footer from "../../layouts/footer/Footer";
import { useParams } from "react-router-dom";
import EventBanner from "./eventBanner/EventBanner";
// import LocationDetails from "./locationDetails/LocationDetails";
import axios from "../../requests/axios";
import routes from "../../requests/routes";
import BookingPopup from "./bookingPopup/BookingPopup";
import moment from "moment";
import EventDetails from "./eventDetails/EventDetails";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../store/userSlice";

/**
 * Component that returns Event page attendee veiw
 *
 * @component
 * @example
 * return(<UserEventPage />)
 */

const UserEventPage = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  let { _id } = useParams();
  const [event, setEvent] = useState({});

  /**
   * function gets the event data from the server by ID
   * @namespace getEvent
   */

  async function getEvent() {
    console.log(routes.events + "/" + _id);
    try {
      const response = await axios.get(routes.events + "/" + _id);
      console.log(response);
      setEvent(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getEvent();
  }, []);

  async function switchUSer() {
    let response = "";
    try {
      response = await axios.get(routes.creatorToUser + "/" + user.id);
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
      <NavBar />
      <EventBanner image={event.image} />
      <div className={classes.eventdetailscontainer}>
        <EventDetails event={event} />
        <BookingPopup
          eventtitle={event.name}
          date={moment(event.startDate).format("MMMM Do YYYY")}
          image={event.image}
        />
      </div>
      {/* <LocationDetails /> */}
    </div>
  );
};

export default UserEventPage;
