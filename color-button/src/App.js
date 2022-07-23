import React, { useState } from "react";
import "./App.css";

export function replaceCamelWithSpace(colorName) {
  return colorName.replace(/\B([A-Z])\B/g, " $1");
}

function App() {
  const [buttonColor, setButtonColor] = useState("MediumVioletRed");
  const [disabled, setDisabled] = useState(false);
  const newButtonColor =
    buttonColor === "MediumVioletRed" ? "MidnightBlue" : "MediumVioletRed";

  return (
    <div>
      <button
        style={{
          backgroundColor: disabled ? "gray" : buttonColor,
          color: "#fff",
        }}
        onClick={() => setButtonColor(newButtonColor)}
        disabled={disabled}
      >
        Change to {replaceCamelWithSpace(newButtonColor)}
      </button>
      <input
        type="checkbox"
        id="enable-button-checkbox"
        checked={disabled}
        aria-checked={disabled}
        onChange={(e) => setDisabled(e.target.checked)}
      />
      <label htmlFor="enable-button-checkbox">Disable button</label>
      {/* <div role="textbox">111</div> */}
      <div style={{ opacity: 0 }}>opacity0</div>
      <div style={{ opacity: 1 }}>opacity1</div>
      <div style={{ display: "none" }}>display none</div>
      <div style={{ display: "block" }}>display block</div>
    </div>
  );
}

export default App;
