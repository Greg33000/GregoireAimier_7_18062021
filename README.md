## GregoireAimier_7_18062021

Afin de faire fonctionner le projet :

1 - Cloner le répertoire "GregoireAimier_7_18062021"

2 - Côté Back-end (répertoire "backend") :
	- dans la console tappez: "npm install"
	- récupérer le fichier .env fourni et le coller dans le répertoire "backend"
	- créer un "user" (autre que "root") dans MySql et compléter les données du fichier .env : DB_USERNAME et DB_PASSWORD
	- Afin de créer et de compléter la base de données, tappez dans la console: "node create_db.js"
	- Enfin, lancez le server du backend via la console :"node server.js"
 
3 - Côté Front-end (répertoire "frontend") :
	- dans la console tappez: "npm install"
	- Compiler le projet front et lancer le serveur de développement en tappant sur la console: "npm run serve" 

Rendez-vous à cette adresse pour avoir accès à l'application web : http://localhost:8080/