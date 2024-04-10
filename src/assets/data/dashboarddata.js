import { TbSpeakerphone } from "react-icons/tb";
import classes from "../../pages/CreatorEventDetails/creatorDashboard/dashboard.module.css";

const dashboarddata = {
  recommended: [
    {
      key: "0",
      title: "Get more exposure with Envie Ads",
      hyperlink: "Learn More",
      icon: (
        <svg
          id="megaphone_svg__eds-icon--megaphone_svg"
          x="0"
          y="0"
          viewBox="0 0 24 24">
          <path
            id="megaphone_svg__eds-icon--megaphone_base"
            fill-rule="evenodd"
            clip-rule="evenodd"
            fill="#231F20"
            d="M21 12c0-1.7-1.5-3.1-3-3.1V3h-1v1.1L7 9H3v6h2v3h1v-3h1.2l9.8 4.8V21h1v-5.9c1.5 0 3-1.4 3-3.1zM4 14h3v-4H4v4zm13 4.7l-9-4.4V9.6l9-4.4v13.5zm1-4.6V9.9c1 0 2 1 2 2.1 0 1.2-1 2.1-2 2.1z"></path>
        </svg>
      ),
    },
    {
      key: "1",
      title: "Learn how to make the most of Envie",
      hyperlink: "Read our quick start guide",
      icon: (
        <svg
          id="megaphone_svg__eds-icon--megaphone_svg"
          x="0"
          y="0"
          viewBox="0 0 24 24">
          <path
            id="megaphone_svg__eds-icon--megaphone_base"
            fill-rule="evenodd"
            clip-rule="evenodd"
            fill="#231F20"
            d="M21 12c0-1.7-1.5-3.1-3-3.1V3h-1v1.1L7 9H3v6h2v3h1v-3h1.2l9.8 4.8V21h1v-5.9c1.5 0 3-1.4 3-3.1zM4 14h3v-4H4v4zm13 4.7l-9-4.4V9.6l9-4.4v13.5zm1-4.6V9.9c1 0 2 1 2 2.1 0 1.2-1 2.1-2 2.1z"></path>
        </svg>
      ),
    },
  ],
  attendee: [
    {
      key: "0",
      hyperlink: "Attendee summary report",
      icon: (
        <svg
          class="line-chart_svg__eds-icon--line-chart__svg"
          viewBox="0 0 24 24">
          <path
            class="line-chart_svg__eds-icon--line-chart__base"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3 21v-5.9l2.8-2.4c.4.3.8.4 1.2.4.6 0 1.1-.3 1.5-.7l2.5 1.3v.4c0 1.1.9 2 2 2s2-.9 2-2c0-.3-.1-.6-.2-.9l3-2.5c.3.2.7.4 1.2.4 1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2c0 .3.1.6.2.9l-3 2.5c-.3-.2-.7-.4-1.2-.4-.6 0-1.1.3-1.5.7L9 11.5v-.4c0-1.1-.9-2-2-2s-2 .9-2 2c0 .3.1.6.2.9L3 13.8V2H2v20h20v-1H3zM19 8.1c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1c0-.5.4-1 1-1zm-6 5c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1c0-.5.4-1 1-1zm-6-3c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1c0-.5.4-1 1-1z"></path>
        </svg>
      ),
      route: "/",
    },
    {
      key: "1",
      hyperlink: "Responses to custom questions",
      icon: (
        <svg id="chat_svg__eds-icon--chat_svg" x="0" y="0" viewBox="0 0 24 24">
          <path
            id="chat_svg__eds-icon--chat_base"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15 5c3.3 0 6 2.7 6 6s-2.7 6-6 6h-1.6L12 18.5 10.4 17H9c-3.3 0-6-2.7-6-6s2.7-6 6-6h6m0-1H9c-3.9 0-7 3.1-7 7s3.1 7 7 7h1l2 2 1.8-2H15c3.9 0 7-3.1 7-7s-3.1-7-7-7"></path>
          <g
            id="chat_svg__eds-icon--chat_dots"
            fill-rule="evenodd"
            clip-rule="evenodd">
            <path d="M11 10h2v2h-2zM15 10h2v2h-2zM7 10h2v2H7z"></path>
          </g>
        </svg>
      ),
      route: "/",
    },
  ],
  salesheader: ["Ticket type", "Price", "Sold"],
  recentordersheader:["Order #",	"Name"	,"Quantity",	"Price",	"Date"],
};

export default dashboarddata;
