# V25.2 – főoldali hírmodul admin és részletező dokumentáció

## 1. Alapelv

A főoldal jelenlegi designja véglegesnek tekintendő ezen a verzióágon, ezért a módosítások kizárólag működési oldalról történtek. A vizuális szerkezetet nem kellett áttervezni, csak a vezérlőelemek viselkedését és láthatóságát kellett pontosítani.[cite:295]

## 2. Teljesen eltávolított elem


## 3. Admin módban látható elemek

A következő elemek kizárólag admin módban jelennek meg:
- új hír,
- Facebook adapter,
- Instagram adapter,
- archívum / ütemezés,
- hír szerkesztése,
- kategóriabővítés és kategóriakezelés.

Ez feltételes rendereléssel történik, vagyis ezek az elemek normál felhasználói nézetben nem látszanak.[cite:295][cite:310]

## 4. Ikonos vezérlés

A fő admin műveletek most már ikon gombokkal érhetők el. Az ikon-only gombok mind kaptak `aria-label` és `title` attribútumot is, mert az ilyen vezérlőelemeknél ez fontos akadálymentességi követelmény.[cite:301][cite:321][cite:315]

## 5. Működő modálok

A következő funkciók működő felugró ablakkal nyílnak meg:
- új hír létrehozása,
- hír szerkesztése,
- Facebook adapter,
- Instagram adapter,
- archívum és ütemezés,
- kategóriakezelés,
- részletek megnyitása.

A modálrendszer a korábban stabilizált központi hostot használja, így minden funkció azonos megnyitási logikával működik.[cite:295]

## 6. Külső közösségi posztok

A Facebook és Instagram forrásból származó hírekhez most már közvetlen külső link is társítható. Ezek a linkek külön ikon gombbal nyithatók meg, új lapon, `target="_blank"` és `rel="noopener noreferrer"` használatával, ami biztonságos külső linkkezelési minta.[cite:300][cite:306][cite:320]

## 7. Hol keresd a fő működéseket

### Hírek fő logikája
- `components/landing/LandingNews.tsx`

### Központi modál host
- `components/layout/ModalHost.tsx`

### Általános stílusok
- `app/globals.css`

## 8. Mit lehet most már közvetlenül tesztelni

- Admin módba váltás után megjelennek az admin-only ikon gombok.
- Az új hír gomb megnyit egy működő admin űrlapot.
- A szerkesztés ikon megnyitja az adott hír előtöltött űrlapját.
- A részletek ikon működő modált nyit.
- Facebook és Instagram elemeknél a külső ikon új lapra navigál a forráshoz.[cite:300]