import React from "react";

const Button = (props) => {
  const Numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  function setClass() {
    let className = "button";
    className += !Numbers.includes(+props.label) ? " nan" : "";
    className += props.newRow ? " new-row" : "";
    className += props.column ? " column-" + props.column : "";
    className += props.spanColumn ? " span-column-" + props.spanColumn : "";
    className += props.spanRow ? " span-row-" + props.spanRow : "";

    return className;
  }

  return (
    <button
      onClick={(e) => props.click && props.click(props.label)}
      className={setClass()}
    >
      {props.label}
    </button>
  );
};

export default Button;
