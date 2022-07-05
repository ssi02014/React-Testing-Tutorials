import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("버튼 클릭을 통한 배경색 및 텍스트 변화 테스트", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", { name: "Change to blue" });

  // expect the background color to be red
  expect(colorButton).toHaveStyle({ backgroundColor: "red" });

  // click button
  fireEvent.click(colorButton);

  // expect the background color to be blue
  expect(colorButton).toHaveStyle({ backgroundColor: "blue" });

  // expect the button text to be 'Change to red'
  expect(colorButton.textContent).toBe("Change to red");
});

test("버튼, 체크박스 초기 상태 테스트", () => {
  render(<App />);

  // check that the button starts out enabled
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  expect(colorButton).toBeEnabled();

  // check that the checkbox starts out unchecked
  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked();
});

test("체크박스를 2번 클릭하는 동안 버튼 활성화 및 체크박스 체크 유무 테스트", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });

  // click checkbox
  fireEvent.click(checkbox);

  expect(colorButton).toBeDisabled();
  expect(checkbox).toBeChecked();

  // click checkbox
  fireEvent.click(checkbox);

  expect(colorButton).toBeEnabled();
  expect(checkbox).not.toBeChecked();
});
