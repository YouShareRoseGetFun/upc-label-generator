// Check digit known from the GS1 sample UPC-A in the spec.
var UPCA = require("../upc-a.js");
var assert = require("assert");

assert.strictEqual(UPCA.checkDigit("03600029145"), 2);
assert.strictEqual(UPCA.normalize("03600029145").digits, "036000291452");
assert.strictEqual(UPCA.normalize("036000291452").computed, false);
assert.throws(function () { UPCA.normalize("036000291453"); }, /mismatch/);
assert.throws(function () { UPCA.checkDigit("12345"); }, /11 digits/);

// Leading zeros are significant: dropping one changes the symbol.
assert.notStrictEqual(UPCA.modules("036000291452"), UPCA.modules("360002914520"));

// 95 modules, guards where the spec puts them.
var m = UPCA.modules("036000291452");
assert.strictEqual(m.length, 95);
assert.strictEqual(m.slice(0, 3), "101");
assert.strictEqual(m.slice(45, 50), "01010");
assert.strictEqual(m.slice(92), "101");

// Left half (L codes) always starts with a space module; right half (R codes) with a bar.
for (var d = 0; d <= 9; d++) {
  var left = UPCA.modules("0" + d + "0000000000").slice(10, 17);
  assert.strictEqual(left.length, 7, "L[" + d + "] is 7 modules");
  assert.strictEqual(left.charAt(0), "0", "L code " + d);
  var right = UPCA.modules("000000" + d + "00000").slice(50, 57);
  assert.strictEqual(right.length, 7, "R[" + d + "] is 7 modules");
  assert.strictEqual(right.charAt(0), "1", "R code " + d);
}

// Output size must be in inches: 1.469 wide at nominal, and not 19 inches tall.
var out = UPCA.svg("03600029145", { showText: true, caption: "Widget" });
assert.ok(/^<svg /.test(out) && /<\/svg>$/.test(out));
var w = Number(/width="([\d.]+)in"/.exec(out)[1]);
var hh = Number(/height="([\d.]+)in"/.exec(out)[1]);
assert.ok(Math.abs(w - 1.469) < 0.002, "nominal width, got " + w);
assert.ok(hh > 1 && hh < 1.35, "height must be inches, got " + hh);

console.log("all UPC-A checks passed");
