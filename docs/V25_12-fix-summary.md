# V25.12 javítási összefoglaló

Az admin műveletek most már egy egységes, újrahasználható felugró ablak komponensen keresztül működnek, amely külön UI elemként hivatkozható későbbi oldalakból is. A megosztott modálkomponens használata bevett megoldás React alkalmazásokban, különösen akkor, ha ugyanazt az overlay- és dialóguslogikát több helyen is használni kell.[cite:598][cite:601][cite:604]

A felugró ablak most portálon keresztül a dokumentum törzsébe renderelődik, így a teljes látható oldalt takarja ki, nem csak a hírek modult. A teljes képernyős overlayhez és valóban globális modálhoz a portal-alapú renderelés tipikus megoldás.[cite:584][cite:593][cite:602]

A „Hírek” CTA teljesen kikerült a hero alsó részéből, és a hero title alá került, egyszerű szöveg plusz lefelé nyíl formájában.[cite:589][cite:465][cite:606]
