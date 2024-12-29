// src/components/Dashboard/Dashboard.jsx
import React from "react";
import PieChart from "./PieChart";

const Dashboard = () => {
  const geneDiseaseData = {
    labels: ["Disease A", "Disease B", "Disease C", "Disease D"],
    values: [30, 50, 20, 40],
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <PieChart data={geneDiseaseData} />
    </div>
  );
};

export default Dashboard;
