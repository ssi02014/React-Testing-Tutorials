# 💻 Section 4 - Sundaes on Demand

## 🧑‍💻 Sundaes on Demand(1) - App 개요

- Sundaes on Demand 프로젝트에서 클라이언트와 서버가 기본적으로 `상호작용` 하는 방식은 아래와 같다.
  - 기본적으로 사람들이 아이스크림의 맛과 토핑을 선택한 뒤, 주문을 제출한다.
  - 맛과 토핑의 선택지는 서버로부터 오게된다.
  - 주문이 제출되면 이는 서버로 전송이 되고 서버는 클라이언트에게 주문 번호를 회신해서 고객들에게 보여준다.

<br />

- 추가적으로 Color Button 보다 더욱 복잡한 테스트 환경을 구성할 텐데 아래와 같은 요소들이 추가적으로 존재한다.
  - 다수의 기입란을 가진 형식과 주문 단계로의 이동 등이 복잡한 상호작용
  - 이용 약관에 대해서는 커서를 올리면 나타나는 팝업창을 만들어 사용자들이 가입을 할 때 어떤 이용 약관에 동의하는지 확인할 텐데 이를 위해 DOM으로 부터 사라지는 요소를 테스트한다.
  - 서버의 응답을 `Mock`한다. Mock은 기능 테스트에 있어 굉장히 중요한 부분으로 기능 테스트 도중에 서버의 실행을 원하지 않기 때문에 `MSW(Mock Service Worker)` 라이브러리를 사용해 테스트 서버로부터 `Mock 응답`을 보내도록 만든다.
    - MSW를 사용하면 서버로 가는 호출을 중간에서 가로채 우리가 응답을 제어할 수 있게 해준다. MSW를 사용해 Mock 응답을 보내기 때문에 테스트 도중 서버가 실행 중일 필요가 없다.
  - 이 앱은 `비동기적 업데이트`가 존재한다. 이 말은 테스트 라이브러리를 사용해 특정 도구를 학습하게 될텐데, 이 특정 도구는 DOM 내의 특정 변경을 기다리게 된다.
  - `Context API`를 통해 전역 상태 관리를 사용한다.
    - 하지만, Context의 구현은 테스트를 진행하지 않는다. 왜냐하면 우리는 사용자에게 보이는 `테스트 동작`에만 관심이 있기 때문이다. 또한 이게 결국 `기능 테스트의 목적`이기 때문이다.
    - 따라서, 테스트는 다른 전역 상태 관리 시스템을 사용한 경우와 전혀 다르지 않을 것이다. (ex. Mobx, Redux, Recoil)
    - 하지만 `테스트 설정`에 차이점은 존재 할 것이다. 테스트가 올바르게 작동할 수 있게 컴포넌트가 컨텍스트에 액세스할 수 있도록 만들어야 한다. 그래야 컨텍스트에 연결을 시도했으나, 컨텍스트를 찾을 수가 없어 테스트 도중 오류가 발생하는 상황을 방지할 수 있기 때문이다.

### Order Phase State (App-level)

- `App-level` 상태를 이용해 현재 위치한 `주문 단계를 추적`함으로써 각 주문 단계들을 거쳐나가 될 것이다.
  - `inProgress` 상태라면 주문 입력란 페이지가 표시될 것이다.
  - `review` 상태라면 주문 입력 페이지에서 Submit Order를 클릭하고 이동하는 주문 요약 페이지가 표시될 것이다.
  - `completed` 상태라면 주문 완료 페이지가 표시될 것이다.
  - 주문 완료 페이지에서는 새 주문을 생성하기 위한 버튼이 있을텐데 이 버튼을 누르면 다시 inProgress 상태로 돌아와 주문 입력란 페이지가 표시될 것이다.
  - 즉, inProgress -> review -> completed 플로우로 진행된다.

<br />

### Server 개요

- 서버는 아래 저장소를 클론해서 사용하면된다.
  - [서버 자료 저장소](https://github.com/bonnie/udemy-TESTING-LIBRARY/tree/main/sundae-server)
- 서버의 API는 Restful하게 작성되어 있다.
- 노드/익스프레스 서버에서 실행되며 3030번 포트에서 실행된다.
- 맛과 토핑에 대한 정보는 정적 정보로 보낸다.
  - 맛과 그 이미지의 목록, 토핑과 그 이미지의 목록을 보낸다.
- 실제 앱에서는 정보가 데이터베이스에서 오고 Sundaes on Demand는 파일에서 오는 것이다.
- 주문 번호의 경우에는 무작위의 번호를 임의로 생성해 전송한다.
- 사실 Sundaes on Demand는 기능 테스트를 위해 서버는 필요가 없다. 위에서도 언급했지만 MSW를 이용해 테스트 서버로부터 MOCK 응답을 보낼 것이기 때문이다.
- 그렇다면 서버가 왜 필요하냐, 서버는 스펙을 위해서만 사용을 해서 MSW가 반환해야 하는 내용을 확인할 거고, 수동 인수(Acceptance) 테스트 용으로 사용할 것이다.

<br />

## 🧑‍💻 Sundaes on Demand(2) - 스타일링 셋팅(react-bootstrap)

- 테스트 과정에 있어, 스타일링이 별로 중요하지 않다 생각할 수도 있지만, 사실 제법 중요하다. 왜냐하면, 페이지 상에 나타난 요소의 모습을 바탕으로 요소를 찾게 될 텐데 이는 사용된 스타일링에 의해 달라지게 되기 때문이다.
- 해당 프로젝트에서는 `react-bootstrap`을 사용해서 [react-bootstrap](https://react-bootstrap.github.io/) 사이트에 요소가 어떻게 구현되었는지 확인하면서, 효율적으로 요소를 찾아내 테스트 할 수 있도록 할 것이다.

<br />

```
설치
yarn add react-bootstrap bootstrap
```

<br />

- 라이브러리 설치 후에 index.html에다 추가적인 JavaScript 링크를 추가한다.
- 아래 내용들은 index.html에다 붙여넣으면 된다. 관련 설명은 [react-bootstrap: browser-globals](https://react-bootstrap.github.io/getting-started/introduction#browser-globals)에서 참고하면 된다.

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

- 그리고 CSS를 index.js에다 import 추가해줘야 한다. 관련 설명은 [react-bootstrap: css](https://react-bootstrap.github.io/getting-started/introduction#css)에서 참고하면 된다.

<br />

## 🧑‍💻 Sundaes on Demand(3) - SummaryForm 구조

### 목업 디자인

![스크린샷 2022-07-19 오전 12 34 51](https://user-images.githubusercontent.com/64779472/179548063-74cecf24-b930-4617-b0cd-232ec2cff739.png)

<br />

### 폴더 구조

<img width="346" alt="스크린샷 2022-07-18 오후 11 50 53" src="https://user-images.githubusercontent.com/64779472/179538796-913a01f3-80a5-412e-b322-fe1c57e339da.png">

<br />

- 컴포넌트를 페이지 별로 구성한다. 이 각각의 페이지 디렉토리에는 테스트 서브디렉토리가 존재한다. 그 안에 테스트 코드가 포함된다.
- Jest는 프로젝트 전체 디렉토리 트리 내의 `.test.js`로 끝나는 모든 파일을 찾아 실행하기 때문에 테스트 파일이 어디에있든 상관은 없지만 따로 디렉토리로 정리했다.

<br />

## 🧑‍💻 Sundaes on Demand(4) - SummaryForm: 체크박스 활성화 버튼

### 요구사항

- 기본값으로 체크박스에 체크가 되어 있지 않도록 한다.
- 체크박스에 체크를 하면 버튼이 활성화되게 한다. 그리고 체크를 해제하면 버튼이 다시 비활성화된다.
  - toBeEnabled, toBeDisabled 활용

<br />

- 실제 작성된 [SummaryForm.js](https://github.com/ssi02014/React-Testing-Tutorials/blob/master/sundaes-on-demand-client/src/pages/summary/SummaryForm.js) 코드는 직접 확인

```js
// App.test.js
import { render, fireEvent, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

test("초기 상태 테스트", () => {
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

test("체크박스가 체크되면 버튼은 비활성화되고, 체크를 해제하면 버튼은 활성화된다.", () => {
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

## 🧑‍💻 Sundaes on Demand(5) - Popover Test & useEvent & screen Query Methods

### userEvent

- 이용약관 Popover 테스트와 페이지로부터 사라진 요소를 테스트하는 방법을 알아보자
- Popover는 [리액트 부트스트랩 Popover](https://react-bootstrap-v3.netlify.app/components/popovers/) 를 사용할 예정이다.
- Popover 테스트는 우리가 사용한 스타일링이 테스트 방식에 영향을 미치는 대표적인 케이스이다.
  - Popover가 나타났을 때는 div가 생성되고 이는 텍스트 검색을 통해서 가져올 수 있다.
  - Popover가 사라졌을 때는 div가 사라진다. 하지만 또 다른 가능성으로 여전히 페이지에는 존재하지만, 숨겨진 상태일 수도 있다. 이런 차이점은 중요하다. 왜냐하면 이용 약관으로부터 커서가 멀어지면 Popover가 사라지는 부분을 테스트하는 방식이 결정되기 때문이다.
  - 결과적으로 스타일링이 어떻게 테스트를 결정하는지를 보여주는 좋은 예시이다. 페이지에서 요소가 어떻게 보이고 사라지는지를 판단하기 때문이다.

<br />

- 마우스오버(Mouseover)는 어떻게 시뮬레이션할까?
  - [테스팅 라이브러리 - Firing Events](https://testing-library.com/docs/dom-testing-library/api-events/) 페이지를 살펴보면 fireEvent도 좋지만 userEvent가 더 좋다고 나와있다.
  - 일반적으로 fireEvent에 비해 useEvent가 사용자 이벤트를 더욱 완전하고 현실적인 방식으로 시뮬레이션 한다.
  - [테스팅 라이브러리 - userEvent Github](https://github.com/testing-library/user-event)
  - [테스팅 라이브러리 - useEvent API](https://testing-library.com/docs/ecosystem-user-event)

```
Most projects have a few use cases for fireEvent, but the majority of the time you should probably use @testing-library/user-event.
```

- [테스팅 라이브러리 - useEvent API](https://testing-library.com/docs/ecosystem-user-event)을 들어가보면 API 종류가 나오는데 click, dbClick, type, upload, clear, hover, unhover 등이 존재한다.
- useEvent를 프로젝트에 적용하려면 패키지 설치가 핋요하다.

```
npm install --save-dev @testing-library/user-event @testing-library/dom
yarn add -D @testing-library/user-event @testing-library/dom
```

- 설치 후에는 userEvent를 import하고 기존에 fireEvent를 `userEvent`로 교체한다.
- 참고로, useEvent의 click은 `실제 사용자들의 상호작용 방식에 더욱 근접하다.` 예를 들어 라벨을 클릭하게 되면 실제로 체크박스를 클릭하게 되고, 그 요소에 실제로 포커스 된다.
- 아래코드는 fireEvent.click를 userEvent.click으로 교체한 내용이다.

```js
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("체크박스가 체크되면 버튼은 비활성화되고, 체크를 해제하면 버튼은 활성화된다.", async () => {
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

- (참고로 위에 코드를 보면 await이 붙어있는데.. 비동기 작업이 아닌데 왜 await을 붙이지 않으면 테스트가 통과되지 않는지 원인을 모르겠다 파악하는대로 추가 작성 예정)

<br />

### Popover test - 요구사항

- 본격적으로 `Popover 테스트`를 진행해보자.
- 요구사항은 다음과 같다
  - Popover는 처음에는 숨겨져있다.
  - 체크박스 라벨로 커서가 올라가면(mouseover) Popover가 나타난다.
  - 커서를 밖으로 빼면 Popover는 다시 사라진다.

<br />

- `무언가 표시되지 않음`을 확인하기위해서는 어떤 것을 사용해야될까? 지금까지는 getBy쿼리 그중에서도 `getByRole`을 통해서 요소를 가져왔다. 하지만 getByRole 말고도 사용 가능한 많은 쿼리들이 존재하며, 무언가 표시되지 않음을 확인하기 위해서는 getBy 쿼리를 사용할 수가 없다.

<br />

### screen Query Methods

- Popover 테스트를 진행하기전에 screen Query Methods들을 좀 더 알아보도록 하자.
- screen 쿼리는 기본적으로 다음과 같은 포맷을 가진다.

```
command[All]ByQueryType
```

![스크린샷 2022-07-24 오전 1 24 59](https://user-images.githubusercontent.com/64779472/180613880-835f6266-0348-4ab3-9e14-3870dc5526c0.png)

- command에 해당하는 부분은 다음과 같다.
  - get: 요소가 DOM 내에 있을 것을 expect한다.
  - query: 요소가 DOM 내에 있지 않을 것을 expect한다.
  - find: 요소가 `비동기`적으로 나타날 경우를 expect한다.
- [All]은 포함을 시키거나 포함을 시키지 않는 부분인데 다음과 같다.
  - (exclude): 하나의 match만을 expect한다. ex) `getByRole`
  - (include): 하나 이상의 match를 expect한다. (`배열`로 반환) ex) `getAllByText`
- QueryType: 무엇으로 검색을 하는지를 의미하는데, 다음과 같다.
  - Role(most preferred): 코드의 접근성을 보장하기위해 가장 선호된다.
  - AltText(images): 이미지를 찾기 위해 사용한다.
  - Text(display elements): 특정 역할이 없고 비상호작용적인 디스플레이 요소에 사용한다.
  - TestId: 최후의 선택, data-testid 속성을 찾는다.
  - Form elements: Form 요소를 찾는 데에는 다양한 속성의 사용이 가능하다.
    - placeholderText
    - LabelText
    - DisplatValue
- 위에 내용들은 혼합해서 가장 적절한 방법으로 DOM에서 찾고자하는 요소를 찾아낼 수 있다.

```
getByRole
getAllByText
QueryAllByLabelText
```

- screen query methods 관련한 문서는 아래 2개 사이트를 참고한다.
  - [RTL - About Query](https://testing-library.com/docs/queries/about/) 해당 사이트를 통해 자세하게 내용을 확인할 수 있다.
  - [RTL - cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet/) 해당 사이트를 통해 간략하게 내용을 확인할 수 있다.

<br />

### [어떤 쿼리를 사용해야 할까?](https://testing-library.com/docs/queries/about/#priority)

- `Queries Accessible to Everyone`: 모두가 액세스 할 수 있는 쿼리를 사용하는게 좋다. 화면을 쳐다보고 있는 사람이든, 스크린 리더 등의 보조 기술을 사용하고 있는 사람에게건 말이다.

  - getByRole: `접근성 트리`에 노출된 모든 요소를 가져오는데 사용할 수 있다. 옵션을 사용해서 액세스 가능한 이름(name)으로 반환된 요소를 필터링 할 수 잇다. `가장 선호되는 쿼리이다.`

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

  - getByLabelText: Form 필드에 정말 좋은 쿼리이다. 웹 사이트의 Form을 탐색할 때 label text를 사용해서 요소를 찾는다.

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

  - getByText: `Form 외부`에서 `텍스트`를 통해 요소를 찾을 때 좋은 방법이다.

  ```html
  <a href="/about">About ℹ️</a>
  ```

  ```js
  import { render, screen } from "@testing-library/react";

  render(<MyComponent />);
  const aboutAnchorNode = screen.getByText(/about/i);
  ```

    <br />

  - getByDisplayValue: Form 요소(input, textarea, select 등)의 `현재 값`을 갖는 요소를 찾을 때 좋은 방법이다.

  ```js
  document.getElementById("lastName").value = "Norris";
  ```

  ```js
  import { render, screen } from "@testing-library/react";

  render(<MyComponent />);
  const lastNameInput = screen.getByDisplayValue("Norris");
  ```

    <br />

- `Semantic Queries`: 다음 쿼리들은 다소 선호되지 않는데 이들은 브라우저와 보조 기술 사이의 `일관성이 다소 떨어지기 때문`이다. 테스트는 사용자들이 소프트웨어를 사용하는 방식을 모방해야 한다는 점을 잊지말자. 그리고 이러한 속성들이 표시되는 방식이 일관되지 못하다면 사용자들이 소프트웨어와 상호작용 하는 것과 동일한 방식으로 테스트가 진행되고 있는지를 알 수 없을 것이다.

  - getByAltText: 요소가 `alt`를 지원하는 요소(img, area, input)인 경우 이를 사용해서 해당 요소를 찾을 수 있다.

  ```html
  <img alt="Incredibles 2 Poster" src="/incredibles-2.png" />
  ```

  ```js
  import { render, screen } from "@testing-library/react";

  render(<MyComponent />);
  const incrediblesPosterImg = screen.getByAltText(/incredibles.*? poster/i);
  ```

  <br />

  - getByTitle: title은 스크린 리더와 일관되지 않으며, 시력이 있는 사용자에게는 기본적으로 표시되지 않는다.

  ```html
  <span title="Delete" id="2"></span>
  ```

  ```js
  import { render, screen } from "@testing-library/react";

  render(<MyComponent />);
  const deleteElement = screen.getByTitle("Delete");
  ```

<br />

- `Test IDs`: `최후의 수단`이다. 사용자들이 test id와 상호작용할 일은 절대 없기 때문이다.

  - getByTestId: 사용자가 보거나 들을 수 없으므로 role이나 text로 일치시킬 수 없거나 의미가 없는 경우(예: 텍스트가 동적임)에만 권장

  ```html
  <div data-testid="custom-element" />
  ```

  ```js
  import { render, screen } from "@testing-library/react";

  render(<MyComponent />);
  const element = screen.getByTestId("custom-element");
  ```

<br />
