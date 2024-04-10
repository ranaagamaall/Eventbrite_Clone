import classes from "./addPromocodeForm.module.css";
import Drawer from "@mui/material/Drawer";
import { useState, useEffect } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import Time from "../../../../../assets/data/TimeOptions";
import axios from "../../../../../requests/axios";
import routes from "../../../../../requests/routes";
import { useSelector } from "react-redux";
// import CircularProgress from "@mui/material/CircularProgress";
import empty from "../../../../../assets/imgs/events/emptypromos.svg";
import GenericModal from "../../../../../generic components/generic modal/GenericModal";
import { TiTick } from "react-icons/ti";
import ErrorNotification from "../../../../../generic components/error message/ErrorNotification";
import CircleLoader from "../../../../../layouts/loader/CircleLoader";
import TicketModal from "../../../../../generic components/ticketsModal/TicketsModal";

/**
 * Component that returns Creator's Manage Promo codes form
 *
 * @component
 * @example
 * return(<AddPromocodeForm setdummydata={setdummydata} dummydata={dummydata} emptypromo={emptypromo} loadinglist={loadinglist}/>)
 */

const AddPromocodeForm = ({
  setdummydata,
  dummydata,
  emptypromo,
  loadinglist,
}) => {
  // const formikRef = React.useRef(null);
  const [success, setSuccess] = useState(false);
  const [loading, setloading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [errorLink, setErrorLink] = useState("");
  const [errorLinkMsg, setErrorLinkMsg] = useState("");
  const [state, setState] = React.useState({
    right: false,
  });
  const event = useSelector((state) => state.event);
  const [csv, setCsv] = useState(false);
  const [amountformopen, setamountformopen] = useState(false);
  const [selectedValuelimit, setSelectedValuelimit] = useState("Unlimited");
  const [scheduleopen, setscheduleopen] = useState(false);
  const [selectedValuestart, setSelectedValuestart] = useState("Now");
  // const [dateValuestart, setdateValuestart] = useState(
  //   moment().format("YYYY-MM-DD")
  // );
  const [scheduleopenend, setscheduleopenend] = useState(false);
  const [selectedValueend, setSelectedValueend] = useState(
    "When ticket sales end"
  );
  // const [dateValueend, setdateValueend] = useState(
  //   moment().format("YYYY-MM-DD")
  // );

  const [tickets, setTickets] = useState([]);
  const [selectedvaluetickets, setselectedvaluetickets] = useState(
    "All visible tickets"
  );
  const [alltickets, setAlltickets] = useState(true);
  const [csvfile, setCsvfile] = useState("");

  const [openticketsmodal, setOpenticketsmodal] = useState(false);
  const [updatedTickets, setupdatedTickets] = useState([]);

  const handleSelectedlimit = (selected) => {
    setSelectedValuelimit(selected);
    if (selected == "Limited to") {
      setamountformopen(true);
    } else {
      setamountformopen(false);
    }
  };

  const handleSelectedStart = (selected) => {
    setSelectedValuestart(selected);
    if (selected == "Now") {
      setscheduleopen(false);
    } else {
      setscheduleopen(true);
    }
  };

  // const handlestartDatechange = (date) => {
  //   setdateValuestart(moment(date.$d, "YYYY-MM-DD").format("YYYY-MM-DD"));
  // };

  const handleSelectedend = (selected) => {
    setSelectedValueend(selected);
    if (selected == "When ticket sales end") {
      setscheduleopenend(false);
    } else {
      setscheduleopenend(true);
    }
  };

  // const handleendDatechange = (date) => {
  //   setdateValueend(moment(date.$d, "YYYY-MM-DD").format("YYYY-MM-DD"));
  // };

  const handleTickets = (choose) => {
    setselectedvaluetickets(choose);
    if (choose == "All visible tickets") {
      setAlltickets(true);
    } else {
      setAlltickets(false);
    }
  };

  const handlefileclick = () => {
    let input2 = document.getElementById("input");
    input2.click();
  };

  /**
   * function that is is triggerd to add promo code manually 
   * @function sendData
   * @param data data

   */

  async function sendData(data) {
    console.log(data);
    setloading(true);
    setSuccess(false);
    try {
      const request = await axios.post(
        routes.promocode + "/" + event.eventId,
        data
      );
      console.log(request);
      setdummydata(!dummydata);
      toggleDrawer("right", false, csv);
      setloading(false);
      setSuccess(true);
    } catch (err) {
      setloading(false);
      setErrorMsg(err.response.data.message);
    }
  }

  /**
   * function that is is triggerd to add promo code using csv file
   * @function uploadData
   * @param data data

   */

  async function uploadData(data) {
    console.log(data);
    setloading(true);
    setSuccess(false);
    try {
      const request = await axios.post(
        routes.promocode + "/" + event.eventId + "/upload",
        data
      );
      console.log(request);
      setdummydata(!dummydata);
      toggleDrawer("right", false, csv);
      setloading(false);
      setSuccess(true);
    } catch (err) {
      setloading(false);
      setErrorMsg(err.response.data.message);
    }
  }

  /**
   * function that is is triggerd to submit promo code form
   * @function handleSubmit
   * @param data data

   */

  const handleSubmit = (data) => {
    console.log(tickets);
    let datasent = data;
    const formData = new FormData();
    if (!amountformopen) {
      delete datasent.limit;
    } else {
      datasent.limit = Number(datasent.limit);
      formData.append("limit", datasent.limit);
    }

    if (data.amountOff == "") {
      delete datasent.amountOff;
      datasent.percentOff = Number(datasent.percentOff);
      formData.append("percentOff", datasent.percentOff);
    } else {
      delete datasent.percentOff;
      datasent.amountOff = Number(datasent.amountOff);
      formData.append("amountOff", datasent.amountOff);
    }

    if (scheduleopen) {
      let sDate = new Date(data.dateValuestart + " " + data.starttime);
      let startDate = sDate.toISOString();
      datasent.startDate = startDate;
    } else {
      let sDate = new Date();
      let startDate = sDate.toISOString();
      datasent.startDate = startDate;
    }

    formData.append("startDate", datasent.startDate);

    delete datasent.starttime;
    delete datasent.dateValuestart;

    if (scheduleopenend) {
      let eDate = new Date(data.dateValueend + " " + data.endtime);
      let endDate = eDate.toISOString();
      datasent.endDate = endDate;
    } else {
      //get event end time
      datasent.endDate = event.endDate;
    }
    formData.append("endDate", datasent.endDate);
    delete datasent.endtime;
    delete datasent.dateValueend;

    if (alltickets) {
      let filledArray = new Array(tickets.length)
        .fill()
        .map((element, index) => tickets[index]._id);
      datasent.tickets = filledArray;
      formData.append("tickets", filledArray);
    } else {
      //get selected tickets
      let filledArray = updatedTickets.filter((ticket) => ticket.selected2 > 0);
      let filledArray2 = new Array(filledArray.length)
        .fill()
        .map((element, index) => filledArray[index]._id);
      console.log(filledArray2);
      datasent.tickets = filledArray2;
      formData.append("tickets", filledArray2);
    }

    if (csv) {
      // convert them to form data
      // --form 'file=@"/E:/projects/eventbrite/SW-BACKEND-Project/test.csv"' \
      let input2 = document.getElementById("input");
      console.log(input2.files[0]);
      if (input2.files[0]) {
        formData.append("file", input2.files[0]);
        uploadData(formData);
      }
    } else {
      console.log(datasent);
      sendData(datasent);
    }

    // Formik.resetForm();
  };

  const toggleDrawer = (anchor, open, csv) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setCsv(csv);
    setState({ ...state, [anchor]: open });
  };

  /**
   * function that is triggered to get tickets
   * @function getTickets

   */

  async function getTickets() {
    try {
      const response = await axios.get(
        routes.tickets + "/" + event.eventId + "/allTickets"
      );

      setTickets(response.data.tickets);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getTickets();
  }, []);

  const initialValues = {
    name: "",
    amountOff: "",
    percentOff: "",
    limit: "",
    starttime: "10:00 AM",
    endtime: "10:00 PM",
    tickets: [],
    dateValuestart: moment().format("YYYY-MM-DD"),
    dateValueend: moment().format("YYYY-MM-DD"),
  };

  const getValidationSchema = () => {
    let schema = Yup.object().shape({
      amountOff: Yup.number().test(
        "one-required",
        "Discount amount or percentage required",
        function (value) {
          return this.parent.percentOff || value;
        }
      ),
      percentOff: Yup.number().test(
        "one-required",
        "Discount amount or percentage required",
        function (value) {
          return this.parent.amountOff || value;
        }
      ),
    });
    if (!csv) {
      schema = schema.shape({
        name: Yup.string()
          .max(50, "Name must be at most 50 characters")

          .required("Provide a code name"),
      });
    }
    if (amountformopen) {
      schema = schema.shape({
        limit: Yup.number().required("Limit Amount is required"),
      });
    }
    if (scheduleopen) {
      schema = schema.shape({
        starttime: Yup.string().required("Start Time is required"),
        dateValuestart: Yup.date()
          .min(
            moment(new Date()).format("MM-DD-YYYY"),
            "Start date must be later than " +
              moment(new Date()).format("DD-MM-YYYY")
          )
          .required("Start Date is required."),
      });
    }
    if (scheduleopenend) {
      schema = schema.shape({
        endtime: Yup.string().required("End Time is required"),
        dateValueend: Yup.date()
          .min(Yup.ref("dateValuestart"), "End date must be after Start Date")
          .required("End Date is required."),
        // .test(
        //   "datetime",
        //   "End date&time must be later than start date&time",
        //   function () {
        //     const { dateValuestart, starttime, dateValueend, endtime } =
        //       this.parent;

        //     // Convert start time to 24-hour format
        //     const startTime24 = moment(starttime, ["h:mm A"]).format("HH:mm");

        //     // Convert end time to 24-hour format
        //     const endTime24 = moment(endtime, ["h:mm A"]).format("HH:mm");

        //     // Combine start date and time
        //     const startDateTime = moment(
        //       `${dateValuestart} ${startTime24}`,
        //       "YYYY-MM-DD HH:mm"
        //     );

        //     // Combine end date and time
        //     const endDateTime = moment(
        //       `${dateValueend} ${endTime24}`,
        //       "YYYY-MM-DD HH:mm"
        //     );

        //     return endDateTime.diff(startDateTime) > 0;
        //   }
        // ),
      });
    }
    return schema;
  };

  return (
    <div id="CreatorTicketsPromoCodesContainer">
      {!loadinglist && (
        <div id="CreatorTicketsaddPromoCodesContainer">
          {emptypromo ? (
            <div
              id="CreatorTicketsemptyPromoCodesContainer"
              className={classes.emptypromos}>
              <div
                id="CreatorTicketsemptyPromoCodesdescription"
                className={classes.emptypromosdesc}>
                <div
                  id="CreatorTicketsemptyPromoCodesheadersection"
                  className={classes.emptypromossec}>
                  <div
                    id="CreatorTicketsemptyPromoCodesheader"
                    className={classes.mainsectionheader}>
                    Attract more attendees with promo codes
                  </div>
                  <div
                    id="CreatorTicketsemptyPromoCodesparaI"
                    className={classes.emptypromosumm}>
                    With promo codes, you can offer reduced prices with discount
                    codes or reveal hidden tickets to attendees with access
                    codes.
                  </div>
                  <div
                    id="CreatorTicketsemptyPromoCodesparaII"
                    className={classes.emptypromosumm}>
                    You can create codes or upload a CSV to import ones you’ve
                    already made.
                  </div>
                </div>
                <div
                  id="CreatorTicketsemptyPromoCodesimagecontainer"
                  className={classes.emptyimg}>
                  <img
                    id="CreatorTicketsemptyPromoCodesimage"
                    src={empty}
                    alt="Empty-PromoList"
                  />
                </div>
              </div>
              <div
                id="CreatorTicketsemptyPromoCodesbuttonscontainer"
                className={classes.modalemptybtns}>
                <div
                  id="CreatorTicketsemptyPromoCodesbuttonCSVcontainer"
                  className={classes.btn}>
                  <Button
                    id="CreatorTicketsemptyPromoCodesbuttonCSV"
                    className={classes.selbutton}
                    onClick={toggleDrawer("right", true, true)}
                    data-testid="AddTicketButton">
                    Upload CSV
                  </Button>
                </div>
                <div
                  id="CreatorTicketsemptyPromoCodesbuttoncreatecontainer"
                  className={classes.btn}>
                  <Button
                    id="CreatorTicketsemptyPromoCodesbuttoncreate"
                    className={classes.button}
                    onClick={toggleDrawer("right", true, false)}
                    data-testid="AddTicketButton">
                    Create promo code
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div
              id="CreatorTicketsPromoCodesbuttonscontainer"
              className={classes.modalbtns}>
              <div
                id="CreatorTicketsPromoCodesbuttonCSVcontainer"
                className={classes.btn}>
                <Button
                  id="CreatorTicketsPromoCodesbuttonCSV"
                  className={classes.selbutton}
                  onClick={toggleDrawer("right", true, true)}
                  data-testid="AddTicketButton">
                  Upload CSV
                </Button>
              </div>
              <div
                id="CreatorTicketsPromoCodesbuttonaddcontainer"
                className={classes.btn}>
                <Button
                  id="CreatorTicketsPromoCodesbuttonadd"
                  className={classes.button}
                  onClick={toggleDrawer("right", true, false)}
                  data-testid="AddTicketButton">
                  Add Code
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      <SwipeableDrawer
        id="CreatorTicketsPromoCodesSwipe"
        anchor={"right"}
        open={state["right"]}
        // onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}
        BackdropProps={{
          invisible: true,
        }}
        PaperProps={{
          style: {
            height: "calc(100% - 60px)",
            marginRight: "auto",
            marginLeft: "auto",
            marginTop: 60,
          },
        }}>
        <Box
          id="CreatorTicketsPromoCodesSwipeBox"
          className={classes.box}
          sx={{ width: 390 }}>
          <div
            id="CreatorTicketsPromoCodesSwipeheadercontainer"
            className={classes.headercontainer}>
            <p
              id="CreatorTicketsPromoCodesSwipeheader"
              className={classes.ticketp}>
              Add code
            </p>
          </div>
          {loading ? (
            <>
              {/* <div className={classes.loading}>
                <CircularProgress color="success" size={80} />
              </div> */}
              <CircleLoader color={"#4be1a0"} />
            </>
          ) : (
            <Formik
              initialValues={initialValues}
              validationSchema={getValidationSchema()}
              onSubmit={handleSubmit}>
              {({ values, setFieldValue, resetForm }) => (
                <Form className={classes.form}>
                  <div className={classes.forminfo}>
                    {errorMsg ? (
                      <ErrorNotification
                        mssg={errorMsg}
                        linkmsg={errorLinkMsg}
                        link={errorLink}
                      />
                    ) : null}
                    {!csv ? (
                      <div className={classes.boxContainer}>
                        <div className={classes.fieldContainer}>
                          <label className={classes.label}>Code name</label>
                          <Field
                            id="CreatorTicketsPromoCodesNameInput"
                            data-testid="CreatorTicketsPromoCodesNameInput"
                            className={classes.field}
                            name="name"
                            autoComplete="off"
                            placeholder="General Admission"
                          />
                        </div>

                        <ErrorMessage name="name" component="span" />

                        <div className={classes.namep}>
                          Customers can also access this code via custom URL
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className={classes.limitcontainer}>
                          <div className={classes.emptypromosumm}>
                            Upload up to 500 codes from a .csv or .txt file.
                          </div>
                          <div className={classes.emptypromosumm}>
                            Separate codes with commas, or list them on separate
                            lines.
                          </div>
                          <div className={classes.emptypromosumm}>
                            Spaces, apostrophes, and special characters (except:
                            -_ , @ . ) are not allowed.
                          </div>
                          <div>
                            <div
                              data-testid="CreatorTicketsPromoCodesCSVInput"
                              className={classes.uploadBtn}
                              onClick={handlefileclick}>
                              <div className={classes.uploadBtnicon}>
                                <svg viewBox="0 0 24 24">
                                  <g fill-rule="evenodd">
                                    <path d="M18 3h-3V2H9v1H6.052L6 4H4v18h16V4h-2V3zm-1 2H7V4v.026h2l1.027.004L10.025 3H14v1h3v1zM7 19V8H6v12h12V8h-1v11H7zm-2 2V5h1v-.159V6h12V5h1v16H5zm4-9v1h6v-1H9zm0-3v1h6V9H9zm0 6v1h6v-1H9z"></path>
                                  </g>
                                </svg>
                              </div>
                              <div className={classes.headercontainer2}>
                                Import Codes
                              </div>
                            </div>
                            <input
                              style={{ display: "none" }}
                              id="input"
                              type="file"
                              className={classes.customfileinput}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className={classes.limitcontainer}>
                      <div className={classes.containerstart}>
                        <div className={classes.boxContainer}>
                          <div className={classes.fieldContainer}>
                            <label className={classes.label}>
                              Ticket limit
                            </label>
                            <Field
                              id="CreatorTicketsPromoCodeslimitedInput"
                              data-testid="CreatorTicketsPromoCodeslimitedInput"
                              className={classes.field}
                              name="ticketlimitoption"
                              autoComplete="off"
                              component="select"
                              value={selectedValuelimit}
                              onChange={(e) =>
                                handleSelectedlimit(e.target.value)
                              }>
                              <option value="Limited to">Limited to</option>
                              <option value="Unlimited">Unlimited</option>
                            </Field>
                          </div>
                        </div>
                        {amountformopen ? (
                          <>
                            <div className={classes.boxContainer}>
                              <div className={classes.fieldContainer}>
                                <label className={classes.label}>Amount</label>
                                <div className={classes.presuffix}>
                                  <Field
                                    id="CreatorTicketsPromoCodesLimitInput"
                                    data-testid="CreatorTicketsPromoCodeslimitInput"
                                    className={classes.field}
                                    name="limit"
                                    autoComplete="off"
                                  />
                                  <p>tickets</p>
                                </div>
                              </div>
                              <ErrorMessage name="limit" component="span" />
                            </div>
                          </>
                        ) : null}
                      </div>
                      <div className={classes.namep}>
                        Total number of tickets that can be purchased with this
                        code
                      </div>
                    </div>

                    <div className={classes.limitcontainer}>
                      <div className={classes.headercontainer2}>
                        Discount Amount
                      </div>
                      <div className={classes.containerstart2}>
                        <div className={classes.boxContainer}>
                          <div className={classes.fieldContainer}>
                            {/* <div className={classes.container2}> */}
                            {/* <span className={classes.dollar}>$</span> */}
                            <p className={classes.egy}>E£</p>
                            <Field
                              id="CreatorTicketsPromoCodesAmountOffInput"
                              data-testid="CreatorTicketsPromoCodesAmountOffInput"
                              className={classes.field}
                              name="amountOff"
                              placeholder="0.00"
                              type="text"
                              autoComplete="off"
                              disabled={values.percentOff !== ""}
                            />
                            {/* </div> */}
                          </div>
                        </div>

                        <div className={classes.insidep}>or</div>

                        <div className={classes.boxContainer}>
                          <div className={classes.fieldContainer}>
                            {/* <div className={classes.container2}> */}
                            {/* <span className={classes.dollar}>$</span> */}
                            <Field
                              id="CreatorTicketsPromoCodesPercentOffInput"
                              data-testid="CreatorTicketsPromoCodesPercentOffInput"
                              className={classes.field}
                              name="percentOff"
                              placeholder="0.00"
                              type="text"
                              autoComplete="off"
                              disabled={values.amountOff !== ""}
                            />
                            <p className={classes.egy}>%</p>
                            {/* </div> */}
                          </div>
                        </div>
                      </div>

                      <ErrorMessage name="percentOff" component="span" />
                    </div>

                    <div className={classes.limitcontainer}>
                      <div className={classes.headercontainer2}>
                        Promo code starts
                      </div>
                      <FormControl>
                        <RadioGroup
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name="controlled-radio-buttons-group"
                          value={selectedValuestart}
                          onChange={(e) => handleSelectedStart(e.target.value)}>
                          <FormControlLabel
                            id="CreatorTicketsPromoCodesStartDateRadioButtonInputNow"
                            data-testid="CreatorTicketsPromoCodesStartDateRadioButtonInputNow"
                            value="Now"
                            control={<Radio />}
                            label="Now"
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: 20,
                              },
                              "& .MuiTypography-root": {
                                fontSize: 13,
                                fontWeight: 4,
                                color: "rgb(57, 54, 79)",
                              },
                            }}
                          />
                          <FormControlLabel
                            id="CreatorTicketsPromoCodesStartDateRadioButtonInputLater"
                            data-testid="CreatorTicketsPromoCodesStartDateRadioButtonInputLater"
                            value="Scheduledtime"
                            control={<Radio />}
                            label="Scheduled time"
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: 20,
                              },
                              "& .MuiTypography-root": {
                                fontSize: 13,
                                fontWeight: 4,
                                color: "rgb(57, 54, 79)",
                              },
                            }}
                          />
                        </RadioGroup>
                      </FormControl>
                    </div>

                    {scheduleopen ? (
                      <div
                        className={classes.limitcontainer}
                        style={{ marginTop: "0" }}>
                        <div className={classes.containerstart}>
                          <div className={classes.boxContainer}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer components={[]}>
                                <DemoItem>
                                  <DatePicker
                                    defaultValue={dayjs(
                                      initialValues.dateValuestart
                                    )}
                                    id="CreatorTicketsPromoCodesStartDateInput"
                                    data-testid="CreatorTicketsPromoCodesStartDateInput"
                                    onChange={(date) =>
                                      setFieldValue(
                                        "dateValuestart",
                                        moment(date.$d, "YYYY-MM-DD").format(
                                          "YYYY-MM-DD"
                                        )
                                      )
                                    }
                                    sx={{
                                      "& .MuiInputBase-input": {
                                        height: "2rem",
                                        fontSize: 13,
                                        paddingBottom: "1.8rem",
                                        paddingTop: "1.8rem",
                                      },
                                    }}
                                  />
                                </DemoItem>
                              </DemoContainer>
                            </LocalizationProvider>

                            <ErrorMessage
                              name="dateValuestart"
                              component="span"
                            />
                          </div>

                          <div
                            className={classes.boxContainer}
                            style={{ paddingTop: "0.9rem" }}>
                            <div className={classes.fieldContainer}>
                              <label className={classes.label}>
                                Start time
                              </label>
                              <Field
                                id="CreatorTicketsPromoCodesStarttimeInput"
                                data-testid="CreatorTicketsPromoCodesStarttimeInput"
                                className={classes.field}
                                name="starttime"
                                component="select">
                                {Time.options.map((item, index) => {
                                  return (
                                    <option
                                      key={"AddPromoCodeStartTime" + index}
                                      id={"AddPromoCodeStartTime" + index}
                                      value={item}>
                                      {item}
                                    </option>
                                  );
                                })}
                              </Field>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}

                    <div className={classes.limitcontainer}>
                      <div className={classes.headercontainer2}>
                        Promo code ends
                      </div>
                      <FormControl>
                        <RadioGroup
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name="controlled-radio-buttons-group"
                          value={selectedValueend}
                          onChange={(e) => handleSelectedend(e.target.value)}>
                          <FormControlLabel
                            id="CreatorTicketsPromoCodesEndDateRadioButtonInputticketene"
                            data-testid="CreatorTicketsPromoCodesEndDateRadioButtonInputticketend"
                            value="When ticket sales end"
                            control={<Radio />}
                            label="When ticket sales end"
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: 20,
                              },
                              "& .MuiTypography-root": {
                                fontSize: 13,
                                fontWeight: 4,
                                color: "rgb(57, 54, 79)",
                              },
                            }}
                          />
                          <FormControlLabel
                            value="Scheduledtime"
                            id="CreatorTicketsPromoCodesEndDateRadioButtonInputLater"
                            data-testid="CreatorTicketsPromoCodesEndDateRadioButtonInputLater"
                            control={<Radio />}
                            label="Scheduled time"
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: 20,
                              },
                              "& .MuiTypography-root": {
                                fontSize: 13,
                                fontWeight: 4,
                                color: "rgb(57, 54, 79)",
                              },
                            }}
                          />
                        </RadioGroup>
                      </FormControl>
                    </div>

                    {scheduleopenend ? (
                      <div
                        className={classes.limitcontainer}
                        style={{ marginTop: "0" }}>
                        <div className={classes.containerstart}>
                          <div className={classes.boxContainer}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer components={[]}>
                                <DemoItem>
                                  <DatePicker
                                    id="CreatorTicketsPromoCodesEndDateInput"
                                    data-testid="CreatorTicketsPromoCodesEndDateInput"
                                    defaultValue={dayjs(
                                      initialValues.dateValueend
                                    )}
                                    onChange={(date) =>
                                      setFieldValue(
                                        "dateValueend",
                                        moment(date.$d, "YYYY-MM-DD").format(
                                          "YYYY-MM-DD"
                                        )
                                      )
                                    }
                                    sx={{
                                      "& .MuiInputBase-input": {
                                        height: "2rem",
                                        fontSize: 13,
                                        paddingBottom: "1.8rem",
                                        paddingTop: "1.8rem",
                                      },
                                    }}
                                  />
                                </DemoItem>
                              </DemoContainer>
                            </LocalizationProvider>

                            <ErrorMessage
                              name="dateValueend"
                              component="span"
                            />
                          </div>

                          <div
                            className={classes.boxContainer}
                            style={{ paddingTop: "0.9rem" }}>
                            <div className={classes.fieldContainer}>
                              <label className={classes.label}>
                                Expiration time
                              </label>
                              <Field
                                id="CreatorTicketsPromoCodesEndtimeInput"
                                data-testid="CreatorTicketsPromoCodesEndtimeInput"
                                className={classes.field}
                                name="endtime"
                                component="select">
                                {Time.options.map((item, index) => {
                                  return (
                                    <option
                                      key={"AddPromoCodeendTime" + index}
                                      id={"AddPromoCodeendTime" + index}
                                      value={item}>
                                      {item}
                                    </option>
                                  );
                                })}
                              </Field>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                    <hr className={classes.promohr} />
                    <div className={classes.limitcontainer}>
                      <div className={classes.headercontainer2}>
                        Apply code to :
                      </div>
                      <FormControl>
                        <RadioGroup
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name="controlled-radio-buttons-group"
                          value={selectedvaluetickets}
                          onChange={(e) => handleTickets(e.target.value)}>
                          <FormControlLabel
                            id="CreatorTicketsPromoCodesTicketsRadioButtonInputAll"
                            data-testid="CreatorTicketsPromoCodesTicketsRadioButtonInputAll"
                            value="All visible tickets"
                            control={<Radio />}
                            label="All visible tickets"
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: 20,
                              },
                              "& .MuiTypography-root": {
                                fontSize: 13,
                                fontWeight: 4,
                                color: "rgb(57, 54, 79)",
                              },
                            }}
                          />
                          <div className={classes.radiobtntickets}>
                            <FormControlLabel
                              id="CreatorTicketsPromoCodesTicketsRadioButtonInputSome"
                              data-testid="CreatorTicketsPromoCodesTicketsRadioButtonInputSome"
                              value="Only certain visible tickets"
                              control={<Radio />}
                              label="Only certain visible tickets"
                              sx={{
                                "& .MuiSvgIcon-root": {
                                  fontSize: 20,
                                },
                                "& .MuiTypography-root": {
                                  fontSize: 13,
                                  fontWeight: 4,
                                  color: "rgb(57, 54, 79)",
                                },
                              }}
                            />
                            {!alltickets && (
                              <div className={classes.buttoncontainer}>
                                <button
                                  id="CreatorTicketsPromoCodesTicketsSelectBtn"
                                  data-testid="CreatorTicketsPromoCodesTicketsSelectBtn"
                                  onClick={() => setOpenticketsmodal(true)}
                                  type="button">
                                  Select
                                </button>
                                <TicketModal
                                  tickets={tickets}
                                  modalopen={openticketsmodal}
                                  setticketsmodalopen={setOpenticketsmodal}
                                  update={setupdatedTickets}
                                />
                              </div>
                            )}
                          </div>
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </div>
                  <div className={classes.leavecheckoutbuttons}>
                    <div className={classes.stayleavebtn}>
                      <button
                        id="CreatorTicketsPromoCodesCancelBtn"
                        data-testid="CreatorTicketsPromoCodesCancelBtn"
                        className={classes.staybutton}
                        onClick={toggleDrawer("right", false, csv)}
                        type="reset">
                        Cancel
                      </button>
                    </div>

                    <div className={classes.stayleavebtn}>
                      <button
                        type="submit"
                        id="CreatorTicketsPromoCodesSubmitBtn"
                        data-testid="CreatorTicketsPromoCodesSubmitBtn"
                        className={classes.leavebutton}>
                        Save
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </Box>
      </SwipeableDrawer>

      {success && (
        <GenericModal
          header="PromoCode Created"
          details={"You have succesfully created a PromoCode."}
          icon={<TiTick className={classes.modalicon} />}
          rejectbtn="Close"
          rejecthandle={() => setSuccess(false)}
        />
      )}
    </div>
  );
};

export default AddPromocodeForm;
