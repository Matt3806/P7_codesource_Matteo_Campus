# Groupomania

Groupomania est un réseau social interne moderne, qui a pour objectif
de donner un outil aux employés de l'entreprise permettant de se connaître dans un cadre plus informel.


### Prérequis

Ce projet necessite l'installation de:

- nodeJS : https://nodejs.org/fr/

- Mysql : https://dev.mysql.com/downloads/installer/ (workbench et community server au minimum)


### Installation

1) cloner le repo 

```
git clone https://github.com/Matt3806/P7_codesource_Matteo_Campus.git
```

2) installer les dépendances frontend et backend :

```
npm install 
```

3) dans le dossier backend renomer les fichiers config-exemple, images-exemple et .env-exemple en supprimant "-exemple"

4) dans Mysql workbench créer un nouveau schéma et l'appeler database_development (cf. config)

5) à partir du fichier backend migrer la base de donnée

```
sequelize db:migrate
```

(si un problème survient il se peut que ce soit car Mysql2, sequelize ou sequelize-cli n'est pas installé en Global)

```
npm install -g mysql2
npm install -g sequelize
npm install -g sequelize-cli
```

6) lancer le server depuis le backend 

```
node server
```

ou

```
nodemon server
```

(si un problème survient il se peut que ce soit car nodemon n'est pas installé en Global où que l'invit de commande ne soit pas lancé avec suffisament de permission -> lancer l'invit de commande en mode admin)

en cas de réussite la console affiche le message suivant :

```
Listening on port 8080
Executing (default): SELECT 1+1 AS result
database connected
```

7) lancer le serveur de developpement front end

```
npm start
```


## Built With

-- frontend 
* [ReactJs](https://fr.reactjs.org/) - framework javaScript frontend
* [MaterialUi](https://mui.com/) - librairie de composant react
* [React-atuh-kit](https://authkit.arkadip.dev/v2.1.4/) - librairie d'authentification react
* [useForm](https://react-hook-form.com/api/useform/) - librairie de gestion de formulaire react
* [React-router-dom](https://reactrouter.com/en/main) - router côté client
* [Jwt-decode](https://www.npmjs.com/package/jwt-decode) - decodeur de token
* [Axios](https://axios-http.com/fr/docs/intro) - client HTTP 

-- backend
* [ExpressJs](https://expressjs.com/fr/) - framework javaScript backend
* [Sequelize](https://sequelize.org/) - Orm mysql
* [bcrypt](https://www.bcrypt.fr/) - hash
* [dotenv](https://github.com/motdotla/dotenv#readme) - gestion de variables d'environnement 
* [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme) - gestionnaire de token
* [multer](https://github.com/expressjs/multer#readme) - middleware de gestion des multipart/formdata
* [passwordvalidator] (https://github.com/tarunbatra/password-validator#readme) - middleware de validation de mot de passe
* [helmet](https://helmetjs.github.io/) - protection http


## Auteur

* **Matteo Campus**  - [Github](https://github.com/Matt3806)