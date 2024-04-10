import classes from "./errorNotification.module.css";
import React from "react";
import { Link } from "react-router-dom";
import {BiInfoCircle} from "react-icons/bi"


/**
 * Component that renders Error message
 * 
 * @component
 * @example
 * return(<ErrorNotification mssg={errorMsg} linkmsg={errorLinkMsg} link={errorLink}/>)
*/

const ErrorNotification = (props) => {
  return (
    <div className={classes.container}>
      {props.signUp?<BiInfoCircle className={classes.icon}/>:null}
      <div className={classes.errorMsg}>
        <p className={props.signUp?classes.msgSignUp:classes.msg}>{props.mssg}
          {props.linkmsg?
            <Link to={props.link}>
              <p className={classes.errorLink}>{props.linkmsg}</p>
            </Link>:null}
        </p>
      </div>
    </div>
  );
};

export default ErrorNotification;
