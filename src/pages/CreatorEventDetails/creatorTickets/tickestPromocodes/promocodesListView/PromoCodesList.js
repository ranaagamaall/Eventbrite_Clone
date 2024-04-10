import React from "react";
import { useState, useEffect } from "react";
import classes from "./promocodelist.module.css";
import axios from "../../../../../requests/axios";
import routes from "../../../../../requests/routes";
import data from "../../../../../assets/data/dummyData";
import tableheader from "../../../../../assets/data/promocodes";
import moment from "moment";
// import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import CircleLoader from "../../../../../layouts/loader/CircleLoader";

/**
 * Component that returns Creator's Manage Promo codes List
 *
 * @component
 * @example
 * return(<PromoCodesList  dummydata={dummydata} setemptypromo={setEmptypromo} setloadinglist={setloadinglist} />)
 */

const PromoCodesList = ({ dummydata, setemptypromo, setloadinglist }) => {
  const event = useSelector((state) => state.event);
  const [promocodes, setPromocodes] = useState(data.promocodes);
  const [loading, setloading] = useState(false);
  const now = moment();

  /**
     * function that is triggered to get list of promocodes
     * @function getPromoCodes

     */
  async function getPromoCodes() {
    try {
      setloading(true);
      setloadinglist(true);
      const response = await axios.get(routes.promocode + "/" + event.eventId);
      setPromocodes(response.data.promocodes);
      if (response.data.promocodes.length == 0) {
        setemptypromo(true);
      } else {
        setemptypromo(false);
      }
      setloading(false);
      setloadinglist(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getPromoCodes();
  }, [dummydata]);

  return (
    <div>
      {loading ? (
        <>
          {/* <div className={classes.loading}>
            <CircularProgress color="success" size={80} />
          </div> */}
          <CircleLoader color={"#4be1a0"} />
        </>
      ) : (
        <div
          id="CreatorTicketsPagePromoCodesContainer"
          className={classes.container}>
          {promocodes.length !== 0 ? (
            <div
              id="CreatorTicketsPagePromoCodesTableContainer"
              className={classes.salestable}>
              <table id="CreatorTicketsPagePromoCodesTable">
                <thead id="CreatorTicketsPagePromoCodesTableHead">
                  <tr
                    className={classes.tableheader}
                    id="CreatorTicketsPagePromoCodesTableHeadRow">
                    {tableheader.header.map((item, index) => {
                      return (
                        <td
                          key={
                            "CreatorTicketsPagePromoCodesTableHeadData" + index
                          }
                          id={
                            "CreatorTicketsPagePromoCodesTableHeadData" + index
                          }
                          className={classes.tableheaderitem}>
                          {item}
                        </td>
                      );
                    })}
                    <td className={classes.tableheaderitemempty}></td>
                  </tr>
                </thead>
                <tbody id="CreatorTicketsPagePromoCodesTableBody">
                  {promocodes.map((item, index) => {
                    return (
                      <tr
                        key={"CreatorTicketsPagePromoCodesTableBodyRow" + index}
                        id={"CreatorTicketsPagePromoCodesTableBodyRow" + index}
                        className={classes.tablebodyrow}>
                        <td id="CreatorTicketsPagePromoCodesTableBodypromoname">
                          {item.name}
                        </td>
                        <td id="CreatorTicketsPagePromoCodesTableBodypromotype">
                          Applies discount
                        </td>
                        <td id="CreatorTicketsPagePromoCodesTableBodypromodiscount">
                          {item.amountOff == -1
                            ? item.percentOff + " %"
                            : "E£ " + item.amountOff}
                        </td>
                        <td id="CreatorTicketsPagePromoCodesTableBodypromouses">
                          {item.used + " / " + item.limit}
                        </td>
                        <td id="CreatorTicketsPagePromoCodesTableBodypromostatus">
                          <div className={classes.status}>
                            <div
                              id="CreatorTicketsPagePromoCodesTableBodypromostatusIcon"
                              className={
                                now.diff(moment(item.endDate)) > 0
                                  ? classes.statusicon
                                  : classes.statusiconactive
                              }></div>
                            {now.diff(moment(item.endDate)) > 0 ? (
                              <div
                                id="CreatorTicketsPagePromoCodesTableBodypromostatusDesc"
                                className={classes.statusdesc}>
                                <div>Ended</div>
                                <div className={classes.statustitle}>
                                  Event has ended
                                </div>
                              </div>
                            ) : (
                              <div
                                id="CreatorTicketsPagePromoCodesTableBodypromostatusDesc"
                                className={classes.statusdesc}>
                                <div>Active</div>
                                <div className={classes.statustitle}>
                                  Ends:{moment(item.endDate).format("ll")}
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default PromoCodesList;
