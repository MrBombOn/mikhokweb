/**
 * @file Tailwind CSS konfiguráció (előkészített, jelenleg minimál)
 *
 * @description
 * A projekt vizuális **SSOT**-ja jelenleg a `app/globals.css` és a `styles/design-tokens.css`
 * (CSS változók). Ez a fájl akkor bővül jelentősen, ha a csapat Tailwind utility osztályokra
 * migrál a komponensekben.
 *
 * @content
 * A `content` tömb megmondja a Tailwindnek, mely fájlokban keressen osztályneveket –
 * így a faékészítés (JIT) nem marad üresen.
 */
const config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
};

export default config;
