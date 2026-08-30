# Motion assets

Every "Comp …" layer on the artboard is a **video fill** in Figma. Figma's API
only hands back their poster frame, so each slot below already renders a
`<video>` with that exported frame as its `poster`. Until a file exists the
browser just paints the poster and the moment you drop the film in it animates.

Export each one from Figma (right-click the layer → Copy/Paste as → or the
original source file) and save it here under the exact name:

| File                   | Artboard layer      | Box (px)  | Where it appears                | Status |
| ---------------------- | ------------------- | --------- | ------------------------------- | ------ |
| `diagram.mp4`          | `Comp 3_1 1`        | 639×567   | "كل ما تحتاجة في مكان واحد"     | ✅     |
| `ornament.mp4`         | `Comp 4`            | see below | Both CTA bands, left and right  | ✅     |
| `hero.mp4`             | —                   | 1440×524  | Hero, under the headline        | —      |
| `services-brain.mp4`   | `0_Artificial_…720` | 1280×720  | Services tabs, left card        | —      |
| `services-web.mp4`     | `0_Tablet_Environment` | 530×1012 | Services tabs — تطوير المواقع | —      |
| `services-erp.mp4`     | `0_Animation_Icons`    | 529×939  | Services tabs — ERP             | —      |

Notes:

- A `.webm` sibling (e.g. `diagram.webm`) is served first when supported —
  optional, but smaller.
- `hero.mp4` also accepts an optional `hero-poster.jpg`; the rest already use
  their Figma still as the poster.
- All of them play muted, looping and inline, so encode without audio.
- The استديو الابداع tab has no media: Figma variant Desktop-81 draws its
  card as an empty bordered frame.

## Framing the delivered films

Both films are the **whole 1440×1080 composition**; the artboard slots show a
zoomed crop of it, not the full frame. `object-fit` cannot express that, so the
picture is placed by hand in CSS — the numbers were measured by comparing the
artwork's bounding box in the film against the same box in the exported still,
so film and poster line up and the hand-off is invisible.

| Slot          | Rule in                | Width  | Top    |
| ------------- | ---------------------- | ------ | ------ |
| CTA ornaments | `CtaBanner.module.css` | 129.2% | −28.9% |
| Diagram       | `AllInOne.module.css`  | 138.7% | −8.6%  |

Re-cut a film at a different framing and those two numbers need re-measuring.

- `ornament.mp4` serves all four ornament slots. It was cut in the **left-hand**
  orientation, so `.ornamentRight video` mirrors it with `scaleX(-1)`. The three
  stills each carry their own baked flip and are left alone.
- The three `Comp 4` slots sit at slightly different sizes (452×295, 439×287,
  447×299); one crop covers all of them to within a few pixels.
