import React from "react";
import classes from "./loader.module.css";
import { ClipLoader } from "react-spinners";

const Loader = (props) => {
  return (
    <div className={classes.loader}>
      <ClipLoader color={props.color} size={100}  borderWidth={100} />
    </div>
  );
};

export default Loader;
