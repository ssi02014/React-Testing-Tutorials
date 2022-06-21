# 💻 Section 1 - 소개

## 🧑‍💻 App.test.js 분석

```js
// App.js
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
```

```js
// App.test.js
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

- 테스트 함수에서 첫 번째로 render 메서드를 실행한다. render 메서드는 인수로 제공하는 JSX에 관한 가상 DOM을 생성한다. 여기서 JSX에 관한 인수는 app 컴포넌트이다.
- 랜더링된 가상 DOM에는 screen global object로 액세스 한다.
- render 메서드, screen 객체 모두 `@testing-library/react` 에서 가져온다.
- 그 다음 screen.getByText라는 메서드를 실행하고 표시되는 모든 텍스트를 기반으로 DOM에서 요소를 찾는다.
- 현재 getByText 메서드의 인수는 정규 표현식이다. 정규표현식을 따로 다루지는 않게지만 위 예제에서는 `learn react`라는 문자열이고 대소문자를 구분하지 않는 것을 의미한다.
- 마지막으로 단언이다. 단언(Assertion)은 테스트 성공과 실패의 원인이다.

<br />

```js
// ...

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText("react testing library");
  expect(linkElement).toBeInTheDocument();
});
```

- 만약 위에처럼 getByText의 인자를 `react testing library`로 바꾼다면 테스트는 실패해야 한다. 실제로 npm test를 실행해서 jest watch 모드에서 확인해보면 실패하는 것을 확인할 수 있다.

<br />
