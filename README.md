# 🌐 Adaverse

-   **Durée :** 8 jours
## 🎯 Objectif du projet

Ce projet consiste à développer une **plateforme de visualisation de projets réalisés par les apprenant·e·s d’Ada**.

L’application sera **fullstack**, réalisée avec **Next.js**, **TailwindCSS** et **TypeScript**, et connectée à une base de données hébergée sur **Neon**, via l’ORM **Drizzle**.

Les utilisateur·rice·s pourront **proposer un projet** via la page d’accueil, mais **seul·e le·la développeur·euse** de la plateforme pourra **valider et publier** les projets pour qu’ils apparaissent sur le site.


## 🧩 Fonctionnalités 


### 1. 🗂️ Conception de la base de données
### 2. 🌱 Création d’une seed de données
### 3. 💻 Intégration sur le site
a. Formulaire de proposition de projet
b. Page d’accueil `/` : affichage des projets publiés
c. Page de détail d’un projet

## Avancement du projet 
24/11
- compréhension et clarification de l'énoncé 
- conception et modélisation des tables de la BDD
- création projet Neon et connexion et installation projet Next.js
- création schema.ts Drizzle et migration data en utilisant des seeds
- création Navbar avec bouton "proposer un projet" qui déclenche le pop-up formulaire

25/11
- création du formulaire avec deux menus déroulant dynamique (action getCategories & getClasses)
- création action SubmitProject intégré dans le formulaire 
- gestion d'erreur : champs vides et non string de l'action submitProject
- méthode recevoir le status et message du back pour maj en front : onSubmit={handleSumbit}
- WIP : action getProjects pas encore trouvé la méthode pour Groupby

26/11
- formulaire maj avec useActionState
- affichage liste des projets avec raw SQL agglomération

27/11
- redirect to hompage after form submission by using useEffect
- default image handling for project thumbnail by using fallback
- amélioration de UI homepage

01/12
- création page card projet : routing dynamique
- affichage et amélioration UI de la page card projet 
- menu déroulant intégré au navbar pour afficher différentes catégories de projets : useRouter & useSearchParams

02/12
- amélioration de la méthode de gestion d'image par défault
- bouton publier pour les projets sans date : CRUD PUT 
- fix le bug du formulaire et reset 
- amélioration CSS

03/12
- refactoring et déploiement
