# Documentatie voor contributers
Wachtwoord en gebruikers id worden gebruikt als authenticatie tot de backend. Ze worden opgeslagen in session storage.<br>
Voorbeeld code voor credentials op te vragen en als ze niet bestaan de gebruiker naar /login sturen:<br>
```
let userArr //Normaal formaat: ["gebruikers naam", "wachtwoord", id, niveau]
  try{
    userArr = JSON.parse(sessionStorage.getItem("user"))
    if(userArr.length != 4){
      throw new Error("Session storage niet in juiste fomaat.")
    }
  }catch{
    document.location = "/login"
  }
```
<br>
Voor parameters die je vooraf nodig hebt voor je pagina mag je zelf specifiëren of het via een staat of via een url parameter is dat je ze gebruikt.<br>

### Aanvraag api voor backend
Je kan de soort data die je nodig hebt aanvragen in het api.txt bestand, tot dat het geïmplementeerd is zal je wel gebruik moeten maken van voorbeeld data, geef desnoods de uml aan chatgpt en vraag aan hem om voorbeeld data aan te maken.
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=17411618&assignment_repo_type=AssignmentRepo)
