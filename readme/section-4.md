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

### 폴더 구조

<img width="346" alt="스크린샷 2022-07-18 오후 11 50 53" src="https://user-images.githubusercontent.com/64779472/179538796-913a01f3-80a5-412e-b322-fe1c57e339da.png">

<br />

- 컴포넌트를 페이지 별로 구성한다. 이 각각의 페이지 디렉토리에는 테스트 서브디렉토리가 존재한다. 그 안에 테스트 코드가 포함된다.
- Jest는 프로젝트 전체 디렉토리 트리 내의 `.test.js`로 끝나는 모든 파일을 찾아 실행하기 때문에 테스트 파일이 어디에있든 상관은 없지만 따로 디렉토리로 정리했다.

<br />

## 🧑‍💻 Sundaes on Demand(4) - SummaryForm: 체크박스 활성화 버튼
