/**
 * upc-a.js — UPC-A check digit, 95-module encoding, SVG output. No dependencies.
 * Node:    const UPCA = require("./upc-a.js");
 * Browser: <script src="upc-a.js"></script>  → window.UPCA
 *
 * 95 modules: start guard 101 (3) + 6 left digits x 7 (42) + centre guard 01010 (5)
 *           + 6 right digits x 7 (42) + end guard 101 (3)
 * All 12 digits are carried by the bars; the printed line reads 1 | 5 | 5 | 1.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.UPCA = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  var L = ["0001101","0011001","0010011","0111101","0100011",
           "0110001","0101111","0111011","0110111","0001011"];
  var R = ["1110010","1100110","1101100","1000010","1011100",
           "1001110","1010000","1000100","1001000","1110100"];

  var MODULES = 95;
  var QUIET = 9;          // quiet zone each side, in modules
  var X_IN = 0.013;       // nominal module width, inches (13 mil)
  var HEIGHT_IN = 1.02;   // nominal bar height, inches

  function digitsOnly(v) { return String(v == null ? "" : v).replace(/[^0-9]/g, ""); }

  // 1st, 3rd, 5th, 7th, 9th, 11th digit weigh 3; the rest weigh 1.
  function checkDigit(eleven) {
    var s = digitsOnly(eleven);
    if (s.length !== 11) throw new Error("checkDigit needs 11 digits, got " + s.length);
    var sum = 0;
    for (var i = 0; i < 11; i++) sum += (i % 2 === 0 ? 3 : 1) * Number(s.charAt(i));
    return (10 - (sum % 10)) % 10;
  }

  // 11 digits → check digit appended; 12 digits → verified, throws on mismatch.
  function normalize(input) {
    var s = digitsOnly(input), computed = true;
    if (s.length === 11) {
      s += String(checkDigit(s));
    } else if (s.length === 12) {
      var want = checkDigit(s.slice(0, 11));
      if (want !== Number(s.charAt(11)))
        throw new Error("check digit mismatch: expected " + want + ", got " + s.charAt(11));
      computed = false;
    } else {
      throw new Error("UPC-A needs 11 or 12 digits, got " + s.length);
    }
    return { digits: s, checkDigit: Number(s.charAt(11)), computed: computed };
  }

  function modules(digits12) {
    var s = digitsOnly(digits12);
    if (s.length !== 12) throw new Error("modules() needs 12 digits, got " + s.length);
    var out = "101", i;
    for (i = 0; i < 6; i++) out += L[Number(s.charAt(i))];
    out += "01010";
    for (i = 6; i < 12; i++) out += R[Number(s.charAt(i))];
    return out + "101";
  }

  function isGuard(m) { return m < 3 || (m >= 45 && m < 50) || m >= 92; }

  function escapeXml(v) {
    return String(v).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /**
   * One symbol as an SVG string.
   * opts: scale, moduleWidth (in), height (in), quietZone (modules),
   *       guardExtension (in), showText, caption
   */
  function svg(input, opts) {
    opts = opts || {};
    var digits = normalize(input).digits;
    var s = opts.scale == null ? 1 : opts.scale;
    var m = modules(digits);
    var quiet = opts.quietZone == null ? QUIET : opts.quietZone;
    var barH = opts.height == null ? HEIGHT_IN : opts.height;
    var x = opts.moduleWidth == null ? X_IN : opts.moduleWidth;
    var guardX = opts.guardExtension == null ? barH * 0.05 : opts.guardExtension;
    var unit = x * s;
    var h = barH * s;
    var q = quiet * unit;
    var bodyW = MODULES * unit;
    var textH = opts.showText === false ? 0 : 0.14 * s; // inches, same unit as width
    var width = q * 2 + bodyW;
    var height = guardX * 2 + h + textH + 0.04 * s;   // headroom for guard bars

    var rects = "";
    for (var i = 0; i < MODULES; i++) {
      if (m.charAt(i) !== "1") continue;
      // Guard bars run 5 modules longer than the data bars so bar heights
      // still read correctly when a scanner sees a partially covered label.
      var top = isGuard(i) ? 0 : guardX;
      var tall = isGuard(i) ? h + guardX * 2 : h;
      rects += '<rect x="' + (q + i * unit).toFixed(4) +
               '" y="' + top.toFixed(4) +
               '" width="' + unit.toFixed(4) +
               '" height="' + tall.toFixed(4) + '"/>';
    }

    var text = "";
    if (textH > 0) {
      var d = digits;
      // Tuck the outer three digits under the first/last guard bar; the
      // remaining ten sit under the body, same as a printed UPC-A.
      text =
        '<text x="' + (q - unit).toFixed(4) + '" y="' + (h + textH).toFixed(4) +
        "</text>" +
        '<text x="' + (q + bodyW / 2).toFixed(4) + '" y="' + (h + textH).toFixed(4) +
        '" text-anchor="middle" letter-spacing="' + (unit * 1.4).toFixed(3) + '">' +
        d.slice(1, 11) + "</text>" +
        '<text x="' + (q + bodyW + unit).toFixed(4) + '" y="' + (h + textH).toFixed(4) +
        '" text-anchor="middle">' + d.charAt(11) + "</text>";
    }

    var caption = opts.caption
      ? '<text x="' + (width / 2).toFixed(4) + '" y="' + (height - 0.01 * s).toFixed(4) +
        '" text-anchor="middle" font-size="' + (0.09 * s).toFixed(4) + '">' +
        escapeXml(opts.caption) + "</text>"
      : "";

    return (
      '<svg xmlns="http://www.w3.org/2000/svg" width="' + width.toFixed(4) + 'in" height="' +
      height.toFixed(4) + 'in" viewBox="0 0 ' + width.toFixed(4) + " " + height.toFixed(4) +
      '" role="img" aria-label="UPC-A ' + digits + '">' +
      '<rect width="100%" height="100%" fill="#fff"/>' +
      '<g fill="#000" font-family="Helvetica, Arial, sans-serif" font-size="' +
      (0.12 * s).toFixed(4) + '">' + rects + text + caption + "</g></svg>"
    );
  }

  return {
    checkDigit: checkDigit,
    normalize: normalize,
    modules: modules,
    svg: svg,
    MODULES: MODULES,
    DEFAULT_QUIET_ZONE: QUIET,
    NOMINAL_MODULE_WIDTH_IN: X_IN,
    NOMINAL_HEIGHT_IN: HEIGHT_IN
  };
});
