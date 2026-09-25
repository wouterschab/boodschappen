# Onze boodschappen

Een gedeelde boodschappenlijst voor twee. Je typt wat er mee moet, de lijst sorteert
zichzelf in de looproute van een gemiddelde Albert Heijn, en afvinken in de winkel
zie je meteen op de andere telefoon. Werkt in elke browser, zonder account of app.

- **Pagina:** GitHub Pages (`index.html`, gewone HTML zonder build-stap)
- **Opslag en live bijwerken:** Firebase Firestore, gratis tier
- **Offline:** wijzigingen in de winkel zonder bereik worden verstuurd zodra er weer
  verbinding is

## Eenmalig instellen

### 1. Firebase-database (± 5 minuten)
1. Ga naar <https://console.firebase.google.com> en maak een project aan, bijvoorbeeld
   `boodschappen`. Google Analytics mag uit.
2. **Build → Firestore Database → Create database.** Kies locatie `eur3 (europe-west)`
   en start in *production mode*.
3. Tabblad **Rules**: vervang de inhoud door die van [`firestore.rules`](firestore.rules)
   en klik op **Publish**.
4. **Projectinstellingen (tandwiel) → Jouw apps → Web-app toevoegen (`</>`).** Geef een
   naam op; Hosting is niet nodig. Kopieer `apiKey`, `authDomain`, `projectId` en
   `appId` naar [`config.js`](config.js).

### 2. GitHub Pages
1. Push deze map naar een GitHub-repo (public; Pages is voor private repos betaald).
2. **Settings → Pages → Source: Deploy from a branch → `main` / root.**
3. Na een minuut staat de app op `https://<gebruiker>.github.io/<repo>/`.

### 3. Delen
Open de app. Er komt dan een lange code achter de link (`…/#k3j9…`): dat is jullie
lijst. Tik op **Deel link** en stuur die complete link naar de ander. Zet hem daarna
allebei op je beginscherm (Safari: Deel → Zet op beginscherm).

### Wat er bij het inrichten misging (25-09-2026)

Het project is `boodschappen-ws-7lum3`, het Firebase-abonnement is Spark (gratis). De
regels zet je opnieuw neer met `npx firebase-tools deploy --only firestore:rules`.

- `firebase projects:create` maakte wel het Google Cloud-project aan, maar het
  koppelen van Firebase gaf `403 The caller does not have permission`. Het lag niet
  aan de voorwaarden: die kwamen in de console niet eens in beeld. Nadat de console
  één keer was geopend, werkte `projects:addfirebase` bij de volgende poging wel.
- Met `firestore:databases:create` lukte het niet (`Cloud Firestore API has not been
  used`). Rules deployen zet die API niet aan. De database is daarom via de console
  aangemaakt (Firestore → Create database).
- De console vroeg om een betaald abonnement zodra het Database-ID iets anders was dan
  `(default)`. Alleen `(default)` valt binnen het gratis quotum, en de app gebruikt
  ook alleen die.
- Na een push duurt het ongeveer een minuut voordat GitHub Pages de nieuwe versie
  serveert. Daarna kan een browser nog de oude versie uit de cache tonen.

## Hoe het sorteren werkt

Er zit geen AI in. `index.html` bevat per pad een lijst trefwoorden. Voor een nieuw
product wint het **langste** trefwoord dat in de naam voorkomt, zodat "pindakaas" naar
Ontbijt gaat en niet naar Kaas. Trefwoorden van drie letters of minder tellen alleen
als los woord, anders belandt "fruit" bij de uien ("ui") en "rijst" bij het ijs.
Aantallen en eenheden ("2 pakken", "500g") worden eerst weggehaald.

Wat niet herkend wordt komt onder **Overig**. Verplaats je een product met het
pijltjes-icoon, dan wordt dat opgeslagen in `meta/aisles` en geldt het voortaan voor
jullie allebei. Die keuze gaat altijd voor de woordenlijst.

## Keuzes en waarom

- **Firestore en niet de GitHub API als opslag.** Schrijven naar een repo vanuit de
  browser vraagt om een token. Dat token zou dan openbaar in de pagina staan, of Pien
  zou zelf een GitHub-account en token nodig hebben.
- **Geen login, wel een geheime link.** De code in de link (24 tekens, ~124 bits) is
  de enige toegang. De regels staan niet toe dat iemand opvraagt welke lijsten er
  bestaan. Voor een boodschappenlijst is dat genoeg. Lekt de link toch uit, open de app
  dan zonder `#…` in een privévenster: je krijgt een nieuwe, lege lijst met een nieuwe
  code.
- **`config.js` staat gewoon in de repo.** Een Firebase-webconfig is geen geheim; wat
  mag, bepalen de regels.
- **Eerste versie was een claude.ai-artifact** (25-09-2026). Dat is afgevallen omdat
  Pien dan een claude.ai-account nodig had.
