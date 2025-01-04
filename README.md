# Setup
Laad volgende bestanden in op de databank:
- backend/database/mysqldb.sql                      //credentials mogen aangepast worden
- backend/database/voorbeeldGebruikers.sql          //deze voor authenticatie tests, huidige configuratie

voorzie .env bestanden:\
frontend/.env (voorbeeld):
- REACT_APP_PHPMYADMIN_URL=http://localhost:8080
- REACT_APP_BACKEND_URL=http://localhost:3001/api/
- REACT_APP_CLERK_PUBLISHABLE_KEY=pk_test_c3RpcnJlZC11bmljb3JuLTQ1LmNsZXJrLmFjY291bnRzLmRldiQ
backend/.env (voorbeeld):
- DB_HOST=127.0.0.1
- DB_USER=stock
- DB_PASS=stock
- DB_DTBS=stock-beheer
- DB_PORT=3306

# Huidige situatie met authenticatie
Omdat we geen wachtwoorden van de gebruikers kunnen krijgen uit Clerk moeten we met een soort van hardcoded wachtwoord werken voor alle gebruiker, dit is niet veilig en we zijn ons daarvan bewust, moest dit project echt geïmplementeerd worden (voorzichtig voor bugs) dan zou er misschien een ander authenticatie systeem moeten voorzien worden of iets extra tussen Clerk en de site.\
De docker compose is voorzien van standaard variabelen/configuratie maar mag je zeker aanpassen.\
Verder zijn er wel nog veel features die nog niet geïmplementeerd zijn zoals bepaalde routes in de backend.\
Dus nog niet bruikbaar op dit moment.

# Documentatie voor contributers
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
