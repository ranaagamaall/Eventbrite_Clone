import classes from "./publish.module.css";
import CreatorEventCard from "./eventCard/CreatorEventCard";
import image from "../../../assets/imgs/events/event1.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState, useEffect } from "react";
import axios from "../../../requests/axios";
import routes from "../../../requests/routes";
import moment from "moment/moment";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ErrorNotification from "../../../generic components/error message/ErrorNotification"

/**
 * Component that returns Creator's Publish Event page
 *
 * @component
 * @example
 * return(<CreatorPublish />)
 */
const CreatorPublish = () => {
  const event = useSelector((state) => state.event);
  const navigate = useNavigate()
  const ticketsLink = "/events/" + event.eventId + "/tickets" 

  const [disable, setDisable] = useState(true);
  const [disableSubmit, setDisableSubmit] = useState(event.isPublished);
  const [disableForm, setDisableForm] = useState(event.tickets.length===0);


  const [buttonContent, setButtonContent] = useState("Publish");



  const initialValues = {
    isPrivate: (event.isPrivate).toString(),
    isScheduled: (event.isScheduled).toString(),
    isPublished: (event.isPublished).toString(),
    publishDate: moment().format("YYYY-MM-DD"),
    starttime: "",
    password: "",
    link: "link",
  };

  const [formValues, setFormValues] = useState(initialValues);


  /**
   * function that send the put request to publish an event
   * @namespace publishData
   */
  async function publishData(data) {
    console.log(data);
    console.log(event.eventId);
    try {
      const request = await axios.put(
        routes.createEvent + "/" + event.eventId,
        data
      );
      navigate("/user/event/" + event.eventId)
    } catch (err) {}
  }

  /**
   * function that compares initial form values to changed one to disable form submit when values = initial values
   * @namespace compare
   * @param   {object} data     current form data
   */
  function compare(data){
    if(!event.isPublished){
      return false
    }
    if (JSON.stringify(data) === JSON.stringify(initialValues)){
      setDisableSubmit(true)
      return true
    } else {
      setDisableSubmit(false)
      return false
    }
  }

  useEffect(() => {
    compare(formValues);
  }, []);

  const handleSubmit = (data) => {

    let start = moment(data.publishDate).format("YYYY-MM-DD");
    let sDate = new Date(start + " " + data.starttime);
    let startDate = sDate.toISOString();
    const formData = new FormData();
    formData.append("isPrivate", data.isPrivate === "true");
    formData.append("isScheduled", data.isScheduled === "true");
    formData.append(
      "isPublished",
      data.isScheduled === "false" && data.isPrivate === "false"
    );
    //if published event => public and scheduled
    if ((data.isScheduled === "true"))
      formData.append("publishDate", startDate);
    if (data.link === "pass") formData.append("password", data.password);
    publishData(formData);
  };

  const tipsIcon = (
    <svg viewBox="0 0 24 24">
      <path
        d="M15 22.5H9v-2h6zm0-4H9v-3.67a7 7 0 1 1 6 0zm-4-2h2v-3.05l.67-.24a5 5 0 1 0-3.34 0l.67.23z"
        fill="#39364f"
      ></path>
    </svg>
  );
  const arrowIcon = (
    <svg
      class="arrow-right-chunky_svg__eds-icon--arrow-right-chunky_svg"
      viewBox="0 0 24 24"
    >
      <path
        class="arrow-right-chunky_svg__eds-icon--arrow-right-chunky_base"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.5 5.5L16 11H4v2h12l-5.5 5.5L12 20l8-8-8-8z"
      ></path>
    </svg>
  );
  return (
    <>
      <div className={classes.container}>
        <div className={classes.publish}>
          <h1 className={classes.header}>Publish Your Event</h1>
          {/* TODO : add link*/}
          {disableForm && <ErrorNotification mssg="Create tickets in order to be able to publish your event"/>}
          <CreatorEventCard
            image={event.image}
            title={event.eventTitle}
            date={moment(event.startDate).format("DD MMM YYYY")+ ' at ' +moment(event.startDate).format("hh:mm")}
            type={!event.isOnline ? event.venueName : "Online Event"}
            tickets={event.tickets.length}
            followers="120"
          />
          <div className={classes.section2}>
            <Formik
              className={classes.form}
              initialValues={initialValues}
              onSubmit={handleSubmit}
              enableReinitialize

            >
              {({ values, setFieldValue }) => (
                <Form data-testid="PublishForm" >
                  <div className={classes.boxContainer}>
                    <div className={classes.fieldContainer} role="group">
                      <p className={classes.fieldTitle} data-testid="PublishInputHead1">
                        Who can see your event?
                      </p>
                      <label>
                        <Field type="radio" name="isPrivate" value="false" data-testid="PublishRadioPublic" onClick={()=>{setFormValues(values)}} disabled={disableForm}/>
                        <span data-testid="PublishRadioPublicContent">
                          Public
                          <p className={classes.fieldDesc} >
                            Shared on Eventbrite and search engines
                          </p>
                        </span>
                      </label>

                      <label>
                        <Field type="radio" name="isPrivate" value="true" data-testid="PublishRadioPrivate" onClick={()=>{setFormValues(values)}} disabled={disableForm}/>
                        <span data-testid="PublishRadioPrivateContent">
                          Private
                          <p className={classes.fieldDesc}>
                            Only available to a selected audience
                          </p>
                        </span>
                      </label>
                    </div>

                    {values.isPrivate === "true" && (
                      <>
                        <div className={classes.fieldContainer}>
                          <p className={classes.fieldTitle} data-testid="PublishInputHead2">
                            Choose your audience
                          </p>
                          <label className={classes.dropDown} role="group">
                            <span className={classes.span} data-testid="PublishDropDownContent">Audience</span>
                            <Field
                              className={classes.field}
                              name="link"
                              component="select"
                              data-testid="PublishDropDown"
                              onClick={()=>setFormValues(values)}
                            >
                              <option value="link" data-testid="PublishDropOption1">Anyone with link</option>
                              <option value="pass" data-testid="PublishDropOption2">
                                Only people with password
                              </option>
                            </Field>
                          </label>
                        </div>
                        {values.link === "pass" && (
                          <div className={classes.boxContainerInput}>
                            <div className={classes.fieldContainerInput}>
                              <label className={classes.label}>Password</label>
                              <Field
                                className={classes.field}
                                name="password"
                                placeholder="password"
                                data-testid="PublishPasswordField"
                                onClick={()=>setFormValues(values)}
                              />
                            </div>
                          </div>
                        )}
                      </>
                    )}
                    {!event.isPublished &&
                      <>
                        <div className={classes.fieldContainer} role="group">
                          {values.isPrivate === "true" ? (
                            <>
                              <p className={classes.fieldTitle} data-testid="PublishInputHead3">
                                When should we publish your event?
                              </p>
                              <label>
                                <Field
                                  type="radio"
                                  name="isScheduled"
                                  value="false"
                                  onClick={() => {
                                    setDisable(true);
                                    setButtonContent("Publish");
                                  }}
                                  data-testid="PublishRadioKeepPrivate"
                                />
                                No, keep it private
                              </label>
                              <label>
                                <Field
                                  type="radio"
                                  name="isScheduled"
                                  value="true"
                                  onClick={() => {
                                    setDisable(false);
                                    setButtonContent("Schedule");
                                  }}
                                  data-testid="PublishRadioShedule"
                                />
                                Yes, schedule to share publicly
                              </label>
                            </>
                          ) : (
                            <>
                              <p className={classes.fieldTitle} data-testid="PublishInputHead4">
                                Will this event ever be public?
                              </p>
                              <label>
                                <Field
                                  type="radio"
                                  name="isScheduled"
                                  value="false"
                                  onClick={() => {
                                    setDisable(true);
                                    setButtonContent("Publish");
                                  }}
                                  data-testid="PublishRadioPublishNow"
                                />
                                Publish Now
                              </label>
                              <label>
                                <Field
                                  type="radio"
                                  name="isScheduled"
                                  value="true"
                                  onClick={() => {
                                    setDisable(false);
                                    setButtonContent("Schedule");
                                  }}
                                  data-testid="PublishRadioShedule2"
                                />
                                Schedule for later
                              </label>
                            </>
                          )}
                        </div>

                        <div className={classes.containerstart}>
                          <div className={classes.datacontainer}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer components={[]}>
                                <DemoItem>
                                  <DatePicker
                                    className={`${disable && classes.disabled}`}
                                    defaultValue={dayjs(moment().format("YYYY-MM-DD"))}
                                    disabled={disable}
                                    name="publishDate"
                                    sx={{
                                      "& .MuiInputBase-input": {
                                        height: "17px",
                                        fontSize: 13,
                                        paddingBottom: "18px",
                                        paddingTop: "18px",
                                      },
                                    }}
                                    onChange={(date) => {
                                        setFieldValue(
                                          "salesstart",
                                          moment(date.$d, "YYYY-MM-DD").format(
                                            "YYYY-MM-DD"
                                          )
                                        ); // Update formik state directly
                                      }}
                                    data-testid="PublishDatePicker"

                                  />
                                </DemoItem>
                              </DemoContainer>
                            </LocalizationProvider>
                          </div>

                          <div
                            className={`${classes.fieldContainerDate} ${
                              disable && classes.disabled
                            } ${disable && classes.disabledBorder}`}
                          >
                            <label className={classes.label}>Start time</label>
                            <Field
                              className={classes.field}
                              name="starttime"
                              type="time"
                              disabled={disable}
                              data-testid="PublishTimePicker"

                            ></Field>
                          </div>
                        </div>
                      </>
                    }
                  </div>

                  <div className={classes.footer}>
                    <hr></hr>
                    <button
                      disabled={compare(values)}
                      type="submit"
                      className={classes.btn}
                      data-testid="PublishSubmit"
                    >
                      {buttonContent}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
            <div className={classes.tips}>
              <h3 className={classes.tipsHeader}>
                {tipsIcon} Tips before you publish
              </h3>
              <div className={classes.options}>
                <p>Create promo codes for your event {arrowIcon}</p>
                <p>Customize your order form {arrowIcon}</p>
                <p>Manage how you get paid {arrowIcon}</p>
                <p>Set your refund policy {arrowIcon}</p>
                <p>
                  Add this event to a collection to increase visibility{" "}
                  {arrowIcon}
                </p>
                <p>Develop a safety plan for your event {arrowIcon}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatorPublish;
