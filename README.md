# PostCSS Hsl Color Function

[PostCSS] plugin to transform HSL color function to more compatible CSS.

[PostCSS]: https://github.com/postcss/postcss

```css
.foo {
  color: hue(red, 120)
}
```

```css
.foo {
  color: rgb(0, 255, 0)
}
```

## Usage

```js
postcss([ require('postcss-hsl-color-function') ])
```

See [PostCSS] docs for examples for your environment.
