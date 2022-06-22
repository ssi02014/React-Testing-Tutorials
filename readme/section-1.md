# 💻 Section 1 - 소개

## 🧑‍💻 기본 App.test.js 분석

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

- 테스트 함수에서 첫 번째로 `render` 메서드를 실행한다.
  - render 메서드는 인수로 제공하는 `JSX에 관한 가상 DOM을 생성`한다. 여기서 JSX에 관한 인수는 App 컴포넌트이다.
- 랜더링된 가상 DOM에는 `screen global object`로 액세스 한다.
- render 메서드, screen 객체 모두 `@testing-library/react` 에서 가져온다.
- 그 다음 `screen.getByText`라는 메서드를 실행하고 표시되는 모든 텍스트를 기반으로 DOM에서 요소를 찾는다.
- 현재 getByText 메서드의 인수는 `정규 표현식`이다. 정규표현식을 따로 다루지는 않지만 위 예제에서는 `learn react`라는 문자열이고 대소문자를 구분하지 않는 것을 의미한다. 따라서 그냥 문자열로 넣어도 상관은 없다.
- 마지막으로 `expect` 메서드가 사용된 부분은 단언이다. `단언(Assertion)`은 테스트 성공과 실패의 원인이다. 복잡하면서 굉장히 중요하다. 이는 밑에서 다시 알아보도록 하자.

<br />

```js
// ...

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText("react testing library");
  expect(linkElement).toBeInTheDocument();
});
```

- 만약 위에처럼 getByText의 인자를 `react testing library`로 바꾼다면 테스트는 실패해야 한다. 실제로 `npm test`를 실행해서 `jest watch 모드`에서 확인해보면 실패하는 것을 확인할 수 있다.

<br />

## 🧑‍💻 Jest 단언(assert)

- `단언(assert)`는 테스트의 통과 여부를 결정한다. 따라서 테스트 함수의 핵심 부분이다.

```js
expect(linkElement).toBeInTheDocument();
```

- Jest에서 전역 메서드인 `expect()` 메서드로 시작한다. 그리고 인수가 있는데 인수는 단언이 단언하는 것으로 예측에 들어맞는지 확인하기 위해 Jest에서 확인하는 것이다.
- `toBeInTheDocument()`는 Jest DOM에서 온 일종의 `매처(matcher)`인데 이것이 단언의 유형이다.
- matcher에는 종종 인수가 있는데 toBeInTheDocument는 인수를 가지지 않는다. toBeInTheDocument는 요소가 문서에 있거나 없는 거를 의미한다.
  - 가끔 요소를 개수와 같은 것과도 비교하는데 이때 인수를 확인할 수 있다. ex) `toHaveLength(7)`

<br />

### 비슷한 패턴의 단언 예제

```js
expect(element.textContent).toBe("hello");
```

- 시작은 언제나 expect로 시작한다. 대상은 `element.textContent`이다. 여기서 요소는 이전 줄에서 정의했다고 가정하고, `screen` 메서드 중 하나로 페이지에서 요소를 찾을 것이다.
- matcher는 간단하게 `toBe()`를 사용했다.
- 위 테스트 코드의 의미는 `텍스트 콘텐츠 요소(textContent)`를 `hello`로 예상하는 것이다.

<br />

```js
expect(elementsArray).toHaveLength(7);
```

- `elementsArray`는 이전 줄에서 정의했다고 가정하고, `toHaveLength`라는 matcher가 있다. toHaveLength는 인수가 `7`이다.
- 위 테스크 코드의 의미는 `배열 요소의 길이를 7로 예상`하는 것이다.

<br />

## 🧑‍💻 jest-dom

<img width="120" alt="스크린샷 2022-06-22 오후 3 07 23" src="https://user-images.githubusercontent.com/64779472/174955532-1ec61d0c-b5d4-4965-9505-7469a4948037.png">

- `jest-dom`은 CRA와 함께 설치된다.
- `setupTests.js` 파일을 사용해 각 테스트 전에 `jest-dom`을 가져온다. 즉, 그렇기에 모든 테스트에서 `jest-dom matcher`를 사용할 수 있는 것이다.
- 위 단언 예제에서 살펴본 matcher인 `toBe`와 `toHaveLength`는 일반적인 matcher이다. 즉, `모든 노드 코드에 적용`할 수 있다.
- 그에 반해, `toBeInTheDocument()`처럼 `DOM 기반의 matcher`는 `가상 DOM에서만 적용`할 수 있다.
- 그외에도 DOM에서 볼 수 있는 `toBeVisible()`과 체크박스 같은 `toBeChecked()` 등이 있다.

<br />

## 🧑‍💻 Jest

- 리액트 테스팅 라이브러리(RTL)는 `테스트 컴포넌트를 가상 DOM으로 렌더링`하는데 도움을 준다. (이는 `render`를 통해 알아봤다.) 또한, `가상 DOM을 검색`하는데도 도움을 준다.(이는 `getByText()` 메서드를 통해 알아봤다.) 그리고 아직은 사용하지는 않았지만 곧 `가상 DOM과 상호 작용`하는 것에도 도움이 된다.
- 하지만 `테스트 러너`가 필요하다. 테스트를 찾고 실행하며 assert(단언)할 무언가가 필요하다. 이때 `Jest`를 사용한다.
- 테스트 러너에는 Jest뿐만 아니라 Mocha나 Jasmin 등도 있지만 RTL에서는 Jest를 권장하고 CRA와 함께 제공한다.
- 그래서 터미널에서 npm test를 실행했을 때 CRA에서 제공하는 npm script를 실행했고 그 스크립트가 Jest를 Watch 모드로 실행되게 한 것이다.

```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

### Jest Watch Mode

- Watch 모드는 `Jest를 실행하는 방법`으로 마지막 커밋 이후 파일의 모든 변경 사항을 확인해서 마지막 커밋 이후 변경된 파일과 연관된 테스트만 실행한다.
- `npm test`를 실행했을 때 마지막 커밋 이후 변경된 파일이 없다면 어떤 테스트도 실행되지 않는다. 단, 그래도 테스트를 실행하고 싶다면 `a` 문자를 입력하면 된다.

```
No tests found related to files changed since last commit.
Press `a` to run all tests, or run Jest with `--watchAll`.
```

- 파일이 변경되면 Jest에서 파일을 확인하다가 테스트와 관련된 변경 사항을 확인하고 테스트를 다시 실행한다.

<br />

### Jest 원리

```js
test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

- Jest는 테스트 통과나 실패는 어떻게 아는 것일까?
- `test()`라는 2개의 인수를 가질 수 있는 전역 테스트 메서드가 있다.
  - 첫 번째 인수는 `테스트의 문자열 설명`이며, Jest에서 보통 1개 이상의 테스트를 진행하는데 이때 이 인수를 사용해서 테스트를 실패했을 때 어떤 테스트에 실패했는지 알려준다. 위 예제에서는 `renders learn react link` 문자열을 의미한다.
  - 두 번째 인수는 `테스트 함수`이다. Jest는 테스트의 성공과 실패를 결정하기 위해 이 함수를 실행한다.
- 테스트는 테스트 함수를 실행할 때 `에러가 발생`하면 실패하게 된다. 그리고 단언(assert)는 `테스트 결과 예상이 틀렸을 때 에러가 발생시키고 테스트를 실패`하도록 한다.
- 테스트 함수에 에러가 없으면 테스트에 통과한다. 그렇기 때문에 `빈 테스트도 테스트는 통과`돼야 한다.

```js
// 테스트 통과
test("renders learn react link", () => {});

// 테스트 실패
test("renders learn react link", () => {
  throw new Error("test failed");
});
```

<br />

## 🧑‍💻 TDD(Test-Driven Development)

- TDD는 `코드 작성 전에 테스트 코드를 작성`하고 `테스트에 통과하도록 코드를 작성하는 것`이다. 이를 흔히 `레드-그린 테스트`라고 한다.
- 레드-그린 테스트는 코드 작성 전에 테스트에 실패하는 레드 테스트를 먼저 실행하고, 코드 작성 후에는 통과하는 테스트로 그린 테스트를 확인하는 것이다.
  - 보통 테스트 코드를 작성하기 전에 약간의 코드를 작성해서 테스트에 오류가 발생하지 않도록 한다. 예를 들어 함수를 작성하거나 React 컴포넌트를 작성하는데 단, `아무것도 하지 않는 빈 함수 또는 컴포넌트를 작성한다.`
  - 그리고 테스트 코드를 작성하면 기존에 작성했던 함수 또는 컴포넌트는 아무것도 하지 않기 때문에 테스트에 실패할 것이다.
  - 그 후에 실제 코드를 작성하고 테스트에 통과한다.

### 왜 TDD??

- TDD를 사용하는 이유는 테스트 코드를 작성하는 것이 `프로세스의 한 부분으로 느끼는 방식에 차이`가 있기 때문이다. 어떤 말이냐 테스트가 단지 마지막에 해야하는 따분한 일이 아니라 `코딩 프로세스의 일부`라고 느끼는 것이다. 그래서 코드 완료 후에도 번거로운 일처럼 느껴지지 않는다.
- 또한, `효율적`이기도 하다. 애플리케이션을 실행해서 원하는대로 작동하지는 확인하면서 소프트웨어를 업데이트 할 텐데 이는 `수동 테스트`이다. 하지만 코드 작성 전에 테스트 코드를 작성하면 변경 후에 자동으로 다시 실행할 수 있다. 그래서 개발하면서 모든 테스트 코드를 작성해 두면 변경 사항이 생길 때마다 모든 테스트를 다시 실행해서 `자동 회귀 테스트`를 할 수 있다. 변경 사항 확인을 위해 애플리케이션을 열고 수동으로 테스트할 필요가 없다.

<br />

## 🧑‍💻 React Testing Library(RTL)의 철학
