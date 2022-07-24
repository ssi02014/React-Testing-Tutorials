# 💻 Jest Matchers

## 🧑‍💻 기본 jest Matchers

### toBe

- toBe는 숫자나 문자열을 검증하고자 할 때 사용하는 Matcher이다.

```js
const fn = {
  add: (num1, num2) => num1 + num2,
};

test("3 더하기 5는 8입니다.", () => {
  expect(fn.add(3, 5)).toBe(8);
});
```

<br />

### toEqual, toStrictEqual

- toEqual은 toBe와 비슷하지만 다르다. 숫자와 문자열을 검증할 때는 둘은 동일하게 동작하지만 객체를 검증할 때는 다르게 동작한다.
- toEqual은 재귀적으로 객체를 돌면서 각 value가 같은지 확인한다.
- toStrictEqual은 toEqual보다 더 엄격하게 검증한다.

```js
const fn = {
  makeUser: (name, age) => ({ name, age }),
};

test("이름과 나이를 받아서 객체를 반환해줍니다.", () => {
  expect(fn.makeUser("Loki", 1050)).toEqual({ name: "Loki", age: 1050 });
});
```

<br />

### toBeNull, toBeUndefined, toBeDefined

- toBeNull은 오직 null과 같은지를 확인한다 (=== null)
- toBeUndefined는 오직 undefined와 같은지를 확인한다 (=== undefined)
- toBeDefined는 undefined가 아닌지를 확인한다. 즉, toBeUndefined 반대 개념

```js
test("null은 null입니다.", () => {
  expect(null).toBeNull();
});

test("undefined는 undefined입니다.", () => {
  expect(undefined).toBeUndefined();
});

test("undefined의 반대는 defined입니다.", () => {
  expect("Thor").toBeDefined();
});
```

<br />

### toBeTruthy, toBeFalsy

- toBeTruthy는 if문이 true라고 받아들일 값인지 검증하는 Matcher이다.
- toBeFalsy는 if문이 false라고 받아들일 값인지 검증하는 Matcher이다.
- 참고로 null, 빈 문자열, 0은 모두 false라고 판단한다. 반대로 0이 아닌 숫자, 문자열, 빈 배열 등은 true라고 판단한다.

```js
const fn = {
  add: (num1, num2) => num1 + num2,
};

test("0은 false입니다.", () => {
  expect(fn.add(1, -1)).toBeFalsy();
});

test("비어있지 않은 문자열은 true입니다.", () => {
  expect(fn.add("디즈니 플러스", "런칭 언제 할까요..")).toBeTruthy();
});
```

<br />

### toBeGreaterThan, toBeGreaterThanOrEqual, toBeLessThan, toBeLessThanOrEqual

- toBeGreaterThan는 A가 B보다 초과하는지 검증하는 Matcher이다. (A > B)
- toBeGreaterThanOrEqual는 A가 B보다 이상인지 검증하는 Matcher이다. (A >= B)
- toBeLessThan는 A가 B보다 미만인지 검증하는 Matcher이다.(A < B)
- toBeLessThanOrEqual는 A가 B보다 이하인지 검증하는 Matcher이다.(A <= B)

```js
test("message는 10글자 이하여야 합니다.", () => {
  const message = "디즈니 플러스 런칭";
  expect(message.length).toBeLessThanOrEqual(10);
});
```

<br />

### toBeCloseTo

- 자바스크립트에서 0.1 더하기 0.2는 0.3이 아니다. 이는 몇몇 프로그래밍 언어에서 발생하는 현상으로 이진법으로 변환하는 과정에서 무한 소수가 발생하기 때문이다.
- toBeCloseTo는 근사치인지 검증하는 Matcher이다.

```js
const fn = {
  add: (num1, num2) => num1 + num2,
};

test("0.1 더하기 0.2는 0.3입니다.", () => {
  expect(fn.add(0.1, 0.2)).toBe(0.3);
}); // 실패

test("0.1 더하기 0.2는 0.3입니다.", () => {
  expect(fn.add(0.1, 0.2)).toBeCloseTo(0.3);
}); // 성공
```

<br />

### toMatch

- toMatch는 정규식 표현을 사용하여 문자열을 검증하는 Matcher이다.

```js
test("Thor: Love and Thunder에는 t가 있나요?", () => {
  expect("Thor: Love and Thunder").toMatch(/t/i);
});
```

<br />

### toContain

- toContain는 배열 내에 요소가 포함되어 있는지 검증하는 Matcher이다.

```js
test("user list에 Thor가 있나요?", () => {
  const user = "Thor";
  const userList = ["Thor", "Loki"];
  expect(userList).toContain(user);
});
```

<br />

### toThrow

- toThrow는 에러 발생 여부를 검증하는 Matcher이다. 특징으로 인수가 따로 존재하지 않으면 어떤 종류의 에러든 발생하면 통과한다.
- 특정 에러인지 확인하고 싶다면 toThrow의 인수로 에러의 종류를 전달하면 된다.
- 아래 코드는 단순히 에러 발생 여부만을 검증하는 테스트 코드이다.

```js
const fn = {
  throwErr: () => {
    throw new Error();
  },
};

test("에러가 발생하나요?", () => {
  expect(() => fn.throwErr()).toThrow();
});
```

<br />

- 아래 코드는 에러에 인수를 전달하여 특정 에러를 검증하는 테스트 코드이다.

```js
const fn = {
  throwErr: () => {
    throw new Error("type2");
  },
};

const fn = require("../fn");

test("에러가 발생하나요?", () => {
  expect(() => fn.throwErr()).toThrow("type2");
});
```

<br />

## 🧑‍💻 jest-dom Matchers

- getByRole에서 사용하는 role의 종류는 다음 사이트로 참고
  - [Roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques#roles)
  - [WAI-ARIA Roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles)

### toBeDisabled

- toBeDisabled를 이용해서 요소가 비활성화되었는지 확인할 수 있다. 다음과 같은 요소들을 비활성화 테스트를 진행할 수 있다.
  - `button`, `input`, `select`, `textarea`, `optgroup`, `fieldset`

```html
<button type="submit" disabled>submit</button>
```

```js
const button = screen.getByRole("button", {
  name: "submit",
});
expect(button).toBeDisabled();
```

<br />

### toBeEnabled

- toBeDieabled의 반대 개념이다. 활성화되어 있는지 확인할 수 있다.

```html
<button type="submit" disabled>submit</button>
```

```js
const button = screen.getByRole("button", {
  name: "submit",
});

expect(button).toBeEnabled();
```

<br />

### toBeEmptyDOMElement

- toBeEmptyDOMElement를 통해 요소에 사용자가 볼 수 있는 콘텐츠가 없는지 여부를 확인할 수 있다. 주의할 점은 주석을 무시하긴하지만 공백이 있으면 실패한다.

```html
<input type="text" />
```

```js
const input = screen.getByRole("textbox");

expect(input).toBeEmptyDOMElement();
```

<br />

### toBeInTheDocument

- toBeInTheDocument는 요소가 문서에 있는지 여부를 확인한다.

```html
<input type="text" />
```

```js
const input = screen.getByRole("textbox");

expect(input).toBeInTheDocument();
```

<br />

### toBeInvalid

- toBeInvalid는 요소가 현재 유효하지 않은지 확인할 수 있다. `값이 없거나`, `aria-invalie="true"`이거나 `checkValidity()의 결과가 false`인 경우 테스트가 통과한다.

```html
<!-- 값이 없는 input -->
<input type="text" />
<!-- 또는 -->
<input type="text" aria-invalid />
<!-- 또는  -->
<input type="text" aria-invalid="true" />
```

```js
const input = screen.getByRole("textbox");

expect(input).toBeInvalid();
```

<br />

### toBeRequired

- toBeRequired를 통해 요소가 현재 필수인지 확인할 수 있다. `required`또는 `aria-required="true"` 속성이 있는 경우 통과한다.

```html
<input type="text" required />
```

```js
const input = screen.getByRole("textbox");

expect(input).toBeRequired();
```

<br />

### toBeValid

- toBeValid는 toBeInvalid의 반대 개념으로 현재 유효한지 알 수 있다. 요소에 `aria-invalid 속성이 없거나`, 속성 값이 `false`인 경우 유효하다. 또한 `checkValidity()`의 결과가 `true`인 경우 통과한다.

```html
<input type="text" />
<!-- 또는 -->
<input type="text" aria-invalid="false" />
```

```js
const input = screen.getByRole("textbox");

expect(input).toBeValid();
```

<br />

### toBeVisible

- toBeVisible을 통해 요소가 현재 사용자에게 표시되는지 확인할 수 있다. 다음과 같은 조건이 모두 충족되면 통과한다.
  - 문서에 있다.
  - css display 속성이 `none`으로 설정되어있지 않다.
  - css visibility 속성이 `hidden` 또는 `collapse`로 설정되어있지 않다.
  - css opacity 속성이 `0`으로 설정되어있지 않다.
  - 부모 요소도 볼 수 있다. (DOM트리 최상단까지 계속)
  - hidden 속성이 없다.
  - `<details />` 태그가 있는 경우 `open` 속성이 있어야 한다.

```jsx
<div style={{ opacity: 0 }}>opacity0</div>
<div style={{ opacity: 1 }}>opacity1</div>
<div style={{ display: 'none' }}>display none</div>
<div style={{ display: 'block' }}>display block</div>
```

```js
const div1 = screen.getByText("opacity0");
const div2 = screen.getByText("opacity1");
const div3 = screen.getByText("display none");
const div4 = screen.getByText("display block");

expect(div1).not.toBeVisible();
expect(div2).toBeVisible();
expect(div3).not.toBeVisible();
expect(div4).toBeVisible();
```

<br />

### toContainElement

- toContainElement를 통해 `요소에 다른 요소가 하위 항목으로 포함`되어 있는지 여부를 확인할 수 있습니다.

```html
<ul>
  <li>zzz</li>
</ul>
```

```js
const menu = screen.getByRole("list");
const menuItem = screen.getByRole("listitem");
expect(menu).toContainElement(menuItem);
```

<br />

### toContainHTML

- toContainHTML은 HTMl 요소를 나타내는 문자열이 다른 요소에 포함되어 있는지 확인한다.
- 문자열에는 불완전한 HTML이 아닌 유효한 HTML이 포함되어야 한다.
- 하지만, 이 matcher는 실제로 사용할 필요가 없다. 사용자가 브라우저에서 앱을 인식하는 방식의 관점에서 테스트하는 것이 좋기 때문인데 따라서, 특정 DOM 구조에 대한 테스트는 권장하지 않는다.
- 차라리 위에 `toContainElement`를 사용하는 것을 권장한다.

<br />

```html
<ul>
  <li>zzz</li>
</ul>
```

```js
const menu = screen.getByRole("list");
expect(menu).toContainHTML("<li>zzz</li>");
```

<br />

### toHaveAccessibleDescription

- toHaveAccessibleDescription를 통해 요소에 예상되는 `액세스 가능한 설명`이 있다고 주장할 수 있다.

```html
<a href="/" title="test">Start</a>
```

```js
const link = screen.getByRole("link");
expect(link).toHaveAccessibleDescription();
expect(link).toHaveAccessibleDescription("test");
```

<br />

### toHaveAccessibleName

- toHaveAccessibleNamesms를 통해 요소에 예상되는 `액세스 가능한 이름`이 있다고 주장할 수 있다. 예를 들어, 양식 요소와 버튼에 적절하게 레이블이 지정되었는지 확인할 때 유용하다.

```html
<img src="" alt="test" />
<!-- 또는 -->
<input type="text" title="test" />
```

```js
const img = screen.getByRole("img");
const input = screen.getByRole("textbox");

expect(img).toHaveAccessibleName();
expect(img).toHaveAccessibleName("test");

expect(input).toHaveAccessibleName();
expect(input).toHaveAccessibleName("test");
```

<br />

### toHaveAttribute

- toHaveAttribute를 통해 주어진 요소에 `특정 속성`이 있는지 여부를 확인할 수 있다.

```html
<button type="submit" name="test">button test</button>
```

```js
const button = screen.getByRole("button", {
  name: "button test",
});

expect(button).toHaveAttribute("name", "test");
expect(button).toHaveAttribute("type", "submit");
```

<br />

### toHaveClass

- toHaveClass를 통해 요소에 특정 `class`가 있는지 여부를 확인할 수 있다.
- 요소에 class가 없다고하지 않는 한 최소한 하나의 클래스를 제공해야 한다.

```html
<button className="test button" type="submit" name="test">button test</button>
```

```js
const button = screen.getByRole("button", {
  name: "button test",
});

expect(button).toHaveClass("test");
expect(button).toHaveClass("button");
expect(button).toHaveClass("test", "button");
```

<br />

### toHaveFocus

- toHaveFocus를 통해 요소에 `focus` 되어있는지 여부를 확인할 수 있다.

```html
<input type="text" />
```

```js
const input = screen.getByRole("textbox");

input.focus();
expect(input).toHaveFocus();

input.blur();
expect(input).not.toHaveFocus();
```

<br />

### toHaveFormValues

- toHaveFormValues를 통해 `form` 또는 `fieldset`에 지정된 각 이름에 대한 `form controll`이 포함되어 있고 지정된 값이 있는지 확인할 수 있다.

```html
<form aria-label="form">
  <input type="text" name="username" value="jane.doe" />
  <input type="password" name="password" value="12345678" />
  <input type="checkbox" name="rememberMe" checked />
  <button type="submit">Sign in</button>
</form>
```

- 참고로 form은 getByRole로 요소를 찾으려면 `aria-label="form"`와 같은 액세스 가능한 이름이 필요하다.
- 참고로 onChange를 넣어주지 않으면 테스트 상 경고 메세지가 나오는데 onChange를 넣거나 defaultValue와 같은 속성을 넣어주면 해결된다.

```js
const form = screen.getByRole("form");
expect(form).toBeInTheDocument();
expect(form).toHaveFormValues({
  username: "jane.doe",
  rememberMe: true,
});
```

<br />

### toHaveStyle

- toHaveStyle를 통해 특정 요소에 특정 `css 속성`이 있는지 확인한다.

```jsx
// 참고) jsx형식으로 작성됌
<button type="submit" style={{ backgroundColor: "red", color: "white" }}>
  button test
</button>
```

```js
const button = screen.getByRole("button", {
  name: "button test",
});
expect(button).toHaveStyle({
  backgroundColor: "red",
  color: "white",
});
```

<br />

### toHaveTextContent

- toHaveTextContent를 통해 주어진 요소에 특정 `텍스트 콘텐츠`가 있는지 여부를 확인한다.

```html
<span>span textContent test</span>
```

```js
const span = screen.getByText("span textContent test");
expect(span).toHaveTextContent("span textContent test");
```

<br />

### toHaveValue

- toHaveValue를 통해 form 요소에 지정된 값이 있는지 확인할 수 있다.
- input, select, textarea 요소에만 허용되며, checkbox, radio는 toBeChecked 또는 toHaveFormValues을 사용해야한다.

```html
<input type="text" value="test" />
<select multiple>
  <option value="first">First Value</option>
  <option value="second" selected>Second Value</option>
  <option value="third" selected>Third Value</option>
</select>
```

```js
const input = screen.getByRole("textbox");
expect(input).toHaveValue("test");

const select = screen.getByRole("listbox");
expect(select).toHaveValue(["second", "third"]);
```

- 참고로 select는 다음 역할들의 슈퍼 클래스이다. `listbox`,`menu`, `radiogroup`, `tree` 따라서 앞에 4가지 역할로 지정해줄 수 있다.

<br />

### toHaveDisplayValue

- toHaveDisplayValue를 통해 form 요소에 `지정된 표시 값(실제 사용자에게 보여지는 값)`이 있는지 확인할 수 있다.

```html
<input type="text" value="test" />
<select multiple>
  <option value="first">First Value</option>
  <option value="second" selected>Second Value</option>
  <option value="third" selected>Third Value</option>
</select>
```

```js
const input = screen.getByRole("textbox");
expect(input).toHaveDisplayValue("test");

const select = screen.getByRole("listbox");
expect(select).toHaveDisplayValue(["Second Value", "Third Value"]);
```

<br />

### toBeChecked

- toBeChecked를 통해 주어진 요소가 check되어 있는지 확인할 수 있다.

```html
<label htmlFor="checkbox">test checkbox</label>
<input type="checkbox" id="checkbox" checked />
```

```js
const input = screen.getByRole("checkbox", {
  name: "test checkbox",
});
expect(input).toBeChecked();
```

<br />

### ETC Matchers

- 많이 사용하지 않을 것 같은 matcher들이다. 이는 공식 문서에서 참고하자.
  - [toBePartiallyChecked](https://github.com/testing-library/jest-dom#tobepartiallychecked)
  - [toHaveErrorMessage](https://github.com/testing-library/jest-dom#tohaveerrormessage)

<br />

### 더 이상 사용하지 않는 matchers

- toBeEmpty는 더 이상 사용하지 않는다. 대신 toBeEmptyDOMElement를 권장한다.
- toBeInTheDOM는 더 이상 사용하지 않는다. 대신 toBeInTheDocument를 권장한다.
- toHaveDescription는 더 이상 사용하지 않는다. 대신 toHaveAccessibleDescriptio를 권장한다.
