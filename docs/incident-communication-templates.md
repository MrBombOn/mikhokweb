# Hibaeseti kommunikációs sablonok (HU) — Fázis 5

**Használat:** másold ki, töltsd ki a `{zárójel}` részeket, szűrd a közönséget. Ne küldj technikai titkot (jelszó, token, nyers stack trace) külső csatornára.

---

## A) Belső gyors jelzés (chat / ticketing)

```
[TÜZ] {környezet} — {rövid leírás}
Kezdet: {idő (UTC)}
Hatás: {pl. oldal nem tölt / login hiba / csak booking}
Ügyeletes: @{név}
Státusz: vizsgáljuk / hotfix / rollback
```

---

## B) Stakeholder / vezetői 3 mondat

```
Tisztelt {címzett},

Értesítünk, hogy a {szolgáltatás neve} {időpont} óta {milyen mértékben} nem vagy csak részben érhető el.
Jelenleg {mit csinálunk: hibakeresés / javítás / visszaállítás}, célunk a lehető leggyorsabb helyreállítás.
A következő frissítést {esedékes idő / „30 percen belül”} küldjük.

Üdvözlettel,
{név, szervezet}
```

---

## C) Publikus / felhasználói (web / közösségi, visszafogott)

```
Jelenleg technikai okok miatt átmeneti zavar tapasztalható a weboldalon. Dolgozunk a megoldáson.
Köszönjük a türelmét — hamarosan frissítünk.
```

*(Ha jogi megfelelés kell, egyeztesd az OF / jogi kontakttal.)*

---

## D) Megoldva — lezáró üzenet (belső)

```
[LEZÁRVA] {incidens azonosító}
Időtartam: {kezdet – vég}
Ok (röviden): {root cause}
Javítás: {mit tettünk}
Megelőzés: {ticket / follow-up}
```

---

## E) Megoldva — rövid külső (opcionális)

```
A weboldal újra zavartalanul elérhető. Elnézést kérünk az esetleges kellemetlenségért.
```

---

*Kapcsolódó: [`incident-debug.md`](./incident-debug.md), [`recovery-checklist.md`](./recovery-checklist.md).*
