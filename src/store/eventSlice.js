import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
    name: "event",
    initialState: {
        eventId:"",
        eventTitle: "",
        description: "",
        startDate: "",
        endDate: "",
        summary: "",
        capacity: 100,
        tickets: [],
        hostedBy: "",
        isPrivate: false,
        isOnline: false,
        isScheduled: false,
        isPublished: false,
        venueName: "",
        city: "",
        address1: "",
        country: "",
        postalCode: "",
        image:"",
        address2: "",
        category: "",
        numberOfTicketsCapacity: 0,
        numberOfTicketsSold: 0,

        eventMonthAbr: "",
        eventDay: "",
        dayName: "",
        year: "",
    },
    reducers: {
        default: (state, action)=>{
            state.eventId= action.payload.eventId
            state.eventTitle= action.payload.eventTitle
            state.description= action.payload.description
            state.startDate= action.payload.startDate
            state.endDate= action.payload.endDate
            state.summary= action.payload.summary
            state.capacity= action.payload.capacity
            state.tickets= action.payload.tickets
            state.hostedBy= action.payload.hostedBy
            state.isPrivate= action.payload.isPrivate
            state.isOnline= action.payload.isOnline
            state.isPublished= action.payload.isPublished
            state.isScheduled= action.payload.isScheduled
            state.venueName= action.payload.venueName
            state.city= action.payload.city
            state.address1= action.payload.address1
            state.country= action.payload.country
            state.postalCode= action.payload.postalCode
            state.image= action.payload.image
            state.address2= action.payload.address2
            state.category= action.payload.category
            state.numberOfTicketsCapacity= action.payload.numberOfTicketsCapacity
            state.numberOfTicketsSold= action.payload.numberOfTicketsSold
        },
        dateInfo: (state, action)=>{
            state.eventMonthAbr= action.payload.eventMonthAbr
            state.eventDay= action.payload.eventDay
            state.dayName= action.payload.dayName
            state.year= action.payload.year
        },
        updateDetails: (state, action)=>{
            state.image= action.payload.image
            state.description= action.payload.description
            state.summary= action.payload.summary
        }
    }   
})

export const eventActions = eventSlice.actions;
export default eventSlice.reducer;