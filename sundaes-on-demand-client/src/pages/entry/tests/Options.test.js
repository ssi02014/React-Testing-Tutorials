import { render, screen } from "@testing-library/react";
import Options from "../Options";

test("display image for each scoop option from server", () => {
  render(<Options optionType="scoops" />);

  // find images
  // 모든 alt 텍스트가 scoop이라는 문자열로 끝나야 한다.
  const scoopImages = screen.getAllByRole("img", {
    name: /scoop$/i,
  });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  // map을 이용해 모든 이미지에 대한 alt 텍스트를 얻을 수 있다.
  const altText = scoopImages.map((el) => el.alt);

  // 객체나 배열을 사용할 때는 toBe 말고 toEqual 사용
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});
