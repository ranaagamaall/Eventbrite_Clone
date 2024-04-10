import classes from "./eventListCard.module.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { eventActions } from "../../store/eventSlice";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import monthDic from "../../assets/data/monthDictionary";

/**
 * Component that renders the event card in user view
 * @component
 * @example
 * return (
 *  <EventListCard 
          img="srcURL"
          title="Celebrating Century : Presidency University"
          time="Tue, Mar 14, 7:00 PM + 37 more events"
          location="Presidency University, Kolkata"
          price="Free"
          companyName="Presidency University"
          followersNo="100"
        />
 * )
 */

const EventListCard = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const eventMonthAbr= monthDic[0][moment(props.event.startDate).format('MM')];
  const eventMonth= monthDic[1][moment(props.event.startDate).format('MM')];
  const eventDay= moment(props.event.startDate).format('DD');
  const year = moment(props.event.startDate).format('YYYY');
  const gross = props.event.numberOfTicketsSold * props.event.price;

  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var d = new Date(moment(props.event.startDate).format('YYYY-MM-DD'));
  var dayName = days[d.getDay()];

  /**
   * function that sends the saves event infor in event slice, triggered when an event from the list is clicked on
   * @namespace handleEventClicked
   * @param {object}  event  chosen event info 
   */
  const handleEventClicked = (event) => {
    dispatch(
      eventActions.default({
        eventId: event._id,
        eventTitle: event.name,
        description: event.description,
        startDate: event.startDate,
        endDate: event.endDate,
        summary: event.summary,
        capacity: event.capacity,
        tickets: event.tickets,
        hostedBy: event.hostedBy,
        isPrivate: event.isPrivate,
        isOnline: event.isOnline,
        isPublished: event.isPublished,
        isScheduled: event.isScheduled,
        venueName: event.venueName,
        city: event.city,
        address1: event.address1,
        country: event.country,
        postalCode: event.postalCode,
        image: event.image,
        address2: event.address2,
        category: event.category,
        numberOfTicketsCapacity: event.numberOfTicketsCapacity,
        numberOfTicketsSold: event.numberOfTicketsSold,
      })
    );
    dispatch(
      eventActions.dateInfo({
        eventMonthAbr: eventMonthAbr,
        eventDay: eventDay,
        dayName: dayName,
        year: year,
      })
    );
    navigate("/events/" + event._id + "/basicinfo");
  };
  return (
    <div
      className={classes.event}
      onClick={() => handleEventClicked(props.event)}
    >
      <div className={classes.eventDetails}>
        <div className={classes.eventDate}>
          <h4>{eventMonthAbr}</h4>
          <p>{eventDay}</p>
        </div>
        <div className={classes.eventImgContainer}>
          <img src={props.event.image} alt="" />
        </div>
        <div className={classes.eventInfo}>
          <h4>{props.event.name}</h4>
          {props.event.isOnline ? 
            <p>Online Event</p> : 
            <>
              <p>{props.event.address1}</p>
              <p>{dayName}, {eventMonth} </p>
            </>}

            {props.event.isPrivate && <p>Private Event</p>}
        </div>
      </div>
      <div className={classes.eventStats}>
        <p className={classes.eventSold}>{props.event.numberOfTicketsSold} / {props.event.numberOfTicketsCapacity}</p>
        <div className={classes.line}></div>
      </div>
      <div className={classes.eventStats}>
        <p>${gross}.00</p>
      </div>
      <div className={classes.eventStats}>
        {props.event.isPublished?<p>Published</p>:<p>Draft</p>}
      </div>
    </div>
  );
};

export default EventListCard;
