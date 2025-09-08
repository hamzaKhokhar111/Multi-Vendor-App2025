import React, { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Login/Layout/Header";
import EventCard from "../components/Login/Events/EventCard";
// import EventCard from "../components/Events/EventCard";
// import Header from "../components/Layout/Header";
// import Loader from "../components/Layout/Loader";

const EventsPage = () => {
    const {allEvents, SetallEvents}=useState()
//   const { allEvents, isLoading } = useSelector((state) => state.events);
  return (
    <>
   
        <div>
          <Header activeHeading={4} />
          <EventCard active={true} data={allEvents && allEvents[0]} />
        </div>
     
    </>
  );
};

export default EventsPage;