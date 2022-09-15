import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OptionItem from "../OptionItem";

test("indicate if scoop count is non-int of out of range", async () => {
  render(
    <OptionItem
      name=""
      imagePath=""
      optionType="scoops"
      updateItemCount={jest.fn()}
    />
  );

  // expect input to be invalid with negative number
  const vanillaInput = screen.getByRole("spinbutton");

  await userEvent.clear(vanillaInput);
  await userEvent.type(vanillaInput, "-1");
  expect(vanillaInput).toHaveClass("is-invalid");

  // replace with decimal input
  await userEvent.clear(vanillaInput);
  await userEvent.type(vanillaInput, "2.5");
  expect(vanillaInput).toHaveClass("is-invalid");

  // too high
  await userEvent.clear(vanillaInput);
  await userEvent.type(vanillaInput, "11");
  expect(vanillaInput).toHaveClass("is-invalid");

  // 정상
  await userEvent.clear(vanillaInput);
  await userEvent.type(vanillaInput, "3");
  expect(vanillaInput).not.toHaveClass("is-invalid");
});
