import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import OptionItem from "./OptionItem";
import Row from "react-bootstrap/Row";
import AlertBanner from "../common/AlertBanner";
import { pricePerItem } from "../../constants";
import { useOrderDetails } from "../../contexts/OrderDetails";

// optionType is 'scoops' or 'toppings'
const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const title = optionType;
  const [orderDetails, updateItemCount] = useOrderDetails();

  const getItems = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:3030/${optionType}`);
      setItems(res.data);
    } catch (error) {
      setError(true);
    }
  }, [optionType]);

  const optionItems = items.map((item) => (
    <OptionItem
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      optionType={optionType}
      updateItemCount={(itemName, newItemCount) =>
        updateItemCount(itemName, newItemCount, optionType)
      }
    />
  ));

  useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      {error ? (
        <AlertBanner />
      ) : (
        <>
          <p>hi</p>
          <h2>{title}</h2>
          <p>{pricePerItem[optionType]} each</p>
          <p>
            {title} total: {orderDetails.totals[optionType]}
          </p>
          <Row>{optionItems}</Row>
        </>
      )}
    </>
  );
};

export default Options;
