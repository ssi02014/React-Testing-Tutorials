import { render, screen, waitFor } from "@testing-library/react";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";

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

  render(<OrderEntry />, { wrapper: OrderDetailsProvider });

  // waitFor로 비동기 처리해주지 않으면 단언이 동기적으로 작동해서 오류가 발생 함
  await waitFor(async () => {
    // axios catch를 이용하므로(비동기) find를 이용 (+ 다수의 Alert이 나와야되므로 findAllByRole을 사용)
    const alerts = await screen.findAllByRole("alert");
    // scoops, topping 2개의 alert이 나와야 함
    expect(alerts).toHaveLength(2);
  });
});
