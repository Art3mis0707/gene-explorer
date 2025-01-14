// src/components/Dashboard/OverviewTiles.js
import React from 'react';

const OverviewTiles = ({ stats }) => {
  const tiles = [
    { label: "Total Genes", count: stats.genes },
    { label: "Total Proteins", count: stats.proteins },
    { label: "Total Diseases", count: stats.diseases },
    { label: "Total Organisms", count: stats.organisms },
    { label: "Research Articles", count: stats.articles },
  ];

  return (
    <div className="dashboard-tiles">
      {tiles.map((tile, index) => (
        <div key={index} className="tile">
          <h3>{tile.count}</h3>
          <p>{tile.label}</p>
        </div>
      ))}
    </div>
  );
};

export default OverviewTiles;
