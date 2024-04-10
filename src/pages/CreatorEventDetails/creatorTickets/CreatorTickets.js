import classes from "./tickets.module.css";
import GenericFilterTabs from "../../../generic components/generic filter/GenericFilterTabs";
import TicketsFilterTabs from "../../../assets/data/TicketsFilterTabs";
import { useState, useEffect } from "react";
import * as React from "react";
import tickets1 from "../../../assets/data/dummytickets";
import Tickets from "./ticketsAdmission/Tickets";
import Promocodes from "./tickestPromocodes/Promocodes";
/**
 * Component that returns Creator's Manage Tickets page
 *
 * @component
 * @example
 * return(<CreatorTickets />)
 */

const CreatorTickets = ({ eventID }) => {
  const [addmisionclicked, setAddmisionclicked] = useState(true);
  const [loading, setLoading] = useState(true);
  const [empty, setEmpty] = useState(false);
  function handleClickedItem(i) {
    if (i === 2) {
      setAddmisionclicked(false);
    } else {
      setAddmisionclicked(true);
    }
  }

  return (
    <div className={classes.whole}>
      <div className={classes.container}>
        <p className={classes.ticketp}>Tickets</p>
        {!loading && !empty && (
          <GenericFilterTabs
            FilterTabsData={TicketsFilterTabs}
            clickedItem={handleClickedItem}
          />
        )}

        {addmisionclicked ? (
          <Tickets empty={setEmpty} isempty={empty} loading={setLoading} isloading={loading}/>
        ) : (
          <Promocodes />
        )}

        {/* <TicketModal
          tickets={ticketlist}
          modalopen={modalopen}
          setticketsmodalopen={setticketsmodalopen}
          ticketsmodal={setticketsmodal}
        /> */}
      </div>
    </div>
  );
};

export default CreatorTickets;
