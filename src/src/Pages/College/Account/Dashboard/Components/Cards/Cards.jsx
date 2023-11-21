import "./Cards.scss";

// MUI
import { CircularProgress, Box } from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
// card data
const CardData = [
  {
    subject: "English",
    course: "English Course Progress",
    totalLessons: 30,
    completedLessons: 19,
    className: "English",
  },
  {
    subject: "Logical Reasoning",
    course: "Logical Reasoning Course Progress",
    totalLessons: 20,
    completedLessons: 20,
    className: "LogicalReasoning",
  },
  {
    subject: "Graphic Design",
    course: "Graphic Design Course Progress",
    totalLessons: 20,
    completedLessons: 15,
    className: "GraphicDesign",
  },
  {
    subject: "GRE",
    course: "GRE Course Progress",
    totalLessons: 10,
    completedLessons: 8,
    className: "GRE",
  },
];

const Cards = () => {
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    // [`&.${linearProgressClasses.colorPrimary}`]: {
    //   backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    // },
    // [`& .${linearProgressClasses.bar}`]: {
    //   borderRadius: 5,
    //   backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    // },
  }));
  return (
    <div className="College-dashboard-cards">
      {CardData.map((data) => {
        const { subject, course, totalLessons, completedLessons, className } =
          data;

        return (
          <div className="card" key={subject}>
            <h2>{subject}</h2>
            <div className="course">
              <p>{course}</p>
              <Box position="relative" display="inline-flex">
                <CircularProgress
                  variant="determinate"
                  size={60}
                  thickness={6}
                  value={100}
                  className={`${className}-back`}
                />
                <CircularProgress
                  value={(completedLessons / totalLessons) * 100}
                  variant="determinate"
                  size={60}
                  thickness={6}
                  className={`${className}-front`}
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
                  <span className={`${className}-text`}>
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
                <h6>Lessons</h6>
                <LinearProgress variant="determinate"  value={(completedLessons / totalLessons)*100}
                className={`${className}-progress`}
                 />              
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
