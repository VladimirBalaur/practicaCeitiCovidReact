# React COVID Tracker
Aceasta lucrare a fost realizata in cadrul stagiului de practica al ceiti.

Scopul lucrarii a fost consolidarea generala a cunostintelor de React, si inlocuirea unor vechi practici de a utiliza back-end in scopurile care pot fi efectuate mult mai rapid si eficient prin intermediul front-end technologies

In cadrul lucrarii date am studiat urmatoarele chestii: Utilizarea unor librarii Grafice noi pentru usurarea lucrului asupra generarii componentelor vizuale, cum ar fi Material UI sau Leaflet, React-charts etc.

Utilizarea acestor librarii a simplificat cu mult lucrul, astfel incat pe durata realizarii acestui proiect, nu am fost nevoiti sa ne focusam asupra unor task-uri minore cum ar fi, machetarea componentelor ,stilizarea, proiectarea acestora, ci definirea logicii aplicatiei.

Aplicatia data utilizeaza, in calitate de back-end, un API care furnizeaza datele necesare privind cazurile de covid la nivel global. In cadrul aplicatiei, utilizam diverse fetch call-uri spre acest API, astfel am putut consolida cunostintele privind:
1) Analiza unui API, datele ce le furnizeaza, downtime-urile, posibilitatile de extindere etc.
2) Prelucrarea acestora date pentru configurarea acestora in corcondanta cu necesitatile noastre
3) Realizare streaming-ului de date pentru initializarea starilor si proprietatilor componentelor.

In cadrul aplicatiei, am studiat concepte fundamentale ale React JS, care constau in utilizarea Hook-urilor pentru componentele de tip Functie.
Astfel, principalele hook-uri utilizate au fost: useState si useEffect care mi-au revolutionat modul de lucru cu react Js, astfel renuntand in totalitate la utilizarea componentelor Clasa pe viitor, dat fiind faptul ca hook-urile au simplificat modul de lucru cu componentele in React Js

De asemenea, in cadrul lucrarii date, am studiat si documentatia librariilor utilizate, astfel seful responsabil pe ghidarea mea in perioada practicii mi-a sugerat librariile pe care le-am putea folosi, revenindu-mi sarcina de a analiza documentatia acestora, si a decide care librarii le vom utiliza, studiind avantajele, dezavantajele, optiunile acestora, costuri etc. Dupa studierea librariilor, am convenit cu seful de practica sa analizam structura ulterioara a aplicatiei, cum vom integra aceste module, astfel incat o buna parte a timpului a fost alocata pentru "gandirea aplicatiei".

In procesul de analiza a structurii ulterioare a aplicatiei, am aflat un concept nou utilizat frecvent in cadrul proiectelor din production. Acela de a defini
un modul aparte pentru functii auxiliare. Discutand cu seful de practica, am convenit ce functii noua ne-ar trebuie la fiecare etapa de definire a componentelor, astfel fiind preocupat in prealabil de crearea acestor functii, cum ar fi: 
- functii de formatare a numerelor cu libraria numeral
- functii de sortarea a obiectelor obtinute in baza datelor din API
- Obiecte de cofigurare, care implementeaza principiile SOLID de definire a codului( obiectul ce contine date despre anumite culori folosite la definirea obiectelor hartii, in dependenta de numarul de cazuri)
- Functii de legatura intre API si rendering-ul datelor pe harta 

De asemenea, in cadrul stagiului de practica am studiat si principiile SOLID de creare a proiectelor, astfel incat, pe durata lucrului, am fost nevoit de nenumarate ori sa sterg codul scris si sa reimplementez codul in maniera SOLID pentru a elimina potentialele riscuri de neclaritate a codului, sau aparitia unor bug-uri minore, principalul principiu fiind Separation of Scopes, sau separarea scopului, definind logica fiecarui component intr-un modul aparte.

De asemenea, pentru claritatea codului, am fost nevoit sa utilizez si principul BEM pentru definirea selectorilor stilurilor CSS, intru-cat, crearea aplicatiilor react JS presupune definirea componentelor multiple, care utilizeaza anumite fisiere CSS, iar pentru a evita cazurile de neclaritati in definirea markup-ului componentelor la stabilirea claselor, sa utilizam denumiri descriptive, care indica apartenenta stilului catre component, scopul acestuia etc. Cum ar fi: .App-Container, .App-MapContainer, .App-MapContainer .CircleMap, etc. 

Spre final, pot afirma cu siguranta ca proiectul dat a fost un proiect extraordinar, care pe langa posibilitatea de a crea o aplicatie utila care va fi salvata in portofoliul meu pe viitor, mi-a oferit posibilitatea de a studia diverse concepte ale React JS, din prima incercare, fiind astfel pregatit suficient pentru crearea unor proiecte similare pe viitor.