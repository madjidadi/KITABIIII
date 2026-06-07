 Projet Web : Mini-site E-commerce – Librairie en ligne "Kitabi"

**Université Mouloud MAMMERI de Tizi-Ouzou**  
**Faculté de génie électrique et informatique** – Département d’informatique  
**Module** : Développement d’Applications Web (Année 2025/2026)  
 


 1. Membres du groupe pédagogique

* **Ouramdane Sarah** – Groupe 3
* **Madjid Ait Tahar** – Groupe 9
* **Meftali Belkacem** – Groupe 6
* **Celia Ramdani** – Groupe 6



 2. Description du site et concepts web utilisés

"Kitabi" est une application web e-commerce responsive simulant une librairie en ligne spécialisée. Conformément au cahier des charges du module, elle a été conçue sans architecture back-end.

Le site met en œuvre les concepts fondamentaux suivants :

* **Balises Sémantiques HTML5** : Structuration rigoureuse de l'interface via les éléments sémantiques obligatoires (<nav>, <main>, <section>, <aside>, <footer>) afin de garantir l'accessibilité et la conformité.
* **Styles Externes CSS3** : Définition d'une identité visuelle unifiée (thème bordeaux et beige) gérant l'ergonomie, les effets de transition, les animations clés (@keyframes), l'affichage en grille (CSS Grid Area, Flexbox) et les requêtes médias (@media) pour assurer la réactivité.
* **Programmation Côté Client (Vanilla JavaScript)** : Manipulation dynamique du DOM pour la génération asynchrone des composants de l'interface, l'interactivité et la capture d'écouteurs d'événements (Event Listeners).
* **Base de Données Locale** : Stockage de la liste des ouvrages (objets) sous forme de tableau JavaScript global externe (books.js).
* **Persistance des Données (Web Storage)** : Simulation complète et persistante d'une session utilisateur, du caddie d'achat, de la liste de favoris et de l'historique des factures via l'API LocalStorage.
* **Gestion et Validation de Formulaires** : Filtrage et traitement côté client des entrées de formulaires sécurisés par l'usage d'expressions régulières (RegEx).



 3. Arborescence technique du projet

KITABIII/
│
├── index.html
├── content/
│   ├── catalogue.html
│   ├── detail.html
│   ├── favoris.html
│   ├── panier.html
│   ├── commande.html
│   ├── connexion.html
│   └── inscription.html
│
├── style/
│   ├── style.css
│   ├── detail.css
│   └── compte.css
│
├── javascript/
│   ├── books.js
│   ├── app.js
│   ├── accueil.js
│   ├── catalogue.js
│   ├── detail.js
│   ├── panier.js
│   ├── favoris.js
│   └── commande.js
│
├── images/
└── readme.txt


 4. Instructions d'utilisation et scénario de test

1. **Lancement de l'Application** : Ouvrez la page racine index.html idéalement via un serveur local (ex: extension VS Code "Live Server") afin de permettre l'exécution optimale des scripts sans restriction de sécurité du navigateur. L'animation graphique initiale (Splash Screen) se déclenche.
2. **Navigation et Filtrage côté client** : Accédez à la page catalogue.html. Utilisez la barre de saisie pour une recherche textuelle, changez le filtre de tri ou cliquez sur une catégorie. La grille se rafraîchit dynamiquement sans aucun rechargement de page (Zero-Reload).
3. **Consultation des Produits** : Cliquez sur le cadre rectangulaire coloré d'un livre. Vous serez redirigé vers la page detail.html?id=[ID_DU_LIVRE]. Le script extrait l'identifiant depuis l'URL, cherche l'objet dans books.js, l'affiche et génère automatiquement une liste de 4 recommandations similaires.
4. **Authentification Simulée (Session utilisateur)** : Cliquez sur "Se connecter". Utilisez l'un des deux comptes de démonstration injectés par défaut dans le stockage local (Ahmed ou Fatima) grâce aux boutons de démo, puis validez. L'état de session est mis à jour dans le LocalStorage et la Navbar s'adapte immédiatement.
5. **Gestion du Panier et Achat** : Ajoutez des livres au panier, puis naviguez vers panier.html. Ajustez les quantités (les totaux se recalculent en direct) ou retirez un livre. Cliquez sur "Valider et Commander". Saisissez vos coordonnées sur la page commande.html (le sélecteur affiche automatiquement les 58 wilayas générées par JavaScript), puis confirmez.
6. **Tableau de bord Client** : Une fois la commande confirmée, le panier est vidé et la facture est sauvegardée. Rendez-vous sur votre espace de compte personnel (compte.html) pour visualiser l'historique complet de vos achats présenté sous forme de casier d'information fixe. Un bouton "Vider l'historique" permet de réinitialiser le stockage local pour une nouvelle démonstration.
