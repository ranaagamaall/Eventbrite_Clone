import React, { useEffect, useState } from "react";
import classes from "./auth.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import logo from "../../assets/brand/envie.svg";
import images from "../../assets/data/loginPhotos";
import { Link } from "react-router-dom";
import axios from "../../requests/axios"
import routes from "../../requests/routes"
import { useNavigate,useParams } from "react-router-dom";
// import { useDispatch } from 'react-redux'
import ErrorNotification from "../../generic components/error message/ErrorNotification";
import { useSelector } from "react-redux";
import GenericModal from "../../generic components/generic modal/GenericModal";
import {GiConfirmed} from "react-icons/gi";


/**
 * Component that renders forget password page
 * 
 * @component
 * @example
 * return(<ForgetPasswordPage />)
*/

const ForgetPasswordPage = ({onSubmit}) => {
  
  const navigate = useNavigate();
//   const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [randImg, setrandImg] = useState(Math.floor(Math.random() * 3));
  const [errorMsg, setErrorMsg] = useState('');
  const [errorLink, setErrorLink] = useState('');
  const [errorLinkMsg, setErrorLinkMsg] = useState('');
  const[confirmform,setconfirmform]=useState(false);


  
  //To make sure user can't access login if he is already logged in 
  useEffect(() => {
    if(user.loggedIn){
      navigate("/")
    }
  }, []);
  
  const initialValues = {
   
    password: ""
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().min(8).required("Password is required"),
  });

  /**
 * Submits the new password data to the server
 * @namespace onSubmit
 * @param   {string} password   User password
 */
  const loginhandle=()=>{
    navigate('/login');
  }
  const {id}= useParams();
  const handleSubmit = (data) => {
    setconfirmform(false);
    console.log(id)
    async function sendData(){
        try{
           
            
            const response = await axios.patch(routes.resetPassword+'/'+id, data)
            setconfirmform(true)
            console.log(response)
            
            
        } catch(err){
            
        }
    }
    sendData()
};
    // onSubmit(data);
    return (
        <div data-testid="ForgetPassComponent">
            <div className={classes.main}>
                <div className={classes.info} >
                    <div className={classes.form}>
                        <Link to="/" className={classes.logoContainer}>
                        <div>
                            <img src={logo} alt="Envie Logo" />
                        </div>
                        </Link>
                        <div className={classes.forgetPassHeader} >
                            <h1>Update your Password</h1>
                            <p className={classes.passwordp}>Enter your new password below</p>
                        </div>
                        {errorMsg?
                        <ErrorNotification mssg={errorMsg} linkmsg={errorLinkMsg} link={errorLink}/>:null}

                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}>

                            {({ values }) => (
                            <Form>
                                <div className={classes.boxContainer}>
                                    <div className={classes.fieldContainer}>
                                            <label className={classes.label}> Password</label>
                                            <Field
                                            className={classes.field}
                                            name="password"
                                            type="password"
                                            autoComplete="off"
                                            data-testid="ForgetPasswordFormPasswordInput"
                                            />
                                    </div>
                                    <ErrorMessage name="password" component="span" />
                                </div>
                                <div className={classes.validpasswordp}><p style={{paddingTop:'1rem'}}>Your password must be at least 8 characters</p></div>
                                <div className={classes.btn}>
                                    <button type="submit" className={classes.button} data-testid="ForgetPasswordFormSubmitButton">
                                        Update password
                                    </button>
                                </div>
                                { confirmform&&(
                                <GenericModal 
                                    header='Password reset successfully'
                                    confirmbtn='Login'
                                    icon={<GiConfirmed className={classes.modalicon}/>}
                                    accepthandle={loginhandle}
                                />
                                )}
                            </Form>)}
                        </Formik>
                    </div>
                </div>
                <div className={classes.image} style={{ backgroundImage: `url(${images[randImg]})` }}></div>
    
            </div>
        </div>
    );
};

export default ForgetPasswordPage;

