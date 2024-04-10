import React, { useState, useEffect } from "react";
import classes from "./atendeesummary.module.css";
import CreatorNav from "../../layouts/nav/CreatorNav";
import SideBar from "../../layouts/sideBar/Sidebar";
import axios from "../../requests/axios";
import routes from "../../requests/routes";
import { useSelector } from "react-redux";
import SalesCards from "../CreatorEventDetails/creatorDashboard/salesCards/SalesCards";
import IosShareIcon from "@mui/icons-material/IosShare";
import moment from "moment/moment";
import Loader from "../../layouts/loader/Loader";
import { AiOutlineSearch } from "react-icons/ai";

/**
 * Component that returns Creator's main page
 *
 * @component
 * @example
 * return(<CreatorHomePage />)
 */
const AtendeeSummary = () => {
  const arrow = (
    <svg x="0" y="0" viewBox="0 0 24 24">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13.8 7l-5 5 5 5 1.4-1.4-3.6-3.6 3.6-3.6z"></path>
    </svg>
  );
  const event = useSelector((state) => state.event);

  const initialPag = { nextPage: null, prevPage: null };

  const [report, setReport] = useState([]);
  const [orders, setOrders] = useState("");
  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState(initialPag);
  const [attendees, setAttendees] = useState("");
  const [loader, setLoader] = useState(false);

  const [transactionData, setTransactionData] = useState([]);

  /**
   * function that sends the request that gets attendees info as csv for export
   * @namespace handleExport
   */

  async function handleExport() {
    try {
      axios
        .get(
          routes.getAllEventsCreator +
            event.eventId +
            "/getAttendeeReport/download"
        )
        .then((resp) => {
          setTransactionData(resp.data);
        });
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  }

  /**
   * function that sends the request to get all attendees for an event (paginated)
   * @namespace getAtendees
   */
  async function getAtendees() {
    setLoader(true);
    let response = "";
    try {
      response = await axios.get(
        routes.getAllEventsCreator +
          event.eventId +
          "/getAttendeeReport?page=" +
          page +
          "&orderLimit=5"
      );
      setLoader(false);
      setReport(response.data.Report);
      setPagination(response.data.pagination);
      setOrders(response.data.totalOrders);
      setAttendees(response.data.totalAttendees);

      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  }

  useEffect(() => {
    getAtendees();
  }, [page]);

  useEffect(() => {
    handleExport();
  }, []);

  return (
    <div>
      <CreatorNav />
      <SideBar />
      <div className={classes.container}>
        <div className={classes.header}>
          <h1>Attendee Summary Report</h1>
        </div>

        <div className={classes.box}>
          <div className={classes.innerbox}>
            <div className={classes.boxicon}>
              <svg
                class="line-chart_svg__eds-icon--line-chart__svg"
                viewBox="0 0 24 24">
                <path
                  class="line-chart_svg__eds-icon--line-chart__base"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3 21v-5.9l2.8-2.4c.4.3.8.4 1.2.4.6 0 1.1-.3 1.5-.7l2.5 1.3v.4c0 1.1.9 2 2 2s2-.9 2-2c0-.3-.1-.6-.2-.9l3-2.5c.3.2.7.4 1.2.4 1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2c0 .3.1.6.2.9l-3 2.5c-.3-.2-.7-.4-1.2-.4-.6 0-1.1.3-1.5.7L9 11.5v-.4c0-1.1-.9-2-2-2s-2 .9-2 2c0 .3.1.6.2.9L3 13.8V2H2v20h20v-1H3zM19 8.1c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1c0-.5.4-1 1-1zm-6 5c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1c0-.5.4-1 1-1zm-6-3c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1c0-.5.4-1 1-1z"></path>
              </svg>
            </div>
            <div className={classes.boxdesc}>
              Get the most from our new reporting experience with a quick
              walkthrough
            </div>
            <div className={classes.hyperlink}>Let's Go</div>
          </div>
        </div>

        <div className={classes.btn}>
          <div className={classes.btnsList}>
            <div className={classes.searchField}>
              <AiOutlineSearch size={"2rem"} />
              <input
                type="text"
                placeholder="Search for any events with sales"
                className={classes.search}
                disabled
              />
            </div>
          </div>

          {transactionData.length !== 0 ? (
            <div className={classes.export}>
              <IosShareIcon sx={{ fontSize: "18px" }} />
              <a
                href={`data:text/csv;charset=utf-8,${escape(transactionData)}`}
                download="attendee_summary.csv">
                Export
              </a>
            </div>
          ) : (
            <div className={classes.exportDisabled}>
              <IosShareIcon sx={{ fontSize: "18px" }} />
              <p className={classes.disabled}>Export</p>
            </div>
          )}
        </div>
        <div className={classes.hyperlink}>+ Add Filter</div>
        <div className={classes.cardsContainer}>
          <div className={classes.cards}>
            <SalesCards title="Total orders" amount={orders} />
            <SalesCards title="Total Atendees" amount={attendees} />
          </div>
          <div className={classes.icons}>
            <span
              className={`${pagination.prevPage === null && classes.disable}`}
              onClick={
                pagination.prevPage !== null
                  ? () => {
                      setPage(page - 1);
                    }
                  : undefined
              }>
              {arrow}
            </span>
            <span
              className={`${pagination.nextPage === null && classes.disable}`}
              onClick={
                pagination.nextPage !== null
                  ? () => {
                      setPage(page + 1);
                    }
                  : undefined
              }>
              {arrow}
            </span>
          </div>
        </div>
        <hr />
        <div className={classes.btn}>
          <div className={classes.btnsList2}>
            <div className={classes.searchField}>
              <AiOutlineSearch size={"2rem"} />
              <input
                type="text"
                placeholder="Search for any events with sales"
                className={classes.search}
                disabled
              />
            </div>
          </div>
        </div>
        {loader ? (
          <Loader color={"#4be1a0"} />
        ) : report.length !== 0 ? (
          <div className={classes.attendeetable}>
            <table className={classes.tableItslef}>
              <thead>
                <tr className={classes.tableHeader}>
                  <th>Order Id</th>
                  <th>Order Date</th>
                  <th>Attendee Status</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Event Name</th>
                  <th>Ticket Quantity</th>
                  <th>Ticket Type</th>
                  <th>Ticket Price</th>
                  <th>Buyer Name</th>
                  <th>Buyer Email</th>
                </tr>
              </thead>
              <tbody id="CreatorDashBoardPageSalesRecentOrdersTableBody">
                {report.map((item, index) => {
                  return (
                    <tr>
                      <td className={classes.sold}>{item.orderNumber}</td>
                      <td className={classes.sold}>
                        {moment(item.orderDate).format("L")}
                      </td>
                      <td className={classes.sold}>{item.attendeeStatus}</td>
                      <td className={classes.sold}>{item.name}</td>
                      <td className={classes.sold}>{item.email}</td>
                      <td className={classes.sold}>{item.eventName}</td>
                      <td className={classes.sold}>{item.ticketQuantity}</td>
                      <td className={classes.sold}>{item.ticketType}</td>
                      <td className={classes.sold}>{item.ticketPrice}</td>
                      <td className={classes.sold}>{item.BuyerName}</td>
                      <td className={classes.sold}>{item.BuyerEmail}</td>
                    </tr>
                  );
                })}
                <tr></tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className={classes.emptypromos}>
            <div className={classes.emptyticketsicon}>
              <svg viewBox="0 0 144 144">
                <g fill="none" fill-rule="evenodd">
                  <g>
                    <path d="M0 0h144v144H0z"></path>
                    <path
                      d="M108 110.352v-57c0-19.882-16.118-36-36-36-19.883 0-36 16.118-36 36v57l9-9 9 9 9-9 9 9 9-9 9 9 9-9 9 9z"
                      fill="#F9F9FA"></path>
                    <path
                      d="M81 18.486a36.107 36.107 0 00-9-1.134c-19.883 0-36 16.118-36 36v57l9-9 9 9v-57c0-16.774 11.472-30.87 27-34.866"
                      fill="#D2D6DF"></path>
                    <path
                      d="M81 99.231l9 9 9-9 7.5 7.5V53.352c0-19.023-15.475-34.5-34.5-34.5-19.023 0-34.5 15.477-34.5 34.5v53.38l7.5-7.5 9 9 9-9 9 9 9-9zm28.5 14.742l-10.5-10.5-9 9-9-9-9 9-9-9-9 9-9-9-10.5 10.5v-60.62c0-20.678 16.822-37.5 37.5-37.5 20.677 0 37.5 16.822 37.5 37.5v60.62z"
                      fill="#363A43"></path>
                    <path
                      fill="#363A43"
                      d="M61.5 84.852h21v-3h-21zM56.813 57.852a2.812 2.812 0 11-5.626 0 2.812 2.812 0 115.626 0M92.438 57.852a2.812 2.812 0 11-5.626 0 2.812 2.812 0 115.626 0M61.376 115.624h3v-3h-3zM61.376 121.624h3v-3h-3zM79.313 115.624h3v-3h-3zM79.313 121.624h3v-3h-3zM43.75 117h3v-3h-3zM43.75 123h3v-3h-3zM43.75 129h3v-3h-3zM97.25 115.5h3v-3h-3zM97.25 121.5h3v-3h-3zM97.25 127.5h3v-3h-3z"></path>
                  </g>
                </g>
              </svg>
            </div>
            <div className={classes.mainsectionheaderno}>
              Nothing matched your search
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AtendeeSummary;
