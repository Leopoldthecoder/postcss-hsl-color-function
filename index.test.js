var postcss = require('postcss')
var plugin = require('./')

function run(input, output) {
  return postcss([plugin()]).process(input).then(function(result) {
    expect(result.css).toEqual(output)
    expect(result.warnings().length).toBe(0)
  })
}

it('hue', () => {
  return run('color: hue(red, 120)', 'color: rgb(0, 255, 0)')
})

it('saturation', () => {
  return run('color: saturation(red, -10%)', 'color: rgb(242, 13, 13)')
})

it('lightness', () => {
  return run('color: lightness(red, 10%)', 'color: rgb(255, 26, 26)')
})

it('multi-transfrom', () => {
  return run('color: s(h(red, 120), -10%)', 'color: rgb(13, 242, 13)')
})
