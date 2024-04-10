import React from "react";
import AddTicketForm from "./addTicketForm/AddTicketForm";
import { useState, useEffect } from "react";
import tickets1 from "../../../../assets/data/dummytickets";
import TicketsView from "./ticketsListView/TicketsView";
import initialValuedata from "../../../../assets/data/initialValuedata";

/**
 * Component that returns Creator's Manage Tickets List and form
 *
 * @component
 * @example
 * return(<Tickets empty={setEmpty} isempty={empty} loading={setLoading} isloading={loading} />)
 */

export default function Tickets({ empty, isempty, loading, isloading }) {
  const [dummydata, setdummydata] = useState(true);
  const [ticketlist, setticketlist] = useState(tickets1.tickets2);
  const [modalopen, setticketsmodalopen] = useState(false);
  const [tickets, setticketsmodal] = useState(tickets1.tickets2);
  const [allticketmodal, setallticketmodal] = useState(false);
  const [index, setindex] = useState(-1);
  const [editform, seteditform] = useState(false);
  const [initialvalues, setintialvalues] = useState(initialValuedata);
  const [editform2, seteditform2] = useState(false);
  return (
    <div>
      <AddTicketForm
        setdummydata={setdummydata}
        dummydata={dummydata}
        ticket={ticketlist}
        isempty={isempty}
        isloading={isloading}
        setallticketmodal={setallticketmodal}
        openmodal={allticketmodal}
        index={index}
        seteditform={seteditform}
        allticketmodal={allticketmodal}
        editform={editform}
        Initialvalues={initialvalues}
        setintialvalues={setintialvalues}
        editform2={editform2}
        seteditform2={seteditform2}
      />
      <TicketsView
        setallticketmodal={setallticketmodal}
        empty={empty}
        isloading={loading}
        dummydata={dummydata}
        ticketsnew={setticketlist}
        setindex={setindex}
        seteditform={seteditform}
        seteditform2={seteditform2}
      />
    </div>
  );
}
