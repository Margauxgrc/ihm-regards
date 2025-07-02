# Interface de Communication avec REGARDS

Une application web front-end construite avec **React** et **Material-UI** pour envoyer des requêtes dynamiques à l'API **REGARDS**, visualiser les réponses et conserver un historique des appels.

---

## Manuel d'Utilisation

Ce guide explique comment utiliser l'application pour interroger une instance REGARDS.

### 1. Se Connecter

**Étape 1** : Lancez l'application. Vous arriverez sur la page de connexion.

**Étape 2** : Remplissez les trois champs :

- Votre nom d'utilisateur ou e-mail.
- Votre mot de passe.
- Le nom exact du projet REGARDS que vous souhaitez interroger.

**Étape 3** : Cliquez sur **"Connexion"**.  
Si les identifiants sont corrects, vous serez redirigé vers l'interface principale.

---

### 2. Envoyer une Requête

L'interface principale est un client API complet :

**Méthode** : Choisissez la méthode HTTP (GET, POST...) dans le menu déroulant.
**Microservice** : Saisissez le nom du microservice cible (ex : `rs-storage`).
**Endpoint** : Saisissez le chemin de l'endpoint (ex : `cache`).
**Paramètres / Corps (JSON)** :

- Pour les requêtes **GET**, saisissez les paramètres d'URL au format JSON (ex : `{ "page": 0, "size": 10 }`).
- Pour les requêtes **POST** ou **PUT**, saisissez le corps de la requête directement en JSON. L'éditeur vous aidera avec la coloration syntaxique.
  **Envoyer** : Cliquez sur le bouton **"Envoyer"** pour lancer l'appel API.

---

### 3. Visualiser la Réponse

- Si la requête réussit, vous serez redirigé vers la page de réponse.
- La réponse JSON est affichée dans un visualiseur interactif :
  Vous pouvez cliquer pour plier et déplier les différentes parties de la réponse.
- Si une requête réussit mais ne renvoie pas de contenu (ex : statut 204), un message clair vous l'indiquera.

---

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

---

### Étapes d'Installation

#### 1. Cloner le dépôt

```bash
git clone [URL_DE_TON_DEPOT]
cd [NOM_DU_DOSSIER]
```

#### 2. Installer les dépendances

Cette commande va lire le fichier `package.json` et télécharger toutes les bibliothèques nécessaires (React, MUI, Axios...).

```bash
npm install
```

#### 3. Configurer l'URL de l'API

C'est l'étape la plus importante.  
Ouvrez le fichier `src/constants/apiConstants.ts` et assurez-vous que la variable `HTTP_HOST` pointe bien vers votre instance REGARDS.

```ts
export const HTTP_HOST = 'http://10.31.37.15';
```

#### 4. Lancer le serveur de développement

Cette commande lance l'application en mode développement.

```bash
npm run dev
```

L'application est maintenant disponible et se mettra à jour automatiquement si vous modifiez le code.  
Vous pouvez y accéder à l'adresse [http://localhost:5173](http://localhost:5173).

---

## ⚙️ Stack Technique

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

## 📁 Structure du Projet

```
src/
├── assets/         → Images et fichiers statiques
├── components/     → Composants de présentation (UI)
├── constants/      → Constantes globales (URL API, méthodes...)
├── contexts/       → Providers React pour le contexte global
├── hooks/          → Hooks personnalisés pour la logique métier
├── pages/          → Pages principales de l’application
├── services/       → Fonctions d’appel aux APIs REGARDS
├── types/          → Interfaces et types TypeScript
```
