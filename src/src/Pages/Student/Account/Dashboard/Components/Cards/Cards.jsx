import "./Cards.scss";

// MUI
import { CircularProgress, Box } from "@mui/material";

// card data
const CardData = [
  {
    subject: "English",
    course: "English Course Progress",
    totalLessons: 30,
    completedLessons: 19,
  },
  {
    subject: "Logical Reasoning",
    course: "Logical Reasoning Course Progress",
    totalLessons: 20,
    completedLessons: 20,
  },
  {
    subject: "Graphic Design",
    course: "Graphic Design Course Progress",
    totalLessons: 20,
    completedLessons: 15,
  },
  {
    subject: "GRE",
    course: "GRE Course Progress",
    totalLessons: 10,
    completedLessons: 8,
  },
];

const Cards = () => {
  return (
    <div className="dashboard-cards">
      {CardData.map((data) => {
        const { subject, course, totalLessons, completedLessons } = data;
        return (
          <div className="card" key={crypto.randomUUID()}>
            <h2>{subject}</h2>
            <div className="course">
              <p>{course}</p>
              <Box position="relative" display="inline-flex">
                <CircularProgress
                  variant="determinate"
                  sx={{
                    position: "absolute",
                  }}
                  className="circular-progres"
                  value={parseFloat("100")}
                />
                <CircularProgress
                  sx={{
                    Color:
                      (completedLessons / totalLessons) * 100 >= 80
                        ? "#ff9f43"
                        : "#0557A2",
                  }}
                  value={parseFloat((completedLessons / totalLessons)* 100) }
                  variant="determinate"
                  className="circular-progress"
                />
                <Box
                  top={0}
                  left={0}
                  bottom={0}
                  right={0}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  position="absolute"
                >
                  <span>
                    {((completedLessons / totalLessons) * 100) % 1 !== 0
                      ? ((completedLessons / totalLessons) * 100).toFixed(2)
                      : (completedLessons / totalLessons) * 100}{" "}
                    %
                  </span>
                </Box>
              </Box>
            </div>
            <div className="lessons">
              <div className="linear">
                <span>Lessons</span>
                <progress
                  variant="determinate"
                  value={completedLessons / totalLessons}
                  className="linear-progressbar"
                ></progress>
              </div>
              <p>
                {completedLessons} / {totalLessons}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
