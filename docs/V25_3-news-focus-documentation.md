# V25.3 – végleges főoldali design mellett működő hírmodul dokumentáció

## 1. Rögzített designelv

Ebben a verzióban a főoldal designja véglegesnek tekintendő, ezért a további munka kizárólag a hírek modul működési oldalára koncentrál. A vizuális szerkezetet nem módosítja ez a verzió, csak az admin műveletek, a modálok és a jövőbeli adatbázis-kapcsolhatóság lettek továbbfejlesztve.[cite:353]



## 3. Működő modál-alapú hírkezelés

A hírmodul most már külön felugró ablakot használ minden fontosabb művelethez: részletek megtekintése, új hír létrehozása, hír szerkesztése, Facebook adapter beállítása, Instagram adapter beállítása, archívum és ütemezés, valamint kategóriakezelés.[cite:330][cite:350][cite:353]

## 4. Database-ready felépítés

A mostani működés még lokális állapotkezeléssel dolgozik, de a struktúra már alkalmas arra, hogy később adatbázisra vagy API-ra lehessen kötni. Ez azért fontos, mert a create, edit, publish, archive és delete műveletek logikailag már külön vannak választva.[cite:342][cite:344][cite:347]

## 5. Hol találod a fő részeket

### Hírek fő logika
- `components/landing/LandingNews.tsx`

### Központi modálrendszer
- `components/layout/ModalHost.tsx`

### Általános stílusok
- `app/globals.css`

## 6. Mit lehet közvetlenül tesztelni

Admin módban jelenleg közvetlenül tesztelhető az új hír modál, a szerkesztés modál, a Facebook adapter modál, az Instagram adapter modál, az archívum / ütemezés modál, a kategóriakezelés modál, a piszkozat létrehozás, a publikálás, az archiválás, a törlés és a külső Facebook / Instagram link megnyitás új lapon.[cite:300][cite:306]