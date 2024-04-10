import React, { useEffect, useState } from "react";
import classes from "./Ticketsmodal.module.css";
import { AiOutlineCheck } from "react-icons/ai";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TicketData from "../../assets/data/TicketData";
import { allSettled } from "q";

const ticketsmap = TicketData.Ticketsinfo;
const TicketModal = ({ tickets, modalopen, setticketsmodalopen,update }) => {
  // const [stateofform, changestateofform] = useState(true);
  // const handleClose = () => {
  //   changestateofform(false);
  // };
  const [Selectedall, setselectall] = useState(false);

  const [updatedTickets, setupdatedtickets] = useState([]);

  useEffect(() => {
    setupdatedtickets(tickets.map((ticket) => ({ ...ticket, selected2: 0 })));
  }, [tickets]);

  //const [updatedTickets, setupdatetickets] = useState(tickets);

  // let n = ticketsmap[0].length;
  // let myArray = Array(n)
  //   .fill()
  //   .map((element, index) => ({
  //     checked: 0,
  //   }));

  let selectednum = 0;

  function handleSelectAll() {
    setselectall(!Selectedall);

    if (Selectedall) {
      const updated = updatedTickets.map((ticket) => ({
        ...ticket,
        selected2: 0,
      }));

      setupdatedtickets(updated);
      // ticketsmodal(updated);
    } else {
      const updated = updatedTickets.map((ticket) => ({
        ...ticket,
        selected2: 1,
      }));

      setupdatedtickets(updated);
      // ticketsmodal(updated);
     
    }
  }
  function handleClose() {
    update(updatedTickets)
    setticketsmodalopen(false);
  }
  function handleClick(index) {

    var temp =updatedTickets.map((ticket,ind) => ({
      
    
        ...ticket,
        selected2:(index==ind)?!ticket.selected2:ticket.selected2

  
    }));
    setupdatedtickets(temp);
  }
  return (
    <Modal
      open={modalopen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={classes.genericmodal}
    >
      <Box
        sx={{
          backgroundColor: "#f8f7fa",
          borderRadius: 1,
          width: "60%",
          maxWidth: 600,
          border: "0px",
          outline: "none",
        }}
      >
        <div className={classes.container}>
          <div className={classes.header}>Select Tickets</div>
          <div className={classes.staticheader}>
            <div
              className={Selectedall ? classes.selected : classes.radiobutton}
              onClick={handleSelectAll}
            >
            
            </div>
            <div className={classes.staticheader2}>Ticket Type </div>
            <div className={classes.pricep}>Price</div>
          </div>
          <ul>
            {tickets.map((element, index) => {
              return (
                <div className={classes.staticheaderticket}>
                  <div
                    className={
                      (updatedTickets[index] &&
                        updatedTickets[index].selected2) == 1
                        ? classes.selected
                        : classes.radiobutton
                    }
                    onClick={() => handleClick(index)}
                  >
                    
                  </div>
                  <div className={classes.staticheader2}>{element.name}</div>
                  <div className={classes.pricep}>{element.type}</div>
                </div>
              );
            })}
          </ul>
          <div className={classes.footer} onClick={handleClose}>
            <button>Done</button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};
export default TicketModal;
