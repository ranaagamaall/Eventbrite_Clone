import React, { useEffect, useState } from "react";
import classes from "./auth.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import logo from "../../assets/brand/envie.svg";
import images from "../../assets/data/loginPhotos";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { GrFacebookOption } from "react-icons/gr";
import { AiFillApple } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa";
import axios from "../../requests/axios"
import routes from "../../requests/routes"
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import {userActions} from '../../store/userSlice'
import ErrorNotification from "../../generic components/error message/ErrorNotification";
import { useSelector } from "react-redux";
import GenericModal from "../../generic components/generic modal/GenericModal";
import {TfiEmail} from "react-icons/tfi";

/**
 * Component that renders Login Page
 * 
 * @component
 * @example
 * return(<LoginPage />)
*/

const LoginPage = ({onSubmit}) => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  
  const [randImg, setrandImg] = useState(Math.floor(Math.random() * 3));
  const [dropDown, setDropDown] = useState(false);
  const [email, setEmail] = useState("");
  
  const [errorMsg, setErrorMsg] = useState('');
  const [errorLink, setErrorLink] = useState('');
  const [errorLinkMsg, setErrorLinkMsg] = useState('');

  const [forgetPasswordModal, setForgetPasswordModal] = useState(false);

  

  //To make sure user can't access login if he is already logged in 
  useEffect(() => {
    if(user.loggedIn){
      navigate("/")
    }
  }, []);
  
  const initialValues = {
    emailAddress: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    emailAddress: Yup.string()
      .min(3)
      .email("Please enter a valid email address")
      .required("Please enter a valid email address"),
    password: Yup.string().required("Password is required"),
  });

/**
 * Submits the form login data to the server
 * @namespace onSubmit
 * @param   {string} email      User valid email
 * @param   {string} password   User password
 */
  const handleSubmit = (data, {setErrors}) => {
    setErrorMsg("")
    setErrorLinkMsg("")
    setErrorLink("")
    setEmail(data.emailAddress)

    async function sendData(){
      try{
        const response = await axios.post(routes.logIn, data)
        console.log(response)

        dispatch(userActions.login(
          { id: response.data.user._id, 
            token: response.data.token, 
            email: response.data.user.emailAddress,
            firstName: response.data.user.firstName,
            lastName: response.data.user.lastName,
            isCreator: response.data.user.isCreator 
          }))
        navigate("/");
        
      } catch(err){
        if(err.response.data.message==="Password is incorrect"){
          setErrorMsg(err.response.data.message)
          setErrors({password:err.response.data.message})
        }
        else if (err.response.data.message==="Please verify your email first.") {
          setErrorMsg(err.response.data.message)
        }
        else {
          setErrorMsg("There is no account associated with the email.")
          setErrors({email:"There is no account associated with the email."})
          setErrorLinkMsg("Create account")
          setErrorLink("/signup")
        }
      }
    }
    sendData()

    // onSubmit(data);
  };

  const handleForgetPassword = () => {
    setForgetPasswordModal(false);

    async function sendData(){
      try{
        const response = await axios.post(routes.forgotPassword, {"emailAddress": email})
        console.log(response)
        setForgetPasswordModal(true);

      } catch(err){
        console.log(err)
      }
    }

    sendData()


  }

  return (
    <div data-testid="LoginComponent">
      <div className={classes.main}>
        <div className={classes.info}>
          <div className={classes.form}>
            <Link to="/" className={classes.logoContainer}>
              <div>
                <img src={logo} alt="Envie Logo" />
              </div>
            </Link>
            <div className={classes.header}>
              <h1>Log in</h1>
              <Link to="/signup">
                <p className={classes.smallScreenlink}>Signup</p>
              </Link>
            </div>
           
            {errorMsg?
            <ErrorNotification mssg={errorMsg} linkmsg={errorLinkMsg} link={errorLink}/>:null}

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}>

              {({ values }) => (
              <Form>
                {setEmail(values.emailAddress)}
                <div className={classes.boxContainer}>
                  <div className={classes.fieldContainer}>
                    <label className={classes.label}> Email address</label>
                    <Field
                      className={classes.field}
                      name="emailAddress"
                      autoComplete="off"
                      data-testid="LoginFormEmailInput"
                    />
                  </div>
                  <ErrorMessage name="emailAddress" component="span" data-testid="emailError"/>
                </div>
                <div className={classes.boxContainer}>
                  <div className={classes.fieldContainer}>
                    <label className={classes.label}> Password</label>
                    <Field
                      className={classes.field}
                      name="password"
                      type="password"
                      autoComplete="off"
                      data-testid="LoginFormPasswordInput"
                    />
                  </div>
                  <ErrorMessage name="password" component="span" />
                </div>

                <div className={classes.btn}>
                  <button type="submit" className={classes.button} data-testid="LoginFormSubmitButton">
                    Log in
                  </button>
                </div>
              </Form>)}
            </Formik>
            <p className={classes.screenLink} onClick={handleForgetPassword}>Forgot password?</p>
            <div className={classes.splitfield}>
              <hr className={classes.hr_split} />
              <div className={classes.splittext}>or</div>
            </div>
            <div className={classes.btn1}>
              <button className={classes.btn1}>
                {" "}
                <p>Email me a login link</p>
              </button>
            </div>
            <div className={classes.btn1}>
              <button className={classes.btn1}>
                {" "}
                <FcGoogle className={classes.icon} />{" "}
                <p> Sign in with Google </p>
              </button>
            </div>
            <div className={classes.methods}>
              <h3 onClick={() => setDropDown(!dropDown)}>
                Other login methods{" "}
                <FaChevronDown className={classes.downArrow} size={12} />
              </h3>
              <ul className={dropDown ? classes.showDropDown : null}>
                <li style={{ backgroundColor: "#1877f2" }}>
                  <div>
                    <GrFacebookOption className={classes.methodsIcon} />
                  </div>
                </li>
                <li style={{ backgroundColor: "#4b4d63" }}>
                  <div>
                    <AiFillApple className={classes.methodsIcon} />
                  </div>
                </li>
              </ul>
            </div>

            <Link to="/signup">
              <p className={classes.wideScreenlink}>Signup</p>
            </Link>
          </div>
        </div>
        <div
          className={classes.image}
          style={{ backgroundImage: `url(${images[randImg]})` }}></div>
      </div>
      {forgetPasswordModal&&
      <GenericModal 
          header='Check your email to update your password' 
          details={'We sent a link to ' +`${email}`+ ' to update your password.'}
          moreDetails='For your security, this link will expire in 15min.'
          icon={<TfiEmail className={classes.modalicon}/>}
      />}
    </div>
  );
};

export default LoginPage;
