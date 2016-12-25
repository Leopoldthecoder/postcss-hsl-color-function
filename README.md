# PostCSS HSL Color Function

[PostCSS] plugin to transform HSL color function to more compatible CSS.

Inspired and modified from [postcss-sass-color-functions].

[PostCSS]: https://github.com/postcss/postcss
[postcss-sass-color-functions]: https://github.com/adam-h/postcss-sass-color-functions

## Installation

```console
$ npm install postcss-hsl-color-function
```

## Usage

```js
postcss([require('postcss-hsl-color-function')])
```

Before:

```css
.foo {
  color: hue(red, 120)
}
```

After:

```css
.foo {
  color: rgb(0, 255, 0)
}
```

Checkout [test.js](index.test.js) for examples.

### Currently supported functions

- `hue(color, degree)`
- `saturation(color, percentage)`
- `lightness(color, percentage)`

and their aliases:
- `h(color, degree)`
- `s(color, percentage)`
- `l(color, percentage)`
