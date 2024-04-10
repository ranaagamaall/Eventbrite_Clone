import classes from "./genericModal.module.css";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

/**
 * Component that renders generic modal used to confirm actions
 * 
 * @component
 * @example
 * return(<GenericModal 
            header='Password reset successfully'
            confirmbtn='Login'
            icon={<GiConfirmed className={classes.modalicon}/>}
            accepthandle={loginhandle}
        />)
*/

const GenericModal = (props) => {
  const[statebtn,changestatebtn]=useState(true);
  const handleClose = () => {
    if(props.reloadClose){
      console.log("not reloading")
      window.location.reload()} 
    changestatebtn(false);
  };
  return (
  
       <Modal
        open={statebtn}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={classes.genericmodal}>
        <Box   sx={{backgroundColor: '#e2e1e6;',borderRadius: 1,width:'70%',maxWidth:600,border:'0px',outline:'none'}} >
            <div className={classes.info}>
                <IconButton 
                  aria-label="close"
                  onClick={() => {handleClose()}}
                  className={classes.modalclose}>
                  <CloseIcon className={classes.btnclose}/>
                </IconButton>
                <div className={classes.iconcontainer}>
                  {props.icon}
                </div>
              <div className={classes.infoheader}>
                <h1>{props.header}</h1> 
                <p>{props.details}</p>

                <p className={classes.moreDetails}>{props.moreDetails}</p>
              </div>
              <div className={classes.modalbuttons}>
              {props.rejectbtn && (
                <div className={classes.btncontainer}>
                  <button className={classes.staybutton} onClick={props.rejecthandle}>
                    {props.rejectbtn}
                  </button>
                </div>
              )}
              {props.confirmbtn &&(
                  <div className={classes.btncontainer}>
                  <button className={classes.leavebutton} onClick={props.accepthandle}>
                    {props.confirmbtn}
                  </button>
                </div>
                )}
               
              </div>
            </div>
        </Box>
      </Modal>
  );
};

export default GenericModal;
