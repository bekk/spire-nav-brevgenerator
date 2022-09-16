# spire-nav-brevgenerator

## Lage PR

Før du lager PR må du sjekke at du har unikt versjonsnummer i package.json fila. Dette kan settes manuelt eller ved å kjøre `npm version patch`

## Teste pakken lokalt

Om du ønsker å teste brevgeneratoren lokalt i spire nav klienten må følgende kommandoer brukes:

### Første gang man starter applikasjonen

1. Bygg prosjektet for å lage en ./dist-mappe
   `npm run bulid`

2. Start prosjekt med en kobling mot testklienten:
   `npm run build:dev --path="path to spire-nav-klient"`

### Videre

Siden ./dist mappen nå eksisterer trenger man kun å bruke følgende kommando for å kjøre koden:
`npm run build:dev --path="path to spire-nav-klient"`
