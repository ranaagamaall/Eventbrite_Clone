import React from "react";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import classes from "./bookingform.module.css";
import * as Yup from "yup";
import logo from "../../../../assets/brand/envie.svg";
import Timer from "../timer/timer";
import ErrorNotification from "../../../../generic components/error message/ErrorNotification";

/**
 * Component that renders Booking Popup contains tickets and Info form
 * 
 * @component
 * @example
* return( <BookingForm
          setTimeout={timeout}
          onRegister={register}
          />)
*/

const BookingForm = (props) => {
  const [startTime, setTime] = useState(Date.now());
  const [tos, setTos] = useState(false);


  const initialValues = {
    firstName: "",
    surName: "",
    email: "",
    TOSCheckbox: false,
    updateCheckbox: true,
    emailCheckbox: true,
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please Enter a Valid Email")
      .required("Please enter a valid email"),
    firstName: Yup.string().required("First Name is required."),
    surName: Yup.string().required("Surname is required."),
    TOSCheckbox:Yup.bool().required("You must accept Envie's terms of service to complete this purchase.")
  });

  /**
   * function that triggers the function passed by the parent when form is submitted
   * @namespace handleSubmit
   *
   */
  function handleSubmit(data) {
    if(!data.TOSCheckbox) {
      setTos(true)
    }
    else{
      // console.log("show tickets bought");
      // console.log(props.ticketsBought);
      props.onRegister(data.firstName, data.surName, data.email,props.ticketsBought);
    }
  }

  /**
   * function that triggers the function passed by the parent when timer times out
   * @namespace handleTimeout
   *
   */
  function handleTimeout() {
    props.setTimeout();
  }

  return (
    <div className={classes.main}>
      <div className={classes.mainheader}>
        <h1>Checkout</h1>
        <Timer start={startTime} onFinish={handleTimeout} />
      </div>
      <div className={classes.contactInfo}>
        {tos? <ErrorNotification mssg="You must accept Envies' terms of service to complete this purchase"/> : null}

        <h2>Contact Information</h2>
        <div className={classes.form}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(props) => (
              <Form>
                <div className={classes.Namecontainer}>
                  <div className={classes.boxContainer}>
                    <div className={classes.NameField}>
                      <label>First Name</label>
                      <Field
                        type="text"
                        name="firstName"
                        autoComplete="off"
                        className={classes.Field}
                        data-testid="FirstNameInput"
                      />
                    </div>
                    <ErrorMessage name="firstName" component="span" />
                  </div>
                  <div className={classes.boxContainer}>
                    <div className={classes.NameField}>
                      <label>Surname</label>
                      <Field
                        type="text"
                        name="surName"
                        autoComplete="off"
                        className={classes.Field}
                        data-testid="SurNameInput"
                      />
                    </div>
                    <ErrorMessage name="surName" component="span" />
                  </div>
                </div>
                <div className={classes.emailContainer}>
                  <div className={classes.boxContainer}>
                    <div className={classes.NameField}>
                      <label>Email</label>
                      <Field
                        type="email"
                        name="email"
                        autoComplete="off"
                        className={classes.Field}
                        data-testid="EmailInput"
                      />
                    </div>
                    <ErrorMessage name="email" component="span" />
                  </div>
                </div>
                <div className={classes.checkboxContainer}>
                  <div className={classes.checkbox}>
                    <Field type="checkbox" name="updateCheckbox" data-testid="UpdateCheckbox"/>
                    <label onClick={props.checked}>
                      {" "}
                      Keep me updated on more events and news from this event
                      organizer.
                    </label>
                  </div>
                  <div className={classes.checkbox}>
                    <Field type="checkbox" name="emailCheckbox" data-testid="EmailCheckbox"/>
                    <label>
                      Send me emails about the best events happening nearby or
                      online.
                    </label>
                  </div>
                  <div className={classes.checkbox}>
                    <Field type="checkbox" name="TOSCheckbox" data-testid="TOSCheckbox"/>
                    <label>I accept the Envie Terms of Service.</label>
                  </div>
                </div>
                <div className={classes.registerfooter}>
                  <div>Powered By</div>
                  <img className={classes.logo} src={logo} alt="Logo" />
                </div>
                <div className={classes.registercontainer}>
                  <div className={classes.btn}>
                    <button type="submit" className={classes.button} data-testid="RegisterBtn">
                      Register
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
export default BookingForm;
