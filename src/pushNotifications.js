import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import axios from "./requests/axios";
import routes from "./requests/routes";

const firebaseConfig = {
  apiKey: "AIzaSyCQxs2uUgxJEZlIOiRWlP9i5bOH4hH_6x4",
  authDomain: "envie-a85e3.firebaseapp.com",
  projectId: "envie-a85e3",
  storageBucket: "envie-a85e3.appspot.com",
  messagingSenderId: "694507357363",
  appId: "1:694507357363:web:9f579146eed77a519e5cc6",
  measurementId: "G-70EX7VHW2W"
};
function sendNotificationsTokenToServer(token){
  axios.post(routes.sendNotificationToken, {
    registrationToken: token
  })
  .then((response) => {
      console.log(response);
  })
  .catch((error) => {
      console.log(error);
  })
}
function PushNotification(){
  
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {

    var app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);
    getToken(messaging, {
      vapidKey: "BNLJt7YFkWDa00Lnv0Rhffjv12gUXlmZg_WdY5eq_gP4OYjK8uDOydjME-0hwREI1VE2adcHRG3t5o7IElm08dw"
    })
    .then((currentToken) => {
      if (currentToken) {
        sendNotificationsTokenToServer(currentToken);
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });

  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        var app = initializeApp(firebaseConfig);
        const messaging = getMessaging(app);
        getToken(messaging, {
          vapidKey: "BNLJt7YFkWDa00Lnv0Rhffjv12gUXlmZg_WdY5eq_gP4OYjK8uDOydjME-0hwREI1VE2adcHRG3t5o7IElm08dw"
        })
        .then((currentToken) => {
          if (currentToken) {
            sendNotificationsTokenToServer(currentToken);
          }
        }).catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
        });
      }
    });
  }
}

PushNotification();