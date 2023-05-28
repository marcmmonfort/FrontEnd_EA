import React, { useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import MyCalendar from "../../components/calendar/calendar.component";

// Fondo de pantalla personalizado ...
import backgroundImage from '../../assets/images/background_5.jpg';

const CalendarEvents = () => {
    useEffect(() => {
      document.body.style.backgroundImage = `url(${backgroundImage})`;
    }, []);
    return (
      <div>
        <Navbar/>
        <div className="titleContainer">
          <h1 className="titleSection">Calendar + Events</h1>
          <MyCalendar />
        </div>
        <Footer/>
      </div>
    );
  };

export default CalendarEvents;