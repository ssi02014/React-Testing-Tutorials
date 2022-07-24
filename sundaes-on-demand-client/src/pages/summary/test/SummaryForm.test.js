import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
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

  userEvent.click(checkBox);
  await waitFor(() => expect(confirmButton).toBeEnabled());

  userEvent.click(checkBox);
  await waitFor(() => expect(confirmButton).toBeDisabled());
});

test("Popover가 hover에 반응한다.", async () => {
  render(<SummaryForm />);

  // Popover는 처음에는 숨겨져있다.(아에 존재하면 안된다)
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  // 체크박스 라벨로 커서가 올라가면(mouseover) Popover가 나타난다.
  const termsAndConditions = screen.getByText(/terms and conditions/i);

  userEvent.hover(termsAndConditions); // hover 발생

  const popover = screen.getByText(/no ice cream will actually be delivered/i);

  expect(popover).toBeInTheDocument();

  // 커서를 밖으로 빼면 Popover는 다시 사라진다.
  userEvent.unhover(termsAndConditions);

  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});
