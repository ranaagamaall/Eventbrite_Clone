importScripts('https://www.gstatic.com/firebasejs/7.13.2/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/7.13.2/firebase-messaging.js')

const firebaseConfig = {
    apiKey: "AIzaSyCQxs2uUgxJEZlIOiRWlP9i5bOH4hH_6x4",
    authDomain: "envie-a85e3.firebaseapp.com",
    projectId: "envie-a85e3",
    storageBucket: "envie-a85e3.appspot.com",
    messagingSenderId: "694507357363",
    appId: "1:694507357363:web:9f579146eed77a519e5cc6",
    measurementId: "G-70EX7VHW2W"
};
firebase.initializeApp(firebaseConfig);

const initMessaging = firebase.messaging();