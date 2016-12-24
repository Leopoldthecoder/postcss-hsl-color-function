var postcss = require('postcss')
var balanced = require('balanced-match')
var Color = require('color')
var helpers = require('postcss-message-helpers')

var functions = {
  hue: function(color, amount) {
    amount = Number(amount)
    return Color(toSimpleColor(color)).rotate(amount).rgb().string()
  },
  saturation: function(color, amount) {
    if (typeof amount === 'string' && amount.indexOf('%') > 0) {
      amount = parseInt(amount, 10) / 100
    }
    return Color(toSimpleColor(color)).saturate(amount).rgb().string()
  },
  lightness: function(color, amount) {
    if (typeof amount === 'string' && amount.indexOf('%') > 0) {
      amount = parseInt(amount, 10) / 100
    }
    return Color(toSimpleColor(color)).lighten(amount).rgb().string()
  }
}

functions.h = functions.hue
functions.s = functions.saturation
functions.l = functions.lightness

function toSimpleColor(color) {
  if (functionsRegex.test(color)) {
    return transformColor(color)
  } else {
    return color.trim()
  }
}

var functionsRegex = new RegExp(
  '(' +
  Object.keys(functions).reduce(function(prev, curr) {
    return (prev ? prev + '|' : '') + curr
  }, false) +
  ')\\(')

module.exports = postcss.plugin('postcss-hsl-color-function', function() {
  return function(style) {
    style.walkDecls(function transformDecl(decl) {
      if (!decl.value || !functionsRegex.test(decl.value)) {
        return
      }
      decl.value = helpers.try(function transformColorValue() {
        return transformColor(decl.value, decl.source)
      }, decl.source)
    })
  }
})

function transformColor(string, source) {
  var match = functionsRegex.exec(string)
  if (!match) {
    return string
  }
  var index = match.index
  var sassFn = match[1]

  // NOTE: regexp search beginning of line of non char symbol before `FUNCTION(`.
  //       Offset used for second case.
  index = index === 0 ? index : index + 1

  var fn = string.slice(index)
  var balancedMatches = balanced('(', ')', fn)
  if (!balancedMatches) {
    throw new Error("Missing closing parentheses in '" + string + "'", source)
  }

  return string.slice(0, index) +
    functions[sassFn].apply(null, balancedMatches.body.split(/,(?![^\(]*\))/)) +
    transformColor(balancedMatches.post, source)
}
