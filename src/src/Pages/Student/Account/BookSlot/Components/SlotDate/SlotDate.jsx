import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import "./SlotDate.scss";

const SlotTimings = [
  {
    day: "Monday",
    timings: [
      "9:00 am to 9:30 am",
      "9:40 am to 10:10 am",
      "10:20 am to 10:50 am",
      "11:00 am to 11:30 am",
      "11:40 am to 12:10 pm",
      "12:20 pm to 12:50 pm",
      "2:00 pm to 2:30 pm",
      "2:40 pm to 3:10 pm",
      "3:20 pm to 3:50 pm",
      "4:00 pm to 4:30 pm",
      "4:40 pm to 5:10 pm",
      "5:20 pm to 5:50 pm",
    ],
  },
  {
    day: "Tuesday",
    timings: [
      "9:00 am to 9:30 am",
      "9:40 am to 10:10 am",
      "10:20 am to 10:50 am",
      "11:00 am to 11:30 am",
      "11:40 am to 12:10 pm",
      "12:20 pm to 12:50 pm",
      "2:00 pm to 2:30 pm",
      "2:40 pm to 3:10 pm",
      "3:20 pm to 3:50 pm",
      "4:00 pm to 4:30 pm",
      "4:40 pm to 5:10 pm",
      "5:20 pm to 5:50 pm",
    ],
  },
  {
    day: "Wednesday",
    timings: [
      "9:00 am to 9:30 am",
      "9:40 am to 10:10 am",
      "10:20 am to 10:50 am",
      "11:00 am to 11:30 am",
      "11:40 am to 12:10 pm",
      "12:20 pm to 12:50 pm",
      "2:00 pm to 2:30 pm",
      "2:40 pm to 3:10 pm",
      "3:20 pm to 3:50 pm",
      "4:00 pm to 4:30 pm",
      "4:40 pm to 5:10 pm",
      "5:20 pm to 5:50 pm",
    ],
  },
  {
    day: "Thursday",
    timings: [
      "9:00 am to 9:30 am",
      "9:40 am to 10:10 am",
      "10:20 am to 10:50 am",
      "11:00 am to 11:30 am",
      "11:40 am to 12:10 pm",
      "12:20 pm to 12:50 pm",
      "2:00 pm to 2:30 pm",
      "2:40 pm to 3:10 pm",
      "3:20 pm to 3:50 pm",
      "4:00 pm to 4:30 pm",
      "4:40 pm to 5:10 pm",
      "5:20 pm to 5:50 pm",
    ],
  },
  {
    day: "Friday",
    timings: [
      "9:00 am to 9:30 am",
      "9:40 am to 10:10 am",
      "10:20 am to 10:50 am",
      "11:00 am to 11:30 am",
      "11:40 am to 12:10 pm",
      "12:20 pm to 12:50 pm",
      "2:00 pm to 2:30 pm",
      "2:40 pm to 3:10 pm",
      "3:20 pm to 3:50 pm",
      "4:00 pm to 4:30 pm",
      "4:40 pm to 5:10 pm",
      "5:20 pm to 5:50 pm",
    ],
  },
];

const SlotDate = () => {
  const [bookedSlots, setBookedSlots] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookedSlotInfo, setBookedSlotInfo] = useState(null);

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

  const handleTimingClick = (day, timing) => {
    setSelectedDay(day);
    setSelectedTime(timing);
  };

  const handleBookSlot = () => {
    if (selectedDay && selectedTime) {
      const slot = `${selectedDay} - ${selectedTime}`;

      if (!bookedSlots[selectedDay] && !isCurrentDate(selectedDay)) {
        setBookedSlots({ ...bookedSlots, [selectedDay]: slot });
        setBookedSlotInfo(slot);
      }
    }
  };

  const isCurrentDate = (selectedDay) => {
    const currentDate = new Date();
    const selectedDate = new Date(selectedDay);

    return (
      currentDate.getDate() === selectedDate.getDate() &&
      currentDate.getMonth() === selectedDate.getMonth() &&
      currentDate.getFullYear() === selectedDate.getFullYear()
    );
  };

  useEffect(() => {}, [bookedSlots]);

  return (
    <div className="SlotDate-Section">
      <div className="Slot-booking">
        <div className="SlotDate-days">
          {thisWeekDates.map((date, index) => {
            return (
              <p
                className={`SlotDate ${
                  isCurrentDate(date) ? "current-day" : ""
                }`}
                key={index}
                id="SlotDate-class-id"
              >
                {date.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            );
          })}
        </div>

        <div className="Slot-timings">
          {SlotTimings.map((dayTimings, index) => {
            return (
              <div className="SlotDate-timings" key={index}>
                {dayTimings.timings.map((time, timeIndex) => {
                  const slot = `${dayTimings.day} - ${time}`;
                  const isBooked = bookedSlots[dayTimings.day] === slot;
                  const isClicked =
                    selectedDay === dayTimings.day && selectedTime === time;

                  return (
                    <p
                      key={timeIndex}
                      className={`SlotDate-class ${isBooked ? "booked" : ""} ${
                        isClicked ? "clicked" : ""
                      }`}
                      onClick={() => handleTimingClick(dayTimings.day, time)}
                    >
                      {time}
                    </p>
                  );
                })}
              </div>
            );
          })}
        </div>

        {selectedDay && selectedTime && (
          <Link to="/student/dashboard">
            <div className="bookSlot-button">
              <button onClick={handleBookSlot}>Book a Slot</button>
              <p id="booked">{bookedSlotInfo}</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default SlotDate;
