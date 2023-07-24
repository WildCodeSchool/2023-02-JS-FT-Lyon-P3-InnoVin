# Inovin 🍷

Welcome to "Inovin", the last group project we had to do for our 5-months training as web developers. Our team of 3, including [Vanessa](https://github.com/VanessaGrd), [Yann](https://github.com/LocoBajo) and [Guillaume](https://github.com/Wraethh) have developped this app within 6 weeks to answer the need of a real client.

## 📝 Description

"Inovin" is a web application created to be used during a wine tasting and creation workshop in order to assist the animator by providing a support to the participants for registering their user infos, the score they give to the wines they have to taste or the recipes they create.
It also provides an administrator panel, allowing said admin to manage the wines, sessions or users.

## 💻 Development

Let's get technical.
We started developing from [this template](https://github.com/WildCodeSchool/js-template-fullstack)

### 📚 Stack

- This project was made using **React** and **MUI**.
- For the backend, we used **Express** with a **MVC** schema as a framework for **Node.js**.
- We handled data through a database created with **MySQL**.
- We used **Figma** to sketch the application
- We made a draft for the CDM for our database with **Excalidraw**, then we modeled it on **MySQL Workbench**.
- We applied **Agile** methodology, more precisely **Scrum**, and wrote user stories that we organized via **Trello**.
- Finally, we stayed organized by versionning our work with **Git** and **GitHub**.

### 📦 Packages

This is what we used on the frontend :

- _mui_ : for the react components
- _mui/icons-material_ : for the icon library
- _mui/x-data-grid_ : to display and manage data for the admin
- _axios_ : to make HTTP requests
- _chart.js_ and _react-chartjs-2_ : to create pretty charts for the admin dashboard
- _date-fns_ : to handle date format
- _formik_ : to handle the form logic
- _yup_ : to handle form validation
- _react-slider_ : to have an interactive way of selecting wine dosage
- _react-toastify_ : for toast display
- _react-router-dom_ : to handle navigation
- _prop-types_ : to verify props

Concerning the backend side, we used :

- _argon2_ : to hash passwords and verify them
- _cookie-parser_ : to manage data passed to cookies
- _cors_ : to handle CORS logic
- _dotenv_ : to handle environment variables
- _jsonwebtoken_ : to create authentication tokens
- _mysql2_ : for SQL requests
- _yup_ : for backend data validation

## ⚙️ Setup & Use

### 🪟 Windows users

Be sure to run these commands in a git terminal to avoid [issues with newline formats](https://en.wikipedia.org/wiki/Newline#Issues_with_different_newline_formats):

```
git config --global core.eol lf
git config --global core.autocrlf false
```

### 🚀 Project Initialization

- In VSCode, install plugins **Prettier - Code formatter** and **ESLint** and configure them
- Clone this repo, enter it
- If you are using `yarn` or `pnpm`, adapt the `config/cli` in `package.json`
- Run command `npm install`
- _NB: To launch the backend server, you'll need an environment file with database credentials. You'll find a template one in `backend/.env.sample`_

### ⌨️ Available Commands

- `migrate` : Run the database migration script
- `dev` : Starts both servers (frontend + backend) in one terminal
- `dev-front` : Starts the React frontend server
- `dev-back` : Starts the Express backend server
- `lint` : Runs validation tools, and refuses unclean code (will be executed on every _commit_)
- `fix` : Fixes linter errors (run it if `lint` growls on your code !)

## ❓ FAQ

### 🛠️ Tools

- _Concurrently_ : Allows for several commands to run concurrently in the same CLI
- _Husky_ : Allows to execute specific commands that trigger on _git_ events
- _Vite_ : Alternative to _Create-React-App_, packaging less tools for a more fluid experience
- _ESLint_ : "Quality of code" tool, ensures chosen rules will be enforced
- _Prettier_ : "Quality of code" tool as well, focuses on the styleguide
- _ Airbnb Standard_ : One of the most known "standards", even though it's not officially linked to ES/JS
- _Nodemon_ : Allows to restart the server everytime a .js file is udated

### 🌐 Deployment

For deployment, you have to go to `secrets` → app `actions` on the github repo to insert via `New repository secret` :

- CAPROVER_BACK_APPNAME : name app on caprover
- CAPROVER_FRONT_APPNAME : name app on caprover
- CAPROVER_PASSWORD : password caprover
- CAPROVER_SERVER : link of domain

## 🖼️ Screenshots

![Home page - portrait](/frontend/src/assets/screenshots/inovin4.png)
![Menu page - landscape](/frontend/src/assets/screenshots/inovin5.png)
![Profile page - landscape](/frontend/src/assets/screenshots/inovin6.png)
![Recipe page - portrait](/frontend/src/assets/screenshots/inovin7.png)
![Admin home page - portrait](/frontend/src/assets/screenshots/inovin1.png)
![Admin wine page - portrait](/frontend/src/assets/screenshots/inovin2.png)
![Admin recipe page - landscape](/frontend/src/assets/screenshots/inovin3.png)
