import React from "react";
import classes from "./aboutevent.module.css";
import { AiOutlineFieldTime } from "react-icons/ai";
import { TfiTicket } from "react-icons/tfi";
import {FaFacebookF} from "react-icons/fa";
import {FaFacebookMessenger} from "react-icons/fa";
import {FaLinkedinIn} from "react-icons/fa";
import {FaTwitter} from "react-icons/fa";
import {MdEmail} from "react-icons/md";

export default function AboutEvent(props) {
  return (
    <div className={classes.aboutcontainer}>
      <div className={classes.aboutEvTitle}>
        <h2>About this event</h2>
      </div>
      <div className={classes.aboutEvcontainer}>
        <div className={classes.aboutEvdescriptioncontainer}>
          <div className={classes.aboutEVIcons}>
            <AiOutlineFieldTime size={24} color="rgb(54,89,227)" />
          </div>

          <div className={classes.aboutEvdescription}>{props.duration}</div>
        </div>
        <div className={classes.aboutEvdescriptioncontainer}>
          <div className={classes.aboutEVIcons}>
            <TfiTicket size={24} color="rgb(54,89,227)" />
          </div>

          <div className={classes.aboutEvdescription}>Mobile e Tickets</div>
        </div>
      </div>
      <div className={classes.aboutEvSummary}>{props.summary}</div>
      <div className={classes.Share}>
        <h3>
          Share with friends
        </h3>
        <ul>
          <li> <div><FaFacebookF className={classes.shareIcons}/></div></li>
          <li> <div><FaFacebookMessenger className={classes.shareIcons} /></div></li>
          <li> <div><FaLinkedinIn className={classes.shareIcons} /></div></li>
          <li> <div><FaTwitter className={classes.shareIcons} /></div></li>
          <li> <div><MdEmail className={classes.shareIcons} /></div></li>
        </ul>
      </div>
    </div>

  );
}
