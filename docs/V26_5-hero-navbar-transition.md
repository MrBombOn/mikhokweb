# V26.5 hero és navbar átmenet

A v26.5-ben a landing hero állapotában látható QuickControls már nem viewporthoz ragadó lebegő elemként viselkedik, hanem a lap tetejére rögzített, statikus helyen marad addig, amíg a teljes navbar meg nem jelenik. A fixed és sticky viselkedés közti különbség ilyen átmeneteknél fontos, mert más térbeli érzetet ad a felhasználónak.[cite:809][cite:813]

A hírekhez vezető nyíl a hero leírás alá került, és a görgetés most célzott offsettel pontosan addig visz, ahol a navbar már fixen megjelenik. Fix vagy sticky fejléc mellett az anchor scroll offset külön kezelése bevett gyakorlat, hogy a célblokk ne csússzon a fejléc alá.[cite:799][cite:805][cite:812]
