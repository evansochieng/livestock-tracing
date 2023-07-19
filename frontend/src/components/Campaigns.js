import React from 'react';
import { Bar } from "react-chartjs-2";

//import and register all elements since chart js is treeshakable
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const Campaigns = ({ livestockAtRisk }) => {

  // Group by operation on 'nearest deforested area'
  const groupedByNearestDA = livestockAtRisk.reduce((acc, obj) => {
    const key = obj.nearest_DA;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(groupedByNearestDA),
    datasets: [
      {
        label: "Frequencies",
        data: Object.values(groupedByNearestDA),
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Bar color
        borderColor: "rgba(75, 192, 192, 1)", // Border color
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: "400px", height: "300px" }}>
      <Bar
        data={chartData}
        options={{
          scales: {
            y: {
              type: "linear", // Use the default linear scale
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
}

export default Campaigns