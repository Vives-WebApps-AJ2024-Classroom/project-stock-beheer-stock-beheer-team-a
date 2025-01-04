# Project stock beheer

## Setup
Navigeer naar de frontend en backend map, en doe ik enkel map 
```
npm install 
```
Hierna in de frontend map ( na het invoeren van uw eigen key in het .env bestand ) voer je deze twee commando's uit : 

```
npm run build
serve -s build
```

Om de server te starten in de backend map, voert u deze commando uit ( na het correct instellen van de .env in deze map ) : 

```
node index.js
```

Laad volgende bestanden in op de databank:
- backend/database/mysqldb.sql                      //credentials mogen aangepast worden
- backend/database/voorbeeldGebruikers.sql          //deze voor authenticatie tests, huidige configuratie

pas (indien nodig) .env bestanden aan:\
frontend/.env (voorbeeld):
- REACT_APP_PHPMYADMIN_URL=http://localhost:8080
- REACT_APP_BACKEND_URL=http://localhost:3001/api/
- REACT_APP_CLERK_PUBLISHABLE_KEY=pk_test_c3RpcnJlZC11bmljb3JuLTQ1LmNsZXJrLmFjY291bnRzLmRldiQ (uw eigen key)

backend/.env (voorbeeld):
- DB_HOST=127.0.0.1
- DB_USER=stock
- DB_PASS=stock
- DB_DTBS=stock-beheer
- DB_PORT=3306

## Huidige situatie met authenticatie
Omdat we geen wachtwoorden van de gebruikers kunnen krijgen uit Clerk moeten we met een soort van hardcoded wachtwoord werken voor alle gebruiker. Er wordt nu een random wachtwoord aangemaakt van 12 karakters lang. Deze wordt gehasht en bij de user in de MYSQL database gestoken. Ook hebben we ervoor gekozen dat men enkel kan inloggen met hun vives e-mailadres dus voor de student is dit "@student.vives.be" en voor de docenten "@vives.be". Aan de hand van het e-mailadres wordt het niveau (rol) toegewezen.  \
De docker compose is voorzien van standaard variabelen/configuratie maar mag je zeker aanpassen.\
Verder zijn er wel nog features die nog niet geïmplementeerd zijn zoals bepaalde routes in de backend.\
Dus nog niet bruikbaar op dit moment.

## Documentatie voor contributers
Wachtwoord en gebruikers id worden gebruikt als authenticatie tot de backend. Ze worden opgeslagen in session storage.<br>
Voorbeeld code voor credentials op te vragen:<br>
```
import { CheckUserLS, apiURL } from '../page-tools';
...
let userArr = checkUserLS()
```
<br>
Voor parameters die je vooraf nodig hebt voor je pagina mag je zelf specifiëren of het via een staat of via een url parameter is dat je ze gebruikt.<br>

### iets registreren in de log
```
const log = require("./logController")
...
log.logQuery("mysql query", uitvoerende gebruiker, bijhorende bestelling, bijhorend project)

//Je kan de querry opvragen op deze manier:
let exe = db.query( ... {

    exe.sql //bevat query
})

```
### Aanvraag api voor backend
Je kan de soort data die je nodig hebt aanvragen in het api.txt bestand, tot dat het geïmplementeerd is zal je wel gebruik moeten maken van voorbeeld data, geef desnoods de uml aan chatgpt en vraag aan hem om voorbeeld data aan te maken.
