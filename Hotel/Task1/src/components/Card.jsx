import React from "react";

const Card = ({ title, value, color, icon }) => {
  return (
    <div className={`p-6 rounded-lg shadow-lg text-white ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm">{title}</p>
          <h3 className="text-3xl font-bold">{value}</h3>
        </div>
        <div className="text-4xl">
          {/* Add your icon here, e.g., using font-awesome */}
          <i className={`fa fa-${icon}`}></i>
        </div>
      </div>
    </div>
  );
};

export default Card;
