const categoriesData = [
    {
        title :"Music",
        icon: <svg x="0" y="0" viewBox="0 0 24 24" ><path fill-rule="evenodd" clip-rule="evenodd" d="M21 2L8 5.5v11.3c-.5-.5-1.2-.8-2-.8-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3V9.5l11-3v7.2c-.5-.5-1.2-.8-2-.8-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3V2zM6 21c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM9 8.5V6.2l11-3v2.3l-11 3zm9 9.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path></svg>
    },
    {
        title: "Preforming & Visual Arts",
        icon: <svg x="0" y="0" viewBox="0 0 24 24" ><path fill-rule="evenodd" clip-rule="evenodd" d="M17.1 8.6v1l3.2.7-3.4 7.7c-.8 1.8-2.6 3-4.6 3-.4 0-.8 0-1.1-.1-.5.1-1.1.2-1.7.2H9.2l.6.3c.8.4 1.6.5 2.5.5 2.3 0 4.5-1.3 5.5-3.6l4-8.8-4.7-.9z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M16.1 13.2V2l-7 1.5L2.2 2v11.2c0 3.4 2.4 6.2 5.6 6.8.4.1.9.1 1.4.1h.3c3.7-.1 6.6-3.2 6.6-6.9zm-6.9 5.9c-1.3 0-1.8-.3-2.3-.4-2.2-.9-3.7-3-3.7-5.5v-10l6 1.3 6-1.3v9.9c-.1 3.4-2.7 6-6 6"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M11.9 13.2c-1.5 1.5-3.9 1.5-5.4 0l-.4-.4-.7.7.4.4c.9.9 2.2 1.4 3.4 1.4 1.2 0 2.5-.5 3.4-1.4l.4-.4-.7-.7-.4.4z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M12.2 8.3c-.3.3-.8.3-1.1 0l-.3-.3-.7.7.4.4c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l.4-.4-.7-.7-.4.3z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 9.2l.4-.4-.8-.6-.3.3c-.3.3-.8.3-1.1 0l-.3-.3-.7.7.3.3c.3.3.8.5 1.2.5s.9-.1 1.3-.5z"></path></svg>,
    },
    {
        title: "Holiday",
        icon: <svg x="0" y="0" viewBox="0 0 24 24" ><path fill-rule="evenodd" clip-rule="evenodd" fill="#231F20" d="M7 2v16.4h14V2H7zm13 15.4H8v-1.1l4.4-4.9 2.8 3.2 1.4-1.5 3.3 3.4v.9zm0-2.4l-3.3-3.4-1.4 1.4-2.8-3.2-4.5 5V3h12v12z"></path><path id="holiday_svg__eds-icon--holiday_corner" fill-rule="evenodd" clip-rule="evenodd" fill="#231F20" d="M5.8 4.1l-1-.1L3 20.3l1 .1 12.9 1.5.1-1-12.9-1.5L5.8 4.1z"></path><path id="holiday_svg__eds-icon--holiday_circle" fill-rule="evenodd" clip-rule="evenodd" fill="#231F20" d="M16.6 9.3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0-3.1c.6 0 1.1.5 1.1 1.1 0 .6-.5 1.1-1.1 1.1s-1.1-.5-1.1-1.1c0-.6.5-1.1 1.1-1.1z"></path></svg>
    },
    {
        title: "Health",
        icon: <svg x="0" y="0" viewBox="0 0 24 24" ><path  fill-rule="evenodd" clip-rule="evenodd" d="M21 8c0 1.7-.4 2.4-1.7 3.8L12 19.1l-7.3-7.3C3.3 10.4 3 9.7 3 8c0-2.3 1.9-4 4.5-4 3 0 4.5 3.5 4.5 3.5S13.5 4 16.5 4C19 4 21 5.7 21 8m-4.5-5C13.2 3 12 5.5 12 5.5S10.2 3 7.5 3C4.5 3 2 5 2 8c0 2 .5 3 2 4.5l8 8 8-8C21.5 11 22 10 22 8c0-3-2.5-5-5.5-5"></path></svg>,
    },
    {
        title: "Hobbies",
        icon: <svg x="0" y="0" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M11 8h2V7h-2v1zm10 11H3V9h18v10zM14 8V6h-1.5V4h-1v2H10v2H2v12h20V8h-8z"></path><path id="game_svg__eds-icon--game_button" fill-rule="evenodd" clip-rule="evenodd" d="M16 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 3c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z"></path><path id="game_svg__eds-icon--game_pad" fill-rule="evenodd" clip-rule="evenodd" d="M8 12H7v1.5H5.5v1H7V16h1v-1.5h1.5v-1H8z"></path></svg>,
    },
    {
        title: "Bussiness",
        icon: <svg viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M17 14v-2h2v7H5v-7h2v2h1v-2h8v2h1zM4 7h16v4h-3v-1h-1v1H8v-1H7v1H4V7zm5-1h6V5H9v1zM8 4v2H3v6h1v8h16v-8h1V6h-5V4H8z"></path></svg>,
    },
    {
        title: "Food & Drink",
        icon: <svg x="0" y="0" viewBox="0 0 24 24" ><path fill-rule="evenodd" clip-rule="evenodd" fill="#231F20" d="M19.5 7H21V6h-5l.6-.7c.2.1.4.1.6.1.9 0 1.7-.8 1.7-1.7 0-.9-.8-1.7-1.7-1.7-.9 0-1.7.8-1.7 1.7 0 .4.1.7.3 1L14.6 6H3v1h1.1l7.4 8.6V21H9v1h6v-1h-2.5v-5.4l7-8.6zm-2.4-4c.4 0 .7.3.7.7 0 .4-.3.7-.7.7-.4 0-.7-.3-.7-.7 0-.4.3-.7.7-.7zm-5.8 8.4l1.2-1.4h3.2l-3.9 4.6L7.9 10h3.2l-.6.7.8.7zM18.2 7l-1.7 2.1V9h-3.2l1.8-2h3.1zm-4.5 0L12 9H7.1L5.4 7h8.3z"></path></svg>
    },
    {
        title: "Sports & Fitness",
        icon: <svg id="shoe_svg__eds-icon--sport_svg" x="0" y="0" viewBox="0 0 24 24"><path id="shoe_svg__eds-icon--sport_base" fill-rule="evenodd" clip-rule="evenodd" fill="#231F20" d="M22 17c0-6-6-8-6-8l-6-2S8.5 9 6 9C4.7 9 3.1 8 3.1 8H2v9h2v1h1v-1h2v1h1v-1h8v1h1v-1h2v1h1v-1h2zM3 16v-2h3c1.7 0 2.6.6 2.9 2H3zm6.9 0c-.4-2.4-2.1-3-3.9-3H3V9.1c.7.3 1.9.9 3 .9 2.1 0 3.6-1.1 4.3-1.8l.7.2V13h1V8.7l1 .3v4h1V9.4l1 .3V13h1v-2.9c1.1.4 4.4 2.1 4.9 5.9h-11z"></path></svg>,
    },
    
]

    
export default categoriesData