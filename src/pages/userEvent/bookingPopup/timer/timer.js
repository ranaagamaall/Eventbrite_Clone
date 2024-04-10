import React, { useState, useEffect } from "react";
import classes from "./timer.module.css";

const Timer = (props) => {
  const [clock, setClock] = useState(props.start); //start time
  const [timer, setTimer] = useState(""); // current time
  let finished;

  var timePeriodMillis = 1 * 60 * 1000; //20 minutes

  /**
   * function that calculates the current remaining time
   * @namespace updateTime
   *
   */
  function updateTime() {
    if (!finished) {
      const time = timePeriodMillis - (Date.now() - clock);
      var mins = Math.floor((time / 1000 / 60) % 60);
      var seconds = Math.floor((time / 1000) % 60);

      if (mins <= 0 && seconds <= 0) {
        props.onFinish();
        finished = true;
        seconds = 0;
        mins = 0;
      }
      mins = mins < 10 ? "0" + mins : mins;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      setTimer(mins + " : " + seconds);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer === "00:00") {
        clearInterval(interval);
      } else updateTime();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    { clock } && (
      <div className={classes.clock}>
        <div className={classes.time}>
          <p className={classes.numbers}>
            <span>Time left </span>
            {timer}
          </p>
        </div>
      </div>
    )
  );
};

export default Timer;
