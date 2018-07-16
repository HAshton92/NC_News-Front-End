import React from "react";

const Error = ({ message }) => {
  return (
    <div className="errorContainer">
      <img
        className="errorImg"
        src="https://images.ecosia.org/VG8gmWsfG9xi8UwKQ-ygdgPMyjw=/0x390/smart/http%3A%2F%2Fi1.ytimg.com%2Fvi%2FdXbp6y_7eac%2Fhqdefault.jpg"
        alt=""
      />
      <h1>{message}</h1>
    </div>
  );
};
export default Error;
