import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("update scoop subtotal when scoops change", async () => {
  render(<Options optionType={"scoops"} />);

  // make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText("scoops total: $", {
    exact: false,
  });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // update vanilla scoops to 1 and check the subtotal
  // 서버에서 데이터를 받기전에 채우지 않기 때문에 async/await, find를 이용
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1"); // 2달러 증가
  await waitFor(() => expect(scoopsSubtotal).toHaveTextContent("2.00"));

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });

  // spin버튼은 type 이벤트를 통해서 증가시키며, 사이드 이펙트 방지를 위해 clear를 해줘야 함
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2"); // 4달러 증가
  await waitFor(() => expect(scoopsSubtotal).toHaveTextContent("6.00"));
});

test("update toppings subtotal when toppings change", async () => {
  // 토핑 Subtotal초기 값 0 테스트
  render(<Options optionType={"toppings"} />);
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

    // check that the grand total starts out at 0
    expect(grandTotal).toHaveTextContent("0.00");

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
