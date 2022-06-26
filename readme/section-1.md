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

## 🧑‍💻 React Testing Library(RTL)

### RTL 사용 이유

- RTL(React Testing Library)는 `테스트를 위한 가상 DOM을 생성`하고 생성한 DOM과 상호 작용하기 위한 `유틸리티`도 제공한다. 예를 들어, DOM에서 요소를 찾거나 클릭과 같이 요소와 상호 작용할 수 있다. 또한, 브라우저 없이 테스트가 가능하다.

<br />

### 주의 사항

- RTL을 처음 접할 때면 RTL을 Jest의 대안으로 혼동하는 경우가 더러 있다.
- 두 도구는 React 내에서 테스트를 진행할 때 같이 사용되기에 상호 보완 관계라고 볼 수 있다. (엄밀히 말하자면, RTL이 Jest를 포함하는 구조)
- 전반적으로 Jest를 통해 기능 테스트를 진행할 수는 있지만, React의 컴포넌트를 렌더링하고 테스트하기 위해서는 몇가지 기능이 더 필요하다.
  - Jest - 자체적인 test runner와 test util 제공
  - RTL - Jest + React 컴포넌트 test util 제공

<br />

### 테스트 유형

- 유닛(Unit) 테스트

  - 보통 함수나 별개의 React 컴포넌트 코드의 한 `유닛 혹은 단위를 테스트`한다.
  - 유닛 테스트의 특징은 다른 코드의 유닛과 상호 작용하는 것은 테스트하지 않는다.

- 통합(Intergration) 테스트

  - 여러 유닛이 함께 동작하는 방식을 테스트해서 `유닛 간의 상호 작용`을 테스트하는 것이다. 예를 들어 컴포넌트 간의 상호 작용을 테스트 하거나 마이크로 서비스 간의 상호 작용을 테스트한다.

- 기능(functional) 테스트

  - 소프트웨어의 `특정 기능`을 테스트하는 것이다.
  - 헷갈릴 수 있는게 function은 프로그래밍 언어에서 입력값을 취하고 출력을 제공하는 소프트웨어 단위(Unit)의 함수를 의미할 수도 있고, `소프트웨어의 동작`을 의미할 수도 있는데 이 경우에는 특정 코드 함수가 아닌 소프트웨어 동작에 해당한다. 즉, 기능 테스트의 의미는 코드가 아닌 `동작`을 테스트하는 것이다.

- 인수(Acceptance) 테스트 혹은 End to End (E2E) 테스트

  - 실제 사용자 환경에서 사용자의 입장으로 테스트를 수행하는 것을 의미한다.
  - 실제 `브라우저`가 필요하고 애플리케이션이 연결된 `서버`가 필요하다. 보통 `Cypress나 Selenium`과 같은 도구가 필요하다. `이 테스트는 RTL을 위해 설계된 테스트는 아니다.`

<br />

## 🧑‍💻 유닛(Unit) 테스트 vs 기능(functional) 테스트

### 유닛 테스트

- 유닛 테스트는 테스트를 최대한 `격리`시킨다. 그래서 함수나 컴포넌트를 테스트할 때 `의존성을 표시`한다. 즉, 다른 의존성이 있거나 컴포넌트가 의존하는 다른 함수가 있으면 실제 버전 대신 테스트 버전을 사용한다.
- 문제가 발생하거나 테스트에 실패 시, 생태계의 다른 어떤 것이 아니라 테스트에 실패하게 만드는 `특정 유닛 자체가 문제`인 것이다.
- 또한, 내부 테스트도 진행하는데 내부 테스트가 필요한 이유는 격리 상태에서 컴포넌트를 테스트하면 때로는 상태의 차이점에 관해서만 테스트하게 되기 때문이다. 이유는 애플리케이션 변경 사항을 확인하는 다른 컴포넌트가 없기 때문이다.
- 그래서 격리된 유닛에서 `실패를 쉽고 정확하게` 파악할 수 있다. 테스트 코드가 한 유닛에 격리되어 있기 때문에 테스트가 실패하면 어디를 확인해야 하는지 정확하게 알 수 있다.
- 하지만, `사용자가 소프트웨어와 상호 작용하는 방식과는 거리가 멀다.` 소프트웨어와 상호작용하는 사용자가 실패할 때 테스트에 성공할 수 있고, 반대로 사용자가 소프트웨어와 상호작용하는데 문제가 없어도 테스트에는 실패할 수 있다.
- `리팩토링으로 실패할 가능성도 있다.` 리팩토링은 동작을 변경하지 않고 `소프트웨어 작성 방식을 변경`하는 것으로 보통 유닛 테스트로 소프트웨어가 어떻게 작성됐는지 테스트하는데 리팩토링으로 작성 방식을 변경하면 동작이 변경되지 않아도 테스트에 실패 할 수 있다.
- 소프트웨어가 제대로 작동하면 테스트도 통과해야하기 때문에 이는 단점이 된다.

<br />

### 기능 테스트

- 기능 테스트는 테스트하는 `특정 동작`이나 `유저 플로우와 연관된 모든 단위를 포함`한다.
- 장점은 유닛 테스트와 다르게 `사용자가 소프트웨어와 상호 작용하는 방식과 밀접`하다는 것이다. 즉, 테스트에 통과하면 사용자에게 문제가 없고 테스트에 실패하면 사용자에게 문제가 발생했을 가능성이 높다는 것을 의미한다.
- 또한, `테스트가 견고하고 신뢰도가 높다.` 코드를 리팩토링하면 동작이 유일하게 유지되는 한 테스트도 통과하게 된다.
- 하지만 단점으로 `실패한 테스트를 디버깅하기 어려운 점이 있다.` 코드와 테스트가 유닛 테스트처럼 밀접하게 연결되어 있지 않아서 어떤 부분의 코드가 테스트 실패의 원인인지 정확하게 알 수 없다.

<br />

### 그렇다면 RTL은?

- RTL은 유닛 테스트보다 `기능 테스트를 권장`한다. 즉 실제 사용자 경험과 유사한 방식의 테스트를 작성할 것을 권장하는 것이다. 예를 들어 `<div>Hello World</div>`라는 코드가 있다면, RTL은 div 태그를 사용하는지보다 `Hello World` 메시지가 브라우저에 노출이 되는지 파악하는 것을 더 중요하다고 본다.
- 위에서도 이야기 했지만 결국 기능에 초점을 맞춘 테스트 방식은 신뢰도를 높임과 동시에 코드 리팩토링 시 테스트 코드 수정 빈도를 줄일 수 있습니다.

<br />

## 🧑‍💻 테스트 라이브러리와 접근성

- RTL은 우리의 웹사이트가 어떻게 사용되는지 최대한 가깝게 테스트를 작성할 수 있도록 장려하는 메서드와 유틸리티를 제공한다.
- 테스트 할 때 실제 사용자가 쓰는 것처럼 해야 하는데 여기에 `스크린 리더`와 같은 `접근성 인터페이스`도 포함된다.
- 아래 사이트를 살펴보면 가상 DOM에서 요소를 찾을 때 어떤 쿼리를 우선순위로 사용해야 하는지 알려준다.
  - [요소 우선순위](https://testing-library.com/docs/queries/about/#priority)

<br />

### 가상 DOM 요소 찾을 때 우선순위

1. 누구나 액세스 가능한 쿼리(Queris Accessible to Everyone)

- 첫 번째 우선순위는 `누구나 액세스 가능한 쿼리(Queris Accessible to Everyone)`이다. 이는 마우스를 사용하고 있고 화면을 시각적으로 보고 있으며 보조 기술을 사용하는 사람이면 액세스 가능한 쿼리이다.

  - getByRole: element는 문서에서 `역할`을 가지는데 `button` 같은 역할이다. `페이지에서 요소의 역할을 식별`하는 것이다.
  - getByLabelText: `label의 텍스트 값`으로, label과 연결된 input 태그를 찾아준다. 그래서 input과 연결되지 않은 label의 text를 사용하면 요소를 찾지 못한다.
  - getByPlaceholderText: `placeholder 값`으로 input 또는 textarea를 찾는다.
  - getByText: 요소가 가진 `text 값`으로 요소를 찾는다.
  - getByDisplayValue: input의 form 요소(input, textarea, select)의 `현재 값`을 기준으로 요소를 찾는다.

<br />

2. 시맨틱 쿼리(Semantic)

- 두 번째는 위에 있는 query중에 어떠한 것도 사용할 수 있으면 시맨틱 쿼리를 사용한다.
  - getByAltText: 이미지의 `alt 속성의 값`으로 요소를 찾습니다.
  - getByTitle: `title 속성의 값`으로 요소를 찾습니다.

<br />

3. 테스트 ID(Test IDs)

- 세 번째는 테스트 아이디로 쿼리에 관한 `최후 수단`이다. 최후의 수단인 이유는 사용자가 직접 볼 수도 없고 스크린 리더도 액세스 할 수 없어서 꼭 필요한 경우에만 사용해야 하기 때문이다.
  - getByTestId: 요소에 `testid 속성 값`을 부여해서 요소를 찾는 방법입니다. 이 방법은 위의 쿼리로 요소를 찾기 힘든 경우에 최후의 수단으로 사용한다.

<br />

### App.test.js 개선

- CRA를 하고 App.tes.js를 보면 getByText를 사용한다.

```js
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

- 위 예제에서 non-interactive 요소에 첫 번째로 `getByText`를 선택했지만 아래 App.js 코드를 보면 테스트에서 찾으려는 요소는 `상호 작용하는 요소인 링크(a태그)`이다.

```jsx
function App() {
  return (
    <div className="App">
      {/* .. */}
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </div>
  );
}
```

<br />

- 위 예제를 `getByRole`로 업데이트 해보자. (아래 예제 참고)
- getByRole을 사용할 때 `첫 번째 인수는 역할 자체`이다. 그리고 a태그는 링크라는 내장된 역할이 있고, 몇 가지 옵션이 존재한다.
- 옵션에 관해서 우선 아래 예제에서는 `name을 사용해서 표시돼야 할 텍스트를 식별`하도록 했다.

```js
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByRole("link", { name: /learn react/i });
  expect(linkElement).toBeInTheDocument();
});
```

- 위에 예제처럼 텍스트만 사용해서 요소를 찾는 대신 실제 `역할`로도 요소를 찾을 수 있다. 실제 역할을 사용해서 스크린 리더에서 요소를 액세스할 수 있도록 했다.
- 그런데 어떤 역할을 찾아야 하는지 어떻게 알 수 있을까? 아래 링크에서 (Definition of Roles 5.4 섹션) 역할의 정의에대해서 알아볼 수 있다.
  - [역할의 정의](https://www.w3.org/TR/wai-aria/#role_definitions)
- 역할 속성을 사용해서 div처럼 모든 요소에 역할을 추가할 수 있다. 코드에는 단순히 `role=""`처럼 큰따옴표로 역할을 묶으면 된다.
- 또한, 일부 요소는 역할이 내장되어 있다. 예를 들어 button 요소는 자동으로 `button` 역할을 갖으며, a태그는 자동으로 `link`역할을 갖는다.
- 역할로 작업하는 것에 익숙하지 않으면 역할과 접근성에 적응하는데 시간이 조금 걸린다.
- 일반적으로 스크린 리더에서 테스트 요소를 찾을 수 없으면 그건 우리의 앱이 스크린 리더에 친화적이지 않은 거고 접근성에서 안좋다는 의미이다.

<br />
