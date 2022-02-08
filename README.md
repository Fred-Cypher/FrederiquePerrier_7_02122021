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

La base de données Sql est reliée grâce à l'ORM Prisma. Pour la créer sur votre serveur local, et l'ouvrir par exemple avec PhpMyAdmin, suivez les recommandations de la documentation Prisma : https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-node-mysql, en modifiant le fichier `.env.example` du dossier "backend" et en y remplaçant `"mysql://root:randompassword@localhost:3306/mydb"` par vos identifiants personnels, puis modifiez le nom du fichier par `.env`. Vous pouvez ensuite créer la base de données à partir de votre terminal grâce à la commande `npx prisma migrate dev --name init`, la base de données relationnelle sera désormais accessible, quand votre serveur est lancé, dans PhpMyAdmin ou directement dans Prisma Studio en tapant `npx prisma studio` dans votre terminal. 

Profitez d'être dans le fichier `.env` pour modifier la phrase secrète de votre choix pour le `TOKEN`. 


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