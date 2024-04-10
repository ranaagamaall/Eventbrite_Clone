import React from "react";
import classes from "./loader.module.css";
import { BarLoader } from "react-spinners";

const Loader = (props) => {

  return (
    <div className={classes.loader}>
      <BarLoader color={props.color} width={"100%"}/>
    </div>
  );
};

export default Loader;
