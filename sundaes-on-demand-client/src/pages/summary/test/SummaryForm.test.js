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
