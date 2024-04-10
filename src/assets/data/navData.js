const navData = {
  homeAttendee: [
    [
      {
        title: "Organize",
        list: [
          {
            title: "Create Events",
            icon: "",
            route: "/",
          },
          {
            title: "Pricing",
            icon: "//balbla",
            route: "/",
          },
          {
            title: "Resources",
            icon: "//balbla",
            route: "/",
          },
          {
            title: "Contact Sales",
            icon: "//balbla",
            route: "/",
          },
        ],
      },
      {
        title: "Help",
        list: [
          {
            title: "Find your tickets",
            icon: "/",
            route: "/",
          },
          {
            title: "Contact an event organizer",
            icon: "/",
            route: "/",
          },
          {
            title: "Visit the help center",
            icon: "//balbla",
            route: "/",
          },
        ],
      },
      {
        title: "Create an event",
        route: "/create",
        color: "blue",
      },
    ],
    [
      {
        title: "Login",
        route: "/login",
      },
      {
        title: "Sign Up",
        route: "/signup",
      },
    ],
  ],

  homeUser: [
    [
      {
        title: "Create an event",
        route: "/create",
        color: "blue",
        icon: (
          <svg x="0" y="0" viewBox="0 0 24 24">
            <path
              id="plus-chunky_svg__eds-icon--plus-chunky_base"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13 11V4h-2v7H4v2h7v7h2v-7h7v-2z"></path>
          </svg>
        ),
      },
      {
        title: "Likes",
        route: "/likes/",
        icon: (
          <svg x="0" y="0" viewBox="0 0 24 24">
            <path
              id="heart-chunky_svg__eds-icon--heart-chunky_base"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M18.8 6.2C18.1 5.4 17 5 16 5c-1 0-2 .4-2.8 1.2L12 7.4l-1.2-1.2C10 5.4 9 5 8 5c-1 0-2 .4-2.8 1.2-1.5 1.6-1.5 4.2 0 5.8l6.8 7 6.8-7c1.6-1.6 1.6-4.2 0-5.8zm-1.4 4.4L12 16.1l-5.4-5.5c-.8-.8-.8-2.2 0-3C7 7.2 7.5 7 8 7c.5 0 1 .2 1.4.6l2.6 2.7 2.7-2.7c.3-.4.8-.6 1.3-.6s1 .2 1.4.6c.8.8.8 2.2 0 3z"></path>
          </svg>
        ),
      },
      {
        title: "Tickets",
        route: "/",
        icon: (
          <svg viewBox="0 0 24 24">
            <path d="M10 13v-2h4v2zm6 5V6h-.4C15 7.4 13.8 8.4 12 8.4S9 7.4 8.4 6H8v12h.4c.6-1.4 1.8-2.4 3.6-2.4s3 1 3.6 2.4zM14 4h4v16h-4s0-2.4-2-2.4-2 2.4-2 2.4H6V4h4s0 2.4 2 2.4S14 4 14 4z"></path>
          </svg>
        ),
      },
    ],
    [
      {
        title: "",
        inlineIcon: (
          <svg x="0" y="0" viewBox="0 0 24 24">
            <path
              id="user-chunky_svg__eds-icon--user-chunky_base"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 18c-1.2 0-2.4-.3-3.5-.7.6-1.3 2-2.2 3.5-2.2s2.9.9 3.5 2.2c-1.1.4-2.3.7-3.5.7zm6.5-2.9c-.4.4-.8.8-1.3 1.1a5.989 5.989 0 00-10.6 0c-.5-.3-.9-.7-1.3-1.1L4 16.5c2.1 2.3 5 3.5 8 3.5s5.9-1.3 8-3.5l-1.5-1.4z"></path>
            <path
              id="user-chunky_svg__eds-icon--user-chunky_circle"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 4C9.7 4 7.8 5.9 7.8 8.2s1.9 4.2 4.2 4.2 4.2-1.9 4.2-4.2S14.3 4 12 4zm0 6.4c-1.2 0-2.2-1-2.2-2.2C9.8 7 10.8 6 12 6s2.2 1 2.2 2.2c0 1.2-1 2.2-2.2 2.2z"></path>
          </svg>
        ),
        list: [
          {
            title: "Browse events",
            route: "/",
          },
          {
            title: "Create an event",
            route: "/create",
          },
          {
            title: "Tickets",
            route: "/",
          },
          {
            title: "Credits",
            route: "/",
          },
          {
            title: "Liked",
            route: "/",
          },
          {
            title: "Following",
            route: "/",
          },
          {
            title: "Interests",
            route: "/",
          },
          {
            title: "Account Settings",
            route: "/",
          },
          {
            title: "Log out",
            route: "/login",
          },
        ],
      },
    ],
  ],
};

export default navData;
