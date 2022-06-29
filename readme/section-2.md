# 💻 Section 2 - color button

## 🧑‍💻 Color Button - 첫 레드/그린 테스트

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
