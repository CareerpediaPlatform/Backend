import "./BookSlot.scss";
import { useContext } from "react";

// Images
import Optional from "./Assets/Vector.png";
import SlotDate from "./Components/SlotDate/SlotDate";

// Navbar and Sidebar
import Navbar from "../../../../Components/Student/Navbar/Navbar";
import Sidebar from "../../../../Components/Student/Sidebar/Sidebar";

// Context
import { SideBarContext } from "../../../../Context/SidebarContext";

const BookSlot = () => {
  const { close } = useContext(SideBarContext);

  const getThisWeekDates = () => {
    const currentDate = new Date();
    const thisWeekDates = [];

    while (currentDate.getDay() !== 1) {
      currentDate.setDate(currentDate.getDate() - 1);
    }

    for (let i = 0; i < 5; i++) {
      thisWeekDates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return thisWeekDates;
  };

  const thisWeekDates = getThisWeekDates();

  const isCurrentDate = (dateToCheck) => {
    const currentDate = new Date();
    return (
      dateToCheck.getDate() === currentDate.getDate() &&
      dateToCheck.getMonth() === currentDate.getMonth() &&
      dateToCheck.getFullYear() === currentDate.getFullYear()
    );
  };

  const currentDate = new Date();

  return (
    <div className="student-bookSlot">
      <Sidebar />
      <div className="bookSlot-content">
        <Navbar type="bookSlot" />
        <div
          className="bookSlot-data"
          style={{
            width: close ? "95vw" : "85vw",
            marginLeft: close ? "5vw" : "15vw",
          }}
        >
          <div className="bookSlot">
            <div className="bookSlot-top">
              <div className="bookSlot-top-left">
                <div className="bookSlot-heading">
                  <h3>Hello, Let's Talk !</h3>
                  <p>
                    Schedule a 30 min one-to-one call to discuss your goals and
                    challenges
                  </p>
                </div>
                <div className="bookSlot-optional">
                  <img src={Optional} alt="" />
                  <p>This call is optional but highly recommended!</p>
                </div>
              </div>

              <div className="bookSlot-top-right">
                <div className="bookSlot-date">
                  <div className="bookSlot-date">
                    <h4>
                      {currentDate.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </h4>
                  </div>
                </div>

                <div className="bookSlot-dayBox">
                  {thisWeekDates.map((date, index) => (
                    <div
                      className={`bookSlot-dateBox ${
                        isCurrentDate(date) ? "current-day" : ""
                      }`}
                      key={index}
                    >
                      <span>
                        {date.toLocaleDateString("en-US", { weekday: "short" })}
                      </span>
                      <span>
                        {date.toLocaleDateString("en-US", { day: "numeric" })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="SlotDate">
              <SlotDate />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookSlot;
