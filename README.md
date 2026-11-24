# UPC Label Generator

**A free, browser-only UPC-A barcode and label sheet generator — [getupclabel.com](https://getupclabel.com/)**

Type 11 digits and get a scannable UPC-A symbol with the check digit already computed. Preview it on a US Letter Avery sheet, print at 100%, scan one and you are done. No account, no upload, no daily limit — the barcode is drawn in the tab you are reading this in.

## What it does

- Computes the 12th check digit from 11 digits, or validates a full 12-digit UPC you paste in. Leading zeros are kept: 036000291452 and 36000291452 are not the same number.
- Renders the UPC-A symbol at nominal size — 1.469 × 1.02 in (37.3 × 25.9 mm) — with the quiet zone the standard requires on both sides.
- Lays the labels out on Avery 5160, 5163 and 5164 geometry on US Letter paper, so the preview matches where the labels actually land.
- Exports PNG for documents, SVG for anything that needs to stay sharp, and a full print sheet of copies.
- Prints an optional product name under the bars.

## Supported label sheets

| Sheet | Labels per page | Label size (in) |
| --- | --- | --- |
| Avery 5160 | 30 | 2.625 × 1 |
| Avery 5163 | 10 | 4 × 2 |
| Avery 5164 | 6 | 4 × 3⅓ |

## How to use it

1. Enter 11 digits, or paste a full 12-digit UPC and let the tool verify the check digit.
2. Optionally add a product name — it prints in small caps under the bars.
3. Pick the sheet and how many copies you need.
4. Download PNG or SVG, or press Print sheet.

## Getting the print size right

Print with **Actual size / 100%**, and turn **Fit to page off**. This is where most first attempts fail: a scaled-down barcode blurs and the scanner refuses it.

Print one sheet on plain paper first and hold it against the real label stock — check the bottom row as well as the top, since scaling problems show up further down the page. Then scan one actual printed label with the scanner you will really use. A barcode that looks crisp on screen can still be too soft on paper.

## A valid barcode is not a licensed number

The check digit only proves the arithmetic of the 12 digits is right. It says nothing about ownership or whether a retailer will accept it. Numbers you invent are fine for shelf labels, stock rooms and internal tracking; to sell a product through retail or list it on a marketplace you need a GTIN assigned to your business, normally from GS1. If you are preparing marketplace listings rather than shelf labels, the notes on [Amazon barcode formats](https://getupclabel.com/amazon-barcode) cover what changes.

## Privacy

The drawing, the check digit, the PNG/SVG export and the print sheet all run in the browser. Product numbers and names never leave the page — there is no server round-trip to upload them to.

## Using the library

`upc-a.js` has no dependencies and works in Node and the browser.

```js
const UPCA = require("./upc-a.js");

UPCA.checkDigit("03600029145");        // 2
UPCA.normalize("03600029145").digits;  // "036000291452"
UPCA.modules("036000291452").length;   // 95
UPCA.svg("03600029145");               // <svg …> string at nominal size
```

## About this repository

This repository documents the project and is the place to report problems. The working tool is the website linked at the top: [getupclabel.com](https://getupclabel.com/). Earlier static-file versions of the site are kept on the `legacy-20261124` branch for reference and are no longer deployed.

If something prints wrong, please open an issue with: the label sheet, your printer model, whether you used Fit to page, and what your scanner returned.
