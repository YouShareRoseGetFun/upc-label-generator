# Label sheet geometry

Before trusting a preview, know whether the sheet is the adjustable or the
permanent kind. Avery 5160 is the **adjustable** line; 8160 is the same layout in
**permanent** adhesive — same grid, different stock. Sheets sold in the UK under
the J8160 code use the same 3 × 10 arrangement but different stock again.

## US Letter — 8.5 × 11 in

| Code | Labels | Columns × Rows | Label (in) | Top margin | Side margin | Horizontal pitch | Vertical pitch |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 5160 / 8160 | 30 | 3 × 10 | 2.625 × 1 | 0.5 | 0.19 | 2.75 | 1.0 |
| 5161 / 8161 | 20 | 2 × 10 | 4 × 1 | 0.5 | 0.16 | 4.19 | 1.0 |
| 5162 / 8162 | 14 | 2 × 7 | 4 × 1⅓ | 0.5 | 0.16 | 4.19 | 1.33 |
| 5163 / 8163 | 10 | 2 × 5 | 4 × 2 | 0.5 | 0.16 | 4.19 | 2.0 |
| 5164 / 8164 | 6 | 2 × 3 | 4 × 3⅓ | 0.5 | 0.16 | 4.19 | 3.33 |

Add a 0.5 in top margin to match where the first row actually lands; label stock
leaves a margin at the top of the sheet for the printer to grip.

## A4 — 210 × 297 mm

Avery's EU numbering is unrelated to the US codes above, so do not assume
"5160 in A4" exists. The common A4 equivalents for 30-up are L7159 and, for the
permanent line, L7160. Check your box.

## Module width and the 1.469 in symbol

UPC-A is defined in 95 modules. At 13 mil (0.013 in) per module the symbol is
1.469 in wide including the quiet zone, and 1.02 in tall at nominal size, which is
the size a scanner is calibrated against. Going below 80% of nominal is where
first-scan failure rates climb, so shrink the page margin before shrinking the
barcode.

## Why the preview and the printout disagree

Two causes, in order of frequency:

1. **Scale to fit.** The browser scales the page down to the printer's printable
   area, so a 1.469 in symbol prints at 1.4 in and the bars blur together.
2. **Printer margins overriding the page size.** Set the paper to US Letter, the
   scale to 100%, and margins to none.

Measure the first symbol with a ruler after printing: it should be 1.469 in wide if
you include the quiet zone, 1.313 in if you measure only the bars.
