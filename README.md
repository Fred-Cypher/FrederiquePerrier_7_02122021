# Groupomania 

***

**Projet 7** du parcours **Développeur Web d'OpenClassRooms**.

Le but de ce projet est de créer un MVP (Minimum Viable Produit) d'un réseau social d'entreprise, permettant aux employés de partager des images ou des articles, et d'y réagir.

*** 

Clonez ce repository pour pouvoir le faire fonctionner sur votre ordinateur.

### Prérequis 

Pour que le MVP puisse fonctionner correctement, il faut au préalable installer sur votre machine :
* Git
* Node.js
* MySql

## Frontend

La partie frontend est développée avec le framework React. 

Placez-vous dans le dossier "frontend" dans votre terminal, installez les dépendances en tapant `npm install` puis lancez-le en tapant `npm start`. 

## Backend

Dans un autre terminal, placez-vous dans le dossier "backend", puis tapez `npm install`. Les dépendances nécessaires seront installées. Vous pouvez le lancer en tapant `nodemon serve` ou `node server` si vous n'avez pas nodemon installé. 


## Base de données

La base de données Sql est reliée grâce à l'ORM Prisma. Pour la créer sur votre serveur local, et l'ouvrir par exemple avec PhpMyAdmin, suivez les recommandations de la documentation Prisma : https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-node-mysql :
* modifiez tout d'abord le nom du ficher `.env.example` dans le dossier backend en `.env`
* remplacez-y `"mysql://johndoe:randompassword@localhost:5432/mydb?schema=public"` par vos identifiants personnels comme suit :
    * `mysql://user:password@host:port/database`
        * `user` : votre nom d'utilisateur pour la base de données
        * `password` : votre mot de passe pour la base de données
        * `host` : le serveur, ici normalement `localhost`
        * `port` : le port sur lequel tourne le serveur de votre base de données (généralement 3306 pour MySQL)
        * `database` : le nom de votre base de données
* initialisez la base de données en tapant `npx prisma migrate dev --name init` dans votre terminal. Attention, ne modifiez pas `name` pour le remplacer par le nom de votre base de données, laissez `name`, Prisma va récupérer de lui-même le nom renseigné dans l'adresse de la base de données. 

Normalement, la base de données relationnelle est maintenant créée et accessible quand votre serveur est lancé.

Vous pouvez accéder à la base de données depuis PhpMyAdmin par exemple, ou directement depuis votre éditeur de code en tapant `npx prisma studio` depuis votre terminal (toujours placé dans le dossier backend). 

## .ENV
Dans le fichier `.env` récemment renommé, modifiez la phrase secrète pour celle de votre choix pour le `TOKEN`. 


## Compétences évaluées :
* Authentifier un utilisateur et maintenir sa session
* Personnaliser le contenu envoyé à un client web
* Gérer le stockage de données à l'aide de SQL
* Implémenter un stockage de données sécurisé en utilisant SQL

## Technologies utilisées :
* Node.js
* React
* MySQL
* Bootstrap
* Prisma (ORM)


### Avertissement :
Toutes les fonctionnalités du MVP ne sont pas encore mises en place, elles le seront dans la V2 qui sera réalisée et mise en ligne un peu plus tard. 
