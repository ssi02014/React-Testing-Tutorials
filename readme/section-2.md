# 💻 Section 2 - Color button

## 🧑‍💻 Color Button(1) - 첫 레드/그린 테스트

- TDD를 적용하기 전에 우선 App.js 파일의 기존 코드를 지우고 Div 태그 하나만 반환하게끔 수정한다.
- 그리고 App.test.js에서 테스트하기 위해 테스트 코드를 작성할 준비를 한다. 우선 오류가 발생하지 않도록 빈 테스트 함수로 셋팅한다.

```js
// App.js
import "./App.css";

function App() {
  return <div></div>;
}

export default App;
```

<br />

```js
// App.test.js
import { render, screen } from "@testing-library/react";
import App from "./App";

test("button has correct initial color", () => {});

test("button turns blue when clicked", () => {});
```

- 이제 테스트 진행을 위해서 테스트 방식을 작성해야 한다.
- 첫 번째로 작성해야 되는 것은 `render()`이다. 이 경우에는 렌더링해야 하는게 `App 컴포넌트`로 명확하다.
- 두 번째는 `원하는 요소를 찾아야 한다.` 이를 위해서는 렌더링으로 생성된 가상DOM에 액세스 가능한 전역 객체인 `screen`을 사용해야 한다. 그리고 요소는 `역할`로 찾는다. 요소를 역할로 찾는 것은 애플리케이션에 액세스 여부 확인에 많이 사용하는 방식이다.
  - 만약, 어떤 옵션이 있었는지 확인하고 싶으면 다음 W3C 사이트를 확인해보자. [(역할의 정의)](https://www.w3.org/TR/wai-aria/#role_definitions)
  - `screen.getByRole()` 메서드를 사용해서 `역할`로 요소를 찾을 수 있다. 첫 번째 인수는 `역할을 나타내는 문자열`이며 두 번째 인수는 `옵션`이다.
  - 아래 예제에서는 두 번째 옵션으로 `name`을 사용하는데 name에는 예상되는 초기 텍스트를 입력한다.
- 추가적으로 button color 에대한 테스트 코드도 작성해야되는데, 이를 위해서 `jest-dom`에 어떤 옵션이 있는지 확인해보자.
  - [(jset-dom)](https://github.com/testing-library/jest-dom) 해당 사이트에서 `사용자 정의 매처(Matcher)`를 확인할 수 있다.
  - 아래 예제에서는 `toHaveStyle()`을 이용해서 버튼의 배경색이 빨간색인지 확인하고 있다.
  - 참고로 모든 `단언`이 그렇듯이 `expect()`를 사용해야 한다.

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

- 이 상태로 콘솔로 `yarn test`를 통해서 테스트를 실행하면 결과는 실패가 뜨고 아래와 같은 실패 메시지가 나온다.
- 해석해보면 button 역할과 Change to blue 라는 name에 액세스 가능한 요소를 찾을 수 없다는 내용이다.

```
  TestingLibraryElementError: Unable to find an accessible element with the role "button" and name "Change to blue"
```

- 여기까지 `레드-그린 테스트` 방식의 레드 테스트를 마친 것이다. 그렇다면 이제 App.js에서 실패한 테스트를 해결해보도록 하자.
- 아래 예제와 같이 App.js를 수정 하고 다시 테스트를 실행해보면 이제는 제대로 테스트가 통과하는 것을 확인할 수 있다.

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

## 🧑‍💻 Color Button(2) - 기능(functional) 테스트(with. 클릭 이벤트)

### 없는 역할로 테스트하는 경우

- 만약 아래처럼 역할로 존재하지 않는 역할을 넣으면 해당 역할로 액세스 가능한 요소를 찾을 수 없다는 경고와 함께 테스트가 실패한다.

```js
//App.test.js
test("button has correct initial color", () => {
  render(<App />);
  const colorButton = screen.getByRole("but", { name: "Change to blue" }); // (*)
  expect(colorButton).toHaveStyle({ backgroundColor: "red" });
});
```

<br />

```
TestingLibraryElementError: Unable to find an accessible element with the role "butt" and name "Change to blue"
```

- 하지만 RTL은 아래와 같이 친절하게 `존재하는 역할이 무엇이 있는지 알려준다.` 그렇기에 존재하지 않는 역할을 넣는다면 테스팅 라이브러리의 출력 값은 오류를 찾는데 굉장히 유용하다.

```
Here are the accessible roles:

button:
Name "Change to blue":

<button
  style="background-color: red;"
/>
```

<br />

### 버튼 클릭 이벤트 테스트

- 다음 테스트로 `DOM`과 `직접 상호작용`하는 테스트 코드를 작성해보자. 테스트 내용은 버튼이 파랑으로 바뀌는지 테스트하는 것이다.
- 첫 번째로 평소처럼 `render()`를 이용해서 App 컴포넌트를 렌더링하는 것이다.
- 두 번째로 `클릭하고 싶은 요소`를 찾아야 한다. 첫 번째 테스트("button has correct initial color") 때와 마찬가지로 `getByRole()`을 통해 찾는다.
  - 여기서 여담으로 현재 App 컴포넌트에는 사실 버튼 엘리먼트가 하나이다. 따라서 getByRole의 두 번째 파라미터인 옵션의 `name`은 사실 없어도 되는 옵션이다. 하지만 name을 붙여 주는 편이 좋은 습관이고, 연습에도 도움이 된다.

```js
//App.test.js
// ...

test("button turns blue when clicked", () => {
  render(<App />); // (1)
  const colorButton = screen.getByRole("but", { name: "Change to blue" }); // (2)
});
```

- 여기까지 진행했을 때 의문점은 첫 번째 테스트("button has correct initial color")때와 같은 코드 두 줄이 반복된다는 것이다. 꼭 분리된 테스트가 좋은걸까?
  - `유닛(Unit)테스트`의 경우 좀 더 엄격히 분리된 테스팅을 할 때는 테스트 하나에 하나의 단언만 나오는 것을 선호한다.
  - `기능(Functional)테스트`를 하는 경우 지금은 아니지만 나중에는 여러 작업에 관해 테스트를 진행하는데 예로, 버튼을 클릭하고 나서 체크 박스를 클릭 하는 등의 `여러 작업이 하나의 테스트에서 수행된다.` 그러니 기능 테스트에서는 하나의 테스트 안에 단언(assert)을 여러 개 쓰는데에 좀 더 자유롭다.

<br />

- 우리는 `기능 테스트를 기반`으로 테스트 코드를 작성할 것이기 때문에 아래 코드처럼 첫 번째 테스트에 단언을 여러 개 입력해보자.
- 첫 번째로, 테스트 코드에서 버튼에게 클릭이벤트를 발생시키기 위해서는 우선 `@testing-library/react`의 `fireEvent` 이용해야 한다.
  - fireEvent는 `가상 DOM에서 요소들과의 상호작용을 도와주는 역할`을 한다.
- 두 번째는, fireEvent는 `click() 메서드`가 존재하고 해당 메서드는 `Element`를 인자로 받는다. fireEvent의 click 메서드를 호출 함으로써 테스트에서 클릭 이벤트를 발생시키는 것이다.
- 세 번째로, 버튼을 클릭되면 어떻게 되는지를 추가적으로 단언(assert)을 작성한다.
- 네 번째로, 우리는 버튼을 클릭하면 텍스트도 변경되야하기 때문에 이 역시 추가적인 단언(assert)을 작성한다.
  - 이떄 `textContent 프로퍼티`와 `toBe()`를 이용할 수 있다.

```js
import { render, screen, fireEvent } from "@testing-library/react"; // (1)

test("button has correct initial color", () => {
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

- 여기까지 작성하고 테스트를 실행해보면 당연히 테스트는 실패한다. 아직 실제 App 컴포넌트에 코드를 작성하지 않았기 때문이다. App 컴포넌트에서 코드를 추가해보자.
- 참고로 테스트를 실행했는데 에러가 발생하고 예측이 실패했을 때, 에러를 발생시킨 단언 이후의 테스트는 실행하지 않는다. 그런 이유로 테스트마다 하나의 단언을 두는게 바람직 한 것이다.
- 그럼에도 불구하고 `기능 테스트를 할 때는 하나의 단언만 사용하는 것이 실용적이지 않다.` 이유는 간단한 텍스트 콘텐츠를 테스트하기 위해 전체 설정(render, getByRole 등)을 반복해서 작성하는 것은 비효율적이기 때문이다.

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

- 위와 같이 App 컴포넌트를 수정하고 테스트를 실행해보면 이제 정상 작동하는 것을 확인할 수 있다.

<br />

## 🧑‍💻 Color Button(3) - 인수(Acceptance) 테스트
