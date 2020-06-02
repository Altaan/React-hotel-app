import React from "react";

// This component is used render the underlines title of sections
const Title = ({ title }) => {
  return (
    <div className="section-title">
      <h4>{title}</h4>
      <div />
    </div>
  );
};

export default Title;
