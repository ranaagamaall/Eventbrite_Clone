import DashboardCards from "./DashboardCards/DashBoardCards";
import classes from "./dashboard.module.css";
import dashboarddata from "../../../assets/data/dashboarddata";
import salesbyticket from "../../../assets/data/dummysalesbyticket";
import { FaFacebookF } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import SalesCards from "./salesCards/SalesCards";
import SalesByTicket from "./salesBYticket/SalesByTicket";
import RecentOrders from "./recentOrders/RecentOrders";
import { useEffect, useState } from "react";
import axios from "../../../requests/axios";
import routes from "../../../requests/routes";
import { useSelector } from "react-redux";

/**
 * Component that returns Creator's Dashboard page
 *
 * @component
 * @example
 * return(<CreatorDashboard />)
 */
const CreatorDashboard = () => {
  const event = useSelector((state) => state.event);
  const [soldTickets, setSoldTickets] = useState(0);
  const [totalTickets, setTotalTickets] = useState(0);
  const [freeTickets, setFreeTickets] = useState(0);
  const [paidTickets, setPaidTickets] = useState(0);
  const [grossSales, setGrossSales] = useState(0);
  const [netSales, setNetSales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [eventURL, setEventURL] = useState(
    ""
  );
  const [salesByTicketReport, setSalesByTicketReport] = useState([]
    // salesbyticket.salesReport
  );
  const [recentordersReport, setrecentordersReport] = useState([]
    // salesbyticket.recentordersReport
  );
  const [isPaginated, setIsPaginated] = useState(true);


  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(eventURL); // Writes the text to the clipboard
      setCopied(true);
      setTimeout(() => setCopied(false), 20000); // Reset the copied state after 2 seconds
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const intialSalesRequest =
    routes.events +
    "/" +
    event.eventId +
    routes.eventSalesByTicketType +
    "?page=1&limit=3";

  /**
   * function gets the event tickets sold from the server by ID
   * @function getTotalTicketsSold
   */
  async function getTotalTicketsSold() {
    // console.log(routes.events + "/" + eventID + "/getTicketsSoldForEvent");
    try {
      const response = await axios.get(
        routes.events + "/" + event.eventId + routes.eventSoldTickets
      );
      setSoldTickets(response.data.soldTickets);
      setTotalTickets(response.data.totalCapacity);
      setFreeTickets(response.data.freeTicketsSold);
      setPaidTickets(response.data.paidTicketsSold);
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * function gets the event sales summary report from the server by ID
   * @function getSalesSummary
   */
  async function getSalesSummary() {
    try {
      const response = await axios.get(
        routes.events + "/" + event.eventId + routes.eventSalesSummary
      );
      setGrossSales(response.data.grossSales);
      setNetSales(response.data.netSales);
      setTotalOrders(response.data.totalOrders);
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * function gets the event URL from the server by ID
   * @function getEventURL
   */
  async function getEventURL() {
    try {
      const response = await axios.get(
        routes.events + "/" + event.eventId + routes.eventURL
      );
      setEventURL(response.data.url);
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * function gets the event sales by ticket type report from the server by ID
   * @function getRecentOrders
   */
  async function getRecentOrders() {
    // console.log(routes.events + "/" + eventID + "/getTicketsSoldForEvent");
    try {
      const response = await axios.get(
        routes.events + "/" + event.eventId + routes.eventRecentOrder
      );
      setrecentordersReport(response.data.Report);
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * function gets the event sales by ticket type report from the server by ID
   * @function getSalesByTicketType
   */
  async function getSalesByTicketType(request) {
    // console.log(routes.events + "/" + eventID + "/getTicketsSoldForEvent");
    try {
      const response = await axios.get(request);
      setSalesByTicketReport(response.data.Report);
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * function handles pagination of sales by ticket type
   * @function handlePagination
   */
  function handlePagination() {
    if (isPaginated) {
      setIsPaginated(false);
      const request =
        routes.events + "/" + event.eventId + routes.eventSalesByTicketType;
      getSalesByTicketType(request);
    } else {
      setIsPaginated(true);
      const request =
        routes.events +
        "/" +
        event.eventId +
        routes.eventSalesByTicketType +
        "?page=1&limit=3";

      getSalesByTicketType(request);
    }
  }

    /**
   * function gets all requests
   * @function getallrequests
   */
    function getallrequests() {
      getTotalTicketsSold();
    getSalesSummary();
    getSalesByTicketType(intialSalesRequest);
    getRecentOrders();
    getEventURL();

    }

  useEffect(() => {
    window.scrollTo(0, 0);
    getallrequests();
  }, []);

  return (
    <div id="CreatorDashBoardPageContainer" className={classes.container}>
      <div id="CreatorDashBoardContainer" className={classes.dashboard}>
        <div id="CreatorDashBoardPageHeader" className={classes.header}>
          Dashboard
        </div>

            <div
              id="CreatorDashBoardPagestSectionContent"
              className={classes.content}>
              <div
                id="CreatorDashBoardPageCardsContainer"
                className={classes.cards}>
                <DashboardCards
                  title="Tickets Sold"
                  amount={soldTickets}
                  total={totalTickets}
                  free={freeTickets}
                  paid={paidTickets}
                />
                <DashboardCards
                  title="Page Views"
                  amount="4"
                  total={false}
                  free={false}
                  paid={false}
                />
              </div>
              <div
                id="CreatorDashBoardPageRecommendedContainer"
                className={classes.recommended}>
                <div
                  id="CreatorDashBoardPageRecommendedHeader"
                  className={classes.secsectionheader}>
                  Recommended
                </div>
                <div
                  id="CreatorDashBoardPageRecommendedList"
                  className={classes.reclistContainer}>
                  {dashboarddata.recommended.map((item, index) => {
                    return (
                      <li
                        id={"CreatorDashBoardPageRecommendedListItem" + index}
                        key={item.key}
                        className={classes.recitemContainer}>
                        <div
                          id={
                            "CreatorDashBoardPageRecommendedListItemIconContainer" +
                            index
                          }
                          className={classes.iconContainer}>
                          {item.icon}
                        </div>
                        <div
                          id={
                            "CreatorDashBoardPageRecommendedListItemData" +
                            index
                          }
                          className={classes.reclistdata}>
                          <div
                            id={
                              "CreatorDashBoardPageRecommendedListItemTitle" +
                              index
                            }
                            className={classes.reclistdtitle}>
                            {item.title}
                          </div>
                          <div
                            id={
                              "CreatorDashBoardPageRecommendedListItemHyperLink" +
                              index
                            }
                            className={classes.hyperlink}>
                            {item.hyperlink}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </div>
              </div>
            </div>
            <div
              id="CreatorDashBoardPageShareContainer"
              className={classes.share}>
              <div
                id="CreatorDashBoardPageShareHeader"
                className={classes.mainsectionheader}>
                Share
              </div>
              <div
                id="CreatorDashBoardPagendSectionContent"
                className={classes.content}>
                <div
                  id="CreatorDashBoardPageShareURLContainer"
                  className={classes.eventurl}>
                  <div
                    id="CreatorDashBoardPageShareURLHeader"
                    className={classes.eventurlheader}>
                    Event URL
                  </div>
                  <div className={classes.urlcontainer}>
                    <div
                      id="CreatorDashBoardPageShareURL"
                      className={classes.url}>
                      {eventURL}
                    </div>
                    <div
                      className={classes.urlcopy}
                      onClick={() => handleCopy()}>
                      <svg
                        id="copy-chunky_svg__eds-icon--copy-chunky_svg"
                        x="0"
                        y="0"
                        viewBox="0 0 24 24">
                        <path
                          id="copy-chunky_svg__eds-icon--copy-chunky_base"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4 8v12h12V8H4zm10 10H6v-8h8v8z"></path>
                        <path
                          id="copy-chunky_svg__eds-icon--copy-chunky_corner"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M20 5v10h-2V6h-8V4h10v1z"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div
                  id="CreatorDashBoardPageShareIconsContainer"
                  className={classes.shareicons}>
                  <div
                    id="CreatorDashBoardPageShareIconsHeader"
                    className={classes.thirsectionheader}>
                    Share On
                  </div>
                  <ul id="CreatorDashBoardPageShareIconsListContainer">
                    <li id="CreatorDashBoardPageShareIconFaceBookContainer">
                      <FaFacebookF className={classes.shareIcon} />
                    </li>
                    <li id="CreatorDashBoardPageShareIconMessengerContainer">
                      <FaFacebookMessenger className={classes.shareIcon} />
                    </li>
                    <li id="CreatorDashBoardPageShareIconTwitterContainer">
                      <FaTwitter className={classes.shareIcon} />
                    </li>
                    <li id="CreatorDashBoardPageShareIconEmailContainer">
                      <MdEmail className={classes.shareIcon} />
                    </li>
                    <li id="CreatorDashBoardPageShareIconLinkedinContainer">
                      <FaLinkedinIn className={classes.shareIcon} />
                    </li>
                    <li id="CreatorDashBoardPageShareIconWhatsappContainer">
                      <FaWhatsapp className={classes.shareIcon} />
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <hr />

            <div id="CreatorDashBoardPageSalesContainer">
              <div
                id="CreatorDashBoardPageSalesHeader"
                className={classes.mainsectionheader}>
                Sales Summary
              </div>

              <div
                id="CreatorDashBoardPageSalesCardsContainer"
                className={classes.salescards}>
                <SalesCards title="Gross Sales" amount={grossSales} />
                <SalesCards title="Net Sales" amount={netSales} />
                <SalesCards
                  title="Tickets + Add-Ons Sold"
                  amount={soldTickets}
                />
                <SalesCards title="Orders" amount={totalOrders} />
              </div>
              <div
                id="CreatorDashBoardPageSalesContent"
                className={classes.content}>
                <SalesByTicket
                  salesReport={salesByTicketReport}
                  is_paginated={isPaginated}
                  handlePagination={handlePagination}
                />
                <div
                  id="CreatorDashBoardPageSalesHyperlinksContainer"
                  className={classes.recommended}>
                  <div
                    id="CreatorDashBoardPageSalesHyperlinksHeader"
                    className={classes.thirsectionheader}>
                    Other Attendee Actions
                  </div>
                  <div
                    id="CreatorDashBoardPageSalesHyperlinks"
                    className={classes.reclistContainer}>
                    {dashboarddata.attendee.map((item, index) => {
                      return (
                        <li
                          id={"CreatorDashBoardPageSalesHyperlink" + index}
                          key={item.key}
                          className={classes.recitemContainer}>
                          <div
                            id={
                              "CreatorDashBoardPageSalesHyperlinkIcon" + index
                            }
                            className={classes.acticonContainer}>
                            {item.icon}
                          </div>
                          <div
                            id={
                              "CreatorDashBoardPageSalesHyperlinkTitleContainer" +
                              index
                            }
                            className={classes.reclistdata}>
                            <Link
                              id={
                                "CreatorDashBoardPageSalesHyperlinkTitleLink" +
                                index
                              }
                              to={"/attendeeSummary" + "/" + event.eventId}>
                              <div
                                id={
                                  "CreatorDashBoardPageSalesHyperlinkTitle" +
                                  index
                                }
                                className={classes.hyperlink}>
                                {item.hyperlink}
                              </div>
                            </Link>
                          </div>
                        </li>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div
                id="CreatorDashBoardPageSalesRecentOrdersContent"
                className={classes.content}>
                <RecentOrders recentordersReport={recentordersReport} />
              </div>
            </div>

      </div>
    </div>
  );
};

export default CreatorDashboard;
