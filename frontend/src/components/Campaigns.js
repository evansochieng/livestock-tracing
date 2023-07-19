import React, { useRef } from 'react';
import { Bar } from "react-chartjs-2";
import { CSVLink } from "react-csv";

//import and register all elements since chart js is treeshakable
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const Campaigns = ({ livestockAtRisk }) => {

  // create a hook for downloading data
  const csvLink = useRef();

  // create a function to handle downloads
  const getLivestockAtRiskData = () => {
    csvLink.current.link.click();
  }

  // Group by operation on 'nearest deforested area'
  const groupedByNearestDA = livestockAtRisk.reduce((acc, obj) => {
    const key = obj.nearest_DA;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  // Get the area with more casualties
  const most_affected_area = Object.keys(groupedByNearestDA).reduce((a, b) => (groupedByNearestDA[a] > groupedByNearestDA[b] ? a : b), 'None');
  const most_affected_victims = groupedByNearestDA[most_affected_area];

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
    <div>
      {/* Display graph of frequencies */}
      <div style={{ width: "400px", height: "300px", textAlign: "center" }}>
        <h3 style={{ marginBottom: "20px" }}>
          Number of Affected Livestock per Deforested Area
        </h3>
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

      {/* Display most affected area */}
      <div class="max-w-sm rounded overflow-hidden shadow-lg">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">Most Affected Area</div>
          <p class="text-gray-700 text-base">
            Most affected area: {most_affected_area}
          </p>
        </div>
      </div>

      {/* Display highest number of victims in a single place */}
      <div class="max-w-sm rounded overflow-hidden shadow-lg">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">Highest number of Victims in Single Area of Risk</div>
          <p class="text-gray-700 text-base">
            {most_affected_victims} victims
          </p>
        </div>
      </div>

      {/* Download Data of Affected Livestock */}
      <div>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          onClick={getLivestockAtRiskData}
        >
          <svg
            className="fill-current w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
          </svg>
          <span>Download Livestock at Risk</span>
        </button>
        <CSVLink
          data={livestockAtRisk}
          filename="livestockatrisk.csv"
          className="hidden"
          ref={csvLink}
          target="_blank"
        />
      </div>
    </div>
  );
}

export default Campaigns