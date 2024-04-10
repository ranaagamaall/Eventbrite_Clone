const dashboardSidebarData = {
  eventDetails: [
    { title: "Basic Info", route: "/basicinfo" },
    { title: "Details", route: "/details" },
    { title: "Online Event Page", route: "" },
    { title: "Tickets", route: "/tickets" },
    { title: "Publish", route: "/publish" },
  ],
  eventManagement: [
    { title: "Order Options" },
    { title: "Marketing" },
    {
      title: "Manage Attendees",
      list: [
        { title: "Orders", route: "" },
        { title: "Attendee Credits", route: "" },
        { title: "Add Attendees", route: "/addattendee" },
        { title: "Emails to Attendees", route: "" },
        { title: "Attendee List", route: "" },
        { title: "Check-in", route: "" },
      ],
    },
  ],
};
export default dashboardSidebarData;
