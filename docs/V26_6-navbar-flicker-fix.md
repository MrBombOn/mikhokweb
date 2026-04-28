# V26.6 navbar flicker fix

A v26.6-ban a navbar megjelenésének villódzását hiszterézises belépési és kilépési küszöbök bevezetése csökkenti. Az ilyen megoldás gyakori akkor, amikor egy UI-állapot ugyanazon közeli pozíció környékén váltana oda-vissza görgetés közben.[cite:794][cite:818][cite:822]

A hírek gomb célpozíciója kissé lejjebb került, így a görgetés után a hírek blokk valamivel mélyebbre kerül a viewportban. Sticky vagy fixed fejléc mellett a scroll offset finomhangolása bevett módszer a pontosabb érkezési élményhez.[cite:799][cite:812][cite:823]
