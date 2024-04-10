import classes from "./addAttendee.module.css";
import React, { useEffect, useState } from "react";
import ErrorNotification from "../../../generic components/error message/ErrorNotification";

/**
 * Component that returns ticket row componenet in add attendee
 *
 * @component
 * @example
 * return(<TicketsRowComponent />)
 */

const TicketsRowComponent = (props) => {
  const [faceValue, setfaceValue] = useState(0);
  const [Quantity, setQuantity] = useState(0);
  const [Price, setPrice] = useState(props.price);
  // Quantity!==null&&props.index!==null && props.price!==null &&console.log("Ticket type["+props.index+"] price:"+props.price+"And its face value is:"+faceValue);
  useEffect(() => {
    setQuanArr();
    setfaceValue(Price * Quantity);
  }, [Quantity]);
  useEffect(() => {
    const newfaceValues = [...props.faceValues];
    // let newfaceValues = props.faceValues;
    newfaceValues[props.index] = Number(faceValue);
    props.setfaceValues(newfaceValues);
    // console.log(newfaceValues);
  }, [faceValue]);

    /**
   * function that reflects changes of qualinity in parent's array
   * @namespace setQuanArr
   */
  function setQuanArr() {
    // let newQuantityArr = props.QuantityArr;
    const newQuantityArr = [...props.QuantityArr];
    newQuantityArr[props.index] = Number(Quantity);
    // console.log(newQuantityArr);
    props.setQuantityArr(newQuantityArr);
  }
  return (
    <tr className={classes.datarow}>
      <td className={classes.tabledata}>{props.name}</td>
      <td className={classes.tabledata}>
        {props.sold}/{props.capacity}
      </td>
      <td className={classes.tabledata}>${Price}.00</td>
      <td className={classes.tabledata}>
        <div className={classes.fieldContainer}>
          <input
            id={"Q" + props.index}
            className={classes.field}
            onChange={function func(e) {
              e.target.value >= props.minQuantityPerOrder &&
              e.target.value <= props.maxQuantityPerOrder
                ? setQuantity(e.target.value)
                : setQuantity(0);
              setfaceValue(Quantity * Price);
            }}
            placeholder={Quantity}
          ></input>
        </div>
      </td>
      <td className={classes.tabledata}>
        <div className={classes.fieldContainer}>
          <label className={classes.label}>$</label>
          <input
            className={classes.faceValuefield}
            onChange={function func(e) {
              setfaceValue(e.target.value);
            }}
          ></input>
          <p className={classes.faceValuetext}>{faceValue}</p>
        </div>
      </td>
    </tr>
  );
};

export default TicketsRowComponent;
