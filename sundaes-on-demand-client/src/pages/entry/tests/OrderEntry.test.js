import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import server from "../../../mocks/server";

test("handles error for scoops toppings router", async () => {
  // 기존에 설정한 server handler를 오버라이딩 하는 코드 (에러 발생시키기 위함)
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
      // 반환을 안해주면 테스트는 통과하지만 warn 경고가 나옴 반환을 해주자
      return res(ctx.status(500));
    }),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(<OrderEntry setOrderPhase={jest.fn()} />);

  const alerts = await screen.findAllByRole("alert");
  expect(alerts).toHaveLength(2);
});

test("disable order button if there are no scoops ordered", async () => {
  render(<OrderEntry setOrderPhase={jest.fn()} />);

  const orderButton = screen.getByRole("button", { name: /order sundae/i });
  expect(orderButton).toBeDisabled();

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  await waitFor(() => expect(orderButton).toBeEnabled());

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "0");
  await waitFor(() => expect(orderButton).toBeDisabled());
});
