import classes from "./eventCard.module.css";
import { HiOutlineUser } from "react-icons/hi";

/**
 * Component that returns preview of the event as a card in creator view
 *
 * @component
 * @example
 * return(<CreatorPublish />)
 */
const CreatorEventCard = (props) => {
  const ticketIcon = (
    <svg viewBox="0 0 24 24">
      <path d="M10 13v-2h4v2zm6 5V6h-.4C15 7.4 13.8 8.4 12 8.4S9 7.4 8.4 6H8v12h.4c.6-1.4 1.8-2.4 3.6-2.4s3 1 3.6 2.4zM14 4h4v16h-4s0-2.4-2-2.4-2 2.4-2 2.4H6V4h4s0 2.4 2 2.4S14 4 14 4z"></path>
    </svg>
  );
  const followersIcon = (
    <svg x="0" y="0" viewBox="0 0 24 24">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12 18c-1.2 0-2.4-.3-3.5-.7.6-1.3 2-2.2 3.5-2.2s2.9.9 3.5 2.2c-1.1.4-2.3.7-3.5.7zm6.5-2.9c-.4.4-.8.8-1.3 1.1a5.989 5.989 0 00-10.6 0c-.5-.3-.9-.7-1.3-1.1L4 16.5c2.1 2.3 5 3.5 8 3.5s5.9-1.3 8-3.5l-1.5-1.4z"
      ></path>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12 4C9.7 4 7.8 5.9 7.8 8.2s1.9 4.2 4.2 4.2 4.2-1.9 4.2-4.2S14.3 4 12 4zm0 6.4c-1.2 0-2.2-1-2.2-2.2C9.8 7 10.8 6 12 6s2.2 1 2.2 2.2c0 1.2-1 2.2-2.2 2.2z"
      ></path>
    </svg>
  );
  const previewItem = (
    <svg viewBox="0 0 24 24">
      <path
        d="M18 18v2H4V6h7v2H6v10h10v-5h2zm1-11.586l-7.293 7.293-1.414-1.414L17.586 5H14V3h7v7h-2z"
        fill-rule="evenodd"
      ></path>
    </svg>
  );

  return (
    <div className={classes.container}>
      <div className={classes.image}>
        <img src={props.image} />
      </div>
      <div className={classes.info}>
        <h3>{props.title}</h3>
        <p>{props.date}</p>
        <p>{props.type}</p>
        <div className={classes.stats}>
          <span>
            {ticketIcon} ${props.tickets}
          </span>
          <span>
            {followersIcon} {props.followers}
          </span>
        </div>
        <hr></hr>
        <a className={classes.preview} href="kk">
          Preview your event {previewItem}
        </a>
      </div>
    </div>
  );
};

export default CreatorEventCard;
