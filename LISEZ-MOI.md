# Inovin 🍷

Bienvenue sur le projet "Inovin", le dernier projet de groupe que nous devions réaliser pour notre formation de développeur web de 5 mois.
Notre équipe de 3 personnes, composée de [Vanessa](https://github.com/VanessaGrd), [Yann](https://github.com/LocoBajo) et [Guillaume](https://github.com/Wraethh), a developpé cette application en 4 semaines pour répondre au besoin d'un véritable client.

## 📝 Description

"Inovin" est une application web créée pour être utilisé pendant des ateliers de dégustation et de création de vin avec pour objectif d'assister l'animateur de l'atelier en fournissant un support aux participants pour enregistrer leurs informations d'utilisateur, les notes attribuées aux vins goûtés ou encore les recettes créées.
L'application propose également une partie administrateur, permettant à l'admin de gérer ses vins, ses sessions ou encore ses utilisateurs.

## 💻 Développement

Parlons technique.
Nous avons commencé à développer à partir de [cette template](https://github.com/WildCodeSchool/js-template-fullstack)

### 📚 Stack

- Ce projet a été réalisé avec **React** et **MUI**.
- Pour le backend, nous avons utilisé **Express** avec un schéma **MVC** en tant que framework pour **Node.js**.
- Nous avons gérer les données à l'aide d'un base de données créée avec **MySQL**.
- Nous avons utilisé **Figma** pour réaliser une maquette de l'application.
- Nous avons réalisé un brouillon du MCD de notre base de données avec **Excalidraw**, que nous avons ensuite modélisé sur **MySQL Workbench**.
- Nous avons appliqué la méthode **Agile**, plus précisement **Scrum**, et avons rédigé des histoires utilisateur que nous avons organisé via **Trello**.
- Enfin, nous sommes restés organisé en versionnant notre travail avec **Git** et **GitHub**.

### 📦 Packages

Voici ce que nous avons utilisé pour la partie frontend :

- _mui_ : pour les composants React
- _mui/icons-material_ : pour la bibliothèque d'icônes
- _mui/x-data-grid_ : pour afficher et gérer les données accessibles à l'admin
- _axios_ : pour faire les requêtes HTTP
- _chart.js_ and _react-chartjs-2_ : pour créer des jolis graphiques pour le dashboard admin
- _date-fns_ : pour gérer le format de date
- _formik_ : pour gérer la logique des formulaires
- _yup_ : pour gérer la validation des formulaires
- _react-slider_ : proposer une façon interactive de sélectionner les dosages des vins
- _react-toastify_ : pour afficher des notifications
- _react-router-dom_ : pour gérer la navigation
- _prop-types_ : pour valider les props

En ce qui concerne le backend, nous avons utilisé :

- _argon2_ : pour hasher les mots de passes et les vérifier
- _cookie-parser_ : pour gérer les données qu'on passe aux cookies
- _cors_ : pour gérer la logique des CORS
- _dotenv_ : pour gérer les variables d'environnement
- _jsonwebtoken_ : pour créer les tokens d'authentification
- _mysql2_ : pour les requêtes SQL
- _yup_ : pour la validation des données dans le backend

## ⚙️ Configuration & Utilisation

### 🪟 Utilisateurs Windows

Assurez-vous de lancer ces commandes dans un terminal git pour éviter des [problèmes avec les formats de retour à la ligne](https://en.wikipedia.org/wiki/Newline#Issues_with_different_newline_formats):

```
git config --global core.eol lf
git config --global core.autocrlf false
```

### 🚀 Initialisation du projet

- Dans VSCode, installer les plugins **Prettier - Code formatter** et **ESLint** et les configurer
- Cloner ce repo et se placer dessus
- Si vous utilisez `yarn` ou `pnpm`, adapter la `config/cli` dans `package.json`
- Lancer la commande `npm install`
- _NB: Pour lancer le serveur backend, vous aurez besoin d'un fichier de variables d'environnement contenant les accès à une database. Vous en trouverez une template dans `backend/.env.sample`_

### ⌨️ Commandes disponibles

- `migrate` : Lance le script de migration de la database
- `dev` : Démarre les deux serveurs (frontend + backend) dans un seul terminal
- `dev-front` : Démarre le serveur frontend React
- `dev-back` : Démarre le serveur backend Express
- `lint` : Lance les outils de validation, et refuse le code mal nettoyé (s'exécute à chaque _commit_)
- `fix` : Corrige les erreurs de linter (lancez la si le `lint` fait des siennes !)

## ❓ FAQ

### 🛠️ Outils

- _Concurrently_ : Permet de lancer plusieurs commandes simultanément dans le même CLI
- _Husky_ : Permet d'éxecuter des commandes spécifiques qui se déclenchent avec des événements liés à _git_
- _Vite_ : Une alternative à _Create-React-App_, comprenant moins d'outils pour une expérience plus fluide
- _ESLint_ : Outil pour assurer la "qualité du code", et que les règles de dev choisies soient respectées
- _Prettier_ : Autre outil pour assurer la "qualité du code", plus spécialisé dans le guide de style
- _ Airbnb Standard_ : L'un des standards les plus connus, même s'il n'est pas officiellement lié à ECMAScript/Javascript
- _Nodemon_ : Permet de redémarrer le serveur à chaque fois qu'un fichier .js est mis à jour

### 🌐 Déploiement

Pour déployer le projet, vous devez aller dans `secrets` → app `actions` sur le repo Github via `New repository secret` :

- CAPROVER_BACK_APPNAME : nom de l'app sur CapRover
- CAPROVER_FRONT_APPNAME : nom de l'app sur CapRover
- CAPROVER_PASSWORD : mot de passe de CapRover
- CAPROVER_SERVER : lien vers le domaine

## 🖼️ Captures d'écran

![Home page - portrait](/frontend/src/assets/screenshots/inovin4.png)
![Menu page - landscape](/frontend/src/assets/screenshots/inovin5.png)
![Profile page - landscape](/frontend/src/assets/screenshots/inovin6.png)
![Recipe page - portrait](/frontend/src/assets/screenshots/inovin7.png)
![Admin home page - portrait](/frontend/src/assets/screenshots/inovin1.png)
![Admin wine page - portrait](/frontend/src/assets/screenshots/inovin2.png)
![Admin recipe page - landscape](/frontend/src/assets/screenshots/inovin3.png)
