import React, { useRef } from 'react';
import { Bar } from "react-chartjs-2";
import { CSVLink } from "react-csv";
import "../App.css";

//import and register all elements since chart js is treeshakable
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const Campaigns = ({ livestock, livestockAtRisk, safeLivestock, deforestedAreas }) => {
  console.log(safeLivestock)

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

  // prepare the data to display
  const atRiskChartData = {
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

  // Get the number of affected vs unaffected livestock
  const atRiskComparison = {
    "At Risk": livestockAtRisk.length,
    "Not at Risk": safeLivestock.length
  }

  // prepare the data to display in graph
  const comparisonChartData = {
    labels: Object.keys(atRiskComparison),
    datasets: [
      {
        label: "Frequencies",
        data: Object.values(atRiskComparison),
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Bar color
        borderColor: "rgba(75, 192, 192, 1)", // Border color
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div
        className="stats-graphs"
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          marginTop: "10px",
          marginBottom: "20px",
          marginRight: "10px",
          marginLeft: "10px",
        }}
      >
        {/* Display graph of frequencies */}
        <div
          style={{
            width: "50%",
            height: "200px",
            textAlign: "center",
            border: "thin solid darkgray",
          }}
        >
          <h3 style={{ marginBottom: "5px" }}>
            Number of Affected Livestock per Deforested Area
          </h3>
          <Bar
            data={atRiskChartData}
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

        {/* Display livestock at risk and those not at risk  */}
        <div
          style={{
            width: "47%",
            height: "200px",
            textAlign: "center",
            border: "thin solid darkgray",
            marginLeft: "10px",
            marginRight: "10px",
          }}
        >
          <h3 style={{ marginBottom: "5px" }}>
            Number of Affected Livestock vs Not Affected
          </h3>
          <Bar
            data={comparisonChartData}
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
      </div>

      <div
        className="summary-stats"
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "50px",
          marginBottom: "20px",
          marginRight: "10px",
          marginLeft: "10px",
        }}
      >
        {/* Display Number of Original Number of Livestock */}
        <div
          className="max-w-sm rounded overflow-hidden shadow-lg"
          id="stats-cards"
        >
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">Livestock Available</div>
            <p class="text-gray-700 text-base">{livestock.length}</p>
          </div>
        </div>

        {/* Display number of risk areas area */}
        <div
          class="max-w-sm rounded overflow-hidden shadow-lg"
          id="stats-cards"
        >
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">Number of Deforested Area</div>
            <p class="text-gray-700 text-base">{deforestedAreas.length}</p>
          </div>
        </div>

        {/* Display number of livestock at risk */}
        <div
          class="max-w-sm rounded overflow-hidden shadow-lg"
          id="stats-cards"
        >
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">Livestock at Risk</div>
            <p class="text-gray-700 text-base">{livestockAtRisk.length}</p>
          </div>
        </div>

        {/* Display safe livestock */}
        <div
          class="max-w-sm rounded overflow-hidden shadow-lg"
          id="stats-cards"
        >
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">Safe Livestock</div>
            <p class="text-gray-700 text-base">{safeLivestock.length}</p>
          </div>
        </div>

        {/* Display most affected area */}
        <div
          class="max-w-sm rounded overflow-hidden shadow-lg"
          id="stats-cards"
        >
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">Most Affected Area</div>
            <p class="text-gray-700 text-base">{most_affected_area}</p>
          </div>
        </div>

        {/* Display highest number of victims in a single place */}
        <div
          class="max-w-sm rounded overflow-hidden shadow-lg"
          id="stats-cards"
        >
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">
              Highest Number of Victims in a Single Area of Risk
            </div>
            <p class="text-gray-700 text-base">
              {most_affected_victims} victims
            </p>
          </div>
        </div>
      </div>

      <div
        className="download-buttons"
        id='download-btns'
        style={{
          display: "flex",
          flexDirection: "row",
          marginRight: "10px",
          marginLeft: "10px",
          marginTop: "20px"
        }}
      >
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
            filename="livestock_at_risk.csv"
            className="hidden"
            ref={csvLink}
            target="_blank"
          />
        </div>

        {/* Download Data of All Livestock */}
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
            <span>Download All Livestock Data</span>
          </button>
          <CSVLink
            data={livestock}
            filename="all_livestock.csv"
            className="hidden"
            ref={csvLink}
            target="_blank"
          />
        </div>

        {/* Download Data of Deforested Areas */}
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
            <span>Download Deforested Areas Data</span>
          </button>
          <CSVLink
            data={deforestedAreas}
            filename="deforested_areas.csv"
            className="hidden"
            ref={csvLink}
            target="_blank"
          />
        </div>

        {/* Download Data of Safe Livestock */}
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
            <span>Download Safe Livestock Data</span>
          </button>
          <CSVLink
            data={safeLivestock}
            filename="safe_livestock.csv"
            className="hidden"
            ref={csvLink}
            target="_blank"
          />
        </div>
      </div>
    </div>
  );
}

export default Campaigns