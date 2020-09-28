import React from "react";

const ChildComponent = (props) => {
  const { parentProps } = props;
  return <div>{parentProps}</div>;
};

export default ChildComponent;
