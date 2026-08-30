# Motion assets

Every "Comp …" layer on the artboard is a **video fill** in Figma. Figma's API
only hands back their poster frame, so each slot below already renders a
`<video>` with that exported frame as its `poster` — the film and the still are
the same picture, so the hand-off when the film loads is invisible.

All six slots are now filled.

| File                 | Artboard layer                | Slot box  | Delivered   | Where it appears                | Status |
| -------------------- | ----------------------------- | --------- | ----------- | ------------------------------- | ------ |
| `diagram.mp4`        | `Comp 3_1 1`                  | 639×567   | 1440×1080   | "كل ما تحتاجة في مكان واحد"     | ✅     |
| `ornament.mp4`       | `Comp 4`                      | see below | 1440×1080   | Both CTA bands, left and right  | ✅     |
| `hero.mp4`           | —                             | 1440×524  | 1920×1080   | Hero, under the headline        | ✅     |
| `services-brain.mp4` | `0_Artificial_Intelligence_…` | 1280×720  | 1280×720    | Services tabs — البيانات والذكاء | ✅     |
| `services-web.mp4`   | `0_Tablet_Environment_…`      | 530×1012  | 672×1280    | Services tabs — تطوير المواقع   | ✅     |
| `services-erp.mp4`   | `0_Animation_Icons_…`         | 529×939   | 720×1280    | Services tabs — ERP             | ✅     |

The delivered films were dropped in under these names from, respectively,
`Transformix Showreel.mp4`, `0_Artificial_Intelligence_Brain_1280x720 (1).mp4`,
`0_Tablet_Environment_672x1280.mp4` and `0_Animation_Icons_720x1280.mp4` — the
last three are the artboard layers' own source files, which is why they match
their slots so exactly.

Notes:

- A `.webm` sibling (e.g. `diagram.webm`) is served first when supported —
  optional, but smaller. None exist yet; the `<source>` tags already list them,
  and the browser falls through to the `.mp4`.
- All of them play muted, looping and inline so they can autoplay. The three
  service films and the showreel still carry their original audio tracks —
  never heard, so re-encoding without audio is free weight to save.
- The استديو الابداع tab has no media: Figma variant Desktop-81 draws its
  card as an empty bordered frame.
- `hero.mp4` is 24.7 MB and sits above the fold, where autoplay makes the
  browser fetch it immediately. It is the one asset worth compressing.

## Framing the delivered films

### The three service films

Each is the source file of the very layer it fills, so the slot box and the
film agree to within 0.2% — `object-fit: cover` on `.mediaImage` crops
essentially nothing. The per-tab boxes live in `ServicesTabs.tsx` (`TABS[].media`)
because every one is framed differently inside the shared 530×686 card:

| Tab                  | Figma variant | Box (px) | Offset in card    |
| -------------------- | ------------- | -------- | ----------------- |
| البيانات والذكاء      | Desktop-79    | 1280×720 | −360.15, −0.15    |
| تطوير المواقع        | Desktop-80    | 530×1012 | −0.15, −326.15    |
| ERP                  | Desktop-82    | 529×939  | −0.15, −127.15    |

### The hero showreel

The artboard leaves the 1440×524 band under the headline completely empty — no
layer, so Figma prescribes no framing. The band is kept full-bleed as drawn and
the 16:9 showreel is centred with `object-fit: cover`, which shows ~65% of the
frame and trims the rest evenly top and bottom. If a cut turns out to lose
something that matters, `Hero.module.css` is the single place to change it —
`object-fit: contain` letterboxes the whole frame onto the band's gradient
instead.

### diagram.mp4 and ornament.mp4

Both are the **whole 1440×1080 composition**; their artboard slots show a
zoomed crop of it, not the full frame. `object-fit` cannot express that, so the
picture is placed by hand in CSS — the numbers were measured by comparing the
artwork's bounding box in the film against the same box in the exported still.

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
