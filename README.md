# Application Projet Mobile Todo List

Voici l'application développée pour le module Projet Mobile par Enver KEKA et Thibaud HUMBERT.

Les fonctionnalités implémentées pour l'app Todo List sont les suivantes :

- Création de compte et Authentification avec FireAuth
- Récupération de mot de passe oublié par email
- Création / Suppression de listes
- Ajouts de todos dans une liste 
- Edition / Cochage des todos
- Partage de listes en readonly ou avec permissions d'écritures
- Liste d'utilisateurs ajoutés à une liste et possibilité d'éditer leurs permissions ou de les retirer du partage

### Connexion et enregistrement

Sur la page de Log In, il suffit de se connecter en entrant ses identifiants et cliquer sur "Sign In" ou s'enregistrer grâce au bouton "Sign Up".
Il est également possible de récupérer son mot de passe avec le bouton "Forgot password" en bas de l'écran.

### Création de Listes et de tâches

Une fois connecté, il est possible de créer des listes grâce au bouton en bas de l'écran.
Une liste peux être supprimée en slidant vers la gauche sur son widget.
En cliquant sur une liste, on atteint la page de création de tâches, qui suis le même fonctionnement que les listes.
Il est cependant possible d'éditer un "Item" en cliquant dessus.

### Partage de listes et gestion des permissions

Sur cette page, il est possible de partager une liste avec le bouton du coin supérieur droit de l'écran si l'on est propriétaire de la liste.\
Pour ce faire il suffit d'entrer l'email de l'utilisateur que l'on souhaite ajouter et de décider s'il pourra éditer cette liste ou non.\
L'utilisateur apparaitra ensuite en dessous de la boite d'ajout et il sera possible de lui retirer / ajouter des droits grâce à la checkbox.

A noter que même si l'on choisit de laisser l'utilisateur éditer, il ne pourra pas ajouter lui-même d'utilisateurs ou éditer leurs permissions.
