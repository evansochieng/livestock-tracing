import React from 'react';
import "../App.css"

const Legend = ({ groups }) => {
  return (
    // <div className="legend">
    //   <h3>Legend</h3>
    //   {groups.map((group) => (
    //     <div key={group.name} className="legend-item">
    //       <img src={group.iconUrl} alt={group.name} />
    //       <span>{group.name}</span>
    //     </div>
    //   ))}
    // </div>
    <div className="legend">
      <h3>Legend</h3>
      {groups.map((group) => (
        <div key={group.name} className="legend-item">
          {group.iconUrl && <img src={group.iconUrl} alt={group.name} />}
          {group.radius && (
            <div>
              <svg width="20" height="20">
                <circle
                  cx="10"
                  cy="10"
                  r={group.radius}
                  fill={group.fillColor}
                />
              </svg>
            </div>
          )}
          <span>{group.name}</span>
        </div>
      ))}
    </div>
  );
}

export default Legend;