import React, { useState, useEffect } from "react";
import classes from "./basicInfo.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TfiText } from "react-icons/tfi";
import { TbMap2 } from "react-icons/tb";
import { RxCalendar } from "react-icons/rx";
import axios from "../../../requests/axios";
import routes from "../../../requests/routes";
import ErrorNotification from "../../../generic components/error message/ErrorNotification";
import { useNavigate } from "react-router-dom";
import categoryList from "../../../assets/data/dropDownCategory.js";
import moment from "moment/moment";
import { useSelector } from "react-redux";
import GenericModal from "../../../generic components/generic modal/GenericModal";
import { TiTick } from "react-icons/ti";

/**
 * Component that returns Creator's Basic Info page
 *
 * @component
 * @example
 * return(<CreatorBasicInfo />)
 */

const CreatorBasicInfo = (props) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const event = useSelector((state) => state.event);

  const [disabled, setDisabled] = useState(props.disable);
  const [cont, setContinue] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [errorMsg, setErrorMsg] = useState("");
  const [errorLink, setErrorLink] = useState("");
  const [errorLinkMsg, setErrorLinkMsg] = useState("");
  const [onlineEvent, setOnlineEvent] = useState("Venue");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (event.isOnline) {
      setOnlineEvent("Online Events");
    } else {
      setOnlineEvent("Venue");
    }
  }, []);
  var initialValues;
  if (disabled) {
    initialValues = {
      name: event.eventTitle,
      description: event.description,
      startDate: moment(event.startDate).format("YYYY-MM-DD"),
      endDate: moment(event.endDate).format("YYYY-MM-DD"),
      summary: event.summary,
      tickets: event.tickets,
      hostedBy: event.hostedBy,
      isPrivate: event.isPrivate,
      venueName: event.venueName,
      city: event.city,
      address1: event.address1,
      country: event.country,
      postalCode: event.postalCode,
      category: event.category,
      image: event.image,

      // Not used
      organizer: "",
      Locationpicked: onlineEvent,
      Datepicked: "Single Event",
      SDCheckbox: false,
      EDCheckbox: false,
      sTime: moment(event.startDate).format("hh:mm"),
      eTime: moment(event.endDate).format("hh:mm"),
      address2: event.address2,
      state: "",
    };
  } else {
    initialValues = {
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      summary: "",
      tickets: [],
      hostedBy: "",
      isPrivate: false,
      venueName: "",
      city: "",
      address1: "",
      country: "",
      postalCode: "",
      category: "",
      image: "",

      // Not used
      organizer: "",
      Locationpicked: "Venue",
      Datepicked: "Single Event",
      SDCheckbox: false,
      EDCheckbox: false,
      sTime: "",
      eTime: "",
      address2: "",
      state: "",
    };
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().max(75).required("Title is required."),
    startDate: Yup.date().min(moment(new Date()).format("MM-DD-YYYY"),"Start date must be later than "+moment(new Date()).format("DD-MM-YYYY")).required("Start Date is required."),
    endDate: Yup.date().min(
      Yup.ref('startDate'),
      "End date must be after Start Date"
    ).required("End Date is required."),
    sTime: Yup.string().required("Start Time is required."),
    eTime: Yup.string().required("End Time is required."),
    category: Yup.string().required("Category is required."),
  });

  /**
   * Submits the form signup data to the server
   * @namespace onSubmit
   * @param  {string} name      Event title
   * @param  {string} description description for the event creation,
   * @param {string} startDate date in format("YYYY-MM-DD"),
   * @param {string} endDate date in format("YYYY-MM-DD"),
   * @param {string} summary  summary for the event creation,
   * @param {string} tickets  tickets for the event creation,
   * @param {string} hostedBy  hostedBy for the event creation,
   * @param {string} isPrivate  isPrivate for the event creation,
   * @param {string} venueName  venueName for the event creation,
   * @param {string} city  city for the event creation,
   * @param {string} address1  address1 for the event creation,
   * @param {string} country  country for the event creation,
   * @param {string} postalCode  postalCode for the event creation,
   * @param {string} category  category for the event creation,
   * @param {string} image  image for the event creation,
   */

  async function sendData(data) {
    setSuccess(false);
    try {
      const request = await axios.post(routes.createEvent, data);
      setSuccess(true);
    } catch (err) {}
  }

  const handleSubmit = (data) => {
    let start = moment(data.startDate).format("YYYY-MM-DD");
    let end = moment(data.endDate).format("YYYY-MM-DD");
    console.log(start + "T" + data.sTime);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("startDate", start + "T" + data.sTime);
    formData.append("endDate", end + "T" + data.eTime);
    formData.append("category", data.category);
    // formData.append("summary", data.summary);
    // formData.append("description", data.description);

    if (data.Locationpicked === "Online Events") {
      formData.append("isOnline", true);
    } else if (data.Locationpicked === "Venue") {
      formData.append("venueName", data.venueName);
      formData.append("city", data.city);
      formData.append("address1", data.address1);
      formData.append("country", data.country);
      formData.append("postalCode", data.postalCode);
    }

    sendData(formData);
  };

  const accepthandle=() =>{
    navigate("/events");
  }

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        {errorMsg ? (
          <ErrorNotification
            mssg={errorMsg}
            linkmsg={errorLinkMsg}
            link={errorLink}
            signUp={true}
          />
        ) : null}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values }) => (
            <Form>
              <div className={classes.headerContainer}>
                <TfiText className={classes.logoImg} />
                <div className={classes.header}>
                  <h1>Basic Info</h1>
                  <p>
                    Name your event and tell event-goers why they should come.
                    Add details that highlight what makes it unique.
                  </p>
                </div>
              </div>
              <div className={classes.boxContainer}>
                <div className={classes.fieldContainer}>
                  <label className={classes.label}>
                    Event Title <p style={{ color: "red" }}> *</p>
                  </label>
                  <Field
                    className={classes.field}
                    id="name"
                    name="name"
                    autoComplete="off"
                    disabled={disabled}
                    data-testid="nameFieldInput"
                    placeholder="Be clear and descriptive"
                  />
                </div>
                <ErrorMessage name="name" component="span" />
              </div>
              <div className={classes.boxContainer}>
                <div className={classes.fieldContainer}>
                  <label className={classes.label}> Organizer</label>
                  <Field
                    className={classes.field}
                    name="organizer"
                    placeholder="Tell attendies who is organzing this event"
                    disabled={disabled}
                  />
                </div>
              </div>
              <div className={classes.boxContainer} style={{ maxWidth: "20%" }}>
                <div className={classes.fieldContainer}>
                  <label className={classes.label}> Add Category</label>
                  <Field
                    className={classes.field}
                    name="category"
                    component="select"
                    disabled={disabled}
                    data-testid="categoryFieldInput"
                  >
                    <option disabled selected value={""}>
                      Select a category
                    </option>
                    {categoryList.map((item) => (
                      <option value={item.title}>{item.title}</option>
                    ))}
                  </Field>
                </div>
                <ErrorMessage name="category" component="span" />
              </div>

              {/* Location */}
              <div className={classes.horizontal}>
                <hr />
              </div>
              <div className={classes.headerContainer}>
                <TbMap2 className={classes.logoImg} />
                <div className={classes.header}>
                  <h1>Location</h1>
                  <p>
                    Help people in the area discover your event and let
                    attendees know where to show up.
                  </p>
                </div>
              </div>
              <div className={classes.btnContainer}>
                <label className={classes.choosebtn}>
                  <Field
                    type="radio"
                    name="Locationpicked"
                    value="Venue"
                    data-testid="venueRadioInput"
                    disabled={disabled}
                  />
                  <p>Venue</p>
                </label>
                <label className={classes.choosebtn}>
                  <Field
                    type="radio"
                    name="Locationpicked"
                    value="Online Events"
                    data-testid="onlineEventsRadioInput"
                    disabled={disabled}
                  />
                  <p>Online Events</p>
                </label>
                <label className={classes.choosebtn}>
                  <Field
                    type="radio"
                    name="Locationpicked"
                    value="To be announced"
                    data-testid="locationRadioInput"
                    disabled={disabled}
                  />
                  <p>To be announced</p>
                </label>
              </div>
              {values.Locationpicked === "Online Events" && (
                <div className={classes.header}>
                  <p>
                    Online events have unique event pages where you can add
                    links to livestreams and more
                  </p>
                </div>
              )}
              {values.Locationpicked === "Venue" && (
                <>
                  <div className={classes.boxContainer}>
                    <div className={classes.fieldContainer}>
                      <label className={classes.label}>
                        Venue name <p style={{ color: "red" }}> *</p>
                      </label>
                      <Field
                        className={classes.field}
                        id="venueName"
                        name="venueName"
                        autoComplete="off"
                        disabled={disabled}
                        data-testid="venueNameFieldInput"
                        placeholder="eg: Madison Square Garden"
                      />
                    </div>
                    <ErrorMessage name="venueName" component="span" />
                  </div>

                  <div className={classes.date}>
                    <div
                      className={classes.boxContainer}
                      style={{ width: "45%" }}
                    >
                      <div className={classes.fieldContainer}>
                        <label className={classes.label}>
                          Address 1 <p style={{ color: "red" }}> *</p>
                        </label>
                        <Field
                          className={classes.field}
                          id="address1"
                          name="address1"
                          autoComplete="off"
                          disabled={disabled}
                          data-testid="address1FieldInput"
                          placeholder="eg: 155 5th street"
                        />
                      </div>
                      <ErrorMessage name="address1" component="span" />
                    </div>

                    <div
                      className={classes.boxContainer}
                      style={{ width: "45%" }}
                    >
                      <div className={classes.fieldContainer}>
                        <label className={classes.label}>Address 2</label>
                        <Field
                          className={classes.field}
                          id="address2"
                          name="address2"
                          autoComplete="off"
                          disabled={disabled}
                          data-testid="address2FieldInput"
                          placeholder="eg: Apt, Suite, Bldg (optional)"
                        />
                      </div>
                      <ErrorMessage name="address2" component="span" />
                    </div>

                    <div
                      className={classes.boxContainer}
                      style={{ width: "45%" }}
                    >
                      <div className={classes.fieldContainer}>
                        <label className={classes.label}>
                          City <p style={{ color: "red" }}> *</p>
                        </label>
                        <Field
                          className={classes.field}
                          id="city"
                          name="city"
                          autoComplete="off"
                          disabled={disabled}
                          data-testid="cityFieldInput"
                          placeholder="eg: New York"
                        />
                      </div>
                      <ErrorMessage name="city" component="span" />
                    </div>

                    <div
                      className={classes.boxContainer}
                      style={{ width: "17.5%" }}
                    >
                      <div className={classes.fieldContainer}>
                        <label className={classes.label}>State/Provision</label>
                        <Field
                          className={classes.field}
                          id="state"
                          name="state"
                          autoComplete="off"
                          disabled={disabled}
                          data-testid="stateFieldInput"
                          placeholder="eg: California"
                        />
                      </div>
                      <ErrorMessage name="state" component="span" />
                    </div>
                    <div
                      className={classes.boxContainer}
                      style={{ width: "17.5%" }}
                    >
                      <div className={classes.fieldContainer}>
                        <label className={classes.label}>
                          Postal code <p style={{ color: "red" }}> *</p>
                        </label>
                        <Field
                          className={classes.field}
                          id="postalCode"
                          name="postalCode"
                          autoComplete="off"
                          disabled={disabled}
                          data-testid="postalCodeFieldInput"
                          placeholder="eg: 9431"
                        />
                      </div>
                      <ErrorMessage name="postalCode" component="span" />
                    </div>

                    <div
                      className={classes.boxContainer}
                      style={{ width: "45%" }}
                    >
                      <div className={classes.fieldContainer}>
                        <label className={classes.label}>
                          Country <p style={{ color: "red" }}> *</p>
                        </label>
                        <Field
                          className={classes.field}
                          id="country"
                          name="country"
                          autoComplete="off"
                          disabled={disabled}
                          data-testid="countryFieldInput"
                          placeholder="eg: United States"
                        />
                      </div>
                      <ErrorMessage name="country" component="span" />
                    </div>
                  </div>
                </>
              )}

              {/* Date & Time */}
              <div className={classes.horizontal}>
                <hr />
              </div>
              <div className={classes.headerContainer}>
                <RxCalendar className={classes.logoImg} />
                <div className={classes.header}>
                  <h1>Date and time</h1>
                  <p>
                    Tell event-goers when your event starts and ends so they can
                    make plans to attend.
                  </p>
                </div>
              </div>
              <div className={classes.btnContainer}>
                <label className={classes.choosebtn}>
                  <Field
                    type="radio"
                    name="Datepicked"
                    value="Single Event"
                    disabled={disabled}
                    data-testid="singleEventRadioInput"
                  />
                  <p>Single Event</p>
                </label>
                <label className={classes.choosebtn}>
                  <Field
                    type="radio"
                    name="Datepicked"
                    value="Reccurring Event"
                    disabled={disabled}
                    data-testid="reccuringEventRadioInput"
                  />
                  <p>Reccurring Event</p>
                </label>
              </div>
              <div className={classes.header}>
                {values.Datepicked === "Single Event" ? (
                  <p>Single event happens once and can last multiple days</p>
                ) : (
                  <p>
                    You'll be able to set a schedule for your recurring event in
                    the next step. Event details and ticket types will apply to
                    all instances.
                  </p>
                )}
              </div>
              {values.Datepicked === "Single Event" && (
                <div className={classes.date}>
                  <div
                    className={classes.boxContainer}
                    style={{ width: "45%" }}
                  >
                    <div className={classes.fieldContainer}>
                      <label className={classes.label}>
                        Start Date <p style={{ color: "red" }}> *</p>
                      </label>
                      <Field
                        className={classes.field}
                        name="startDate"
                        type="date"
                        disabled={disabled}
                        data-testid="startDateFieldInput"
                      />
                    </div>
                    <ErrorMessage name="startDate" component="span" />
                  </div>

                  <div
                    className={classes.boxContainer}
                    style={{ width: "45%" }}
                  >
                    <div className={classes.fieldContainer}>
                      <label className={classes.label}>Start time</label>
                      <Field
                        className={classes.field}
                        name="sTime"
                        type="time"
                        disabled={disabled}
                        data-testid="sTimeFieldInput"
                      />
                    </div>
                    <ErrorMessage name="sTime" component="span" />
                  </div>

                  <div
                    className={classes.boxContainer}
                    style={{ width: "45%" }}
                  >
                    <div className={classes.fieldContainer}>
                      <label className={classes.label}>
                        End Date <p style={{ color: "red" }}> *</p>
                      </label>
                      <Field
                        className={classes.field}
                        name="endDate"
                        type="date"
                        disabled={disabled}
                        data-testid="endDateFieldInput"
                      />
                    </div>
                    <ErrorMessage name="endDate" component="span" />
                  </div>

                  <div
                    className={classes.boxContainer}
                    style={{ width: "45%" }}
                  >
                    <div className={classes.fieldContainer}>
                      <label className={classes.label}>End time</label>
                      <Field
                        className={classes.field}
                        name="eTime"
                        type="time"
                        disabled={disabled}
                        data-testid="eTimeFieldInput"
                      />
                    </div>
                    <ErrorMessage name="eTime" component="span" />
                  </div>
                </div>
              )}

              <div className={classes.checkboxContainer}>
                {values.Datepicked === "Single Event" && (
                  <div className={classes.checkbox}>
                    <Field
                      type="checkbox"
                      name="SDCheckbox"
                      data-testid="TOSCheckbox"
                      disabled={disabled}
                    />
                    <label>
                      <h5>Display start time.</h5>
                      The start time of your event will be displayed to
                      attendees.
                    </label>
                  </div>
                )}
                <div className={classes.checkbox}>
                  <Field
                    type="checkbox"
                    name="EDCheckbox"
                    data-testid="TOSCheckbox"
                    disabled={disabled}
                  />
                  <label>
                    <h5>Display end time.</h5>
                    The end time of your event will be displayed to attendees.
                  </label>
                </div>
              </div>

              <div className={classes.horizontal}>
                <hr />
              </div>
              {!disabled && (
                <div className={classes.btn} style={{ margin: "2rem auto" }}>
                  <button
                    type="submit"
                    className={classes.button}
                    data-testid="CreateBtn"
                  >
                    Save & Continue
                  </button>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
      {success && (
        <GenericModal
          header="Event Created"
          details={"You have succesfully created an Event."}
          icon={<TiTick className={classes.modalicon} />}
          confirmbtn='Explore Events'
          accepthandle={accepthandle}
        />
      )}
    </div>
  );
};

export default CreatorBasicInfo;
