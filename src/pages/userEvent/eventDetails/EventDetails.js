import React from "react";
import classes from "./eventdetails.module.css";
import moment from "moment";
import AboutEvent from "./aboutSection/AboutEvent";
import WhenAndWhere from "./whenANDwhereSection/WhenAndWhere";

export default function EventDetails({ event }) {
  return (
    <div className={classes.eventdetails}>
      <div className={classes.eventheader}>
        <div className={classes.eventdate}>
          {moment(event.startDate).format("MMM D")}
        </div>
        <div className={classes.eventtitle}>{event.name}</div>
        <div className={classes.eventsummary}>{event.summary}</div>
      </div>
      <WhenAndWhere
        location={event.address1}
        startdate={event.startDate}
        enddate={event.endDate}
      />
      <AboutEvent
        duration={moment
          .duration(moment(event.endDate).diff(moment(event.startDate)))
          .humanize()}
        summary={event.description}
      />
    </div>
  );
}
