import React, { useState } from "react";
import classes from "./dashboardsidebar.module.css";
import { BiChevronLeft } from "react-icons/bi";
import { BsBoxArrowUpRight } from "react-icons/bs";
import {CiMenuBurger} from "react-icons/ci";
import dashboardSidebarData from "../../assets/data/dashboardSidebarData";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const DashboardSidebar = (props) => {
  const event = useSelector((state) => state.event);
  const navigate = useNavigate();
  const location = useLocation();
  const parts = location.pathname.split("/");
  const lastPart = parts[parts.length - 1];
  const eventdetailsList = dashboardSidebarData.eventDetails;
  const eventManagementList = dashboardSidebarData.eventManagement;
  const [selected, setSelected] = useState("/" + lastPart);
  const [openlist, setopenlist] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);

  const handleroute = (route) => {
    if (route !== "") {
      let now = selected;
      setSelected(route);
      console.log(location.pathname.replace(now, route));
      navigate(location.pathname.replace(now, route), { replace: true });
    }
  };

  const handlelist = (item) => {
    if (item.list) {
      setopenlist(!openlist);
    }
  };

  useEffect(() => {
    // console.log(location);
  }, []);
  return (
    <>
    <div className={classes.burger} onClick={()=>setOpenSideBar(!openSideBar)}>
      <CiMenuBurger className={classes.icon}/>
    </div>
    <div className={!openSideBar?classes.mainHide:classes.main}>
      <div className={classes.eventDescription}>
        <div className={classes.backbutton}>
          <div>
            {" "}
            <BiChevronLeft size={24} />
          </div>
          <Link to="/events" className={classes.backbuttontext}>
            Events
          </Link>
        </div>
        <div className={classes.selector}>
          <select>
            <option> Publish now </option>
            <option> Schedule publish </option>
          </select>
        </div>
        <div className={classes.eventDescriptionText}>
          <h2>{event.eventTitle}</h2>
          <p>{event.dayName}, {event.eventMonthAbr} {event.eventDay}, {event.year}</p>
          <div className={classes.viewevent}>
            <div className>View your event</div> <BsBoxArrowUpRight size={16} />
          </div>
        </div>
      </div>
      <div>
        <div>
          <ol className={classes.eventMenu}>
            {eventdetailsList.map((eventdata, index) => {
              return (
                <li
                  className={classes.eventmenuitems}
                  onClick={() => handleroute(eventdata.route)}>
                  <div className={classes.circle}>{index + 1}</div>
                  {eventdata.title}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
      <div>
        <div
          onClick={() => handleroute("/dashboard")}
          className={classes.dashboardbtn}>
          Dashboard
        </div>
        <div>
          <ul className={classes.eventMenu}>
            {eventManagementList.map((menutitle, index) => {
              return (
                <div>
                  <li
                    onClick={() => handlelist(menutitle)}
                    className={classes.eventmenuitems}>
                    <div className={classes.dashboardmenu}>
                      {menutitle.title}
                    </div>
                    <div className={classes.dashboardimg}>
                      <MdKeyboardArrowDown size={22} />
                    </div>
                  </li>
                  {menutitle.list &&
                    openlist &&
                    menutitle.list.map((listitem, index2) => {
                      return (
                        <div>
                          <li
                            onClick={() => handleroute(listitem.route)}
                            className={classes.eventmenuitems}>
                            <div className={classes.dashboardmenu}>
                              {listitem.title}
                            </div>
                          </li>
                        </div>
                      );
                    })}
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
    </>
  );
};

export default DashboardSidebar;
