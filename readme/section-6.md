# 💻 Section 6 - Mock Service Worker(MSW)

## 🧑‍💻 MSW(1) - Mock Service Worker와 핸들러 소개

- [Mork Service Worker](https://mswjs.io/)
- MSW의 목적은 네트워크 호출을 가로채서 지정된 응답을 반환해야 한다. 이때 종단 간 테스트는 하지 않는다는 걸 기억하자.
- 테스트하는 동안 발생하는 모든 네트워크 호출을 막는다.
- 서버 응답에 기반한 테스트 조건도 설정한다. 이렇게 될 경우 테스트 조건은 서버가 옵션으로 무엇을 반환하느냐에 달려있다.

### MSW Setup

- MSW를 셋팅하기위해 우선 패키지를 설치한다

```
npm i msw
또는
yarn add msw
```

- 설치 후에는 핸들러를 생성해야한다. 핸들러란, 특정한 URL과 라우트에 무엇을 반환할지 결정하는 함수다.
- 그 후에 요청을 처리할 서버도 생성한다.
- 테스트하는 동안 테스트 서버가 항상 수신 대기 중인지 인터넷으로 나가는 호출을 가로채고 있는지도 확인해야 한다. 이는 설정 테스트 파일에서 확인할 수 있다.
  - 같은 파일에서 각 테스트 후에 서버 핸들러를 재설정한다. 테스트하다가 핸들러에 문제가 생기면 디음 테스트를 위해 재설정을 해야된다.

### Handler

- [MSW - Mocking REST API](https://mswjs.io/docs/getting-started/mocks/rest-api)
- 위에 가이드 라인대로 REST API에 필요한 필수 요소를 가져와보자.

```js
// src/mocks/handlers.js
import { rest } from "msw";

// Example
export const handlers = [
  // Handles a POST /login request
  rest.post("/login", null),
  // Handles a GET /user request
  rest.get("/user", null),
];
```

- 여기서 우선 rest.get, rest.post가 어떤 동작으로 움직이는지 확인해보자.

```js
rest.get("http://localhost:3030/scoops", (req, res, ctx) => {});
```

- express를 해봤다면 위에 포맷이 익숙할 것이다. express의 핸들러도 비슷한 요청과 응답 및 컨텍스트 기능을 사용한다.
- 위 코드를 하나하나 분석해보자
  - Handler Type: `rest` or `graphql`
    - 가장 앞에 rest부분인데 말 그대로 핸들러 타입이다.
    - REST이든 GraphQL이든 MSW에서 가져온다.
  - method: HTTP Method(`get`, `post`, `delete`, `put`, `patch` 등)
    - get 부분은 특정 URL에 mocking하려는 HTTP 메서드가 온다.
    - 첫 번째 인자로 mocking할 `전체 URL`을 입력한다.
    - 두 번째 인자로 함수를 온다. 이 함수는 요청, 응답 객체와 응답을 구축하는 유틸리티인 컨텍스트로 이뤄진다.
    - [MSW - Pesponse resolver](https://mswjs.io/docs/basics/response-resolver) 자세한건 다음 사이트를 참고한다.
- 서버가 실제로 하는 작업과 요청 내용에따라 이러한 MSW 핸들러를 통해 많은 정교한 작업을 진행할 수 있다.

<br />

- 정교한 작업을 위해 Server쪽 코드와 어떤 데이터 포맷을 갖는지 확인해보자.

```js
// sundaes-on-demand-server/server.js

// read data from options file
const sundaeOptionsRaw = fs.readFileSync("./sundae-options.json", "utf-8");
const sundaeOptions = JSON.parse(sundaeOptionsRaw);

app.get("/scoops", (req, res) => {
  // return data from file
  res.json(sundaeOptions.iceCreamFlavors);
});
```

```json
// sundaes-on-demand-server/sundae-options.json/iceCreamFlavors
{
  "iceCreamFlavors": [
    {
      "name": "Mint chip",
      "imagePath": "/images/mint-chip.png"
    },
    {
      "name": "Vanilla",
      "imagePath": "/images/vanilla.png"
    },
    {
      "name": "Chocolate",
      "imagePath": "/images/chocolate.png"
    },
    {
      "name": "Salted caramel",
      "imagePath": "/images/salted-caramel.png"
    }
  ],
  "toppings": [
    {
      "name": "M&Ms",
      "imagePath": "/images/m-and-ms.png"
    },
    {
      "name": "Hot fudge",
      "imagePath": "/images/hot-fudge.png"
    },
    {
      "name": "Peanut butter cups",
      "imagePath": "/images/peanut-butter-cups.png"
    },
    {
      "name": "Gummi bears",
      "imagePath": "/images/gummi-bears.png"
    },
    {
      "name": "Mochi",
      "imagePath": "/images/mochi.png"
    },
    {
      "name": "Cherries",
      "imagePath": "/images/cherries.png"
    }
  ]
}
```

- 위에처럼 서버에서 넘겨주는 데이터를 확인했으면 MSW로 어떻게 Mocking 해야하는지 알 수 있을 것이다.
- 그렇다면 실제로 MSW Handler를 작성해보자.

```js
export const handlers = [
  rest.post("http://localhost:3030/scoops", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Chocolate", imagePath: "/images/chocolate.png" },
        { name: "Vanilla", imagePath: "/images/vanilla.png" },
      ])
    );
  }),
];
```

- 위에처럼 Handler를 작성했으면 이제 MSW 서버를 설정해보자.

<br />

### MSW Server 설정

- [MSW - Integrate(Node)](https://mswjs.io/docs/getting-started/integrate/node)
- MSW의 Integrate에대해서 알아볼건데 Intergrate는 브라우저와 노드 환경 간에 동일한 요청 처리기를 공유하는 것을 말한다. 참고로 여기서는 브라우저는 사용하지 않고 Node를 사용한다.
- 노드는 Jest를 실행하면 실행된다.
- 우선 `src/mocks`에 `server.js`파일을 생성한다. 그리고 아래와 같이 코드를 작성한다.

```js
// src/mocks/server.js
import { setupServer } from "msw/node";
import { handlers } from "./handlers";
// This configures a request mocking server with the given request handlers.
export const server = setupServer(...handlers);
```

- `setupServer(...handlers)`는 setupServer가 handlers와 함께 실행됨을 의미한다. 배열을 전개 연산자로 펼쳐서 배열의 각 요소를 별개의 인수로 만든다.
- 마지막으로 MSW가 네트워크 요청을 가로채 핸들러에게 설정하 응답을 반환하도록 create-react-app(CRA) 을 구성해야 한다.
- CRA를하면 생성되는 `src/setupTests.js`를 아래와 같이 수정한다.

```js
// src/setupTests.js
// jest-dom때문에 jest-dom 단언을 사용할 수 있다.
import "@testing-library/jest-dom";
import { server } from "./mocks/server.js";

// 테스트를 하기 전에 항상 서버가 수신을 대기하도록 한다.
// 들어오는 모든 네트워크 요청을 실제 네트워크가 아닌 MSW로 라우팅함을 의미한다.
beforeAll(() => server.listen());

// 각 테스트가 끄탄면 핸들러를 서버를 정의했을 때의 핸들러로 재설정한다.
// 결국 특정 테스트에 대한 특정 핸들러가 생긴다고 할 수 있다.
// 다시 말해, 서버가 오류를 반환하면 앱에서 무슨 일이 생기는지 테스트하기 위해서 어떤 테스트에서 서버가 오류를 반환하게 할 예정이다.
afterEach(() => server.resetHandlers());

// 테스트가 끝나면 서버를 닫아 전부 깔끔하게 지운다.
afterAll(() => server.close());
```
