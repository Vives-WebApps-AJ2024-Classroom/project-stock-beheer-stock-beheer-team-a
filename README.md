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

### Aanvraag api voor backend
Je kan de soort data die je nodig hebt aanvragen in het api.txt bestand, tot dat het geïmplementeerd is zal je wel gebruik moeten maken van voorbeeld data, geef desnoods de uml aan chatgpt en vraag aan hem om voorbeeld data aan te maken.
