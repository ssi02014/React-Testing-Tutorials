import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

const OptionItem = ({ name, imagePath, optionType, updateItemCount }) => {
  const handleChange = (event) => {
    updateItemCount(name, event.target.value);
  };
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        src={`http://localhost:3030/${imagePath}`}
        alt={optionType === "scoops" ? `${name} scoop` : `${name} topping`}
        style={{ width: "75%" }}
      />
      {optionType === "scoops" ? (
        <Form.Group
          controlId={`${name}-scoops`}
          as={Row}
          style={{ marginTop: "10px" }}
        >
          <Form.Label column xs="6" style={{ textAlign: "right" }}>
            {name}
          </Form.Label>
          <Col xs="5" style={{ textAlign: "left" }}>
            <Form.Control
              type="number"
              defaultValue={0}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
      ) : (
        <Form.Group controlId={`${name}-toppings`}>
          <Form.Check
            type="checkbox"
            onChange={(e) => {
              updateItemCount(name, e.target.checked ? 1 : 0);
            }}
            label={name}
          />
        </Form.Group>
      )}
    </Col>
  );
};

export default OptionItem;
