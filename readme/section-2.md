# π» Section 2 - Color button

## π§βπ» Color Button(1) - μ²« λ λ/κ·Έλ¦° νμ€νΈ

- TDDλ₯Ό μ μ©νκΈ° μ μ μ°μ  App.js νμΌμ κΈ°μ‘΄ μ½λλ₯Ό μ§μ°κ³  Div νκ·Έ νλλ§ λ°ννκ²λ μμ νλ€.
- κ·Έλ¦¬κ³  App.test.jsμμ νμ€νΈνκΈ° μν΄ νμ€νΈ μ½λλ₯Ό μμ±ν  μ€λΉλ₯Ό νλ€. μ°μ  μ€λ₯κ° λ°μνμ§ μλλ‘ λΉ νμ€νΈ ν¨μλ‘ μννλ€.

```js
// App.js
import "./App.css";

function App() {
  return <div></div>;
}

export default App;
```

```js
// App.test.js
import { render, screen } from "@testing-library/react";
import App from "./App";

test("button has correct initial color", () => {});

test("button turns blue when clicked", () => {});
```

<br />

- μ΄μ  νμ€νΈ μ§νμ μν΄μ νμ€νΈ λ°©μμ μμ±ν΄μΌ νλ€.
- μ²« λ²μ§Έλ‘ μμ±ν΄μΌ λλ κ²μ `render()`μ΄λ€. μ΄ κ²½μ°μλ λ λλ§ν΄μΌ νλκ² `App μ»΄ν¬λνΈ`λ‘ λͺννλ€.
- λ λ²μ§Έλ `μνλ μμλ₯Ό μ°ΎμμΌ νλ€.` μ΄λ₯Ό μν΄μλ λ λλ§μΌλ‘ μμ±λ κ°μDOMμ μ‘μΈμ€ κ°λ₯ν μ μ­ κ°μ²΄μΈ `screen`μ μ¬μ©ν΄μΌ νλ€. κ·Έλ¦¬κ³  μμλ `μ­ν `λ‘ μ°Ύλλ€. μμλ₯Ό μ­ν λ‘ μ°Ύλ κ²μ μ νλ¦¬μΌμ΄μμ μ‘μΈμ€ μ¬λΆ νμΈμ λ§μ΄ μ¬μ©νλ λ°©μμ΄λ€.
  - λ§μ½, μ΄λ€ μ΅μμ΄ μμλμ§ νμΈνκ³  μΆμΌλ©΄ λ€μ W3C μ¬μ΄νΈλ₯Ό νμΈν΄λ³΄μ. [(μ­ν μ μ μ)](https://www.w3.org/TR/wai-aria/#role_definitions)
  - `screen.getByRole()` λ©μλλ₯Ό μ¬μ©ν΄μ `μ­ν `λ‘ μμλ₯Ό μ°Ύμ μ μλ€. μ²« λ²μ§Έ μΈμλ `μ­ν μ λνλ΄λ λ¬Έμμ΄`μ΄λ©° λ λ²μ§Έ μΈμλ `μ΅μ`μ΄λ€.
  - μλ μμ μμλ λ λ²μ§Έ μ΅μμΌλ‘ `name`μ μ¬μ©νλλ° nameμλ μμλλ μ΄κΈ° νμ€νΈλ₯Ό μλ ₯νλ€.
- μΆκ°μ μΌλ‘ button color μλν νμ€νΈ μ½λλ μμ±ν΄μΌλλλ°, μ΄λ₯Ό μν΄μ `jest-dom`μ μ΄λ€ μ΅μμ΄ μλμ§ νμΈν΄λ³΄μ.
  - [(jset-dom)](https://github.com/testing-library/jest-dom) ν΄λΉ μ¬μ΄νΈμμ `μ¬μ©μ μ μ λ§€μ²(Matcher)`λ₯Ό νμΈν  μ μλ€.
  - μλ μμ μμλ `toHaveStyle()`μ μ΄μ©ν΄μ λ²νΌμ λ°°κ²½μμ΄ λΉ¨κ°μμΈμ§ νμΈνκ³  μλ€.
  - μ°Έκ³ λ‘ λͺ¨λ  `λ¨μΈ`μ΄ κ·Έλ λ―μ΄ `expect()`λ₯Ό μ¬μ©ν΄μΌ νλ€.

<br />

```js
// App.test.js
// ...

test("button has correct initial color", () => {
  render(<App />); // (1)

  // find an element with a role of button and text of 'Change to blue'
  const colorButton = screen.getByRole("button", { name: "Change to blue" }); // (2)

  // expect the background color to be red
  expect(colorButton).toHaveStyle({ backgroundColor: "red" });
});

test("button turns blue when clicked", () => {});
```

<br />

- μ΄ μνλ‘ μ½μλ‘ `yarn test`λ₯Ό ν΅ν΄μ νμ€νΈλ₯Ό μ€ννλ©΄ κ²°κ³Όλ μ€ν¨κ° λ¨κ³  μλμ κ°μ μ€ν¨ λ©μμ§κ° λμ¨λ€.
- ν΄μν΄λ³΄λ©΄ button μ­ν κ³Ό Change to blue λΌλ nameμ μ‘μΈμ€ κ°λ₯ν μμλ₯Ό μ°Ύμ μ μλ€λ λ΄μ©μ΄λ€.

<br />

```
  TestingLibraryElementError: Unable to find an accessible element with the role "button" and name "Change to blue"
```

<br />

- μ¬κΈ°κΉμ§ `λ λ-κ·Έλ¦° νμ€νΈ` λ°©μμ λ λ νμ€νΈλ₯Ό λ§μΉ κ²μ΄λ€. κ·Έλ λ€λ©΄ μ΄μ  App.jsμμ μ€ν¨ν νμ€νΈλ₯Ό ν΄κ²°ν΄λ³΄λλ‘ νμ.
- μλ μμ μ κ°μ΄ App.jsλ₯Ό μμ  νκ³  λ€μ νμ€νΈλ₯Ό μ€νν΄λ³΄λ©΄ μ΄μ λ μ λλ‘ νμ€νΈκ° ν΅κ³Όνλ κ²μ νμΈν  μ μλ€.

<br />

```js
// App.js
function App() {
  return (
    <div>
      <button style={{ backgroundColor: "red" }}>Change to blue</button>
    </div>
  );
}

export default App;
```

<br />

## π§βπ» Color Button(2) - κΈ°λ₯(functional) νμ€νΈ(with. ν΄λ¦­ μ΄λ²€νΈ)

### μλ μ­ν λ‘ νμ€νΈνλ κ²½μ°

- λ§μ½ μλμ²λΌ μ­ν λ‘ μ‘΄μ¬νμ§ μλ μ­ν μ λ£μΌλ©΄ ν΄λΉ μ­ν λ‘ μ‘μΈμ€ κ°λ₯ν μμλ₯Ό μ°Ύμ μ μλ€λ κ²½κ³ μ ν¨κ» νμ€νΈκ° μ€ν¨νλ€.

```js
//App.test.js
test("button has correct initial color", () => {
  render(<App />);
  const colorButton = screen.getByRole("but", { name: "Change to blue" }); // (*)
  expect(colorButton).toHaveStyle({ backgroundColor: "red" });
});
```

```
TestingLibraryElementError: Unable to find an accessible element with the role "butt" and name "Change to blue"
```

<br />

- νμ§λ§ RTLμ μλμ κ°μ΄ μΉμ νκ² `μ‘΄μ¬νλ μ­ν μ΄ λ¬΄μμ΄ μλμ§ μλ €μ€λ€.` κ·Έλ κΈ°μ μ‘΄μ¬νμ§ μλ μ­ν μ λ£λλ€λ©΄ νμ€ν λΌμ΄λΈλ¬λ¦¬μ μΆλ ₯ κ°μ μ€λ₯λ₯Ό μ°Ύλλ° κ΅μ₯ν μ μ©νλ€.

```
Here are the accessible roles:

button:
Name "Change to blue":

<button
  style="background-color: red;"
/>
```

<br />

### λ²νΌ ν΄λ¦­ μ΄λ²€νΈ νμ€νΈ

- λ€μ νμ€νΈλ‘ `DOM`κ³Ό `μ§μ  μνΈμμ©`νλ νμ€νΈ μ½λλ₯Ό μμ±ν΄λ³΄μ. νμ€νΈ λ΄μ©μ λ²νΌμ΄ νλμΌλ‘ λ°λλμ§ νμ€νΈνλ κ²μ΄λ€.
- μ²« λ²μ§Έλ‘ νμμ²λΌ `render()`λ₯Ό μ΄μ©ν΄μ App μ»΄ν¬λνΈλ₯Ό λ λλ§νλ κ²μ΄λ€.
- λ λ²μ§Έλ‘ `ν΄λ¦­νκ³  μΆμ μμ`λ₯Ό μ°ΎμμΌ νλ€. μ²« λ²μ§Έ νμ€νΈ("button has correct initial color") λμ λ§μ°¬κ°μ§λ‘ `getByRole()`μ ν΅ν΄ μ°Ύλλ€.
  - μ¬κΈ°μ μ¬λ΄μΌλ‘ νμ¬ App μ»΄ν¬λνΈμλ μ¬μ€ λ²νΌ μλ¦¬λ¨ΌνΈκ° νλμ΄λ€. λ°λΌμ getByRoleμ λ λ²μ§Έ νλΌλ―Έν°μΈ μ΅μμ `name`μ μ¬μ€ μμ΄λ λλ μ΅μμ΄λ€. νμ§λ§ nameμ λΆμ¬ μ£Όλ νΈμ΄ μ’μ μ΅κ΄μ΄κ³ , μ°μ΅μλ λμμ΄ λλ€.

<br />

```js
//App.test.js
// ...

test("button turns blue when clicked", () => {
  render(<App />); // (1)
  const colorButton = screen.getByRole("but", { name: "Change to blue" }); // (2)
});
```

<br />

- μ¬κΈ°κΉμ§ μ§ννμ λ μλ¬Έμ μ μ²« λ²μ§Έ νμ€νΈ("button has correct initial color")λμ κ°μ μ½λ λ μ€μ΄ λ°λ³΅λλ€λ κ²μ΄λ€. κΌ­ λΆλ¦¬λ νμ€νΈκ° μ’μκ±ΈκΉ?
  - `μ λ(Unit)νμ€νΈ`μ κ²½μ° μ’ λ μκ²©ν λΆλ¦¬λ νμ€νμ ν  λλ νμ€νΈ νλμ νλμ λ¨μΈλ§ λμ€λ κ²μ μ νΈνλ€.
  - `κΈ°λ₯(Functional)νμ€νΈ`λ₯Ό νλ κ²½μ° μ§κΈμ μλμ§λ§ λμ€μλ μ¬λ¬ μμμ κ΄ν΄ νμ€νΈλ₯Ό μ§ννλλ° μλ‘, λ²νΌμ ν΄λ¦­νκ³  λμ μ²΄ν¬ λ°μ€λ₯Ό ν΄λ¦­ νλ λ±μ `μ¬λ¬ μμμ΄ νλμ νμ€νΈμμ μνλλ€.` κ·Έλ¬λ κΈ°λ₯ νμ€νΈμμλ νλμ νμ€νΈ μμ λ¨μΈ(assert)μ μ¬λ¬ κ° μ°λλ°μ μ’ λ μμ λ‘­λ€.

<br />

- μ°λ¦¬λ `κΈ°λ₯ νμ€νΈλ₯Ό κΈ°λ°`μΌλ‘ νμ€νΈ μ½λλ₯Ό μμ±ν  κ²μ΄κΈ° λλ¬Έμ μλ μ½λμ²λΌ μ²« λ²μ§Έ νμ€νΈμ λ¨μΈμ μ¬λ¬ κ° μλ ₯ν΄λ³΄μ.
- μ²« λ²μ§Έλ‘, νμ€νΈ μ½λμμ λ²νΌμκ² ν΄λ¦­μ΄λ²€νΈλ₯Ό λ°μμν€κΈ° μν΄μλ μ°μ  `@testing-library/react`μ `fireEvent` μ΄μ©ν΄μΌ νλ€.
  - fireEventλ `κ°μ DOMμμ μμλ€κ³Όμ μνΈμμ©μ λμμ£Όλ μ­ν `μ νλ€.
- λ λ²μ§Έλ, fireEventλ `click() λ©μλ`κ° μ‘΄μ¬νκ³  ν΄λΉ λ©μλλ `Element`λ₯Ό μΈμλ‘ λ°λλ€. fireEventμ click λ©μλλ₯Ό νΈμΆ ν¨μΌλ‘μ¨ νμ€νΈμμ ν΄λ¦­ μ΄λ²€νΈλ₯Ό λ°μμν€λ κ²μ΄λ€.
- μΈ λ²μ§Έλ‘, λ²νΌμ ν΄λ¦­λλ©΄ μ΄λ»κ² λλμ§λ₯Ό μΆκ°μ μΌλ‘ λ¨μΈ(assert)μ μμ±νλ€.
- λ€ λ²μ§Έλ‘, μ°λ¦¬λ λ²νΌμ ν΄λ¦­νλ©΄ νμ€νΈλ λ³κ²½λμΌνκΈ° λλ¬Έμ μ΄ μ­μ μΆκ°μ μΈ λ¨μΈ(assert)μ μμ±νλ€.
  - μ΄λ `textContent νλ‘νΌν°`μ `toBe()`λ₯Ό μ΄μ©ν  μ μλ€.

<br />

```js
import { render, screen, fireEvent } from "@testing-library/react"; // (1)

test("λ²νΌ ν΄λ¦­μ ν΅ν λ°°κ²½μ λ° νμ€νΈ λ³ν νμ€νΈ", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", { name: "Change to blue" });

  // expect the background color to be red
  expect(colorButton).toHaveStyle({ backgroundColor: "red" });

  // click button
  fireEvent.click(colorButton); // (2)

  // expect the background color to be blue
  expect(colorButton).toHaveStyle({ backgroundColor: "blue" }); // (3)

  // expect the button text to be 'Change to red'
  expect(colorButton.textContent).toBe("Change to red");
});
```

<br />

- μ¬κΈ°κΉμ§ μμ±νκ³  νμ€νΈλ₯Ό μ€νν΄λ³΄λ©΄ λΉμ°ν νμ€νΈλ μ€ν¨νλ€. μμ§ μ€μ  App μ»΄ν¬λνΈμ μ½λλ₯Ό μμ±νμ§ μμκΈ° λλ¬Έμ΄λ€. App μ»΄ν¬λνΈμμ μ½λλ₯Ό μΆκ°ν΄λ³΄μ.
- μ°Έκ³ λ‘ νμ€νΈλ₯Ό μ€ννλλ° μλ¬κ° λ°μνκ³  μμΈ‘μ΄ μ€ν¨νμ λ, μλ¬λ₯Ό λ°μμν¨ λ¨μΈ μ΄νμ νμ€νΈλ μ€ννμ§ μλλ€. κ·Έλ° μ΄μ λ‘ νμ€νΈλ§λ€ νλμ λ¨μΈμ λλκ² λ°λμ§ ν κ²μ΄λ€.
- κ·ΈλΌμλ λΆκ΅¬νκ³  `κΈ°λ₯ νμ€νΈλ₯Ό ν  λλ νλμ λ¨μΈλ§ μ¬μ©νλ κ²μ΄ μ€μ©μ μ΄μ§ μλ€.` μ΄μ λ κ°λ¨ν νμ€νΈ μ½νμΈ λ₯Ό νμ€νΈνκΈ° μν΄ μ μ²΄ μ€μ (render, getByRole λ±)μ λ°λ³΅ν΄μ μμ±νλ κ²μ λΉν¨μ¨μ μ΄κΈ° λλ¬Έμ΄λ€.

<br />

```js
// App.js
import React, { useState } from "react";

function App() {
  const [buttonColor, setButtonColor] = useState("red");
  const newButtonColor = buttonColor === "red" ? "blue" : "red";

  return (
    <div>
      <button
        style={{ backgroundColor: buttonColor }}
        onClick={() => setButtonColor(newButtonColor)}
      >
        Change to {newButtonColor}
      </button>
    </div>
  );
}
```

- μμ κ°μ΄ App μ»΄ν¬λνΈλ₯Ό μμ νκ³  νμ€νΈλ₯Ό μ€νν΄λ³΄λ©΄ μ΄μ  μ μ μλνλ κ²μ νμΈν  μ μλ€.

<br />

## π§βπ» Color Button(3) - μΈμ(Acceptance) νμ€νΈ

- TDDμλν΄ μμμΌ ν κ² μ±μ΄ κ°λμ€μΈ κ±Έ λ³Ό μ μλ€λ κ²μ΄λ€. μμΈμ μΌλ‘ μΈμ(Acceptance)νμ€νΈλ₯Ό μ€ννλ κ²½μ° λΉΌκ³  λ§μ΄λ€.
- μΈμ νμ€νΈλ μ±μ `μ¬μ©μ μ€ν λ¦¬(μλλ¦¬μ€)`μ λ§μΆ° μννλ νμ€νΈμ΄λ€.
- λ¦¬μ‘νΈμμ μΈμ νμ€νΈλ κ°λ¨νλ€. yarn startλ‘ μ±μ κ°λμν€κ³  `μλλ¦¬μ€ λλ μκ΅¬μ¬ν­ λͺμΈ`λλ‘ νμ€νΈ ν΄λ³΄λ κ²μ΄λ€.

<br />

## π§βπ» Color Button(4) - λ²νΌ, μ²΄ν¬λ°μ€ μ΄κΈ° μ‘°κ±΄ νμ€νΈ

- μ§κΈκΉμ§ Color Button μ±μμ μ²΄ν¬λ°μ€λ₯Ό μΆκ°ν΄λ³΄μ. μκ΅¬μ¬ν­μ λ€μκ³Ό κ°λ€.
  - μ²΄ν¬λ°μ€κ° onμΌ κ²½μ°μλ λ²νΌμ΄ λΉνμ±νλκ³ , offκ°λλ©΄ λ²νΌμ΄ νμ±νλκ² λ§λλ κ²μ΄λ€.
- κ·Έμ μ λ²νΌκ³Ό μ²΄ν¬λ°μ€μ μ΄κΈ° μνλΆν° μ²΄ν¬νλ νμ€νΈ μ½λλ₯Ό μμ±ν΄λ³΄μ. μ²΄ν¬λ°μ€λ `μ΄κΈ°μ off μν`μ΄κ³ , λ²νΌμ `νμ±ν` μνμ¬μΌ νλ€.

<br />

- μ²« λ²μ§Έλ‘, λ²νΌμ νμ±ν μ¬λΆλ jest-domμ matcherμ€μ `toBeEnabled()`λ₯Ό μ¬μ©ν΄μ μ΄κΈ° μνλ₯Ό νμ€νΈνλ€.
- λ λ²μ§Έλ‘, μ²΄ν¬λ°μ€λ getByRole()μ μ΄μ©ν΄μ μ­ν λ‘ Elementλ₯Ό μ°ΎμμΌλλλ° μ΄λ `checkbox`λΌλ μ­ν μ΄ μ‘΄μ¬νκΈ° λλ¬Έμ μ΄λ₯Ό μ¬μ©νλ€.
- μΈ λ²μ§Έλ‘, μ°Ύμ μ²΄ν¬λ°μ€κ° μ²΄ν¬λμ§(off) μμ μνλ‘ μμνκΈΈ μνκΈ° λλ¬Έμ μ΄λ matcherμ€μ `toBeChecked()`λ₯Ό μ΄μ©νλ€.
  - μ΄λ toBeUnchecked()λ μ‘΄μ¬νμ§ μλλ° toBeChecked()λ₯Ό λΆμ νλ €λ©΄ μμ `not`μ λΆμ΄λ©΄ λλ€.

```js
// App.test.js
test("λ²νΌ, μ²΄ν¬λ°μ€ μ΄κΈ° μν νμ€νΈ", () => {
  render(<App />);

  // check that the button starts out enabled
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  expect(colorButton).toBeEnabled(); // (1)

  // check that the checkbox starts out unchecked
  const checkbox = screen.getByRole("checkbox"); // (2)
  expect(checkbox).not.toBeChecked(); // (3)
});
```

<br />

- μ΄λλ‘ νμ€νΈλ₯Ό μ€ννλ©΄ λΉμ°ν μ€ν¨ν  κ²μ΄κ³ , νμ€νΈλ₯Ό ν΅κ³Όμν€κΈ° μν΄ App μ»΄ν¬λνΈλ₯Ό μμ νμ.
- μμ νκ³  νμ€νΈλ₯Ό νμΈν΄λ³΄λ©΄ λ¬΄μ¬ν λ²νΌκ³Ό μ²΄ν¬λ°μ€μ μ΄κΈ° μν νμ€νΈλ ν΅κ³Όλλ κ²μ νμΈν  μ μλ€.

<br />

```jsx
function App() {
  const [buttonColor, setButtonColor] = useState("red");
  const newButtonColor = buttonColor === "red" ? "blue" : "red";

  return (
    <div>
      {/* ...button */ }
      <input type="checkbox">
    </div>
  );
}
```

<br />

## π§βπ» Color Button(5) - μ²΄ν¬λ°μ€ κΈ°λ₯ μΆκ°(ν΄μ¦ νμ΄)

- μκ΅¬μ¬ν­: μ²΄ν¬λ°μ€μ μ²΄ν¬κ° onλλ©΄ λ²νΌμ΄ λΉνμ±νλκ² ν΄λΌ
- κ°μ΄λ)
  - `fiveEvent.click` μ¬μ©
  - `toBeEnabled`μ κ·Έ λ°λ matcherμΈ `toBeDisabled()` μ¬μ©
  - μλ‘μ΄ νμ€νΈλ₯Ό μμ±ν΄μ μμ±

```js
// App.test.js
test("μ²΄ν¬λ°μ€λ₯Ό 2λ² ν΄λ¦­νλ λμ λ²νΌ νμ±ν λ° μ²΄ν¬λ°μ€ μ²΄ν¬ μ λ¬΄ νμ€νΈ", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  const checkbox = screen.getByRole("checkbox");

  // click checkbox
  fireEvent.click(checkbox);

  expect(colorButton).toBeDisabled();
  expect(checkbox).toBeChecked();

  // click checkbox
  fireEvent.click(checkbox);

  expect(colorButton).toBeEnabled();
  expect(checkbox).not.toBeChecked();
});
```

```jsx
// App.js

function App() {
  const [buttonColor, setButtonColor] = useState("red");
  const [disabled, setDisabled] = useState(false); // (*)
  const newButtonColor = buttonColor === "red" ? "blue" : "red";

  return (
    <div>
      <button
        style={{ backgroundColor: buttonColor, color: "#fff" }}
        onClick={() => setButtonColor(newButtonColor)}
        disabled={disabled} // (*)
      >
        Change to {newButtonColor}
      </button>
      <input
        type="checkbox"
        id="enable-button-checkbox" // (*) labelμ μν id μ§μ 
        checked={disabled} // (*)
        aria-checked={disabled} // (*) μΉ μ κ·Όμ±μ μν μμ±
        onChange={(e) => setDisabled(e.target.checked)} // (*)
      />
    </div>
  );
}
```

<br />

## π§βπ» Color Button(6) - λΌλ²¨μ΄ μλ μ²΄ν¬λ°μ€ μ°ΎκΈ°

- λΌλ²¨μ΄ μλ μ²΄ν¬λ°μ€ μ°Ύμ λλ `getByRole()`μ λ λ²μ§Έ μΈμμ `name μ΅μ`μ ν΅ν΄ μ°Ύμ μ μλ€.
- κ·Έλ¦¬κ³  App μ»΄ν¬λνΈμμ label νκ·Έλ₯Ό μΆκ°νλ©΄ λλ€. μ΄λ `htmlFor μμ±μ κ°μ μ°κ²°μν¬ inputμ idμ λ§μΆ°μ£Όλ©΄ λλ€.`

```js
test("μ²΄ν¬λ°μ€λ₯Ό 2λ² ν΄λ¦­νλ λμ λ²νΌ νμ±ν λ° μ²΄ν¬λ°μ€ μ²΄ν¬ μ λ¬΄ νμ€νΈ", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" }); // (*)
  // assert...
});
```

```jsx
<div>
  // ...
  <input
    type="checkbox"
    id="enable-button-checkbox"
    checked={disabled}
    aria-checked={disabled}
    onChange={(e) => setDisabled(e.target.checked)}
  />
  <label htmlFor="enable-button-checkbox">Disable button</label>
</div>
```

<br />

## π§βπ» Color Button(7) - λΉνμ±νλ λ²νΌ νμμΌλ‘ λ΄κΎΈκΈ°(ν΄μ¦ νμ΄)

- μκ΅¬μ¬ν­: λ²νΌμ΄ λΉνμ±νλμμ λ μ΄λ₯Ό μκ°μ μΌλ‘ νμΈν  μ μμΌλ©΄ μ’κ² λ€. μ¦ λ²νΌ μκΉμ νμμΌλ‘ λ°κΎΈμ.
- κ°μ΄λ)
  - νμ€νΈ νλ‘μ°
    1. μ²΄ν¬λ°μ€ ν΄λ¦­ -> λ²νΌ λΉνμ±ν -> λ²νΌ μκΉ(νμ) -> μ²΄ν¬λ°μ€ ν΄λ¦­ -> λ²νΌ νμ±ν -> λ²νΌ μκΉ(λΉ¨κ°)
    2. λ²νΌ ν΄λ¦­ -> λ²νΌ μκΉ(νλ) -> μ²΄ν¬λ°μ€ ν΄λ¦­ -> λ²νΌ λΉνμ±ν -> λ²νΌ μκΉ(νμ) -> μ²΄ν¬λ°μ€ ν΄λ¦­ -> λ²νΌ μκΉ(νλ)
  - νμ€νΈ νλ‘μ°κ° 2κ°μ΄κΈ° λλ¬Έμ 2κ°μ νμ€νΈ μ½λλ₯Ό μΆκ° μμ±

```js
// App.test.js
test("λΉνμ±ν λ²νΌμ μκΉμ νμμ΄κ³ , νμ±νλλ©΄ λΉ¨κ°μμΌλ‘ λμμ¨λ€.", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: "red" });
});

test("λ²νΌμ ν΄λ¦­νλ©΄ λ²νΌμ νλμμ΄κ³ , λΉνμ±ννλ©΄ νμμ΄λ€. λ€μ νμ±ννλ©΄ νλμμΌλ‘ λμμ¨λ€.", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });

  fireEvent.click(colorButton);
  expect(colorButton).toHaveStyle({ backgroundColor: "blue" });

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: "blue" });
});
```

<br />

```js
// App.js
function App() {
  // ...

  return (
    <div>
      <button
        // (*)
        style={{
          backgroundColor: disabled ? "gray" : buttonColor,
          color: "#fff",
        }}
        onClick={() => setButtonColor(newButtonColor)}
        disabled={disabled}
      >
        Change to {newButtonColor}
      </button>
      // ...
    </div>
  );
}
```

## π§βπ» Color Button(8) - ν¨μ μ λ(Unit)νμ€νΈ

- λ¦¬μ‘νΈ μ±μμλ μ’μ’ `μ»΄ν¬λνΈλ‘λΆν° λΆλ¦¬λμ΄ μλ ν¨μ`λ₯Ό λ°κ²¬ν  μ μλ€. μ΄λ ν¨μκ° λ€μμ μ»΄ν¬λνΈμ μν΄ μ¬μ©μ΄ λκ³  μκΈ° λλ¬ΈμΌ μ μλ€. (μλ₯Ό λ€μ΄ μ νΈν¨μ) νΉμ λ‘μ§μ΄ λ€μ λ³΅μ‘νκΈ° λλ¬Έμ μ»΄ν¬λνΈ μμ²΄μ λΌλ¦¬λ‘λΆν° λΆλ¦¬λ₯Ό ν΄μΌ νλ μν©μΌ μλ μλ€.
- μ λ νμ€νΈλ₯Ό κΆμ₯νλ μν©μ λ€μκ³Ό κ°λ€.
  - 1. κΈ°λ₯ νμ€νΈλ₯Ό ν΅ν΄ νμ€νΈλ₯Ό νκΈ°μλ λ‘μ§μ΄ λλ¬΄ λ³΅μ‘ν κ²½μ°
  - 2. μ£μ§ μΌμ΄μ€κ° λλ¬΄ λ§μ κ²½μ°μ΄λ€.
- μ¬μ€ μ§κΈ Color Button νλ‘μ νΈμμ μ λ νμ€νΈκ° νμν ν¨μκ° ν¬ν¨λμ΄ μμ§ μλ€. κ·Έλλ ν¨μμ μ λ νμ€νΈμ κ°λκ³Ό μλ¦¬λ₯Ό μ΄ν΄λ³΄μ.

<br />

- νμ¬ μ λ νμ€νΈλ₯Ό ν΄λ³Ό ν¨μλ λ§μ½ μ°λ¦¬κ° μμμΌλ‘ μΉ΄λ©μΌμ΄μ€λ₯Ό μΈμλ‘ λ£μμ κ²½μ° λλ¬Έμλ§λ€ μμ κ³΅λ°±μ μΆκ°νλ ν¨μ(`replaceCamelWithSpace()`)λ₯Ό μΆκ°νκ³  νμ€νΈν΄λ³΄μ.
- κ·Έλ¦¬κ³  μ΄λ² μΉμμμ μλ‘μ΄ κ°λμ μ¬μ©νλλ° λ°λ‘ `describe()`μ΄λ€. describeλ νμ€νΈλ₯Ό κ·Έλ£Ήνν  λ μ¬μ©νλ€.

<br />

- `describe()`λ λ λ²μ§Έ μΈμλ‘ μ½λ°± ν¨μλ₯Ό κ°λλ€. κ·Έλ¦¬κ³  κ·Έ μ½λ°± ν¨μ λ΄λΆμ κ°κ°μ νμ€νΈλ€μ μλ ₯ν  μ μλ€.
- μ°Έκ³ λ‘, μλ μμ λ μ΄λ€ νΉμ  DOMμ λΆλ¬μ€λ κ²μ΄ μλκ³  νΉμ  ν¨μ(`replaceCamelWithSpace()`)λ§μ νμ€νΈνκΈ° λλ¬Έμ λ°λ‘ `λ¨μΈ(assert)`λ₯Ό μμ±ν΄μ£Όλ©΄ λλ€.

```js
// App.test.js
import { replaceCamelWithSpace } from "./App";

describe("μΉ΄λ© μΌμ΄μ€μ κ²½μ° λλ¬Έμ μμ κ³΅λ°±μ λμ΄λ€", () => {
  test("Works for no inner capital letters", () => {
    expect(replaceCamelWithSpace("Red")).toBe("Red");
  });

  test("Works for one inner capital letters", () => {
    expect(replaceCamelWithSpace("MidnightBlue")).toBe("Midnight Blue");
  });

  test("Works for mulitple inner capital letters", () => {
    expect(replaceCamelWithSpace("MediumVioletRed")).toBe("Medium Violet Red");
  });
});
```

<br />

- μ΄μ  App μ»΄ν¬λνΈμμ replaceCamelWithSpaceλ₯Ό μμ±ν΄μ£Όμ. μ°Έκ³ λ‘ ν¨μ λ΄λΆμμ μ κ·ννμμ μ¬μ©νλ€.
- μμ±ν(`/\B([A-Z])\B/g`) μ κ·ννμμ΄ μλ―Ένλ λ΄μ©μ λ¬Έμμ΄μμ λλ¬Έμλ₯Ό λ§λλ©΄ λλ λ€μμ λλ¬Έμλ₯Ό λ§λλ©΄ λ§€λ² μμμ νλ€λ κ²μ μλ―Ένλ€.

<br />

```js
// App
export function replaceCamelWithSpace(colorName) {
  return colorName.replace(/\B([A-Z])\B/g, " $1");
}
```

- μμ κ°μ΄ μμ±νκ³  νμ€νΈλ₯Ό λλ €λ³΄λ©΄ μ λλ‘ νμ€νΈκ° ν΅κ³Όνλ κ²μ νμΈν  μ μλ€.

<br />

## π§βπ» Color Button(9) - μ€ν λ³κ²½μ ν΅ν μ½λ μμ 

- κΈ°μ‘΄ Color Buttonμ μ€νμ redκ³Ό blue μμμ λ€λ£¨μμ§λ§, μκ΅¬μ¬ν­μ΄ Midnight Blue, Medium Violet Red μμμΌλ‘ λ°λμ΄μΌ νλ€λ©΄ μ€νμ λ°λ κ²μ΄λ€.
- `μ±μ μ€νμ΄ λ³κ²½λ  λλ§λ€ νμ€νΈλ₯Ό μλ°μ΄νΈν΄μΌ νλ€.`
- μλ testμ½λμ κ°μ΄ κΈ°μ‘΄μ red, blueλ‘ μμ±λ μ½λλ₯Ό λͺ¨λ λ°κΏμΌ νλ€. μ΄λ° μμμ΄ λ§€μ° ν₯λ―Έλ‘μ΄ νλμ μλλ€λΌλ κ²μ νμ€νμ§λ§ νλ‘κ·Έλλ¨Έμ μλͺμ΄λ€.

```js
// App.test.js
test("λ²νΌ ν΄λ¦­μ ν΅ν λ°°κ²½μ λ° νμ€νΈ λ³ν νμ€νΈ", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });

  // expect the background color to be MediumVioletRed
  expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });

  // click button
  fireEvent.click(colorButton);

  // expect the background color to be MidnightBlue
  expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });

  // expect the button text to be 'Change to MidnightBlue'
  expect(colorButton.textContent).toBe("Change to Medium Violet Red");
});
```

```js
// App.js

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
    </div>
  );
}
```

<br />

## π§βπ» Color Button(10) - μ λ νμ€νΈλ₯Ό νλ κ²½μ°(μΆκ° μ€λͺ)

- λ³΅μ‘ν ν¨μμ κ²½μ°μλ μ λ νμ€νΈλ₯Ό ν΅ν΄ κ°λ₯ν λͺ¨λ  μ£μ§ μΌμ΄μ€λ₯Ό νμΈν  μ μλ€. λ°λΌμ, λͺ¨λ  μ£μ§ μΌμ΄μ€λ₯Ό νμ€νΈνκΈ° μν΄ κ΅³μ΄ μ»΄ν¬λνΈλ₯Ό νμ±νν  νμκ° μλ€.
- κ·Έλ¦¬κ³  μ€μνκ² κ³ λ €ν΄μΌ ν  μ¬ν­μ΄ νλ μλλ°, κΈ°λ₯ νμ€νΈμ μ€ν¨ μμΈμ νμνλ €λ κ²½μ°μ μ λ νμ€νΈκ° μ μ©νκ² νμ©λ  μ μλ€.
- μ’μ’ κΈ°λ₯ νμ€νΈμμ λ€μκ³Ό κ°μ λ¬Έμ κ° λ°μνκ³€ νλ€. κΈ°λ₯ νμ€νΈκ° μμ£Ό λμ μμ€μ μμ΄ μ½λλ₯Ό λ¦¬ν©ν λ§νκ² λλ©΄ μ€ν¨μ μ ν­λ ₯μ΄ μκΈ°λ κ²μ΄λ€. μ½λκ° κ΅¬νλλ κ΅¬μ‘° λ°©μμ λ³κ²½νμΌλ μ½λμ λμμ κ·Έλλ‘μΈ κ²½μ°κ° μ¬κΈ°μ ν΄λΉλλ€. μ΄λ μ₯μ μΈλ° μ΄ λ§μ κ²°κ΅­, νμ€νΈμ λ³΅μλ ₯μ΄ μ’μΌλ©° λμ λ³κ²½ μ¬λΆμ μκ΄μμ΄ νμ€νΈμ λ³Έλ μ­ν μ μΆ©μ€νλ€λ μλ―Έμ΄λ€.
- νμ§λ§, μ΄λ° κ²½μ° μ§λ¨ λν μ΄λ €μμ§λ€. νμ€νΈκ° μ€ν¨νλ μμΈμ΄ κΈ°λ₯ λ΄μ κ΄λ²μν λΆλΆμ ν΄λΉν  μ μκΈ° λλ¬Έμ΄λ€. λ°λΌμ λ³΅μ‘ν ν¨μκ° μκ³  ν΄λΉ ν¨μλ₯Ό μ λ νμ€νΈνκ² λλ©΄ κ·Έ ν¨μμ λν μ λ νμ€νΈκ° μ€ν¨ν  μ ν΄λΉ ν¨μλ‘ μΈν΄ νμ€νΈκ° μ€ν¨νλ€λ μ μ μ μ μκ² λλ€.
- νμ€νΈμ κ΄λ ¨ν λ΄μ©λ€μ κ³Όνμ΄λΌκΈ°λ³΄λ€λ μμ μ κ°κΉλ€. μ¬λλ€μ λ°λΌ ν¨μμ μ λ νμ€νΈ μ€νμ λν μκ²¬μ κ°λ¦¬κ² λ§λ ¨μ΄κ³ , κ° νλ§μ μ€νμΌμ΄ μλ€.

<br />

## μΉμ μμ½

1. fiveEventλ₯Ό μ¬μ©ν΄ μνΈμμ©μ±μ νμ€νΈ νλ€. fiveEventλ Reactμ νμ€ν λΌμ΄λΈλ¬λ¦¬μμ κ°μ Έμ¨ κ°μ²΄λ‘μ clickκ³Ό κ°μ λ©μλλ₯Ό ν¬ν¨νκ³  μλ€.
2. λ€μμ jest-dom λ¨μΈ(assert)λ₯Ό μ¬μ©νλ€

- toBeEnabled()
- toBeDisabled()
- toBeChecked() -> λ°λ κΈ°λ₯μ λ¨μΈμ΄ μμ΄μ μμ notμ μ¬μ©νλ€.
- toHaveStyle()
- toBe()

3. getByRoleμ name μ΅μμ μ¬μ©ν΄ νμ΄μ§μ μ΄λ€ μ²΄ν¬λ°μ€ λ° λ²νΌμ μ°Έμ‘°νκ³  μλμ§ μλ³νλ€.
4. Jest describe μ μ­ λ©μλλ₯Ό μ¬μ©ν΄ λΌλ¦¬μ μΈ κ·Έλ£ΉμΌλ‘ νμ€νΈλ₯Ό κ·Έλ£Ήν νλ€.
5. ν¨μμ μ λ νμ€νΈλ₯Ό μ§ννλ€. ν¨μλ₯Ό μ λ νμ€νΈνλ λ°©λ²κ³Ό μ΄λ€ κ²½μ°μ μ ν©νμ§ μμλ΄€λ€. `λ³΄ν΅ ν¨μκ° λ³΅μ‘ν κ²½μ°μ μ¬μ©νλ€.` λν, νμ€νΈνλ €λ λͺ¨λ  μ£μ§ μΌμ΄μ€μ λν μ»΄ν¬λνΈλ₯Ό μ¬λ λλ§ν  νμκ° μλ€.

<br />
