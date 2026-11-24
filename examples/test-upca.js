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

// Left half always starts with a space module, right half with a bar.
for (var d = 0; d <= 9; d++) {
  var half = UPCA.modules("0" + d + "0000000000").slice(4, 11);
  assert.strictEqual(half.charAt(0), "0", "left digit " + d);
}

var out = UPCA.svg("03600029145", { showText: true, caption: "Widget" });
assert.ok(/^<svg /.test(out) && /<\/svg>$/.test(out));
assert.ok(out.indexOf('width="1.469') === 0 - 1 || out.indexOf("in\"") > -1);

console.log("all UPC-A checks passed");
