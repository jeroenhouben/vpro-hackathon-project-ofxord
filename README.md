
## Boilerplate code voor hackathon

Voor de hackathon van december 2015 hebben we vast wat boilerplate code geschreven die het mogelijk maakt om snel iets te kunnen doen met het [Project Oxford van Microsoft](https://www.projectoxford.ai/).

De code bestaat uit een simpele backend (Node JS) en frontend (js/html/css) code.
Backend (`server.js`) is weinig meer dan een proxy, die de gemaakte browser request doorstuurt naar de Project Oxford Rest API.

### Waarom code voor een proxy?

Als in de REST API docs staat dat je een POST request moet doen naar `https://api.projectoxford.ai/face/v0/detections?analyzesFaceLandmarks` dan kan dat vanuit een browser niet zomaar vanwege cross site scripting enzo. Dit servertje zorgt ervoor dat je de de API wel aan kunt roepen maar dan via de lokale server op: `http://localhost:5050/oxford-api-proxy/face/v0/detections?analyzesFaceLandmarks`.

### REST API

Op dit moment is wordt alleen stukje van de Face detection API aangeroepen, maar dit is eenvoudig uit breiden.

De lokale server draait standaard op `http://localhost:5050`. Je kunt daar mbv XmlHttpRequest requests doen naar `/oxford-api-proxy` welke worden voorzien van de juiste headers en API KEY. Vevrolgens wordt hij doorgestuurd naar het REST endpoint `https://api.projectoxford.ai/`

De documentatie van de REST endpoints is te vinden op: https://www.projectoxford.ai/doc/

De resultaten (JSON) worden weer doorgestuurd naar de browser.

### Installeren

Je moet NodeJS 4.x op je computer hebben. Zoek zelf maar uit hoe je dat doet :)
vervolgens heb je NPM nodig, maar dat is meestal al mee geinstalleerd met Node JS.

```
1. clone deze repo
2. cd into/de/repo
3. npm install
4. npm install -g nodemon (zodat changes aan de server code meteen beschikbaar zijn, zonder server reboot)
5. nodemon server.js
```

Ga naar [http://localhost:5050](http://localhost:5050) en selecteer een plaatje waar een paar personen goed op staan met hun gezicht


