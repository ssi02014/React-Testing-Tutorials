import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import OptionItem from "./OptionItem";
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

  const optionItems = items.map((item) => (
    <OptionItem
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      optionType={optionType}
    />
  ));

  useEffect(() => {
    getItems();
  }, []);

  return <Row>{optionItems}</Row>;
};

export default Options;
