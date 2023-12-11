import React from "react";
import "./AllCourse.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Mousewheel, Keyboard } from "swiper/modules";

//img
import img from "../Assets/cardimg.png";
import Book from "../Assets/book.png";
import User from "../Assets/user.png";
import Control from "../Assets/control.png";
import Write from "../Assets/write.png";
import Plus from "../Assets/Plus.png";
import { Link } from "react-router-dom";

const AllCourse = () => {
  const Basic = [
    {
      title: "Fluent English: Mastering Communication Skills",
      content:
        "Popular English speaking and listening course to communicate with English-speakers on the job, ",
      imageUrl: img,
      user: "John Doe",
      exercises: "27",
      lessons: "20",
      tests: "8",
      price: "Rs 18,999/-",
    },
    {
      title: "Logic Unleashed: Mastering Reasoning Skills",
      content:
        "Popular English speaking and listening course to communicate with English-speakers on the job, ",
      imageUrl: img,
      user: "John Doe",
      exercises: "27",
      lessons: "20",
      tests: "8",
      price: "Rs 18,999/-",
    },
    {
      title: "Card 2",
      content: "This is the content of card 2.",
      imageUrl: img,
      user: "John Doe",
      exercises: "27",
      lessons: "20",
      tests: "8",
      price: "Rs 18,999/-",
    },
    {
      title: "Card 2",
      content: "This is the content of card 2.",
      imageUrl: img,
      user: "John Doe",
      exercises: "27",
      lessons: "20",
      tests: "8",
      price: "Rs 18,999/-",
    },
    {
      title: "Card 2",
      content: "This is the content of card 2.",
      imageUrl: img,
      user: "John Doe",
      exercises: "27",
      lessons: "20",
      tests: "8",
      price: "Rs 18,999/-",
    },
    {
      title: "Card 2",
      content: "This is the content of card 2.",
      imageUrl: img,
      user: "John Doe",
      exercises: "27",
      lessons: "20",
      tests: "8",
      price: "Rs 18,999/-",
    },
    {
      title: "Card 2",
      content: "This is the content of card 2.",
      imageUrl: img,
      user: "John Doe",
      exercises: "27",
      lessons: "20",
      tests: "8",
      price: "Rs 18,999/-",
    },
  ];
  const csep = [
    {
      title: "Fluent English: Mastering Communication Skills",
      content:
        "Popular English speaking and listening course to communicate with English-speakers on the job, ",
      imageUrl: img,
      user: "John Doe",
      exercises: "27",
      lessons: "20",
      tests: "8",
      price: "Rs 18,999/-",
    },
    {
      title: "Logic Unleashed: Mastering Reasoning Skills",
      content:
        "Popular English speaking and listening course to communicate with English-speakers on the job, ",
      imageUrl: img,
      user: "John Doe",
      exercises: "27",
      lessons: "20",
      tests: "8",
      price: "Rs 18,999/-",
    },
    {
      title: "Card 2",
      content: "This is the content of card 2.",
      imageUrl: img,
      user: "John Doe",
      exercises: "27",
      lessons: "20",
      tests: "8",
      price: "Rs 18,999/-",
    },
    {
      title: "Card 2",
      content: "This is the content of card 2.",
      imageUrl: img,
      user: "John Doe",
      exercises: "27",
      lessons: "20",
      tests: "8",
      price: "Rs 18,999/-",
    },
    {
      title: "Card 2",
      content: "This is the content of card 2.",
      imageUrl: img,
      user: "John Doe",
      exercises: "27",
      lessons: "20",
      tests: "8",
      price: "Rs 18,999/-",
    },
    {
      title: "Card 2",
      content: "This is the content of card 2.",
      imageUrl: img,
      user: "John Doe",
      exercises: "27",
      lessons: "20",
      tests: "8",
      price: "Rs 18,999/-",
    },
    {
      title: "Card 2",
      content: "This is the content of card 2.",
      imageUrl: img,
      user: "John Doe",
      exercises: "27",
      lessons: "20",
      tests: "8",
      price: "Rs 18,999/-",
    },
  ];
  const csap = [
    // {
    //   title: "Fluent English: Mastering Communication Skills",
    //   content:
    //     "Popular English speaking and listening course to communicate with English-speakers on the job, ",
    //   imageUrl: img,
    //   user: "John Doe",
    //   exercises: "27",
    //   lessons: "20",
    //   tests: "8",
    //   price: "Rs 18,999/-",
    // },
    // {
    //   title: "Logic Unleashed: Mastering Reasoning Skills",
    //   content:
    //     "Popular English speaking and listening course to communicate with English-speakers on the job, ",
    //   imageUrl: img,
    //   user: "John Doe",
    //   exercises: "27",
    //   lessons: "20",
    //   tests: "8",
    //   price: "Rs 18,999/-",
    // },
    // {
    //   title: "Card 2",
    //   content: "This is the content of card 2.",
    //   imageUrl: img,
    //   user: "John Doe",
    //   exercises: "27",
    //   lessons: "20",
    //   tests: "8",
    //   price: "Rs 18,999/-",
    // },
    // {
    //   title: "Card 2",
    //   content: "This is the content of card 2.",
    //   imageUrl: img,
    //   user: "John Doe",
    //   exercises: "27",
    //   lessons: "20",
    //   tests: "8",
    //   price: "Rs 18,999/-",
    // },
    // {
    //   title: "Card 2",
    //   content: "This is the content of card 2.",
    //   imageUrl: img,
    //   user: "John Doe",
    //   exercises: "27",
    //   lessons: "20",
    //   tests: "8",
    //   price: "Rs 18,999/-",
    // },
    // {
    //   title: "Card 2",
    //   content: "This is the content of card 2.",
    //   imageUrl: img,
    //   user: "John Doe",
    //   exercises: "27",
    //   lessons: "20",
    //   tests: "8",
    //   price: "Rs 18,999/-",
    // },
    // {
    //   title: "Card 2",
    //   content: "This is the content of card 2.",
    //   imageUrl: img,
    //   user: "John Doe",
    //   exercises: "27",
    //   lessons: "20",
    //   tests: "8",
    //   price: "Rs 18,999/-",
    // },
  ];

  return (
    <div className="allcourse-main">
      <div className="sub-main">
        <h3 className="heading">Basic course</h3>
        <Swiper
          slidesPerView={3}
          spaceBetween={16}
          cssMode={true}
          navigation={{ clickable: true }}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Mousewheel, Keyboard]}
          className="Swiper"
        >
          <div className="allcources-section">
            <SwiperSlide>
              <Link to="/admin/course-details">
                <div
                  className="addCard"
                  style={
                    Basic.length === 0 ? { height: "45vh" } : { height: "100%" }
                  }
                >
                  <img src={Plus} />
                  <span className="addCard-text">Add new course </span>
                </div>
              </Link>
            </SwiperSlide>

            {Basic.map((card, index) => (
              <SwiperSlide key={index}>
                <div className="card">
                  <img src={card.imageUrl} alt="Card" className="card-image" />
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-content">{card.content}</p>
                  <div className="main-icons">
                    <div className="icons-main">
                      <span className="icons-text">
                        <img src={User} alt="" className="icons-img" />
                        <span>{card.user}</span>
                      </span>
                      <span className="icons-text">
                        <img src={Book} alt="" className="icons-img" />
                        <span>{card.lessons} lessons</span>
                      </span>
                    </div>
                    <div className="icons-main">
                      <span className="icons-text">
                        <img src={Control} alt="" className="icons-img" />
                        <span>{card.exercises} exercises</span>
                      </span>
                      <span className="icons-text">
                        <img src={Write} alt="" className="icons-img" />
                        <span>{card.tests} tests</span>
                      </span>
                    </div>
                  </div>
                  <span className="price">{card.price}</span>
                  <Link to="/admin/course-details">
                    <button className="price-button">Edit</button>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
      <div className="sub-main">
        <h3 className="heading">CSEP course</h3>
        <Swiper
          slidesPerView={3}
          spaceBetween={16}
          cssMode={true}
          navigation={{ clickable: true }}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Mousewheel, Keyboard]}
          className="Swiper"
        >
          <div className="allcources-section">
            <SwiperSlide>
              <Link to="/admin/course-details">
                <div
                  className="addCard"
                  style={
                    csep.length === 0 ? { height: "45vh" } : { height: "100%" }
                  }
                >
                  <img src={Plus} />
                  <span className="addCard-text">Add new course </span>
                </div>
              </Link>
            </SwiperSlide>

            {csep.map((card, index) => (
              <SwiperSlide key={index}>
                <div className="card">
                  <img src={card.imageUrl} alt="Card" className="card-image" />
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-content">{card.content}</p>
                  <div className="main-icons">
                    <div className="icons-main">
                      <span className="icons-text">
                        <img src={User} alt="" className="icons-img" />
                        <span>{card.user}</span>
                      </span>
                      <span className="icons-text">
                        <img src={Book} alt="" className="icons-img" />
                        <span>{card.lessons} lessons</span>
                      </span>
                    </div>
                    <div className="icons-main">
                      <span className="icons-text">
                        <img src={Control} alt="" className="icons-img" />
                        <span>{card.exercises} exercises</span>
                      </span>
                      <span className="icons-text">
                        <img src={Write} alt="" className="icons-img" />
                        <span>{card.tests} tests</span>
                      </span>
                    </div>
                  </div>
                  <span className="price">{card.price}</span>
                  <Link to="/admin/courses/edit-part-module">
                    <button className="price-button">Edit</button>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
      <div className="sub-main">
        <h3 className="heading">CSAP course</h3>
        <Swiper
          slidesPerView={3}
          spaceBetween={16}
          cssMode={true}
          navigation={{ clickable: true }}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Mousewheel, Keyboard]}
          className="Swiper"
        >
          <div className="allcources-section">
            <SwiperSlide>
              <Link to="/admin/course-details">
                <div
                  className="addCard"
                  style={
                    csap.length === 0 ? { height: "45vh" } : { height: "100%" }
                  }
                >
                  <img src={Plus} />
                  <span className="addCard-text">Add new course </span>
                </div>
              </Link>
            </SwiperSlide>

            {csap.map((card, index) => (
              <SwiperSlide key={index}>
                <div className="card">
                  <img src={card.imageUrl} alt="Card" className="card-image" />
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-content">{card.content}</p>
                  <div className="main-icons">
                    <div className="icons-main">
                      <span className="icons-text">
                        <img src={User} alt="" className="icons-img" />
                        <span>{card.user}</span>
                      </span>
                      <span className="icons-text">
                        <img src={Book} alt="" className="icons-img" />
                        <span>{card.lessons} lessons</span>
                      </span>
                    </div>
                    <div className="icons-main">
                      <span className="icons-text">
                        <img src={Control} alt="" className="icons-img" />
                        <span>{card.exercises} exercises</span>
                      </span>
                      <span className="icons-text">
                        <img src={Write} alt="" className="icons-img" />
                        <span>{card.tests} tests</span>
                      </span>
                    </div>
                  </div>
                  <span className="price">{card.price}</span>
                  <Link to="/admin/courses/edit-part-module">
                    <button className="price-button">Edit</button>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default AllCourse;
