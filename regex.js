/*
Regex reguléris kifejezések -> regex101.com
A reguláris kifejezés az formátumellenőrzésre jó és akkor szoktuk használni, amikor van nekünk pl. egy dátum -> "1964-08-24"
dátumnál nem azt akarjuk leellenőrizni, hogy pontosan 1964-08-24, hanem azt, hogy 4 szám egy kőtőjel 2 szám egy kőtőjel 2 szám legyen 

készítünk szögletes zárójelet []
Akkor a szögletes zárójelben fel tudjuk sorolni az engedélyezett karaktereket 
[abc] - az a,b,c karakter is engedélyezett lesz, mindegy, hogy milyen sorrendben 
Itt fel lehetne sorolni a teljes abc-t és ha a teljes abc-t felsoroltuk, akkor a teljes abc engedékyezett karakter lesz 

Mi van ha nem szeretnénk 43 betűt felsorolni 
akkor azt tudjuk modnjuk, hogy -> [a-k]
és ez a kód a-k-ig elfogadja az össszes karaktert, de azt már nem fogadja el, hogy nagybetűs!!!!!!!!!!!!!!!!!!!!!!!!!!!

hogyha modnjuk el akarjuk fogadtatni az összes nagybetűset is a-k-ig 
-> 
[a-kA-K]

[a-zA-Z] -> az angol abc összes kisbetűje és nagybetűje bent lesz, de ebben nincsenek bent az ékezetes karakterek!!!!!!
azokat külön fel kell sorolni!!!

[\w] 
-> word karakterek, amiben benne vannak az angol abc betűi, itt sincsenek ékezetesek és itt megtalálhatóak a számok is!!!!!

[\W]
-> non-word karakterek pl. *-/ specifikus karakterek, amik nem betűk és számok 

[\w\W]
-> 
Ebben benne vannak a word és a non-word karakterek is 

[.]
-> 
pont karakter elvileg mindent engedélyez, de ez nem vált be, valószinüleg csak a pontot engedélyezi 

ha mi kőtőjelet szeretnénk engedélyezni 
[-] -> ha beírunk egy kőtőjelet, akkor kőtőjelet engedélyez 
ha beírjuk, hogy [5-], akkor megint engedélyezi 
de ha viszont azt írjuk, hogy [5-6], akkor már nem engedélyezi!!!!!!!!!!!
mert ez azt jelenti, hogy 5-től 6-ig 

[0-9] -> azt jelenti, hogy az összes szám 0-tól 9-ig 
A 0-tól 9-ig is lehet rövidíteni arra, hogy [/d] mint digit 
[0-9] = [\d]

ha szeretnénk elfogadtatni a - jelet úgyhogy biztos müködjön (alt gr q) -> [\-]
és az összes speciális karakter így tud jól müdökni 
[\-\/] -> / és a - jelet akarjuk elfogadtatni!!!!

Mi van ha el akarjuk fogadtatni a w karaktereket, de csak 5 darabot -> {5}
[\w]{5}

{5} -> pontosan 5 darab 
{5,} -> 5-től végtelenig 
{5-10} -> 5-től 10-ig!!!!
* -> azt jelenti, hogy nulla vagy végetelen [\w]* 
? -> nulla vagy egy [\w]?
+ -> egy vagy végetelen [\w]+
+-nál minimum egynek kell lennie, de ha van egy akkor mehetünk végtelenig 

Voltak eddig az angol abc betűi, a digitek, word karakterek és a non-word karakterek és magának a stringnek a hosszúsága {4-6}

Mi van ha olyan sorrendben szeretnénk elfogadtatni vele a karakterek, ahogyan írtuk 
->
ha azt akarjuk vele elfogadtatni vele, hogy alma
(alma)
akkor egy ()-be kell belerakni!!!
ez egy úgynevezett capturing group 
Ez így elfogadja azt, hogy alma de azt, hogy amla vagy mlaa azokat már nem!!!

Ha el szeretnénk fogadtatni azt, hogy alma és körte -> (alma|körte)
ilyen ha | jelet írunk (vagy jel) el fogja fogadni az almát és a körtét is 

(alma|körte|barack) -> elfogadja mind a hármat, ezeket már bármilyen sorrendben 
***********
Mi van akkor ha elfogadtatom a számokat, de pont 4-et utána meg azt a szót, hogy alma meg körte 
-> 
[\d]{4}(alma)(körte)
ilyenkor kialakult egy úgynevezett capturing group 
-> 
Match1 0-13 1234almakörte
Group1 4-8 alma
Group2 8-13 körte 
Itt kialakult egy match, tehát találat és 2 darab capturing group 
Mit jelent ez a capturing group 
->
A legtöbb progromazási nyelvben külön lehívható, ennek akkor van értelme ha külön szét akarunk szedni egy string-et de közben meg 
szeretnénk valid-álni is pl. az email címeknél külön tudjuk szedni a felhasználónevet, domain nevet és a domain végződést 
ha ezekre külön-külön szükségünk lenne 
******************************************************************************************************
Megpróbálunk validálni egy dátumot -> 1996-10-15
ezt most direkt belerakjuk egy capturing group-ba, tehát a () nem lenne muszáj 
négy darab digit utána van egy kőtőjel utána digit 2 darab megint kőtőjel és megint digit 2 darab 
([\d]{4})\-([\d]{2})\-([\d]{2})
Match 1 0-10 1996-10-15
Group1 0-4   1996
Group2 5-7   10
Group3 8-10  15
Ezt most ()-val ugye 3-felé szedtük, tehát van egy matchünk és 3 group (év, hónap, nap)

Ha valamelyik group-ot nem szeretnénk, akkor ?: 
pl.
(?:[\d]{4})\-([\d]{2})\-([\d]{2})
Match 1 0-10 1996-10-15
Group1 5-7   10
Group2 8-10  15

és ugyanugy meg tudjuk szüntetni az összes group-ot
->
(?:[\d]{4})\-(?:[\d]{2})\-(?:[\d]{2})

Miért csináltunk belöle egy capturing group-pt ha utána megszüntettük, mert ez így is müködhet 
-> 
[\d]{4}\-[\d]{2}\-[\d]{2}
és akkor ez lesz a dátumvalidációnk!!!!!!!!!!!!!!!!!
Regex csak formátumot vizsgál nem pedig értéket 
de elmagyarazas.js
*****************************
Email címek ellenőrzése 
kovacs.oliver1989@gmail.com
sanyi_akiraly@citromail.hu

([\w\.\-\_]{0-255})\@([\w\.\-\_]{0-255})\.([\w]{2,})
mit fogadunk el az email címekben 
1. 
- word karakterek 
- pont, kőtőjel, alsóvonás [\w\.\-\_]
ezekből lehet 0-255-ig {0-255}
2.
ezt követően van egy @ \@
3.
van egy domain név (naggyából ugyanaz, mint az első) -> ([\w\.\-\_]{0-255})
4. 
van egy pont . \.
5. 
egy domain végződés, ami lehet word karakter, minimum 2  -> ([\w]{2,})

ez lesz a végső -> ([\w\.\-\_]{0-255})\@([\w\.\-\_]{0-255})\.([\w]{2,})
ilyen capturing group-okkal 
Match 1   0-27   kovacs.oliver1989@gmail.com
Group 1   0-17   kovacs.oliver1989
Group 2   18-23  gmail
Group 3   24-27  com
*/