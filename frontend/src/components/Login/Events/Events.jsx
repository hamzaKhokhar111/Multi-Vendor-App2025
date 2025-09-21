import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../../styles/styles";
import EventCard from "./EventCard";
import { getAllEvents } from "../../../redux/actions/event";

const Events = () => {
  const dispatch = useDispatch();

  // Redux state
  const { allEvents, isLoading, error } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

 

  // Console par dekhna ke data aa raha hai ya nahi
  // console.log("All Events from Redux:", allEvents);

  return (
    <div>
     {
      !isLoading && (
         <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Popular Events</h1>
        </div>


<div className="w-full grid">
 <EventCard data={allEvents && allEvents[0]} />
</div> 
     
      </div>
      )
     }
    </div>
  );
};

export default Events;
