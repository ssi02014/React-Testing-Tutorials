import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import ScoopOptions from "./ScoopOption";
import Row from "react-bootstrap/Row";

// optionType is 'scoops' or 'toppings'
const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);

  const getItems = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:3030/${optionType}`);
      setItems(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [optionType]);

  const ItemComponent = optionType === "scoops" ? ScoopOptions : null;
  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  useEffect(() => {
    getItems();
  }, [getItems]);

  return <Row>{optionItems}</Row>;
};

export default Options;
