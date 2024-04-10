import React from "react";
import classes from "./whenANDwhere.module.css";
import moment from "moment";
import { AiTwotoneCalendar } from "react-icons/ai";
import { ImLocation } from "react-icons/im";

export default function WhenAndWhere(props) {
  return (
    <div className={classes.whenwherecontainer}>
      <div className={classes.whenwhereEvTitle}>
        <h2>When and Where</h2>
      </div>
      <div className={classes.whenwhereEvcontainer}>
        <div className={classes.whenwhereEvdescriptioncontainer}>
          <div className={classes.whenwhereEVIcons}>
            <AiTwotoneCalendar size={20} color="blue" />
          </div>

          <div className={classes.whenwhereEvdescription}>
            Date and Time
            <div className={classes.datetime}>{moment(props.startdate).format("llll")}</div>
          </div>
        </div>
        <div className={classes.whenwhereEvdescriptioncontainer}>
          <div className={classes.whenwhereEVIcons}>
            <ImLocation size={20} color="blue" />
          </div>

          <div className={classes.whenwhereEvdescription}>
            Location
            <div className={classes.datetime}>{props.location}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
