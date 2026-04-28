# V25.1 hibajavítás – ModalHost null context védelem

## Javított hiba

A v25-ben a következő hiba jelent meg:

```txt
TypeError: Cannot read properties of null (reading 'open')
```

Ez a `ModalHost` komponensben történt, mert a komponens a contextből érkező `modal` objektumot közvetlenül használta, miközben bizonyos renderelési helyzetekben a context még `null` lehetett.

## Mi volt a gond

A korábbi logika ilyen mintát követett:

```tsx
const { modal, closeModal } = useApp();
...
}, [modal.open, closeModal]);
```

Itt a `modal.open` már a dependency listában is kiértékelődött, ezért ha a context még nem állt készen, az oldal hibára futott.

## Mi lett javítva

A `ModalHost` most már védett fallback logikát használ:

- ha az app context még nem elérhető, akkor egy üres `emptyModal` objektumot használ,
- a `closeModal` is kap egy biztonságos no-op fallbacket,
- az effect és a render is csak akkor fut tovább, ha a `modal` tényleg létezik és `open === true`.

## Miért működik így stabilabban

A React context használatánál gyakori minta, hogy a fogyasztó oldalon explicit null vagy undefined védelmet kell beépíteni, különösen App Router, SSR és hydrate közeli helyzetekben.[cite:288][cite:293]

A portálos modáloknál szintén bevett gyakorlat, hogy a megjelenítés csak mount után történjen, és legyen SSR-védelem, illetve fallback konténer logika.[cite:271][cite:292]

## Eredmény

A `ModalHost` többé nem dob hibát akkor sem, ha a provider később áll fel, vagy átmenetileg hiányzik a contextérték.