import React from "react";
import classes from "./locationDetails.module.css";
import Maps from "./Maps";

const LocationDetails = () => {
  return (
    <div className={classes.container}>
        <Maps />
    </div>
  );
};

export default LocationDetails;
