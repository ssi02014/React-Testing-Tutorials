# 💻 Section 2 - ESLint 설정

- 프로젝트에 테스트 라이브러리 및 jest-dom에 대한 ESLint 셋팅에 대해서 알아보자.

<br />

### ESLint

- create-react-app를 하면 ESLint는 자동으로 설치되어 있다. 그외 구성만 진행하면 된다.
- 가장 먼저 ESLint 플러그인을 설치하자.

<br />

```
yarn add -D eslint-plugin-testing-library eslint-plugin-jest-dom;
```

<br />

- 그리고 create-react-app을 통해 package.json에 기본적으로 ESLint 설정 부분들을 자체 파일로 분리한다. 상당한 크기의 구성을 추가할 것이기 때문에 자체 파일로 관리하는 것이 효율적이기 때문이다.
- package.json에서 eslintConifg을 전부 제거한다.

<br />

```json
// package.json
{
  // 제거
  "eslintConfig": {
    "extends": ["react-app", "react-app/jest"]
  }
}
```

<br />

- 그리고 새로운 .eslintrc 파일을 생성 후 아래와 같이 코드를 작성한다.

<br />

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: ["testing-library", "jest-dom"],
  extends: [
    "react-app",
    "react-app/jest",
    "plugin:testing-library/react",
    "plugin:jest-dom/recommended",
  ],
};
```

<br />

- 작성하면 App.test.js파일에서 다음 코드에서 에러가 발생한다. DOM 속성에대한 단언대신 toHaveTextContent를 사용하라는 에러 메세지이다.

<br />

```js
// App.test.js
expect(colorButton.textContent).toBe("Change to Medium Violet Red");
/* 
  Use toHaveTextContent instead of asserting on DOM node attributes
  (eslintjest-dom/prefer-to-have-text-content)
  */
```

<br />

- 위 에서 메시지는 아래와 같이 수정하면 해결되며, 실제로 테스트를 실행해봐도 모두 통과하는 것을 확인할 수 있다.

<br />

```js
// App.test.js
expect(colorButton).toHaveTextContent("Change to Medium Violet Red");
```

<br />
