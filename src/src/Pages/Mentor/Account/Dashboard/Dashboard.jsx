import "./Dashboard.scss";
import { useContext } from "react";

// Sidebar and Navbar
import Navbar from "../../../../Components/Mentor/Navbar/Navbar";
import Sidebar from "../../../../Components/Mentor/Sidebar/Sidebar";

// Context
import { SideBarContext } from "../../../../Context/SidebarContext";

// Calendar
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// Icons
import Video from "./Assets/video.png";
import Check from "./Assets/check.png";
import Chart from "./Assets/chart.png";
import Briefcase from "./Assets/briefcase.png";
import Clock from "./Assets/clock.png";
import Calendars from "./Assets/calendar.png";

const Dashboard = () => {
  const { close } = useContext(SideBarContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [connectionStatus, setConnectionStatus] = useState();

  const handleConnectClick = () => {
    setConnectionStatus(true);
  };

  const handleDeclineClick = () => {
    setConnectionStatus(false);
  };

  const cardData = [
    {
      name: "name",
      linkone:
        "https://www.figma.com/file/2a202fvX5TGtPmrfapCJNu/Careerpedia-Platform-dashboard?node-id=0%3A1&mode=dev",
      linktwo:
        "https://www.figma.com/file/2a202fvX5TGtPmrfapCJNu/Careerpedia-Platform-dashboard?node-id=0%3A1&mode=dev",
      chart: 10,
      check: 800,
      date: "22nd Aug 2023",
      time: "10:00am - 10:30am",
    },
    {
      name: "name",
      linkone:
        "https://www.figma.com/file/2a202fvX5TGtPmrfapCJNu/Careerpedia-Platform-dashboard?node-id=0%3A1&mode=dev",
      linktwo:
        "https://www.figma.com/file/2a202fvX5TGtPmrfapCJNu/Careerpedia-Platform-dashboard?node-id=0%3A1&mode=dev",
      chart: 10,
      check: 800,
      date: "22nd Aug 2023",
      time: "10:00am - 10:30am",
    },
    {
      name: "name",
      linkone:
        "https://www.figma.com/file/2a202fvX5TGtPmrfapCJNu/Careerpedia-Platform-dashboard?node-id=0%3A1&mode=dev",
      linktwo:
        "https://www.figma.com/file/2a202fvX5TGtPmrfapCJNu/Careerpedia-Platform-dashboard?node-id=0%3A1&mode=dev",
      chart: 10,
      check: 800,
      date: "22nd Aug 2023",
      time: "10:00am - 10:30am",
    },
    {
      name: "name",
      linkone:
        "https://www.figma.com/file/2a202fvX5TGtPmrfapCJNu/Careerpedia-Platform-dashboard?node-id=0%3A1&mode=dev",
      linktwo:
        "https://www.figma.com/file/2a202fvX5TGtPmrfapCJNu/Careerpedia-Platform-dashboard?node-id=0%3A1&mode=dev",
      chart: 10,
      check: 800,
      date: "22nd Aug 2023",
      time: "10:00am - 10:30am",
    },
    {
      name: "name",
      linkone:
        "https://www.figma.com/file/2a202fvX5TGtPmrfapCJNu/Careerpedia-Platform-dashboard?node-id=0%3A1&mode=dev",
      linktwo:
        "https://www.figma.com/file/2a202fvX5TGtPmrfapCJNu/Careerpedia-Platform-dashboard?node-id=0%3A1&mode=dev",
      chart: 10,
      check: 800,
      date: "22nd Aug 2023",
      time: "10:00am - 10:30am",
    },
    {
      name: "name",
      linkone:
        "https://www.figma.com/file/2a202fvX5TGtPmrfapCJNu/Careerpedia-Platform-dashboard?node-id=0%3A1&mode=dev",
      linktwo:
        "https://www.figma.com/file/2a202fvX5TGtPmrfapCJNu/Careerpedia-Platform-dashboard?node-id=0%3A1&mode=dev",
      chart: 10,
      check: 800,
      date: "22nd Aug 2023",
      time: "10:00am - 10:30am",
    },
  ];

  return (
    <div className="mentor-dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Navbar type="dashboard" />
        <div
          className="dashboard-details"
          style={{
            width: close ? "95vw" : "85vw",
            marginLeft: close ? "5vw" : "15vw",
          }}
        >
          <div className="main-dashboard">
            <h3 className="date-Heading">
              {selectedDate.toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </h3>
            <div className="main-contain">
              <div className="contain">
                <div className="cardContainer">
                  {cardData.map((card) => (
                    <div className="card" key={crypto.randomUUID()}>
                      <div className="iconText-main">
                        <h4 className="name">{card.name}</h4>
                        <div className="iconText">
                          <span className="Text-main">
                            <img src={Chart} className="img" />
                            <span className="text">{card.chart}</span>
                          </span>
                          <span className="Text-main">
                            <img src={Check} className="img" />
                            <span className="text">{card.check}</span>
                          </span>
                        </div>
                      </div>
                      <div className="links">
                        <div className="link">
                          <img src={Briefcase} alt="" />
                          <a href={card.linkone} className="link-text">
                            {card.linkone}
                          </a>
                        </div>
                        <div className="link">
                          <img src={Video} alt="" />
                          <a href={card.linktwo} className="link-text">
                            {card.linktwo}
                          </a>
                        </div>
                        <div className="dateTime">
                          <div className="date-mains">
                            <img src={Calendars} className="img" />
                            <span className="date">{card.date}</span>
                          </div>
                          <div className="time-main">
                            <img src={Clock} />
                            <span className="time">{card.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="buttons">
                        <button
                          className="buttonone"
                          onClick={handleConnectClick}
                        >
                          Connect now
                        </button>
                        <button
                          className="buttontwo"
                          onClick={handleDeclineClick}
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="date">
                <Calendar
                  onChange={setSelectedDate}
                  value={selectedDate}
                  showYearDropdown={false}
                  formatShortWeekday={(locale, date) =>
                    new Intl.DateTimeFormat(locale, {
                      weekday: "short",
                    })
                      .format(date)[0]
                      .toUpperCase()
                  }
                  calendarType="gregory"
                  // tileDisabled={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
