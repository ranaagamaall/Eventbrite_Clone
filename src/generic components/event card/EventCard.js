import classes from "./eventCard.module.css";
import React, { useState } from "react";
import { HiOutlineUser } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Skeleton } from 'antd';

/**
 * Component that renders the event card in user view
 * @component
 * @example
 * return (
 *  <EventCard 
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
const EventCard = (props) => {
  const [followerNo, setFollowersNo] = useState(Math.floor(Math.random() * 100));
  return (
    <Link to={`/user/event/${props.id}`} className={classes.card}>
      {props.load?
        <div className={classes.imgSkeleton}>
          <Skeleton.Avatar shape={"square"} size={100} active/>;
        </div>: 
        <div className={classes.cardImage}>
          <img src={props.img} alt="event_img" />
        </div>}
        
      {props.load?
      <div className={classes.txtSkeleton}>
        <Skeleton active />
      </div>:  
      <ul className={classes.cardContent}>
        <h3 data-testid="title">{props.title}</h3>
        <li className={classes.time}>{props.time}</li>
        <li className={classes.location}>
          <p>{props.location}</p>
          {props.price ? <p>Starts at {props.price} L.E.</p> :<p> Free</p>}
        </li>
        <li className={classes.company}>
          <p>{props.companyName}</p>
          <p>
            <HiOutlineUser size="13" /> {followerNo} followers
          </p>
        </li>
      </ul>
      }
    </Link>
  );
};

export default EventCard;


