# π» Section 4 - Sundaes on Demand

## π§βπ» Sundaes on Demand(1) - App κ°μ

- Sundaes on Demand νλ‘μ νΈμμ ν΄λΌμ΄μΈνΈμ μλ²κ° κΈ°λ³Έμ μΌλ‘ `μνΈμμ©` νλ λ°©μμ μλμ κ°λ€.
  - κΈ°λ³Έμ μΌλ‘ μ¬λλ€μ΄ μμ΄μ€ν¬λ¦Όμ λ§κ³Ό ν νμ μ νν λ€, μ£Όλ¬Έμ μ μΆνλ€.
  - λ§κ³Ό ν νμ μ νμ§λ μλ²λ‘λΆν° μ€κ²λλ€.
  - μ£Όλ¬Έμ΄ μ μΆλλ©΄ μ΄λ μλ²λ‘ μ μ‘μ΄ λκ³  μλ²λ ν΄λΌμ΄μΈνΈμκ² μ£Όλ¬Έ λ²νΈλ₯Ό νμ ν΄μ κ³ κ°λ€μκ² λ³΄μ¬μ€λ€.

<br />

- μΆκ°μ μΌλ‘ Color Button λ³΄λ€ λμ± λ³΅μ‘ν νμ€νΈ νκ²½μ κ΅¬μ±ν  νλ° μλμ κ°μ μμλ€μ΄ μΆκ°μ μΌλ‘ μ‘΄μ¬νλ€.
  - λ€μμ κΈ°μλμ κ°μ§ νμκ³Ό μ£Όλ¬Έ λ¨κ³λ‘μ μ΄λ λ±μ΄ λ³΅μ‘ν μνΈμμ©
  - μ΄μ© μ½κ΄μ λν΄μλ μ»€μλ₯Ό μ¬λ¦¬λ©΄ λνλλ νμμ°½μ λ§λ€μ΄ μ¬μ©μλ€μ΄ κ°μμ ν  λ μ΄λ€ μ΄μ© μ½κ΄μ λμνλμ§ νμΈν  νλ° μ΄λ₯Ό μν΄ DOMμΌλ‘ λΆν° μ¬λΌμ§λ μμλ₯Ό νμ€νΈνλ€.
  - μλ²μ μλ΅μ `Mock`νλ€. Mockμ κΈ°λ₯ νμ€νΈμ μμ΄ κ΅μ₯ν μ€μν λΆλΆμΌλ‘ κΈ°λ₯ νμ€νΈ λμ€μ μλ²μ μ€νμ μνμ§ μκΈ° λλ¬Έμ `MSW(Mock Service Worker)` λΌμ΄λΈλ¬λ¦¬λ₯Ό μ¬μ©ν΄ νμ€νΈ μλ²λ‘λΆν° `Mock μλ΅`μ λ³΄λ΄λλ‘ λ§λ λ€.
    - MSWλ₯Ό μ¬μ©νλ©΄ μλ²λ‘ κ°λ νΈμΆμ μ€κ°μμ κ°λ‘μ± μ°λ¦¬κ° μλ΅μ μ μ΄ν  μ μκ² ν΄μ€λ€. MSWλ₯Ό μ¬μ©ν΄ Mock μλ΅μ λ³΄λ΄κΈ° λλ¬Έμ νμ€νΈ λμ€ μλ²κ° μ€ν μ€μΌ νμκ° μλ€.
  - μ΄ μ±μ `λΉλκΈ°μ  μλ°μ΄νΈ`κ° μ‘΄μ¬νλ€. μ΄ λ§μ νμ€νΈ λΌμ΄λΈλ¬λ¦¬λ₯Ό μ¬μ©ν΄ νΉμ  λκ΅¬λ₯Ό νμ΅νκ² λ νλ°, μ΄ νΉμ  λκ΅¬λ DOM λ΄μ νΉμ  λ³κ²½μ κΈ°λ€λ¦¬κ² λλ€.
  - `Context API`λ₯Ό ν΅ν΄ μ μ­ μν κ΄λ¦¬λ₯Ό μ¬μ©νλ€.
    - νμ§λ§, Contextμ κ΅¬νμ νμ€νΈλ₯Ό μ§ννμ§ μλλ€. μλνλ©΄ μ°λ¦¬λ μ¬μ©μμκ² λ³΄μ΄λ `νμ€νΈ λμ`μλ§ κ΄μ¬μ΄ μκΈ° λλ¬Έμ΄λ€. λν μ΄κ² κ²°κ΅­ `κΈ°λ₯ νμ€νΈμ λͺ©μ `μ΄κΈ° λλ¬Έμ΄λ€.
    - λ°λΌμ, νμ€νΈλ λ€λ₯Έ μ μ­ μν κ΄λ¦¬ μμ€νμ μ¬μ©ν κ²½μ°μ μ ν λ€λ₯΄μ§ μμ κ²μ΄λ€. (ex. Mobx, Redux, Recoil)
    - νμ§λ§ `νμ€νΈ μ€μ `μ μ°¨μ΄μ μ μ‘΄μ¬ ν  κ²μ΄λ€. νμ€νΈκ° μ¬λ°λ₯΄κ² μλν  μ μκ² μ»΄ν¬λνΈκ° μ»¨νμ€νΈμ μ‘μΈμ€ν  μ μλλ‘ λ§λ€μ΄μΌ νλ€. κ·ΈλμΌ μ»¨νμ€νΈμ μ°κ²°μ μλνμΌλ, μ»¨νμ€νΈλ₯Ό μ°Ύμ μκ° μμ΄ νμ€νΈ λμ€ μ€λ₯κ° λ°μνλ μν©μ λ°©μ§ν  μ μκΈ° λλ¬Έμ΄λ€.

### Order Phase State (App-level)

- `App-level` μνλ₯Ό μ΄μ©ν΄ νμ¬ μμΉν `μ£Όλ¬Έ λ¨κ³λ₯Ό μΆμ `ν¨μΌλ‘μ¨ κ° μ£Όλ¬Έ λ¨κ³λ€μ κ±°μ³λκ° λ  κ²μ΄λ€.
  - `inProgress` μνλΌλ©΄ μ£Όλ¬Έ μλ ₯λ νμ΄μ§κ° νμλ  κ²μ΄λ€.
  - `review` μνλΌλ©΄ μ£Όλ¬Έ μλ ₯ νμ΄μ§μμ Submit Orderλ₯Ό ν΄λ¦­νκ³  μ΄λνλ μ£Όλ¬Έ μμ½ νμ΄μ§κ° νμλ  κ²μ΄λ€.
  - `completed` μνλΌλ©΄ μ£Όλ¬Έ μλ£ νμ΄μ§κ° νμλ  κ²μ΄λ€.
  - μ£Όλ¬Έ μλ£ νμ΄μ§μμλ μ μ£Όλ¬Έμ μμ±νκΈ° μν λ²νΌμ΄ μμνλ° μ΄ λ²νΌμ λλ₯΄λ©΄ λ€μ inProgress μνλ‘ λμμ μ£Όλ¬Έ μλ ₯λ νμ΄μ§κ° νμλ  κ²μ΄λ€.
  - μ¦, inProgress -> review -> completed νλ‘μ°λ‘ μ§νλλ€.

<br />

### Server κ°μ

- μλ²λ μλ μ μ₯μλ₯Ό ν΄λ‘ ν΄μ μ¬μ©νλ©΄λλ€.
  - [μλ² μλ£ μ μ₯μ](https://github.com/bonnie/udemy-TESTING-LIBRARY/tree/main/sundae-server)
- μλ²μ APIλ Restfulνκ² μμ±λμ΄ μλ€.
- λΈλ/μ΅μ€νλ μ€ μλ²μμ μ€νλλ©° 3030λ² ν¬νΈμμ μ€νλλ€.
- λ§κ³Ό ν νμ λν μ λ³΄λ μ μ  μ λ³΄λ‘ λ³΄λΈλ€.
  - λ§κ³Ό κ·Έ μ΄λ―Έμ§μ λͺ©λ‘, ν νκ³Ό κ·Έ μ΄λ―Έμ§μ λͺ©λ‘μ λ³΄λΈλ€.
- μ€μ  μ±μμλ μ λ³΄κ° λ°μ΄ν°λ² μ΄μ€μμ μ€κ³  Sundaes on Demandλ νμΌμμ μ€λ κ²μ΄λ€.
- μ£Όλ¬Έ λ²νΈμ κ²½μ°μλ λ¬΄μμμ λ²νΈλ₯Ό μμλ‘ μμ±ν΄ μ μ‘νλ€.
- μ¬μ€ Sundaes on Demandλ κΈ°λ₯ νμ€νΈλ₯Ό μν΄ μλ²λ νμκ° μλ€. μμμλ μΈκΈνμ§λ§ MSWλ₯Ό μ΄μ©ν΄ νμ€νΈ μλ²λ‘λΆν° MOCK μλ΅μ λ³΄λΌ κ²μ΄κΈ° λλ¬Έμ΄λ€.
- κ·Έλ λ€λ©΄ μλ²κ° μ νμνλ, μλ²λ μ€νμ μν΄μλ§ μ¬μ©μ ν΄μ MSWκ° λ°νν΄μΌ νλ λ΄μ©μ νμΈν  κ±°κ³ , μλ μΈμ(Acceptance) νμ€νΈ μ©μΌλ‘ μ¬μ©ν  κ²μ΄λ€.

<br />

## π§βπ» Sundaes on Demand(2) - μ€νμΌλ§ μν(react-bootstrap)

- νμ€νΈ κ³Όμ μ μμ΄, μ€νμΌλ§μ΄ λ³λ‘ μ€μνμ§ μλ€ μκ°ν  μλ μμ§λ§, μ¬μ€ μ λ² μ€μνλ€. μλνλ©΄, νμ΄μ§ μμ λνλ μμμ λͺ¨μ΅μ λ°νμΌλ‘ μμλ₯Ό μ°Ύκ² λ  νλ° μ΄λ μ¬μ©λ μ€νμΌλ§μ μν΄ λ¬λΌμ§κ² λκΈ° λλ¬Έμ΄λ€.
- ν΄λΉ νλ‘μ νΈμμλ `react-bootstrap`μ μ¬μ©ν΄μ [react-bootstrap](https://react-bootstrap.github.io/) μ¬μ΄νΈμ μμκ° μ΄λ»κ² κ΅¬νλμλμ§ νμΈνλ©΄μ, ν¨μ¨μ μΌλ‘ μμλ₯Ό μ°Ύμλ΄ νμ€νΈ ν  μ μλλ‘ ν  κ²μ΄λ€.

<br />

```
μ€μΉ
yarn add react-bootstrap bootstrap
```

<br />

- λΌμ΄λΈλ¬λ¦¬ μ€μΉ νμ index.htmlμλ€ μΆκ°μ μΈ JavaScript λ§ν¬λ₯Ό μΆκ°νλ€.
- μλ λ΄μ©λ€μ index.htmlμλ€ λΆμ¬λ£μΌλ©΄ λλ€. κ΄λ ¨ μ€λͺμ [react-bootstrap: browser-globals](https://react-bootstrap.github.io/getting-started/introduction#browser-globals)μμ μ°Έκ³ νλ©΄ λλ€.

<br />

```js
<script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>

<script
  src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
  crossorigin></script>

<script
  src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
  crossorigin></script>
```

<br />

- κ·Έλ¦¬κ³  CSSλ₯Ό index.jsμλ€ import μΆκ°ν΄μ€μΌ νλ€. κ΄λ ¨ μ€λͺμ [react-bootstrap: css](https://react-bootstrap.github.io/getting-started/introduction#css)μμ μ°Έκ³ νλ©΄ λλ€.

<br />

## π§βπ» Sundaes on Demand(3) - SummaryForm κ΅¬μ‘°

### λͺ©μ λμμΈ

![αα³αα³αα΅α«αα£αΊ 2022-07-19 αα©αα₯α« 12 34 51](https://user-images.githubusercontent.com/64779472/179548063-74cecf24-b930-4617-b0cd-232ec2cff739.png)

<br />

### ν΄λ κ΅¬μ‘°

<img width="346" alt="αα³αα³αα΅α«αα£αΊ 2022-07-18 αα©αα? 11 50 53" src="https://user-images.githubusercontent.com/64779472/179538796-913a01f3-80a5-412e-b322-fe1c57e339da.png">

<br />

- μ»΄ν¬λνΈλ₯Ό νμ΄μ§ λ³λ‘ κ΅¬μ±νλ€. μ΄ κ°κ°μ νμ΄μ§ λλ ν λ¦¬μλ νμ€νΈ μλΈλλ ν λ¦¬κ° μ‘΄μ¬νλ€. κ·Έ μμ νμ€νΈ μ½λκ° ν¬ν¨λλ€.
- Jestλ νλ‘μ νΈ μ μ²΄ λλ ν λ¦¬ νΈλ¦¬ λ΄μ `.test.js`λ‘ λλλ λͺ¨λ  νμΌμ μ°Ύμ μ€ννκΈ° λλ¬Έμ νμ€νΈ νμΌμ΄ μ΄λμμλ  μκ΄μ μμ§λ§ λ°λ‘ λλ ν λ¦¬λ‘ μ λ¦¬νλ€.

<br />

## π§βπ» Sundaes on Demand(4) - SummaryForm: μ²΄ν¬λ°μ€ νμ±ν λ²νΌ

### μκ΅¬μ¬ν­

- κΈ°λ³Έκ°μΌλ‘ μ²΄ν¬λ°μ€μ μ²΄ν¬κ° λμ΄ μμ§ μλλ‘ νλ€.
- μ²΄ν¬λ°μ€μ μ²΄ν¬λ₯Ό νλ©΄ λ²νΌμ΄ νμ±νλκ² νλ€. κ·Έλ¦¬κ³  μ²΄ν¬λ₯Ό ν΄μ νλ©΄ λ²νΌμ΄ λ€μ λΉνμ±νλλ€.
  - toBeEnabled, toBeDisabled νμ©

<br />

- μ€μ  μμ±λ [SummaryForm.js](https://github.com/ssi02014/React-Testing-Tutorials/blob/master/sundaes-on-demand-client/src/pages/summary/SummaryForm.js) μ½λλ μ§μ  νμΈ

```js
// App.test.js
import { render, fireEvent, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

test("μ΄κΈ° μν νμ€νΈ", () => {
  render(<SummaryForm />);

  const confirmButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  const checkBox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });

  expect(checkBox).not.toBeChecked();
  expect(confirmButton).toBeDisabled();
});

test("μ²΄ν¬λ°μ€κ° μ²΄ν¬λλ©΄ λ²νΌμ λΉνμ±νλκ³ , μ²΄ν¬λ₯Ό ν΄μ νλ©΄ λ²νΌμ νμ±νλλ€.", () => {
  render(<SummaryForm />);

  const confirmButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  const checkBox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });

  fireEvent.click(checkBox);
  expect(confirmButton).toBeEnabled();

  fireEvent.click(checkBox);
  expect(confirmButton).toBeDisabled();
});
```

<br />

## π§βπ» Sundaes on Demand(5) - Popover Test & useEvent & screen Query Methods

### userEvent

- μ΄μ©μ½κ΄ Popover νμ€νΈμ νμ΄μ§λ‘λΆν° μ¬λΌμ§ μμλ₯Ό νμ€νΈνλ λ°©λ²μ μμλ³΄μ
- Popoverλ [λ¦¬μ‘νΈ λΆνΈμ€νΈλ© Popover](https://react-bootstrap-v3.netlify.app/components/popovers/) λ₯Ό μ¬μ©ν  μμ μ΄λ€.
- Popover νμ€νΈλ μ°λ¦¬κ° μ¬μ©ν μ€νμΌλ§μ΄ νμ€νΈ λ°©μμ μν₯μ λ―ΈμΉλ λνμ μΈ μΌμ΄μ€μ΄λ€.
  - Popoverκ° λνλ¬μ λλ divκ° μμ±λκ³  μ΄λ νμ€νΈ κ²μμ ν΅ν΄μ κ°μ Έμ¬ μ μλ€.
  - Popoverκ° μ¬λΌμ‘μ λλ divκ° μ¬λΌμ§λ€. νμ§λ§ λ λ€λ₯Έ κ°λ₯μ±μΌλ‘ μ¬μ ν νμ΄μ§μλ μ‘΄μ¬νμ§λ§, μ¨κ²¨μ§ μνμΌ μλ μλ€. μ΄λ° μ°¨μ΄μ μ μ€μνλ€. μλνλ©΄ μ΄μ© μ½κ΄μΌλ‘λΆν° μ»€μκ° λ©μ΄μ§λ©΄ Popoverκ° μ¬λΌμ§λ λΆλΆμ νμ€νΈνλ λ°©μμ΄ κ²°μ λκΈ° λλ¬Έμ΄λ€.
  - κ²°κ³Όμ μΌλ‘ μ€νμΌλ§μ΄ μ΄λ»κ² νμ€νΈλ₯Ό κ²°μ νλμ§λ₯Ό λ³΄μ¬μ£Όλ μ’μ μμμ΄λ€. νμ΄μ§μμ μμκ° μ΄λ»κ² λ³΄μ΄κ³  μ¬λΌμ§λμ§λ₯Ό νλ¨νκΈ° λλ¬Έμ΄λ€.

<br />

- λ§μ°μ€μ€λ²(Mouseover)λ μ΄λ»κ² μλ?¬λ μ΄μν κΉ?
  - [νμ€ν λΌμ΄λΈλ¬λ¦¬ - Firing Events](https://testing-library.com/docs/dom-testing-library/api-events/) νμ΄μ§λ₯Ό μ΄ν΄λ³΄λ©΄ fireEventλ μ’μ§λ§ userEventκ° λ μ’λ€κ³  λμμλ€.
  - μΌλ°μ μΌλ‘ fireEventμ λΉν΄ useEventκ° μ¬μ©μ μ΄λ²€νΈλ₯Ό λμ± μμ νκ³  νμ€μ μΈ λ°©μμΌλ‘ μλ?¬λ μ΄μ νλ€.
  - [νμ€ν λΌμ΄λΈλ¬λ¦¬ - userEvent Github](https://github.com/testing-library/user-event)
  - [νμ€ν λΌμ΄λΈλ¬λ¦¬ - useEvent API](https://testing-library.com/docs/ecosystem-user-event)

```
Most projects have a few use cases for fireEvent, but the majority of the time you should probably use @testing-library/user-event.
```

- [νμ€ν λΌμ΄λΈλ¬λ¦¬ - useEvent API](https://testing-library.com/docs/ecosystem-user-event)μ λ€μ΄κ°λ³΄λ©΄ API μ’λ₯κ° λμ€λλ° click, dbClick, type, upload, clear, hover, unhover λ±μ΄ μ‘΄μ¬νλ€.
- useEventλ₯Ό νλ‘μ νΈμ μ μ©νλ €λ©΄ ν¨ν€μ§ μ€μΉκ° νμνλ€.

```
npm install --save-dev @testing-library/user-event @testing-library/dom
yarn add -D @testing-library/user-event @testing-library/dom
```

- μ€μΉ νμλ userEventλ₯Ό importνκ³  κΈ°μ‘΄μ fireEventλ₯Ό `userEvent`λ‘ κ΅μ²΄νλ€.
- μ°Έκ³ λ‘, useEventμ clickμ `μ€μ  μ¬μ©μλ€μ μνΈμμ© λ°©μμ λμ± κ·Όμ νλ€.` μλ₯Ό λ€μ΄ λΌλ²¨μ ν΄λ¦­νκ² λλ©΄ μ€μ λ‘ μ²΄ν¬λ°μ€λ₯Ό ν΄λ¦­νκ² λκ³ , κ·Έ μμμ μ€μ λ‘ ν¬μ»€μ€ λλ€.
- μλμ½λλ fireEvent.clickλ₯Ό userEvent.clickμΌλ‘ κ΅μ²΄ν λ΄μ©μ΄λ€.

```js
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("μ²΄ν¬λ°μ€κ° μ²΄ν¬λλ©΄ λ²νΌμ λΉνμ±νλκ³ , μ²΄ν¬λ₯Ό ν΄μ νλ©΄ λ²νΌμ νμ±νλλ€.", async () => {
  render(<SummaryForm />);

  const confirmButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  const checkBox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });

  await userEvent.click(checkBox);
  expect(confirmButton).toBeEnabled();

  await userEvent.click(checkBox);
  expect(confirmButton).toBeDisabled();
});
```

- μ°Έκ³ λ‘ μμ μ½λλ₯Ό λ³΄λ©΄ awaitμ΄ λΆμ΄μλλ° μ΄λ clickνκ³  disabledμ μνκ° λ°λλ μμμ΄ `λΉλκΈ°μ μΌλ‘ μ§ννκΈ° λλ¬Έμ΄λ€.` μ€μ λ‘ useStateλ λΉλκΈ°λ‘ μλνλ€.
- **_ ν΄λΉ μ½λλ μλμμ `waitFor`λ‘ μμ λλ€!! κ·Έλ λ€μ μ°Έκ³ νμ _**

<br />

### Popover test - μκ΅¬μ¬ν­

- λ³Έκ²©μ μΌλ‘ `Popover νμ€νΈ`λ₯Ό μ§νν΄λ³΄μ.
- μκ΅¬μ¬ν­μ λ€μκ³Ό κ°λ€
  - Popoverλ μ²μμλ μ¨κ²¨μ Έμλ€.
  - μ²΄ν¬λ°μ€ λΌλ²¨λ‘ μ»€μκ° μ¬λΌκ°λ©΄(mouseover) Popoverκ° λνλλ€.
  - μ»€μλ₯Ό λ°μΌλ‘ λΉΌλ©΄ Popoverλ λ€μ μ¬λΌμ§λ€.

<br />

- `λ¬΄μΈκ° νμλμ§ μμ`μ νμΈνκΈ°μν΄μλ μ΄λ€ κ²μ μ¬μ©ν΄μΌλ κΉ? μ§κΈκΉμ§λ getByμΏΌλ¦¬ κ·Έμ€μμλ `getByRole`μ ν΅ν΄μ μμλ₯Ό κ°μ Έμλ€. νμ§λ§ getByRole λ§κ³ λ μ¬μ© κ°λ₯ν λ§μ μΏΌλ¦¬λ€μ΄ μ‘΄μ¬νλ©°, λ¬΄μΈκ° νμλμ§ μμμ νμΈνκΈ° μν΄μλ getBy μΏΌλ¦¬λ₯Ό μ¬μ©ν  μκ° μλ€.

<br />

### screen Query Methods

- Popover νμ€νΈλ₯Ό μ§ννκΈ°μ μ screen Query Methodsλ€μ μ’ λ μμλ³΄λλ‘ νμ.
- screen μΏΌλ¦¬λ κΈ°λ³Έμ μΌλ‘ λ€μκ³Ό κ°μ ν¬λ§·μ κ°μ§λ€.

```
command[All]ByQueryType
```

![αα³αα³αα΅α«αα£αΊ 2022-07-24 αα©αα₯α« 1 24 59](https://user-images.githubusercontent.com/64779472/180613880-835f6266-0348-4ab3-9e14-3870dc5526c0.png)

- commandμ ν΄λΉνλ λΆλΆμ λ€μκ³Ό κ°λ€.
  - get: μμκ° DOM λ΄μ μμ κ²μ expectνλ€.
  - query: μμκ° DOM λ΄μ μμ§ μμ κ²μ expectνλ€.
  - find: μμκ° `λΉλκΈ°`μ μΌλ‘ λνλ  κ²½μ°λ₯Ό expectνλ€.
- [All]μ ν¬ν¨μ μν€κ±°λ ν¬ν¨μ μν€μ§ μλ λΆλΆμΈλ° λ€μκ³Ό κ°λ€.
  - (exclude): νλμ matchλ§μ expectνλ€. ex) `getByRole`
  - (include): νλ μ΄μμ matchλ₯Ό expectνλ€. (`λ°°μ΄`λ‘ λ°ν) ex) `getAllByText`
- QueryType: λ¬΄μμΌλ‘ κ²μμ νλμ§λ₯Ό μλ―Ένλλ°, λ€μκ³Ό κ°λ€.
  - Role(most preferred): μ½λμ μ κ·Όμ±μ λ³΄μ₯νκΈ°μν΄ κ°μ₯ μ νΈλλ€.
  - AltText(images): μ΄λ―Έμ§λ₯Ό μ°ΎκΈ° μν΄ μ¬μ©νλ€.
  - Text(display elements): νΉμ  μ­ν μ΄ μκ³  λΉμνΈμμ©μ μΈ λμ€νλ μ΄ μμμ μ¬μ©νλ€.
  - TestId: μ΅νμ μ ν, data-testid μμ±μ μ°Ύλλ€.
  - Form elements: Form μμλ₯Ό μ°Ύλ λ°μλ λ€μν μμ±μ μ¬μ©μ΄ κ°λ₯νλ€.
    - placeholderText
    - LabelText
    - DisplatValue
- μμ λ΄μ©λ€μ νΌν©ν΄μ κ°μ₯ μ μ ν λ°©λ²μΌλ‘ DOMμμ μ°Ύκ³ μνλ μμλ₯Ό μ°ΎμλΌ μ μλ€.

```
getByRole
getAllByText
QueryAllByLabelText
```

- screen query methods κ΄λ ¨ν λ¬Έμλ μλ 2κ° μ¬μ΄νΈλ₯Ό μ°Έκ³ νλ€.
  - [RTL - About Query](https://testing-library.com/docs/queries/about/) ν΄λΉ μ¬μ΄νΈλ₯Ό ν΅ν΄ μμΈνκ² λ΄μ©μ νμΈν  μ μλ€.
  - [RTL - cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet/) ν΄λΉ μ¬μ΄νΈλ₯Ό ν΅ν΄ κ°λ΅νκ² λ΄μ©μ νμΈν  μ μλ€.

<br />

### [μ΄λ€ μΏΌλ¦¬λ₯Ό μ¬μ©ν΄μΌ ν κΉ?](https://testing-library.com/docs/queries/about/#priority)

- `Queries Accessible to Everyone`: λͺ¨λκ° μ‘μΈμ€ ν  μ μλ μΏΌλ¦¬λ₯Ό μ¬μ©νλκ² μ’λ€. νλ©΄μ μ³λ€λ³΄κ³  μλ μ¬λμ΄λ , μ€ν¬λ¦° λ¦¬λ λ±μ λ³΄μ‘° κΈ°μ μ μ¬μ©νκ³  μλ μ¬λμκ²κ±΄ λ§μ΄λ€.

  - getByRole: `μ κ·Όμ± νΈλ¦¬`μ λΈμΆλ λͺ¨λ  μμλ₯Ό κ°μ Έμ€λλ° μ¬μ©ν  μ μλ€. μ΅μμ μ¬μ©ν΄μ μ‘μΈμ€ κ°λ₯ν μ΄λ¦(name)μΌλ‘ λ°νλ μμλ₯Ό νν°λ§ ν  μ μλ€. `κ°μ₯ μ νΈλλ μΏΌλ¦¬μ΄λ€.`

  ```html
  <button>Button</button>
  ```

  ```js
  import { render, screen } from "@testing-library/react";

  render(<MyComponent />);
  const button = screen.getByRole("button", {
    name: "Button",
  });
  ```

  <br />

  - getByLabelText: Form νλμ μ λ§ μ’μ μΏΌλ¦¬μ΄λ€. μΉ μ¬μ΄νΈμ Formμ νμν  λ label textλ₯Ό μ¬μ©ν΄μ μμλ₯Ό μ°Ύλλ€.

  ```html
  <label for="username-input">Username</label><input id="username-input" />
  ```

  ```js
  import { render, screen } from "@testing-library/react";

  render(<MyComponent />);
  const inputNode = screen.getByLabelText("Username");
  ```

  <br />

  - getByPlaceholderText

  ```html
  <input placeholder="Username" />
  ```

  ```js
  import { render, screen } from "@testing-library/react";

  render(<MyComponent />);
  const inputNode = screen.getByPlaceholderText("Username");
  ```

    <br />

  - getByText: `Form μΈλΆ`μμ `νμ€νΈ`λ₯Ό ν΅ν΄ μμλ₯Ό μ°Ύμ λ μ’μ λ°©λ²μ΄λ€.

  ```html
  <a href="/about">About βΉοΈ</a>
  ```

  ```js
  import { render, screen } from "@testing-library/react";

  render(<MyComponent />);
  const aboutAnchorNode = screen.getByText(/about/i);
  ```

    <br />

  - getByDisplayValue: Form μμ(input, textarea, select λ±)μ `νμ¬ κ°`μ κ°λ μμλ₯Ό μ°Ύμ λ μ’μ λ°©λ²μ΄λ€.

  ```js
  document.getElementById("lastName").value = "Norris";
  ```

  ```js
  import { render, screen } from "@testing-library/react";

  render(<MyComponent />);
  const lastNameInput = screen.getByDisplayValue("Norris");
  ```

    <br />

- `Semantic Queries`: λ€μ μΏΌλ¦¬λ€μ λ€μ μ νΈλμ§ μλλ° μ΄λ€μ λΈλΌμ°μ μ λ³΄μ‘° κΈ°μ  μ¬μ΄μ `μΌκ΄μ±μ΄ λ€μ λ¨μ΄μ§κΈ° λλ¬Έ`μ΄λ€. νμ€νΈλ μ¬μ©μλ€μ΄ μννΈμ¨μ΄λ₯Ό μ¬μ©νλ λ°©μμ λͺ¨λ°©ν΄μΌ νλ€λ μ μ μμ§λ§μ. κ·Έλ¦¬κ³  μ΄λ¬ν μμ±λ€μ΄ νμλλ λ°©μμ΄ μΌκ΄λμ§ λͺ»νλ€λ©΄ μ¬μ©μλ€μ΄ μννΈμ¨μ΄μ μνΈμμ© νλ κ²κ³Ό λμΌν λ°©μμΌλ‘ νμ€νΈκ° μ§νλκ³  μλμ§λ₯Ό μ μ μμ κ²μ΄λ€.

  - getByAltText: μμκ° `alt`λ₯Ό μ§μνλ μμ(img, area, input)μΈ κ²½μ° μ΄λ₯Ό μ¬μ©ν΄μ ν΄λΉ μμλ₯Ό μ°Ύμ μ μλ€.

  ```html
  <img alt="Incredibles 2 Poster" src="/incredibles-2.png" />
  ```

  ```js
  import { render, screen } from "@testing-library/react";

  render(<MyComponent />);
  const incrediblesPosterImg = screen.getByAltText(/incredibles.*? poster/i);
  ```

  <br />

  - getByTitle: titleμ μ€ν¬λ¦° λ¦¬λμ μΌκ΄λμ§ μμΌλ©°, μλ ₯μ΄ μλ μ¬μ©μμκ²λ κΈ°λ³Έμ μΌλ‘ νμλμ§ μλλ€.

  ```html
  <span title="Delete" id="2"></span>
  ```

  ```js
  import { render, screen } from "@testing-library/react";

  render(<MyComponent />);
  const deleteElement = screen.getByTitle("Delete");
  ```

<br />

- `Test IDs`: `μ΅νμ μλ¨`μ΄λ€. μ¬μ©μλ€μ΄ test idμ μνΈμμ©ν  μΌμ μ λ μκΈ° λλ¬Έμ΄λ€.

  - getByTestId: μ¬μ©μκ° λ³΄κ±°λ λ€μ μ μμΌλ―λ‘ roleμ΄λ textλ‘ μΌμΉμν¬ μ μκ±°λ μλ―Έκ° μλ κ²½μ°(μ: νμ€νΈκ° λμ μ)μλ§ κΆμ₯

  ```html
  <div data-testid="custom-element" />
  ```

  ```js
  import { render, screen } from "@testing-library/react";

  render(<MyComponent />);
  const element = screen.getByTestId("custom-element");
  ```

<br />

### Popover Test

- μμμ query optionsλ€μλν΄μ μμλ΄€μΌλ μ€μ λ‘ νμ€νΈ μ½λλ₯Ό μμ±ν΄λ³΄μ.
- μ²« λ²μ§Έ νμ€νΈλ, Popoverκ° νλ©΄ μμμ μ¨κ²¨μ§λκ² μλλΌ νμ΄μ§μ μμ μ‘΄μ¬νμ§ μμμΌ νλ€.
  - μ΄λ, matchκ° μμ΄μΌνκΈ° λλ¬Έμ `queryBy`κ° μ μ νλ€. queryλ getκ³Ό λ€λ₯΄κ² matchκ° μμ κ²½μ° μ€λ₯λ₯Ό λ°μμν€μ§ μκ³  `nullμ λ°ν`νλ€. λ°λλ‘ getμ μ€λ₯λ₯Ό λ°μμν¨λ€.
  - ν΄λΉ νμ€λ²λ queryByν  μ μλ μ­ν μ κ°μ§κ³  μμ§ μλ€. κ·Έμ  λμ€νλ μ΄μΌ λΏμ΄λ `queryByText`λ₯Ό μ΄μ©νλ€.
  - κ·Έλ¦¬κ³  μμκ° λ¬Έμμ μ‘΄μ¬νλμ§λ₯Ό νμ€νΈν΄μ£Όλ `toBeInTheDocument`λ₯Ό μ΄μ©ν΄μ νμ€νΈνλ€.

```js
// SummaryForm.test.js
test("Popoverκ° hoverμ λ°μνλ€.", () => {
  render(<SummaryForm />);

  // 1. Popoverλ μ²μμλ μ¨κ²¨μ Έμλ€.(μμ μ‘΄μ¬νλ©΄ μλλ€)
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();
});
```

- λ λ²μ§Έ νμ€νΈλ, mouseoverλ₯Ό μλ?¬λ μ΄μνλ€. `teramsAndCondtions`μ mouseoverνλ©΄ Popoverκ° λνλκ³ , mouseoutνλ©΄ Popoverλ μ¬λΌμ§λ€.
  - userEventμμ mouseoverλ₯Ό ν  λλ `hover`λ₯Ό μ¬μ©νκ³  mouseoutμλ `unhover`λ₯Ό μ¬μ©νλ€.

```js
// SummaryForm.test.js
test("Popoverκ° hoverμ λ°μνλ€.", () => {
  // ...
  // 2. μ²΄ν¬λ°μ€ λΌλ²¨λ‘ μ»€μκ° μ¬λΌκ°λ©΄(mouseover) Popoverκ° λνλλ€.
  const termsAndConditions = screen.getByText(/terms and conditions/i);

  userEvent.hover(termsAndConditions); // hover λ°μ

  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();
  // μ»€μλ₯Ό λ°μΌλ‘ λΉΌλ©΄ Popoverλ λ€μ μ¬λΌμ§λ€.
});
```

- μ μ½λμμ `expect(popover).toBeInTheDocument();`λ μ¬μ€ μμ΄λλλ μ½λμ΄λ€ μλνλ©΄ getByλ matchλλ κ²μ μ°Ύμ§ λͺ»νλ©΄ μλ¬λ₯Ό λ°μμν€κΈ° λλ¬Έμ΄λ€. νμ§λ§ νμ€νΈμ κ°λμ±μ μν΄μλ μΆκ°ν΄μ£Όλκ² μ’λ€.

<br />

- λ§μ§λ§ νμ€νΈλ, μ²« λ²μ§Έ νμ€νΈμ μ μ¬νλ° mouseoutμ μλ?¬λ μ΄μ νλ κ²μ΄λ€.

```js
// SummaryForm.test.js
test("Popoverκ° hoverμ λ°μνλ€.", () => {
  // ...
  // 3. μ»€μλ₯Ό λ°μΌλ‘ λΉΌλ©΄ Popoverλ λ€μ μ¬λΌμ§λ€.
  userEvent.unhover(termsAndConditions);

  const nullPopoverAgain = screen.queryByText(
    /no ice cream will actually be delivered/i
  );

  expect(nullPopoverAgain).not.toBeInTheDocument();
});
```

- μ¬κΈ°κΉμ§ μμ±νκ³  νμ€νΈλ₯Ό νμΈν΄λ³΄λ©΄ λΉμ°ν μ€ν¨νλ€. λ°λΌμ νμ€νΈλ₯Ό ν΅κ³Όν  μ μκ² SummaryForm.jsλ μμ ν΄μ€λ€.

```jsx
// SummaryForm.js
// imports
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

const SummaryForm = () => {
  const [tcChecked, setTcChecked] = useState(false);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree to{" "}
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: "blue" }}>Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  return <Form>{/* ... */}</Form>;
};

export default SummaryForm;
```

- μμ κ°μ΄ SummaryForm.jsμ μμ μ νμμλ, test μ½λμ μλ λΆλΆμμ λ¬Έμ κ° λ°μνλ€. λ¬Έμ μ λ΄μ©μ λ§μ°μ€μμμ νμ λ νμ€λ²κ° μ¬λΌμ§μ§ μλ λ€λ κ²μ΄λ€.
- μ΄λ° μ€λ₯κ° λ°μνλ μ΄μ λ νμ€λ²κ° μ¬λΌμ§λ λμμ΄ `λΉλκΈ°μ `μΌλ‘ μΌμ΄λκ³  μμκΈ° λλ¬Έμ΄λ€. μ¦, νμ€νΈ ν¨μκ° μλ£λκ³  λμμΌ λμμ΄ μΌμ΄λ κ²μ΄λ€. νμ€νΈκ° μ’λ£λ νμ λ¬΄μΈκ°κ° μΌμ΄λκ³  μκΈ° λλ¬Έμ μλ¬κ° λ°μν κ²μ΄λ€.

```js
userEvent.unhover(termsAndConditions);

const nullPopoverAgain = screen.queryByText(
  /no ice cream will actually be delivered/i
);

expect(nullPopoverAgain).not.toBeInTheDocument();
```

- μ΄λ° λ¬Έμ λ₯Ό ν΄κ²°νκΈ° μν΄μ `λ¨μΈμ λΉλκΈ°ν`ν¨μΌλ‘μ¨ ν΄κ²°ν  μ μλ€.
  - [RTL - Async Methods](https://testing-library.com/docs/dom-testing-library/api-async)
- μλ μ½λμμλ `waitForElementToBeRemoved`λ₯Ό μ¬μ©νλ€. waitForElementToBeRemovedλ DOMμμ μμκ° μ κ±°λκΈ°λ₯Ό κΈ°λ€λ¦¬λ ν¨μμ΄λ€.

```js
test("Popoverκ° hoverμ λ°μνλ€.", async () => {
  expect(popover).toBeInTheDocument();

  // μ»€μλ₯Ό λ°μΌλ‘ λΉΌλ©΄ Popoverλ λ€μ μ¬λΌμ§λ€.
  userEvent.unhover(termsAndConditions);

  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});
```

- waitForElementToBeRemoved μΈμλ λ λμ λ²μ£Όλ‘ μ¬μ©νλ `waitFor`λ μ‘΄μ¬νλλ°, μΌμ  κΈ°κ°λμ κΈ°λ€λ €μΌ ν  λ μ¬μ©νλ€.
- waitForλ μ½λ°± ν¨μμμ Promiseλ₯Ό λ°ννλ©΄ ν΄λΉ Promiseκ° κ±°λΆλ  λκΉμ§ μ½λ°±μ λ€μ νΈμΆνμ§ μλλ€. μ΄λ₯Ό ν΅ν΄ λΉλκΈ°μ μΌλ‘ νμΈν΄μΌ νλ ν­λͺ©μ κΈ°λ€λ¦΄ μ μλ€.

```js
// SummaryForm.js
test("μ²΄ν¬λ°μ€κ° μ²΄ν¬λλ©΄ λ²νΌμ λΉνμ±νλκ³ , μ²΄ν¬λ₯Ό ν΄μ νλ©΄ λ²νΌμ νμ±νλλ€.", async () => {
  render(<SummaryForm />);

  const confirmButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  const checkBox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });

  userEvent.click(checkBox);
  await waitFor(() => expect(confirmButton).toBeEnabled());

  userEvent.click(checkBox);
  await waitFor(() => expect(confirmButton).toBeDisabled());
});
```

<br />
