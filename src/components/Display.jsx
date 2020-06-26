import React from "react";

const Display = (props) => {
  return <div className="calculator-display">
    <div className="display-memory">{props.memory}</div>
    <div className="display-main">{props.value}</div>
  </div>
}

export default Display;
