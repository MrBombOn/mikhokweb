# V27.1 naptár hibajavítás és funkcióbővítés

A v27.1 elsődleges célja a /calendar oldalon jelentkező runtime hiba megszüntetése volt. A projekt elvárása szerint minden fő oldalnak működő funkciókat kell kapnia, ezért a javítás mellett további használható naptár- és foglaláskezelési funkciók is bekerültek.[file:759]

A hiba oka az volt, hogy a foglalási slot feldolgozása nem minden bemeneti formátum esetén adott vissza biztonságosan kezdő és záró időpontot, ezért az időparszolás undefined értékre futhatott. A javított verzió biztonságos slot parsert, null-védett időfeldolgozást, státuszszűrést és gyors foglalási idősávokat is tartalmaz.[file:759]
