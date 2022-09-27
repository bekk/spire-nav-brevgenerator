# spire-nav-brevgenerator

Spire-nav-brevgenerator er en pakke som tilbyr komponenten _Brevgenerator_. Denne komponenten lager et skjema basert på brevmaler definert i Sanity, og etterhvert som skjemaet fylles ut populeres en forhåndsvisning av et vedtaksbrev.

Denne guiden forklarer først hvordan man tar i bruk den publiserte pakken i eget prosjekt. Til slutt forklares det hvordan man kan videreutvikle pakken, inkludert kjøre og teste lokalt:

-   [Kom i gang](#kom-i-gang)
-   [Hvordan bruke brevgenerator-pakken](#hvordan-bruke-brevgenerator-pakken)
-   [Videreutvikling av pakken](#videreutvikling-av-pakken)

<a name="kom-i-gang"></a>

## Kom i gang

### Autentisering

For å kunne ta pakken i bruk må man være medlem av teamet _spire@nav22_ på github og følge følgende steg:

1. Generer en _personal access token_ som kan lese fra pakker (se [Creating a personal access token](https://docs.github.com/en/enterprise-server@3.4/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-token))
2. Legg toket ditt inn i din lokale `.npmrc`-fil:
    - `vim ~/.npmrc`
    - Trykk `o` for å skrive
    - Legg til `//npm.pkg.github.com/:_authToken=DITT_TOKEN`
    - esc + `:wq` for å lagre og lukke filen

### Installering

Benytt følgende kommando for å installere pakken i ditt eget prosjekt:

```
npm install @bekk/spire-nav-brevgenerator
```

<a name="hvordan-bruke-brevgenerator-pakken"></a>

## Hvordan bruke brevgenerator-pakken

Pakken tilbyr en komponent som kan importeres og brukes i ditt prosjekt på følgende måte:

```javascript
import React from 'react';
import BrevGenerator from '@bekk/spire-nav-brevgenerator';

function App() {
    const sanityBaseURL = `https://${prosjektid}.api.sanity.io/v2021-10-21/data/query/${datasett}`;

    return <BrevGenerator sanityBaseURL={sanityBaseURL} />;
}

export default App;
```

Legg merke til at `sanityBaseURL` må sendes med som en prop til komponenten. Dette er en link på følgende format:

```
https://${PROSJEKT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASETT}
```

### Sanity

Brevgeneratoren baserer seg på en spesifikk sanity-struktur og sanity må derfor settes opp på en av følgende måter:

1. Bruk eksisterende sanity studio (se informasjon under)
2. Benytt [eksisterende kode](https://github.com/bekk/spire-nav-sanity) for å sette opp eget sanity-studio.

**Bruke eksisterende sanity studio:**

```javascript
const datasett = production;
const prosjektid = 'nrbknng4';
const sanityBaseURL = `https://${prosjektid}.api.sanity.io/v2021-10-21/data/query/${datasett}`;
```

<a name="videreutvikling-av-pakken"></a>

## Videreutvikling av pakken 👩‍💻

### Kom i gang

Klon prosjektet:

```
git clone git@github.com:bekk/spire-nav-brevgenerator.git
```

Installer alle nødvendige pakker:

```
npm install
```

Brevgeneratoren kan nå brukes, men for å å se endringene man gjør under utviklingen er man nødt til å ta den i bruk i en react-applikasjon.

### Kjøre pakken lokalt

Når man videreutvikler pakken kan det være greit å ha muligheten til å teste ut ny funksjonalitet før man publiserer en ny versjon av pakken. Dette kan gjøres ved å lage en enkel test-klient som importerer pakken, eller bruke vår [test-klient](https://github.com/bekk/spire-nav-klient).

For å starte pakken lokalt må man:

1. Bygge prosjektet for å lage en _./dist_ mappe (kun nødvendig første gang pakken skal startes)

```
npm run build
```

2. Start pakke med en kobling mot testklienten

```
npm run build:dev --path="path to testklient"
```

NB! Pakken vil nå lytte på endringer i typescript-filer, og vise endringene i testklienten fortløpende. Dersom man gjør endringer på andre fil-typer må prosjektet bygges på nytt.

### Lage pull request

Før du lager PR må du sjekke at du har unikt versjonsnummer i package.json fila. Dette kan settes manuelt eller ved å kjøre:

```
npm version patch
```

### Publisere ny versjon av pakken

En ny versjon av pakken vil publiseres når kode pushes til main.
