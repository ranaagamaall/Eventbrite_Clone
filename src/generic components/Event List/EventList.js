import React from "react";
import { useState, useEffect } from "react";
import EventCard from "../event card/EventCard";
import classes from "./eventList.module.css";
import axios from "../../requests/axios";
import routes from "../../requests/routes";
import moment from "moment";

const EventList = (props) => {
  const [Eventcards, SetEventcards] = useState([0, 0, 0, 0]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(true);

  async function getEventCards() {
    SetEventcards([0, 0, 0, 0]);
    setLoading(true);
    let response = "";
    let cat = props.category == "All" ? "" : props.category;
    let req = "";
    if (limit) {
      req =
        routes.paginatedevents +
        "?category=" +
        cat +
        "&lat=" +
        (props.location[0] ? props.location[0] : "") +
        "&lng=" +
        (props.location[1] ? props.location[1] : "") +
        "&time=" +
        props.time +
        "&isOnline=" +
        props.online +
        "&limit=8";
    } else {
      req =
        routes.paginatedevents +
        "?category=" +
        cat +
        "&lat=" +
        (props.location[0] ? props.location[0] : "") +
        "&lng=" +
        (props.location[1] ? props.location[1] : "") +
        "&time=" +
        props.time +
        "&isOnline=" +
        props.online;
    }

    try {
      response = await axios.get(req);
      SetEventcards(response.data.events);
      setLoading(false);
      props.detectCity(response.data.city);
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        SetEventcards([]);
        setLoading(false);
        return error.response;
      }
    }
  }

  useEffect(() => {
    getEventCards();
  }, [props.location, props.category, props.time, props.online, limit]);

  return (
    <div>
      <div className={classes.secheader}>
        {props.city ? <h3>Events in {props.city}</h3> : <h3>Events</h3>}
      </div>
      <div className={classes.list}>
        {Eventcards.length == 0 ? (
          <div className={classes.noevents}>
            <div>No Events on this Category</div>
          </div>
        ) : (
          Eventcards.map((card) => (
            <EventCard
              id={card._id}
              key={card._id}
              img={card.image}
              title={card.name}
              time={moment(card.startDate).format("MMMM Do YYYY")}
              location={card.address1}
              price={card.price} //Price attribute is not provided by backend response
              companyName={card.venueName} //Using venue name as the company name, as company name is not required
              load={loading}
            />
          ))
        )}
      </div>
      {!loading && Eventcards.length != 0 && (
        <div className={classes.moreBtn}>
          <button onClick={() => setLimit(!limit)} type="button">
            {limit ? "See more" : "See less"}
          </button>
        </div>
      )}
    </div>
  );
};

export default EventList;
