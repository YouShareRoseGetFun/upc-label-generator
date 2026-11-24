#!/usr/bin/env node
// Usage: node examples/node-svg.js 03600029145 [out.svg]
var fs = require("fs");
var UPCA = require("../upc-a.js");

var input = process.argv[2];
if (!input) {
  console.error("usage: node examples/node-svg.js <11 or 12 digits> [out.svg]");
  process.exit(1);
}

var info = UPCA.normalize(input);
var out = process.argv[3] || info.digits + ".svg";
var svg = UPCA.svg(info.digits, { showText: true });

fs.writeFileSync(out, svg);
console.log("UPC-A   " + info.digits);
console.log("check   " + info.checkDigit + (info.computed ? " (computed)" : " (verified)"));
console.log("wrote   " + out + "  " + svg.length + " bytes");
