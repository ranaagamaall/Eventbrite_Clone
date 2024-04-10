import React, { useState, useEffect } from "react";
import classes from "./creatorEvents.module.css";
import CreatorNav from "../../layouts/nav/CreatorNav";
import axios from "../../requests/axios";
import routes from "../../requests/routes";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/userSlice";
import SideBar from "../../layouts/sideBar/Sidebar";
import EventListCard from "./eventListCard";
import IosShareIcon from "@mui/icons-material/IosShare";
import Loader from "../../layouts/loader/Loader";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { BsCalendarEvent } from "react-icons/bs";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box } from "@mui/material";

/**
 * Component that returns Creator's main page
 *
 * @component
 * @example
 * return(<CreatorEvents />)
 */
const CreatorEvents = () => {
  const user = useSelector((state) => state.user);
  const id = user.id;
  const [name, setName] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [eventList, setEventList] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [filterValue, setFilterValue] = useState("/all-events");

  const handleChange = (data) => {
    setFilterValue(data);
  };

  /**
   * function that sends the request that switchs user type from user to creator
   * @namespace switchCreator
   */
  async function switchCreator() {
    let response = "";
    try {
      response = await axios.get(routes.userToCreator + "/" + id);
      dispatch(
        userActions.creator({
          isCreator: response.data.isCreator,
        })
      );
      setName([user.firstName, user.lastName]);
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  }

  /**
   * function that gaurds the creator route => navigates to login page if user not logged in, switches to creator type if user type is 'user'
   * @namespace checkCreator
   */
  // const checkCreator = () => {
  //   if (user.loggedIn) {
  //     if (!user.isCreator) {
  //       switchCreator();
  //     }
  //   } else {
  //     navigate("/login");
  //   }
  // };

  useEffect(() => {
    // checkCreator();
  }, []);

  /**
   * function that sends the request that gets all events created by a certain user(creator)
   * @namespace getEvents
   */
  async function getEvents() {
    setLoader(true);
    setEventList([]);
    try {
      const request = await axios.get(
        routes.getAllEventsCreator + user.id + filterValue
      );

      if (filterValue == "/all-events") {
        setEventList(request.data.events);
      } else {
        setEventList(request.data.userEvents);
      }
      setLoader(false);
    } catch (err) {
      setLoader(false);
    }
  }

  async function handleExport() {
    try {
      axios
        .get(routes.getAllEventsCreator + user.id + "/all-events/download")
        .then((resp) => {
          setTransactionData(resp.data);
        });
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  }

  useEffect(() => {
    getEvents();
    handleExport();
  }, []);

  useEffect(() => {
    getEvents();
  }, [filterValue]);

  return (
    <>
      <CreatorNav />
      <div className={classes.container}>
        <SideBar />
        <div className={classes.main}>
          <div className={classes.header}>
            <h1>Events</h1>
          </div>
          {/* {!loader && ( */}
          <div className={classes.btn}>
            <div className={classes.btnsList}>
              <div className={classes.searchField}>
                <AiOutlineSearch size={"2rem"} />
                <input
                  type="text"
                  placeholder="Search events"
                  className={classes.search}
                  disabled
                />
              </div>
              <div className={classes.unusedBtn}>
                <AiOutlineUnorderedList size={"1.8rem"} color="#FFFFFF" />
                <p>List</p>
              </div>
              <div className={classes.unusedBtnCalendar}>
                <p>Calendar</p>
              </div>
              {/* <div className={classes.unusedBtn}>
                <p>Draft</p>
              </div> */}

              <FormControl>
                <Select
                  className={classes.unusedselect}
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={filterValue}
                  onChange={(e) => handleChange(e.target.value)}
                  autoWidth>
                  <MenuItem value="/all-events">All Events</MenuItem>
                  <MenuItem value="/past-events">Past Events</MenuItem>
                  <MenuItem value="/upcoming-events">Upcoming Events</MenuItem>
                </Select>
              </FormControl>
            </div>
            <button
              type="button"
              className={classes.button}
              data-testid="toCreateEventBtn"
              onClick={() => navigate("/create")}>
              Create Event
            </button>
          </div>
          {/* )} */}
          {loader ? (
            <Loader color={"#4be1a0"} />
          ) : eventList.length !== 0 ? (
            <div className={classes.events}>
              <ul className={classes.eventTableHeader}>
                <li>Event</li>
                <li>Sold</li>
                <li>Gross</li>
                <li>Status</li>
              </ul>

              <div className={classes.eventTable}>
                {eventList.map((event, index) => (
                  <EventListCard event={event} />
                ))}
              </div>
            </div>
          ) : (
            <div className={classes.emptypromos}>
              <div className={classes.emptyticketsicon}>
                <svg viewBox="0 0 144 144">
                  <g fill="none" fill-rule="evenodd">
                    <g>
                      <path fill="none" d="M0 0h144v144H0z"></path>
                      <g>
                        <path
                          fill="#FFF"
                          d="M25.5 112.5h93v-66h-93zM25.5 46.5h93v-15h-93z"></path>
                        <path
                          stroke="#3A3A3A"
                          stroke-width="3"
                          d="M25.5 112.5h93v-66h-93z"></path>
                        <path
                          fill="#D2D6DF"
                          d="M55.5 66h9v-9h-9zM67.5 66h9v-9h-9zM79.5 66h9v-9h-9zM91.5 66h9v-9h-9zM103.5 66h9v-9h-9zM31.5 78h9v-9h-9zM43.5 78h9v-9h-9zM55.5 78h9v-9h-9zM67.5 78h9v-9h-9zM79.5 78h9v-9h-9zM91.5 78h9v-9h-9zM103.5 78h9v-9h-9zM31.5 90h9v-9h-9zM43.5 90h9v-9h-9zM55.5 90h9v-9h-9z"></path>
                        <path
                          fill="#F6682F"
                          d="M67.5 90h9v-9h-9zM79.5 90h9v-9h-9zM91.5 90h9v-9h-9zM103.5 90h9v-9h-9zM31.5 102h9v-9h-9zM43.5 102h9v-9h-9zM55.5 102h9v-9h-9zM67.5 102h9v-9h-9zM79.5 102h9v-9h-9z"></path>
                        <path
                          stroke="#3A3A3A"
                          stroke-width="3"
                          d="M25.5 42V31.5h93V42"></path>
                        <path
                          d="M34.5 37.5h75M49.5 61.5h-3M37.5 61.5h-3M109.5 97.5h-3M97.5 97.5h-3"
                          stroke="#3A3A3A"
                          stroke-width="3"
                          stroke-linejoin="round"></path>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <div className={classes.mainsectionheader}>No Events to Show</div>
            </div>
          )}
          {transactionData.length !== 0 ? (
            <div className={classes.export}>
              <IosShareIcon sx={{ fontSize: "18px" }} />
              <a
                href={`data:text/csv;charset=utf-8,${escape(transactionData)}`}
                download="events.csv"
                data-testid="EventsExport">
                CSV Export
              </a>
            </div>
          ) : (
            <div className={classes.exportDisabled}>
              <IosShareIcon sx={{ fontSize: "18px" }} />
              <p
                className={classes.disabled}
                data-testid="EventsExportDisabled">
                CSV Export
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CreatorEvents;
