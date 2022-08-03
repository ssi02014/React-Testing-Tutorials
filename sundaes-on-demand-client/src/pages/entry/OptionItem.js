import React from "react";
import Col from "react-bootstrap/Col";

const OptionItem = ({ name, imagePath, optionType }) => {
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        src={`http://localhost:3030/${imagePath}`}
        alt={optionType === "scoops" ? `${name} scoop` : `${name} topping`}
        style={{ width: "75%" }}
      />
    </Col>
  );
};

export default OptionItem;
