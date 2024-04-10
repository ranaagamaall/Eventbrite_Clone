import React from "react";
import { useState } from "react";

import classes from "./bookingpopup.module.css";
import { useParams } from "react-router-dom";
// import tickets from "../../../assets/data/dummytickets";
import BookingForm from "./bookingForm/BookingForm";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TicketsDetails from "./ticketsDetails/TicketsDetails";
import axios from "../../../requests/axios";
import routes from "../../../requests/routes";
import { TfiEmail } from "react-icons/tfi";

/**
 * Component that renders Booking Popup contains tickets and Info form
 * 
 * @component
 * @example
 * return(<BookingPopup
          eventtitle="event name"
          date="date"
          image="url"
        />)
*/

const BookingPopup = ({ eventtitle, date, image }) => {
  let { _id } = useParams();

  const [openModal, setOpenModal] = useState(false);
  const [openForm, setopenForm] = useState(false);
  const [askclose, setAskclose] = useState(false);
  const [timerClose, setTimerclose] = useState(false);
  const [registerClose, setRegisterClose] = useState(false);

  const [subtotal, setSubtotal] = useState(0.0);
  const [fee, setFee] = useState(0.0);
  const [total, setTotal] = useState(0.0);
  const [discount, setDiscount] = useState(0.0);
  const [promocode, setPromocode] = useState(false);
  const [openSummary, setOpenSummary] = useState(false);

  const intialvalues = {
    ticketsBought: [],
    firstName: "",
    lastName: "",
    email: "",
  };
  const [orderData, setOrderData] = useState(intialvalues);
  const [orderSummary, setOrderSummary] = useState([]);
  const [empty, setEmpty] = useState(true);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => {
    setOpenModal(false);
    setopenForm(false);
    setAskclose(false);
    setSubtotal(0.0);
    setFee(0.0);
    setTotal(0.0);
    setEmpty(true);
    setOrderData(intialvalues);
    setOrderSummary([]);
  };

  /**
   * function that is triggered on ordersumm, to calculate subtotal , total price and discount
   * @function calculateprice
   * @param   {Array} sum     array of tickets in the order

   */

  function calculateprice(sum) {
    let summ = sum;
    let sub = 0;
    let fees = 0;
    let tot = 0;
    let dis = 0;
    for (let index = 0; index < summ.length; index++) {
      sub = sub + summ[index].number * summ[index].price;
      dis =
        dis +
        summ[index].number * summ[index].price * summ[index].discountpercent +
        summ[index].number * summ[index].discountamount;
      fees = fees + summ[index].number * summ[index].fee;
    }

    tot = sub + fees - dis;

    setSubtotal(sub);
    setFee(fees);
    setTotal(tot);
    setDiscount(dis);
  }

  /**
   * function that is triggered on tickets details, to checkout and switch to next form
   * @namespace checkout
   * @param   {string} promocode      promocode

   */

  function checkout(promocode) {
    let temporder = orderData;
    temporder.ticketsBought = orderSummary.map((singleticket, index) => ({
      ticketClass: singleticket.ticketClass,
      number: singleticket.number,
    }));
    if (promocode) {
      temporder.promocode = promocode._id;
    }
    setOrderData(temporder);
    setopenForm(true);
  }

  /**
   * function that sends the request that submits tickets order data
   * @namespace orderRequest
   * @param  {object} data      contains firstname, last name, email, tickets information
   *
   */
  async function orderRequest(data) {
    let response = "";
    try {
      response = await axios.post(routes.placeOrder + "/" + _id, data);
      setRegisterClose(true);
      setAskclose(true);
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  }

  /**
   * function that is triggered on form register, assigns data sent from the form form to orderData
   * @namespace register
   * @param   {string} fName      User first name
   * @param   {string} lName      User last name
   * @param   {string} email      User valid email
   *
   */
  function register(fName, lName, email) {
    let temporder = orderData;
    temporder.firstName = fName;
    temporder.lastName = lName;
    temporder.email = email;
    setOrderData(temporder);
    orderRequest(orderData);
  }

  /**
   * function that is triggered on tickets details, assigns data of tickets sent from the tickets to orderSummary and calculates price
   * @namespace ordersumm
   * @param   {Array} ordertickets      array of tickets
   * @param   {number} count  count of choosen tickets
   */

  function ordersumm(ordertickets, count) {
    // console.log(ordertickets);
    let summ = ordertickets.filter((singleticket) => singleticket.number !== 0);
    setOrderSummary(summ);
    if (count != 0) {
      setEmpty(false);
      calculateprice(summ);
    } else {
      setEmpty(true);
      setSubtotal(0);
      setFee(0);
      setTotal(0);
    }
  }

  /**
   * function that is triggered when form session timesout => closes the form and opens modal with indicating message
   * @namespace timeout
   *
   */
  function timeout() {
    setAskclose(true);
    setTimerclose(true);
  }

  return (
    <div
      id="EventPageBookingPopsContainer"
      className={classes.bookingpopscontainer}>
      <div
        id="EventPageBookingPopUpTicketsBtnContainer"
        className={classes.btn}>
        <Button
          id="EventPageBookingPopUpTicketsBtn"
          className={classes.button}
          onClick={handleOpen}
          data-testid="GetTicketsButton">
          Get tickets
        </Button>
      </div>

      <Modal
        id="EventPageBookingPopUpModal"
        open={openModal}
        // onClose={handleClose}
        // disableBackdropClick
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={classes.bookingmodal}>
        <Box id="EventPageBookingPopUpModalBox" className={classes.bookingbox}>
          {(!askclose || timerClose || registerClose) && (
            <IconButton
              id="EventPageBookingPopUpCloseBtnContainer"
              aria-label="close"
              onClick={() => {
                if (!askclose) setAskclose(true);
                if (timerClose || registerClose) {
                  setTimerclose(false);
                  setRegisterClose(false);
                  handleClose();
                }
              }}
              className={classes.bookingmodalclose}>
              <CloseIcon id="EventPageBookingPopUpCloseBtn" />
            </IconButton>
          )}
          <div
            id="EventPageBookingPopUp"
            className={classes.bookingcontainer}
            style={{ display: askclose ? "none" : "flex" }}>
            <div
              id="EventPageBookingPopUpFormContainer"
              className={classes.ticketsformcontainer}>
              {openForm ? (
                <div>
                  {" "}
                  <BookingForm
                    setTimeout={timeout}
                    onRegister={register}
                  />{" "}
                </div>
              ) : (
                <TicketsDetails
                  eventtitle={eventtitle}
                  date={date}
                  calculateprice={calculateprice}
                  checkout={checkout}
                  summary={ordersumm}
                  setOpenSummary={setOpenSummary}
                  openSummary={openSummary}
                  total={total}
                />
              )}
            </div>

            <div
              id="EventPageBookingPopUpSummaryContainer"
              className={
                openSummary
                  ? classes.openSummaryContainer
                  : classes.summarycontainer
              }>
              {image ? (
                <div
                  id="EventPageBookingPopUpSummaryImgContainer"
                  className={classes.cardImage}>
                  <img
                    id="EventPageBookingPopUpSummaryImg"
                    src={image}
                    alt="event_img"
                  />
                </div>
              ) : null}

              {empty && (
                <div
                  id="EventPageBookingPopUpSummaryEmptyCartContainer"
                  className={classes.emptycart}>
                  <svg
                    id="cart_svg__eds-icon--cart_svg"
                    x="0"
                    y="0"
                    viewBox="0 0 24 24">
                    <path
                      id="cart_svg__eds-icon--cart_base"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M20 14l2-9H9v1h11.9l-1.7 7.1L7 14V2H2v3h4v12h14v-1H7v-1l13-1zM3 3h3v1H3V3z"></path>
                    <g
                      id="cart_svg__eds-icon--cart_circles"
                      fill-rule="evenodd"
                      clip-rule="evenodd">
                      <path d="M8 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 3c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zM18 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 3c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z"></path>
                    </g>
                  </svg>
                </div>
              )}

              {!empty && (
                <div
                  id="EventPageBookingPopUpSummary"
                  className={classes.summary}>
                  <div
                    id="EventPageBookingPopUpSummaryHeader"
                    className={classes.summaryheader}>
                    Order Summary
                  </div>
                  <div
                    id="EventPageBookingPopUpSummaryTicketsContainer"
                    className={classes.summarytickets}>
                    {orderSummary.map((singleticket, index) => {
                      return (
                        <div
                          key={"EventPageBookingPopUpSummaryTicket" + index}
                          id={"EventPageBookingPopUpSummaryTicket" + index}
                          className={classes.ticketsummary}>
                          <div
                            id={
                              "EventPageBookingPopUpSummaryTicketCount" + index
                            }
                            className={classes.ticketcount}>
                            {singleticket.number} x {singleticket.name}
                          </div>
                          <div
                            id={
                              "EventPageBookingPopUpSummaryTicketPrice" + index
                            }
                            className={classes.ticketprice}>
                            {singleticket.number * singleticket.price}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <hr />
                  <div
                    id="EventPageBookingPopUpSummaryTicketsSubTotalContainer"
                    className={classes.summarytickets}>
                    <div
                      id="EventPageBookingPopUpSummaryTicketsSubTotalPriceContainer"
                      className={classes.ticketsummary}>
                      <div
                        id="EventPageBookingPopUpSummaryTicketsSubTotalHeader"
                        className={classes.ticketcount}>
                        Subtotal
                      </div>
                      <div
                        id="EventPageBookingPopUpSummaryTicketsSubTotalPrice"
                        className={classes.ticketprice}>
                        {subtotal.toFixed(2)}
                      </div>
                    </div>
                    {discount != 0 && (
                      <div
                        id="EventPageBookingPopUpSummaryTicketsDiscountContainer"
                        className={classes.ticketsummary}>
                        <div
                          id="EventPageBookingPopUpSummaryTicketsDiscountHeader"
                          className={classes.ticketcount}>
                          Discount
                        </div>
                        <div
                          id="EventPageBookingPopUpSummaryTicketsDiscount"
                          className={classes.ticketprice}>
                          {" "}
                          - {discount}
                        </div>
                      </div>
                    )}
                    <div
                      id="EventPageBookingPopUpSummaryTicketsFeesContainer"
                      className={classes.ticketsummary}>
                      <div
                        id="EventPageBookingPopUpSummaryTicketsFeesHeader"
                        className={classes.ticketcount}>
                        Fees
                        <svg
                          id="info-chunky_svg__eds-icon--info-chunky_svg"
                          x="0"
                          y="0"
                          viewBox="0 0 24 24">
                          <path
                            id="info-chunky_svg__eds-icon--info-chunky_base"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12 6c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6 2.7-6 6-6zm0 14c4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8 3.6 8 8 8z"></path>
                          <path
                            id="info-chunky_svg__eds-icon--info-chunky_dot"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M11 8h2v2h-2z"></path>
                          <path
                            id="info-chunky_svg__eds-icon--info-chunky_line"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M11 11h2v5h-2z"></path>
                        </svg>
                      </div>
                      <div
                        id="EventPageBookingPopUpSummaryTicketsFeesPrice"
                        className={classes.ticketprice}>
                        {fee.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <hr />

                  <div
                    id="EventPageBookingPopUpSummaryTicketsTotalContainer"
                    className={classes.summaryheader}>
                    <div
                      id="EventPageBookingPopUpSummaryTicketsTotalPriceContainer"
                      className={classes.ticketsummary}>
                      <div
                        id="EventPageBookingPopUpSummaryTicketsTotalPriceHeader"
                        className={classes.ticketcount}>
                        Total
                      </div>
                      <div
                        id="EventPageBookingPopUpSummaryTicketsTotalPrice"
                        className={classes.ticketprice}>
                        {total.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {askclose && !timerClose && !registerClose && (
            <div
              id="EventPageBookingPopUpLeaveCheckOutContainer"
              className={classes.leavecheckout}>
              <div
                id="EventPageBookingPopUpLeaveCheckOutHeader"
                className={classes.leavecheckoutheader}>
                <h1>Leave Checkout?</h1> Are you sure you want to leave
                checkout? The items you've selected may not be available later.
              </div>
              <div
                id="EventPageBookingPopUpLeaveCheckOutBtnsContainer"
                className={classes.leavecheckoutbuttons}>
                <div
                  id="EventPageBookingPopUpLeaveCheckOutStayBtnContainer"
                  className={classes.stayleavebtn}>
                  <button
                    id="EventPageBookingPopUpLeaveCheckOutStayBtn"
                    className={classes.staybutton}
                    onClick={() => setAskclose(false)}>
                    stay
                  </button>
                </div>

                <div
                  id="EventPageBookingPopUpLeaveCheckOutLeaveBtnContainer"
                  className={classes.stayleavebtn}>
                  <button
                    id="EventPageBookingPopUpLeaveCheckOutLeaveBtn"
                    className={classes.leavebutton}
                    onClick={handleClose}>
                    Leave
                  </button>
                </div>
              </div>
            </div>
          )}
          {(timerClose || registerClose) && (
            <div
              id="EventPageBookingPopUpTimerLimitContainer"
              className={classes.leavecheckout}>
              {timerClose ? (
                <div
                  id="EventPageBookingPopUpTimerLimitHeader"
                  className={classes.leavecheckoutheader}
                  style={{ "font-size": "1.25rem" }}>
                  <h1>Time Limit Reached</h1> Your reservation has been
                  released. Please re-start your purchase.
                </div>
              ) : (
                <div
                  id="EventPageBookingPopUpOrderDoneHeader"
                  className={classes.leavecheckoutheader}
                  style={{ "font-size": "1.25rem" }}>
                  <TfiEmail className={classes.modalicon} />
                  <h1>Your Order has been placed successfully!!</h1> Check your
                  Email for order summary
                </div>
              )}
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default BookingPopup;
