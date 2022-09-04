# 💻 Section 6 - Provider에 래핑된 컴포넌트 테스트

## 🧑‍💻 Provider(1) - 텍스트 입력란 채우기: 소계 테스트

- [getByText](https://testing-library.com/docs/queries/bytext/)로 요소를 가져올 때 2번째 인자로 exact라는 옵션이 존재한다. 이는 기본적으로 true로 설정되어 잇있는데 `부분적 매치`일 때는 exact를 `false`로 설정해줘야 한다.

```js
// totalUpdates.test.js
test("update scoop subtotal when scoops change", () => {
  render(<Options optionType={"scoops"} />);

  // make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
});
```

<br />

- 텍스트를 업데이트할 때마다 가장 먼저 하면 좋은 작업은 `clear(element)`로 요소를 삭제하는 것이다. 왜냐하면 그 이전에 무슨 값이 있었는지 알 수 없기 때문이다.
- `type` 이벤트는 요소를 가져와서 텍스트 입력을 테스트 할 수있다. 참고로 인자로 문자열을 넣어줘야 한다.
- 참고로 아래 예제에서는 두번째인자로 1을 줬는데 spinbutton을 1회 눌렀다는 뜻이다.
- 새롭게 알아보는 [spinbutton](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/spinbutton_role)는 문서를 참고하자.

```js
// totalUpdates.test.js
test("update scoop subtotal when scoops change", async () => {
  // ...

  // update vanilla scoops to 1 and check the subtotal
  // 서버에서 데이터를 받기전에 채우지 않기 때문에 async/await, find를 이용
  const vanillaInput = await screen.findAllByRole("spinbutton", {
    name: "Vanilla",
  });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1"); // 2달러 증가
  await waitFor(() => expect(scoopsSubtotal).toHaveTextContent("2.00"));
});
```

<br />

## 🧑‍💻 Provider(2) - 테스트 설정에 Context추가하기

- React코드에서 Context Provider 코드를 작성하고 적용을 해줬는데 테스트를 진행해보면 엄청난 에러가 발생한다. `(context/OrderDetails)`
- 이는 기존에 테스트 코드에 Context를 제공하지 않았기 때문이다. 즉, 테스트 내에서 Options 컴포넌트를 위한 Context를 제공해야됨을 의미한다. 이떄 wrapper옵션을 이용한다.
- 기존에 생성한 OrderDetailsProvider를 wrapper에 추가해준다.
- Context뿐만 아니라 `Redux Provider`, `Router` 등을 추가할 수 있다. 즉, 테스트를 위해 컴포넌트를 래핑할 수 있는 것은 뭐든 가능하다.

```js
test("update scoop subtotal when scoops change", async () => {
  render(<Options optionType={"scoops"} />, { wrapper: OrderDetailsProvider });
  // ...
});
```

<br />

## 🧑‍💻 Provider(3) - Provider Wrapper 적용

- [Custom Render](https://testing-library.com/docs/react-testing-library/setup/#custom-render)
- Wrapper를 이용하면 Provider를 우리가 렌더링하는 모든 컴포넌트와 테스트에 전역적으로 적용해 개별 작업이 필요 없게끔 할 수 있다.

```js
//test-utils/testing-library-utils.js
import { render } from "@testing-library/react";
import { OrderDetailsProvider } from "../contexts/OrderDetails";

const customRender = (ui, options) => {
  return render(ui, { wrapper: OrderDetailsProvider, ...options });
};

// re-export
export * from "@testing-library/react";

// override render method
export { customRender as render };
```

- 위와 같이 test utils함수를 만든다.
- `@testing-library/react`의 모든걸 re-export하며 `customRender`를 통해서 우리가 래핑하고자 하는 내용을 추가해 export한다.

```js
import { render, screen } from "../../../test-utils/testing-library-utils";
import Options from "../Options";

test("display image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);
  // ...
});
```

- 이를 위와같이 test-utils/testing-library-utils를 import해서 사용하면 된다.

<br />

## 🧑‍💻 Provider(4) - update toppings subtotal

- scoops, toppings 의 subTotal을 구하는 테스트는 거의 맥락이 비슷하다.

```js
test("update toppings subtotal when toppings change", async () => {
  // 토핑 Subtotal초기 값 0 테스트
  render(<Options optionType={"toppings"} />);
  // exact가 false이면 꼭 모든 글자가 정확히 맞을 필요없다. 기본값은 true
  const toppingsSubtotal = screen.getByText("toppings total: $", {
    exact: false,
  });

  expect(toppingsSubtotal).toHaveTextContent("0.00");

  // 한 옵션에 대한 박스를 찾아 체크하고 업데이트된 부분 합계에 단언(2개)
  const CherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  const GummiCheckbox = await screen.findByRole("checkbox", {
    name: "M&Ms",
  });

  userEvent.click(CherriesCheckbox); // 1.5달러 증가
  await waitFor(() => expect(toppingsSubtotal).toHaveTextContent("1.50"));

  userEvent.click(GummiCheckbox); // 1.5달러 증가
  await waitFor(() => expect(toppingsSubtotal).toHaveTextContent("3.00"));

  userEvent.click(CherriesCheckbox); // 1.5달러 감소
  await waitFor(() => expect(toppingsSubtotal).toHaveTextContent("1.50"));
});
```

<br />

## 🧑‍💻 Provider(5) - 총계(Grand total)

```js
describe("grand total", () => {
  test("grand total updates properly if scoop is added first", async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    const CherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    // scoop add
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2"); // 4달러 증가
    await waitFor(() => expect(grandTotal).toHaveTextContent("4.00"));

    // topping add
    userEvent.click(CherriesCheckbox); // 1.5달러 증가
    await waitFor(() => expect(grandTotal).toHaveTextContent("5.50"));
  });
  test("grand total updates properly if topping is added first", async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    const CherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    // topping add
    userEvent.click(CherriesCheckbox); // 1.5달러 증가
    await waitFor(() => expect(grandTotal).toHaveTextContent("1.50"));

    // scoop add
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2"); // 4달러 증가
    await waitFor(() => expect(grandTotal).toHaveTextContent("5.50"));
  });

  test("grand total updates properly if item is removed", async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    const CherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    // topping add
    userEvent.click(CherriesCheckbox); // 1.5달러 증가

    // scoop add
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2"); // 4달러 증가

    // scoop remove
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1"); // 2달러 감소

    await waitFor(() => expect(grandTotal).toHaveTextContent("3.50"));

    // topping remove
    userEvent.click(CherriesCheckbox); // 1.5달러 감소

    await waitFor(() => expect(grandTotal).toHaveTextContent("2.00"));
  });
});
```

<br />

## 🧑‍💻 Provider(6) - act(...), Unmounted Component 에러

```
When testing, code that causes React State updates should be wrapped into act(...)
```

```
Warning: Can't perform a React state update on unmounted component. ~~
```

- 테스트를 진행하다보면 위와 같은 에러들이 발생하는 경우가 있다.

```js
test("grand total starts at $0.00", () => {
  render(<OrderEntry />);

  const grandTotal = screen.getByRole("heading", {
    name: /grand total: \$/i,
  });

  expect(grandTotal).toHaveTextContent("0.00");
});
```

- 실제로 위 코드에서는 비동기 처리와 전혀 관계없는 테스트이다. 하지만 위와 같은 에러가 발생하는 이유는 컴포넌트가 테스트 종료 후에 비동기 업데이트를 계속 한다는 뜻이다.
- 해당 에러를 해결하기 위해서는 여러 방법이 있지만 가장 선호하는 방법은 Axios가 성공하면 상태를 업데이트할 때 변경이 일어나기 때문에, 비동기 테스트가 진행되는 테스트에 비동기가 불 필요한 테스트 코드를 포함하는 방법이다.
  - 테스트 코드를 포함하면 기존에 불 필요한 테스트는 제거한다.

```js
test("grand total updates properly if scoop is added first", async () => {
  render(<OrderEntry />);

  const grandTotal = screen.getByRole("heading", {
    name: /grand total: \$/i,
  });
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  const CherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });

  // (*)
  expect(grandTotal).toHaveTextContent("0.00");

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "2");
  await waitFor(() => expect(grandTotal).toHaveTextContent("4.00"));

  // ...
});
```

- 또한, await을 테스트 끝에 추가해 위 에러를 피할 수 있다. 가장 문제가 적고 테스트에서 에러를 피하고자 번거로운 작업을 실행할 필요가 없어 유용하긴 하지만 강사분은 선호하지는 않는다고 한다. 차라리 위에처럼 비동기 처리하는 테스트에다 테스트 코드를 포함하는게 좋아 보인다.

<br />

## 🧑‍💻 Provider(7) - 기능 테스트는 무엇을 잡아야 하나?

- 보통 기능 테스트는 코드 작동 방식을 시험한다. 사이트의 정적 페이지가 아니라 코드 프로세스를 검사하는 것이다. 즉, 향후 코딩으로 변경될 수 있는 요소를 기능 테스트로 확인하는 것이다.
- 정적 페이지 발생한 문제는 Cypress 혹은 Selenium을 사용하는 인수 테스트 영역에 속한다.
