import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

test("Popover가 hover에 반응한다.", () => {
  // Popover는 처음에는 숨겨져있다.
  // 체크박스 라벨로 커서가 올라가면(mouseover) Popover가 나타난다.
  // 커서를 밖으로 빼면 Popover는 다시 사라진다.
});
