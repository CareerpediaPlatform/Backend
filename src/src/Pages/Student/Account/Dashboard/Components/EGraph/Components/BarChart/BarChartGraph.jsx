import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "June"];

const options = {
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "English & Logical Reasoning",
    },
  },
  scales: {
    y: {
      max: 100, // Set the maximum value of the y-axis to 100
      beginAtZero: true, // Start the y-axis from zero
    },
  },
};

// Data for 2020 and 2021 expenses
const data2020 = [20, 30, 40, 50, 60, 70, 80, 90, 50, 30, 40, 10];
const data2021 = [40, 60, 80, 20, 10, 70, 30, 50, 90, 20, 50, 70];

const data = {
  labels,
  datasets: [
    {
      label: "English",
      data: data2020,
      backgroundColor: "#adb8cc",
    },
    {
      label: "Logical Reasoning",
      data: data2021,
      backgroundColor: "#0557A2",
    },
  ],
};

const BarChartGraph = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Bar options={options} data={data} />
    </div>
  );
};

export default BarChartGraph;
