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

### toBeDieabled

- toBeDieabled를 이용해서 요소가 비활성화되었는지 확인할 수 있다. 다음과 같은 요소들을 비활성화 테스트를 진행할 수 있다.
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

- [다음 내용은 추후 작성](https://github.com/testing-library/jest-dom#tocontainelement)
