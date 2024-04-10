import React from "react";
import { useState, useEffect } from "react";
import classes from "./tickets.module.css";
import { useParams, useNavigate } from "react-router-dom";
import logo from "../../../../assets/brand/envie.svg";
// import tickets from "../../../../assets/data/dummytickets";
import moment from "moment";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { styled } from "@mui/material/styles";
import axios from "../../../../requests/axios";
import routes from "../../../../requests/routes";
import { useSelector } from "react-redux";
import GenericModal from "../../../../generic components/generic modal/GenericModal";
import { GrLogin } from "react-icons/gr";
import ErrorNotification from "../../../../generic components/error message/ErrorNotification";

import { MdKeyboardArrowDown } from "react-icons/md";

/**
 * Component that renders tickets details
 * 
 * @component
 * @example
 * return(<TicketsDetails
                  eventtitle="event name"
                  date="date"
                  calculateprice={calculateprice}
                  checkout={checkout}
                  summary={ordersumm}
                  setOpenSummary={setOpenSummary}
                  openSummary={openSummary}
                  total={total}
                />)
*/

const TicketsDetails = ({
  eventtitle,
  date,
  checkout,
  summary,
  setOpenSummary,
  openSummary,
  total,
}) => {
  //   const filledArray = Array(tickets.tickets.length).fill(0);

  let { _id } = useParams();
  const navigate = useNavigate();
  //   const [ticketsAmount, setTicketsAmount] = useState(filledArray);
  const [tickets, setTickets] = useState(false);
  const [ticketsAmount, setTicketsAmount] = useState([]);
  const [promocode, setPromocode] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [ticketsNum, setTicketsNum] = useState(0);
  const [errorMsg, setErrorMsg] = useState(false);
  const [helper, setHelper] = useState("");
  const [logginform, setloginform] = useState(false);
  const [errorMsg1, setErrorMsg1] = useState("");
  const [errorLink, setErrorLink] = useState("");
  const [errorLinkMsg, setErrorLinkMsg] = useState("");

  // const MyTextField = styled(TextField)({
  //   "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
  //     borderColor: "grey",
  //   },
  //   "&:focus-within .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
  //     borderColor: "black",
  //     borderWidth: "2px",
  //   },
  //   "&:focus-within .MuiInputLabel-root": {
  //     color: "black",
  //   },
  // });

  /**
   * function that is triggered to get tickets
   * @function getTickets

   */

  async function getTickets() {
    try {
      const response = await axios.get(
        routes.tickets + "/" + _id + "/availableTickets"
      );

      setTickets(response.data);

      let filledArray = new Array(response.data.tickets.length)
        .fill()
        .map((element, index) => ({
          ticketClass: response.data.tickets[index]._id,
          number: 0,
          name: response.data.tickets[index].name,
          price: response.data.tickets[index].price,
          fee: response.data.tickets[index].fee,
          discountpercent: 0,
          discountamount: 0,
          discount: false,
        }));

      setTicketsAmount(filledArray);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getTickets();
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  /**
   * function that is triggered to add ticket
   * @function addamount
   * @param {number} index  index of the ticket

   */

  function addamount(index) {
    let max = Math.min(
      tickets.tickets[index].maxQuantityPerOrder,
      tickets.tickets[index].capacity - tickets.tickets[index].sold
    );
    if (ticketsAmount[index].number < max) {
      let amount = ticketsAmount;
      amount[index].number = amount[index].number + 1;
      setTicketsAmount(amount);

      let count = ticketsNum;
      count = count + 1;
      setTicketsNum(count);

      summary(amount, count);
    }
  }

  /**
   * function that is triggered to remove ticket
   * @function removeamount
   * @param {number} index  index of the ticket

   */

  function removeamount(index) {
    if (ticketsAmount[index].number > 0) {
      let amount = ticketsAmount;
      amount[index].number = amount[index].number - 1;
      setTicketsAmount(amount);

      let count = ticketsNum;
      count = count - 1;
      setTicketsNum(count);

      summary(amount, count);
    }
  }

  /**
   * function that is triggered to apply promocode
   * @function applypromocode

   */
  const applypromocode = () => {
    async function sendpromo() {
      try {
        const response = await axios.get(
          routes.promocode + "/" + _id + "/" + inputValue + "/checkPromoSecured"
        );
        // console.log(response);
        setErrorMsg(false);
        setPromocode(response.data.promocode);
        let dis = 0;
        let percent = 0;
        let mount = 0;
        let type = "";
        if (response.data.promocode.percentOff != -1) {
          dis = response.data.promocode.percentOff;
          percent = dis;
          type = "%";
        } else {
          dis = response.data.promocode.amountOff;
          mount = dis;
          type = "$";
        }
        let text =
          response.data.promocode.name +
          " is Applied. A " +
          dis +
          type +
          " discount is Applied.";
        setHelper(text);

        let array = ticketsAmount;

        for (
          let index = 0;
          index < response.data.promocode.tickets.length;
          index++
        ) {
          let search = array.findIndex(
            (ticket) =>
              ticket.ticketClass == response.data.promocode.tickets[index]
          );
          // console.log(search);
          // console.log(array[search]);
          if (search >= 0) {
            array[search].discountpercent = percent;
            array[search].discountamount = mount;
            array[search].discount = true;
          }
        }

        setTicketsAmount(array);
        summary(array, ticketsNum);
      } catch (error) {
        // console.log(err);
        setErrorMsg(true);
        setHelper("Sorry, we don’t recognise that code.");
        if (
          error.response.data.message ===
          "You have exceeded the limit of this request."
        ) {
          setErrorMsg1(error.response.data.message);
        }
      }
    }
    if (!promocode) {
      sendpromo();
    } else {
      let array = ticketsAmount;

      for (let index = 0; index < promocode.tickets.length; index++) {
        let search = array.findIndex(
          (ticket) => ticket.ticketClass == promocode.tickets[index]
        );
        if (search >= 0) {
          array[search].discountpercent = 0;
          array[search].discountamount = 0;
          array[search].discount = false;
        }
      }

      setTicketsAmount(array);
      setPromocode(false);
      setHelper("");
      summary(array, ticketsNum);
      setInputValue("");
    }
  };
  const user = useSelector((state) => state.user);
  const handlecheckout = () => {
    setloginform(false);
    const userloggedin = user.loggedIn;
    if (ticketsNum != 0) {
      if (userloggedin) {
        checkout(promocode);
      } else {
        setloginform(true);
      }
    } else {
      setErrorMsg1("please take at least 1 ticket");
    }
  };
  const loginhandle = () => {
    navigate("/login");
  };

  return (
    tickets != false && (
      <div
        id="EventPageBookingPopUpTicketsDetailsContainer"
        className={classes.ticketscontainer}>
        <div
          id="EventPageBookingPopUpTicketsDetailsHeaderContainer"
          className={classes.bookingheader}>
          <div id="modal-modal-title">{eventtitle}</div>
          <div
            id="EventPageBookingPopUpTicketsDetailsHeaderDate"
            className={classes.eventdate}>
            {" "}
            {date}
          </div>
        </div>

        <div
          id="EventPageBookingPopUpTicketsDetailsTicketsContainer"
          className={classes.tickets}>
          <div
            id="EventPageBookingPopUpTicketsDetailsPromoCodeContainer"
            className={classes.promocode}>
            <div
              id="EventPageBookingPopUpTicketsDetailsPromoCodeError"
              className={classes.errm}>
              {errorMsg1 ? (
                <ErrorNotification
                  mssg={errorMsg1}
                  linkmsg={errorLinkMsg}
                  link={errorLink}
                />
              ) : null}
            </div>
            <TextField
              value={inputValue}
              disabled={promocode ? true : false}
              className={classes.promocodebox}
              id="outlined-basic"
              label="PromoCode"
              variant="outlined"
              placeholder="Enter Code"
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    id="EventPageBookingPopUpTicketsDetailsPromoCodeBtnContainer"
                    position="end">
                    {promocode && <CheckCircleIcon color="success" />}
                    <button
                      id="EventPageBookingPopUpTicketsDetailsPromoCodeBtn"
                      disabled={!promocode ? !inputValue : false}
                      onClick={applypromocode}
                      className={
                        !inputValue ? classes.applybtn : classes.applybtnactive
                      }>
                      {!promocode ? "Apply" : "Remove"}
                    </button>
                  </InputAdornment>
                ),
              }}
              error={errorMsg}
              helperText={helper}
            />
          </div>

          {tickets.tickets.map((element, index) => {
            return (
              <div
                key={
                  "EventPageBookingPopUpTicketsDetailsTicketContainer" + index
                }
                id={
                  "EventPageBookingPopUpTicketsDetailsTicketContainer" + index
                }
                className={classes.singleticket}>
                <div
                  id={
                    "EventPageBookingPopUpTicketsDetailsTicketNameContainer" +
                    index
                  }
                  className={classes.singleticketnamecontainer}>
                  <div
                    id={"EventPageBookingPopUpTicketsDetailsTicketName" + index}
                    className={classes.singleticketname}>
                    {element.name}
                  </div>
                  <div
                    id={
                      "EventPageBookingPopUpTicketsDetailsAddRemoveTicketBtnsContainer" +
                      index
                    }
                    className={classes.addremoveticket}>
                    <div
                      id={
                        "EventPageBookingPopUpTicketsDetailsAddTicketBtn" +
                        index
                      }
                      data-testid="AddTicketBtn"
                      className={
                        ticketsAmount[index].number ==
                        Math.min(
                          element.maxQuantityPerOrder,
                          element.capacity - element.sold
                        )
                          ? classes.addremove
                          : classes.addremoveactive
                      }
                      onClick={() => addamount(index)}>
                      <svg
                        id="plus-chunky_svg__eds-icon--plus-chunky_svg"
                        x="0"
                        y="0"
                        viewBox="0 0 24 24">
                        <path
                          id="plus-chunky_svg__eds-icon--plus-chunky_base"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M13 11V4h-2v7H4v2h7v7h2v-7h7v-2z"></path>
                      </svg>
                    </div>
                    <div className={classes.ticketamount}>
                      {ticketsAmount[index].number}
                    </div>
                    <div
                      id={
                        "EventPageBookingPopUpTicketsDetailsRemoveTicketBtn" +
                        index
                      }
                      className={
                        ticketsAmount[index].number == 0
                          ? classes.addremove
                          : classes.addremoveactive
                      }
                      onClick={() => removeamount(index)}>
                      <svg
                        id="minus-chunky_svg__eds-icon-minus-chunky"
                        x="0"
                        y="0"
                        viewBox="0 0 24 24">
                        <g>
                          <path fill="#fff" d="M6.5 11.5h11v1h-11z"></path>
                          <path d="M18 11H6v2h12v-2z"></path>
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
                <div
                  id={
                    "EventPageBookingPopUpTicketsDetailsTicketInfoContainer" +
                    index
                  }
                  className={classes.containerticketinfo}>
                  <div
                    id={
                      "EventPageBookingPopUpTicketsDetailsTicketInfoHeaderContainer" +
                      index
                    }
                    className={classes.headercontainer}>
                    {!ticketsAmount[index].discount && (
                      <p
                        id={
                          "EventPageBookingPopUpTicketsDetailsTicketPrice" +
                          index
                        }
                        className={classes.price}>
                        {element.price}
                      </p>
                    )}
                    {ticketsAmount[index].discount && (
                      <pre>
                        <p
                          id={
                            "EventPageBookingPopUpTicketsDetailsTicketPriceDiscountContainer" +
                            index
                          }
                          className={classes.price}>
                          {element.price -
                            element.price *
                              ticketsAmount[index].discountpercent -
                            ticketsAmount[index].discountamount}
                          {"  "}
                          <del
                            id={
                              "EventPageBookingPopUpTicketsDetailsTicketPriceDiscount" +
                              index
                            }>
                            {element.price}
                          </del>
                        </p>
                      </pre>
                    )}
                    <p
                      id={
                        "EventPageBookingPopUpTicketsDetailsTicketSalesDate" +
                        index
                      }
                      className={classes.sales}>
                      sales end on{" "}
                      {moment(element.salesEnd).format("MMMM Do YYYY")}
                    </p>
                  </div>
                  <div
                    id={
                      "EventPageBookingPopUpTicketsDetailsAboutTicketContainer" +
                      index
                    }
                    className={classes.aboutticket}>
                    <p
                      id={
                        "EventPageBookingPopUpTicketsDetailsAboutTicketHeader" +
                        index
                      }
                      className={classes.includedpr}>
                      WHAT IS INCLUDED IN YOUR TICKET?{" "}
                    </p>
                    {element.about && (
                      <ul
                        id={
                          "EventPageBookingPopUpTicketsDetailsAboutTicketInfo" +
                          index
                        }
                        className={classes.aboutsection}>
                        {element.about.map((item, index2) => {
                          return (
                            <li
                              key={
                                "EventPageBookingPopUpTicketsDetailsAboutTicketInfo" +
                                index +
                                index2
                              }
                              id={
                                "EventPageBookingPopUpTicketsDetailsAboutTicketInfo" +
                                index +
                                index2
                              }
                              className={classes.Detailsabout}>
                              {item.name}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <div className={classes.ticketsfooter}>
            <div>Powered by </div>
            <img className={classes.logo} src={logo} alt="logo" />
          </div>
        </div>
        <div
          id="EventPageBookingPopUpTicketsDetailsFooterContainer"
          className={classes.checkoutcontainer}>
          <div
            id="EventPageBookingPopUpTicketsDetailsFooterSummaryContainer"
            className={classes.summarycontainer}>
            {" "}
            <MdKeyboardArrowDown
              id="EventPageBookingPopUpTicketsDetailsFooterSummaryBtn"
              className={openSummary ? classes.upArrow : classes.downArrow}
              onClick={() => {
                setOpenSummary(!openSummary);
              }}
            />{" "}
            {total}
          </div>
          <div
            id="EventPageBookingPopUpTicketsDetailsFooterCheckoutBtnContainer"
            className={classes.btn}>
            <button
              id="EventPageBookingPopUpTicketsDetailsFooterCheckoutBtn"
              onClick={handlecheckout}
              className={classes.button}
              data-testid="checkoutBtn">
              Check out
            </button>
          </div>
        </div>
        {logginform && (
          <GenericModal
            header="Please login first"
            confirmbtn="Login"
            icon={<GrLogin className={classes.modalicon} />}
            accepthandle={loginhandle}
          />
        )}
      </div>
    )
  );
};

export default TicketsDetails;
