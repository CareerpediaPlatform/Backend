import { Bar } from "react-chartjs-2";
import {
  Chart,
  LinearScale,
  CategoryScale,
  BarElement,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
Chart.register(LinearScale, CategoryScale, BarElement, Legend, Title, Tooltip);

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const options = {
  plugins: {
    legend: {
      display: false, // Hide legend
    },
    title: {
      display: true,
      text: "UpSkilling UI / UX Course",
    },
    tooltip: {
      display: false, // Hide tooltip labels
    },
  },
  scales: {
    y: {
      max: 100, // Set the maximum value of the y-axis to 100
      beginAtZero: true, // Start the y-axis from zero
    },
  },
};

const data2020 = [20, 30, 40, 50, 60, 70, 80, 90, 50, 30, 40, 10];

const data = {
  labels,
  datasets: [
    {
      label: "",
      data: data2020,
      backgroundColor: "#adb8cc",
    },
  ],
};

const StackBarChat = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Bar options={options} data={data} />
    </div>
  );
};

export default StackBarChat;
