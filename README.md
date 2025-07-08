# Interface de Communication avec REGARDS

Une application web front-end construite avec **React** et **Material-UI** pour envoyer des requêtes dynamiques à l'API REGARDS, visualiser les réponses et conserver un historique des appels.

---

## Manuel d'Utilisation

Ce guide explique comment utiliser l'application pour interroger une instance REGARDS.

### 1. Accéder à une Instance

L'application est conçue pour être flexible. Pour cibler une instance REGARDS, vous devez spécifier son adresse directement dans l'URL.

**Exemple** : Pour vous connecter à l'instance `10.31.37.15`, naviguez vers :

```
http://localhost:5173/10.31.37.15/login
```

### 2. Se Connecter

**Étape 1** : Une fois sur la page de connexion de l'instance, remplissez les champs suivants :

- Votre **nom d'utilisateur** ou **e-mail**.
- Votre **mot de passe**.
- Le **nom exact du projet REGARDS** que vous souhaitez interroger.

**Étape 2** : Cliquez sur **"Connexion"**. Si les identifiants sont corrects, vous serez redirigé vers l'interface principale.

### 3. Envoyer une Requête

L'interface principale est un **client API complet** :

- **Méthode** : Choisissez la méthode HTTP (`GET`, `POST`...) dans le menu déroulant.
- **Microservice** : Saisissez le nom du microservice cible (ex : `rs-storage`).
- **Endpoint** : Saisissez le chemin de l'endpoint (ex : `cache`).

#### Paramètres / Corps (JSON) :

- Pour les requêtes **GET** : saisissez les **paramètres d'URL** au format JSON.
- Pour les requêtes **POST** ou **PUT** : saisissez le **corps de la requête** en JSON.  
  L'éditeur intégré offre une **coloration syntaxique** pour faciliter la saisie.

**Envoyer** : Cliquez sur **"Envoyer"** pour lancer l'appel API.

### 3. Visualiser la Réponse

- Si la requête réussit, vous serez redirigé vers la page de réponse.
- La réponse JSON est affichée dans un visualiseur interactif :
  Vous pouvez cliquer pour plier et déplier les différentes parties de la réponse.
- Si une requête réussit mais ne renvoie pas de contenu (ex : statut 204), un message clair vous l'indiquera.

### 4. Utiliser l'Historique

- **Ouvrir** : Cliquez sur l'icône **"Historique"** en haut à droite de la barre de navigation pour ouvrir le tiroir.
- **Consulter** : Les dernières requêtes réussies y sont listées.
- **Recharger** : Cliquez sur l'icône **"Rejouer"** d'une entrée pour recharger instantanément ses paramètres dans le formulaire principal.
- **Supprimer** : Cliquez sur l'icône **"Poubelle"** pour supprimer une entrée. Vous pouvez aussi vider tout l'historique.

---

## Guide d'Installation

### Prérequis

- **Node.js** (version 18 ou supérieure)
- **npm** (inclus avec Node.js) ou **yarn**
- **Accès à une instance fonctionnelle** de REGARDS

### Étapes d'Installation

1. **Cloner le dépôt**

```bash
git clone https://github.com/Margauxgrc/ihm-regards
cd ihm-regards
```

2. **Installer les dépendances**

Cette commande va lire le fichier `package.json` et télécharger toutes les bibliothèques nécessaires (React, MUI, Axios...).

```bash
npm install
```

3. **Lancer le serveur de développement**

Cette commande lance l'application en mode développement.

```bash
npm run dev
```

L'application est maintenant disponible. Pour l'utiliser, accédez à une URL incluant l'adresse de votre instance, par exemple :

```
http://localhost:5173/10.31.37.15/login
```

---

## Stack Technique

| Élément                | Outil / Librairie               |
| ---------------------- | ------------------------------- |
| **Framework Frontend** | React v18                       |
| **Build Tool**         | Vite                            |
| **Langage**            | TypeScript                      |
| **UI**                 | Material-UI (MUI) v5            |
| **Requêtes HTTP**      | Axios                           |
| **Routing**            | React Router                    |
| **Gestion d’état**     | React Context API               |
| **Visualisation JSON** | @microlink/react-json-view      |
| **Éditeur JSON**       | @uiw/react-textarea-code-editor |

---

## Structure du Projet

Le projet suit une architecture moderne où la logique est extraite dans des hooks personnalisés, rendant les composants plus simples et focalisés sur l'affichage.

```
src/
├── assets/         → Images et fichiers statiques
├── components/     → Composants de présentation (UI)
├── contexts/       → Providers React pour le contexte global
├── hooks/          → Hooks personnalisés pour la logique métier
├── pages/          → Pages principales de l’application
├── services/       → Fonctions d’appel aux APIs REGARDS
├── types/          → Interfaces et types TypeScript
```
