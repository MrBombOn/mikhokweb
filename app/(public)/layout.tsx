/**
 * @file Nyilvános route group layout
 *
 * @description
 * A `(public)` **route group** neve nem jelenik meg az URL-ben; csak fájlszervezési célú.
 * Jelenleg átlátszó: közvetlenül a gyerekeket adja vissza. Ide később például
 * közös nyilvános meta, analytics, vagy vízszintes wrapper tehető.
 */
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return children;
}
