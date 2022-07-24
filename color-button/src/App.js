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

      {/* <button className="test button" type="submit" name="test">
        button test
      </button> */}
      {/* <input type="text" /> */}
      <form aria-label="form">
        <input type="text" name="username" defaultValue="jane.doe" />
        <input type="password" name="password" defaultValue="12345678" />
        <input type="checkbox" name="rememberMe" defaultChecked />
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}

export default App;
