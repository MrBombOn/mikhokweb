# HÖK design-pack

Ide kerül a **PTE MIK HÖK** hivatalos logó- és brandcsomag **minden kivitelben** (amit a szervezet rendelkezésre bocsát), például:

- színes, fehér és sötét háttérre optimalizált változatok (**light / dark** UI-hoz);
- **SVG** és szükség szerint nagy felbontású **PNG**;
- opcionális: vízjel, nyomdai export – a belső brand útmutató szerint.

## Használat a projektben

1. Másold be a fájlokat ebbe a mappába, **beszédes fájlnevekkel** (pl. `logo-hok-full-color.svg`, `logo-hok-mono-dark-bg.svg`).
2. A Next.js app a **`public/brand/`** alútvonalon szolgálja ki a statikus képeket: build / deploy előtt a kiválasztott exportok **másolása** ide dokumentált lépés legyen – részletesen **`docs/design-pack.md`**.
3. A **vizuális megjelenés** követelményei: `PROJECT_MASTER_SPEC.md` **§32** (design checklist, „fancy” UI, átmenetek, dark mode).

## Szabályok

- A logó körül tarts **minimális üres teret**; ne nyújtsd aránytalanul.
- Ne módosítsd a logó **színeit** és **arányait** brand-ellenes módon; kivétel csak a HÖK által jóváhagyott monokróm változatok.
- Akadálymentesség: ha a logó **linkké** válik, legyen értelmes `aria-label` (pl. „MIK HÖK kezdőlap”).
