# 💻 Section 7 - 최종 섹션

## 🧑‍💻 최종 섹션(1) - Happy Path Test

- Happy Path 테스트란, 에러없이 애플리케이션을 고객 플로우와 함께 작동하는 테스트이다.
- 우리의 앱은 다음과 같은 플로우를 갖는다.
  - 1. 주문 생성
  - 2. 요약 페이지 이동 후 이용 약관을 수용하고 제출
  - 3. 확인 페이지로 이동, 확인 페이지에서 새 주문을 클릭하면 OrderEntry 페이지로 되돌아간다.

<br />

### Debugging Tips

- screen.debug()
  - 스크린 혹은 DOM이 해당 시점에서 어떤 모습인지 테스트 출력값으로 확인할 수 있다. 따라서, 특정 항목을 찾거나 못 찾는 경우 원인을 파악하는 데 유용하다.
- await findBy...
  - 서버 호출자나 비동기 작업이 있을 때 `getBy...`를 사용하다 실패하면 `await findBy`를 사용해야 한다. `getBy...`를 사용하다 실패하면 비동기인지 확인하고 `await findBy`를 사용해야 하는지도 생각해 봐야한다.
- 테스트 에러 출력 값을 주의 깊게 확인해라.
- 어떤 단언이 실패했는지, 테스트 내 어떤 줄에 문제가 있는지도 확인해야 한다.
- 테스트와 실제 코드 중에 뭐가 문제인지 확실하지 않은 경우에는 미리 작성된 코드로 작업에 사용했던 코드를 대체해라.
  - 코드와 테스트 모두 작성하는 실무라면 사용하기 어려운 옵션이지만 연습할 때는 코드와 테스트 중 문제가 뭔지 파악하는 감각을 기르기에 유용한 학습 도구이다.

<br />

### 주요 테스트 에러와 해결책

- Unable to find role="role"
  - 속성에 이름을 지정하지 않아서 발생하는 에러이다.
  - 이를 해결하려면 이름을 삭제하고 확인하거나, screen.debug()를 이용하면 된다.
- Warning: An update to component inside a test was not wrapped in act(...)
  - 업데이트가 act로 래핑되지 않았다는 경고 문구이다. 이는 테스트 완료 후에 추가적으로 업데이트가 진행됐을 때 발생한다.
  - 언마운트된 컴포넌트에 React 상태 업데이트가 안되는 경우 act로 래핑하지 않아 발생한 에러와 원인이 동일하다.
  - 이를 해결하려면 `await findBy` 를 사용해 해결할 수 있다.
- Error: connect ECONNREFUSED 127.0.0.1
  - 연결이 거부됐다면 호출된 라우트 및 메서드와 연관된 MSW 핸들러가 없다는 의미이다.
  - 라우트와 메서드를 모두 확인해봐야 된다.

<br />

## 🧑‍💻 최종 섹션(2) - orderPhase 테스트 코드

```js
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("order phases for happy path", async () => {
  // render app
  render(<App />);

  // add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");

  const chocolateInput = screen.getByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");

  const cherriesCheckbox = screen.getByRole("checkbox", {
    name: "Cherries",
  });
  userEvent.click(cherriesCheckbox);

  // find and click order button
  const orderSummaryButton = screen.getByRole("button", {
    name: /order sundae!/i,
  });
  userEvent.click(orderSummaryButton);

  // 상태가 변경되기 때문에 이를 기다려준다
  // check summary information based on order
  const summaryHeading = await screen.findByRole("heading", {
    name: "Order Summary",
  });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole("heading", {
    name: "Scoops: $6.00",
  });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole("heading", {
    name: "Toppings: $1.50",
  });
  expect(toppingsHeading).toBeInTheDocument();

  // check summary option items
  expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
  expect(screen.getByText("2 Chocolate")).toBeInTheDocument();
  expect(screen.getByText("Cherries")).toBeInTheDocument();

  // accept terms and conditions and click button to confirm order
  const tcCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  userEvent.click(tcCheckbox);

  const confirmOrderButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  userEvent.click(confirmOrderButton);

  // 상태가 변경되기 때문에 이를 기다려준다
  // confirm order number on confirmation page
  const thankYouHeader = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  expect(thankYouHeader).toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  // click "new order" button on confirmation page
  const newOrderButton = screen.getByRole("button", {
    name: /create new order/i,
  });
  userEvent.click(newOrderButton);

  // 상태가 변경되기 때문에 이를 기다려준다
  // check that scoops and toppings subtotals have been reset
  const scoopsTotal = await screen.findByText("scoops total: $0.00");
  expect(scoopsTotal).toBeInTheDocument();

  const toppingsTotal = screen.getByText("toppings total: $0.00");
  expect(toppingsTotal).toBeInTheDocument();
});
```

<br />

## 🧑‍💻 최종 섹션(3) - Jest Mock(모의) 함수

- Jest는 mock함수 즉 가짜 함수를 생성할 수 있도록 `jest.fn()`을 제공한다.
- 그리고 이 mock 함수는 일반 자바스크립트 함수와 동일한 방식으로 인자를 넘겨 호출 할 수 있다.

```js
const mockFn = jest.fn();
mockFn();
mockFn(1);
mockFn("a");
mockFn([1, 2]);
```

- 위 mock 함수의 호출 결과는 모두 `undefined`이다. 어떤 값을 리턴해야할지 아직 알려주지 않았기 때문이다.

```js
mockFn.mockReturnValue("일반 테스트!");
console.log(mockFn()); // 일반 테스트!
```

- `mockReturnValue(리턴 값)` 함수를 이용해서 가짜 함수가 어떤 값을 리턴해야할지 설정해 줄 수 있다.

```js
mockFn.mockResolvedValue("비동기 테스트!");
mockFn().then((result) => {
  console.log(result); // 비동기 테스트!
});
```

- 비슷한 방식으로 `mockResolvedValue(Promise의 resolve 값)` 함수를 이용해서 가짜 비동기 함수를 만들 수 있다.

```js
mockFn.mockImplementation((name) => `I am ${name}!`);
console.log(mockFn("Dale")); // I am Dale!
```

- 뿐만 아니라 `mockImplementation(구현 코드)` 함수를 이용하면 아예 해당 함수를 통째로 즉석해서 재구현해버릴 수도 있습니다.

### mock 함수 사용 이유

- 테스트를 작성할 때 mock 함수가 유용한 이유는 mock 함수는 자신이 어떻게 호출되었는지 모두 기억한다는 점이다.

```js
mockFn("a");
mockFn(["b", "c"]);

expect(mockFn).toBeCalledTimes(2);
expect(mockFn).toBeCalledWith("a");
expect(mockFn).toBeCalledWith(["b", "c"]);
```

- 위와 같이 mock 함수 용 설계된 Jest Matcher인 `toBeCalled` 함수를 사용하면 mock 함수가 몇번 `호출`되었고 `인자`로 무엇이 넘어왔었는지를 검증할 수 있습니다.

<br />
