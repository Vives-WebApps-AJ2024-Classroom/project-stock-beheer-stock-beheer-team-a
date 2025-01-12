De frontend werdt aangemaakt met de create-react-app tool.\
\
Na de login pagina:\
We kunnen zien met welk mail adres je bent ingelogd in de code, dan gaan we volgens dat een standaard wachtwoord gebruikers id toekennen aan de gebruiker (die ook geregistreerd zijn in de database), zodat je dan kan geäuthenticeerd worden voor requests naar de backend, het gebeurt in de volgende manier: *@student.vives.be = student, *@vives.be = admin, Dan wordt dit gebundeld met gebruikersnaam, niveau en projectid in een array en wordt dat gestoken in localstorage zodat je er in elke pagina gemakelijk aan kan en omdat je dan niet meer hoeft opnieuw in te loggen als je een nieuwe sessie start.\
De functie om dit in code op te halen zit in page-tools.js, in dat bestand zit er ook nog een functie die wordt gebruikt om requests te maken, dus dit is een bestand die alles bevat om met de server te verbinden.Daarnaast heb je in app.js een router met devolgende routes:
```
        <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<WelcomePage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/geenToegang" element={<GeenToegang />} />
            <Route path="/bestelling/:projectId" element={<BestellingPlaatsen />} />
            <Route path="/bestelling/:projectId/:bid" element={<BestellingPlaatsen />} />
            <Route path="/groepsIndeling" element={<GroepsIndeling />} />
            <Route path="/logPagina" element={<LogPagina />} />
            <Route path="/projectCreatie" element={<ProjectCreatie />} />
            <Route path="/project/:projectId" element={<Project />} />
            <Route path="/winkels" element={<Winkels />} />
            <Route path="/proOverzicht" element={<ProOverzicht />} />
        </Routes>
```
En ook een menubalk die andere inhoud heeft voor ieder niveau van de gebruiker.\
Deze paginas zijn simpele JSX functies die gebruik maken van states, en ook verbinding leggen met de backend, en hier en daar nog dummy data bevat moets de backend niet draaien.     