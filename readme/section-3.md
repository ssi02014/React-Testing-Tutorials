# ๐ป Section 2 - ESLint ์ค์ 

- ํ๋ก์ ํธ์ ํ์คํธ ๋ผ์ด๋ธ๋ฌ๋ฆฌ ๋ฐ jest-dom์ ๋ํ ESLint ์ํ์ ๋ํด์ ์์๋ณด์. Prettier๋ ์๋ตํ๋ค.

<br />

### ESLint

- create-react-app๋ฅผ ํ๋ฉด ESLint๋ ์๋์ผ๋ก ์ค์น๋์ด ์๋ค. ๊ทธ์ธ ๊ตฌ์ฑ๋ง ์งํํ๋ฉด ๋๋ค.
- ๊ฐ์ฅ ๋จผ์  ESLint ํ๋ฌ๊ทธ์ธ์ ์ค์นํ์.

<br />

```
yarn add -D eslint-plugin-testing-library eslint-plugin-jest-dom;
```

<br />

- ๊ทธ๋ฆฌ๊ณ  create-react-app์ ํตํด package.json์ ๊ธฐ๋ณธ์ ์ผ๋ก ESLint ์ค์  ๋ถ๋ถ๋ค์ ์์ฒด ํ์ผ๋ก ๋ถ๋ฆฌํ๋ค. ์๋นํ ํฌ๊ธฐ์ ๊ตฌ์ฑ์ ์ถ๊ฐํ  ๊ฒ์ด๊ธฐ ๋๋ฌธ์ ์์ฒด ํ์ผ๋ก ๊ด๋ฆฌํ๋ ๊ฒ์ด ํจ์จ์ ์ด๊ธฐ ๋๋ฌธ์ด๋ค.
- package.json์์ eslintConifg์ ์ ๋ถ ์ ๊ฑฐํ๋ค.

<br />

```json
// package.json
{
  // ์ ๊ฑฐ
  "eslintConfig": {
    "extends": ["react-app", "react-app/jest"]
  }
}
```

<br />

- ๊ทธ๋ฆฌ๊ณ  ์๋ก์ด .eslintrc ํ์ผ์ ์์ฑ ํ ์๋์ ๊ฐ์ด ์ฝ๋๋ฅผ ์์ฑํ๋ค.

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

- ์์ฑํ๋ฉด App.test.jsํ์ผ์์ ๋ค์ ์ฝ๋์์ ์๋ฌ๊ฐ ๋ฐ์ํ๋ค. DOM ์์ฑ์๋ํ ๋จ์ธ๋์  toHaveTextContent๋ฅผ ์ฌ์ฉํ๋ผ๋ ์๋ฌ ๋ฉ์ธ์ง์ด๋ค.

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

- ์ ์์ ๋ฉ์์ง๋ ์๋์ ๊ฐ์ด ์์ ํ๋ฉด ํด๊ฒฐ๋๋ฉฐ, ์ค์ ๋ก ํ์คํธ๋ฅผ ์คํํด๋ด๋ ๋ชจ๋ ํต๊ณผํ๋ ๊ฒ์ ํ์ธํ  ์ ์๋ค.

<br />

```js
// App.test.js
expect(colorButton).toHaveTextContent("Change to Medium Violet Red");
```

<br />
