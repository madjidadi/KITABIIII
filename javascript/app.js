// Variable globale de couleur pour le projet
const BORDEAUX = '#8b1a2b';


// 1. MODULE D'AUTHENTIFICATION (Gestion de session utilisateur)

function getUser() {
  try { 
    return JSON.parse(localStorage.getItem('kitabi_user')); 
  } catch { 
    return null; 
  }
}

function isLoggedIn() { 
  return !!getUser(); 
}

function doLogin(email, mdp) {
  const comptes = JSON.parse(localStorage.getItem('kitabi_comptes') || '[]');
  const utilisateur = comptes.find(u => u.email === email && u.mdp === mdp);
  
  if (!utilisateur) return false;
  
  localStorage.setItem('kitabi_user', JSON.stringify({ nom: utilisateur.nom, email: utilisateur.email }));
  return true;
}

function doRegister(nom, email, mdp) {
  let comptes = JSON.parse(localStorage.getItem('kitabi_comptes') || '[]');
  
  if (comptes.find(u => u.email === email)) return false;
  
  if (comptes.length === 0) {
    comptes.push({ nom: 'Ahmed Benali', email: 'ahmed@kitabi.dz', mdp: 'Password123!' });
    comptes.push({ nom: 'Fatima Bouzidi', email: 'fatima@kitabi.dz', mdp: 'Kitabi2024#' });
  }
  
  comptes.push({ nom, email, mdp });
  localStorage.setItem('kitabi_comptes', JSON.stringify(comptes));
  localStorage.setItem('kitabi_user', JSON.stringify({ nom, email }));
  return true;
}

function doLogout() {
  localStorage.removeItem('kitabi_user');
  window.location.href = 'index.html';
}


// 2. Gestion de commande


function getPanier() {
  try { return JSON.parse(localStorage.getItem('kitabi_panier') || '[]'); }
  catch { return []; }
}

function savePanier(panierElements) { 
  localStorage.setItem('kitabi_panier', JSON.stringify(panierElements)); 
}

function ajouterPanier(livre) {
  const panier = getPanier();
  const existe = panier.find(item => item.id === livre.id);
  if (existe) {
    existe.qte++;
  } else {
    panier.push({ ...livre, qte: 1 });
  }
  savePanier(panier);
  updateCompteurs();
}

function retirerPanier(id) {
  const panierFiltre = getPanier().filter(item => item.id !== id);
  savePanier(panierFiltre);
  updateCompteurs();
}

function changerQte(id, qte) {
  const panier = getPanier();
  const item = panier.find(x => x.id === id);
  if (item) { 
    item.qte = Math.max(1, qte); 
    savePanier(panier); 
  }
  updateCompteurs();
}

function totalPanier() {
  return getPanier().reduce((somme, item) => somme + (item.prix * item.qte), 0);
}


// 3. MODULE FAVORIS 

function getFavoris() {
  try { return JSON.parse(localStorage.getItem('kitabi_favoris') || '[]'); }
  catch { return []; }
}

function isFavori(id) { 
  return getFavoris().some(item => item.id === id); 
}

function toggleFavori(livre) {
  let favoris = getFavoris();
  if (isFavori(livre.id)) {
    favoris = favoris.filter(item => item.id !== livre.id);
  } else {
    favoris.unshift(livre);
  }
  localStorage.setItem('kitabi_favoris', JSON.stringify(favoris));
  updateCompteurs();
}


// 4. MODULE COMMANDES 

function getCommandes() {
  try { return JSON.parse(localStorage.getItem('kitabi_commandes') || '[]'); }
  catch { return []; }
}

function ajouterCommande(infosClient) {
  const commandes = getCommandes();
  const nouvelleCmd = {
    id: 'CMD' + Date.now(),
    date: new Date().toLocaleDateString('fr-FR'),
    statut: 'En attente',
    articles: getPanier(),
    total: totalPanier(),
    ...infosClient
  };
  commandes.unshift(nouvelleCmd);
  localStorage.setItem('kitabi_commandes', JSON.stringify(commandes));
  savePanier([]);
  return nouvelleCmd.id;
}


// 5. MODULE INTERFACE GLOBALE 

function updateCompteurs() {
  const totalArticles = getPanier().reduce((somme, item) => somme + item.qte, 0);
  const totalFavoris = getFavoris().length;
  const badgePanier = document.getElementById('badge-panier');
  const badgeFavoris = document.getElementById('badge-favoris');
  
  if (badgePanier) { 
    badgePanier.textContent = totalArticles;  
    badgePanier.classList.toggle('hidden', totalArticles === 0);
  }
  if (badgeFavoris) { 
    badgeFavoris.textContent = totalFavoris; 
    badgeFavoris.classList.toggle('hidden', totalFavoris === 0);
  }
}

function buildNavbar() {
  const user = getUser();
  const conteneurNav = document.getElementById('navbar');
  if (!conteneurNav) return;
  
  // Détection universelle : on regarde si le fichier actuel est index.html
  const estSurAccueil = window.location.pathname.endsWith("index.html") || window.location.pathname.endsWith("/");
  const prefixe = estSurAccueil ? "content/" : "";
  const lienAccueil = estSurAccueil ? "index.html" : "../index.html";
  
  conteneurNav.innerHTML = `
    <div class="nav-inner">
      <a href="${lienAccueil}" class="logo">📖 Kitabi</a>
      <nav class="nav-links">
        <a href="${lienAccueil}">Accueil</a>
        <a href="${prefixe}catalogue.html">Catalogue</a>
      </nav>
      <div class="nav-icons">
        <a href="${prefixe}favoris.html" class="icon-btn" title="Favoris">
          ♥ <span id="badge-favoris" class="badge hidden">0</span>
        </a>
        <a href="${prefixe}panier.html" class="icon-btn" title="Panier">
          🛒 <span id="badge-panier" class="badge hidden">0</span>
        </a>
        ${user
          ? `<a href="${prefixe}compte.html" class="btn-outline-sm">👤 ${user.nom}</a>
             <button onclick="doLogout()" class="btn-outline-sm" title="Déconnexion">↩</button>`
          : `<a href="${prefixe}connexion.html" class="btn-outline-sm">Se connecter</a>`
        }
      </div>
    </div>`;
    
  updateCompteurs();
}





  
  window.addEventListener('scroll', () => {
    conteneurNav.classList.toggle('scrolled', window.scrollY > 20);
  });



// 6. Cartes avec couvertures cliquables


function coverUrl(livre) {
  if (livre.image) return livre.image; // Lit ton dossier images/ local
  if (livre.isbn) return `https://openlibrary.org{livre.isbn}-M.jpg`;
  return null;
}

function buildCard(livre, index) {
  const imageSrc = coverUrl(livre);
  const favoriActif = isFavori(livre.id);
  
  const couleursPalette = ['#8b1a2b', '#2e6b3e', '#b8912a', '#4a3a8b', '#c75b1a', '#a0295f'];
  const couleurFond = couleursPalette[index % couleursPalette.length];
  
  return `
    <div class="card" data-id="${livre.id}">
      
      <!-- Seul le cadre de couverture coloré ouvre les détails du livre au clic -->
      <div class="card-cover" style="background:${couleurFond}; cursor: pointer;" onclick="window.location.href='detail.html?id=${livre.id}'">
        ${imageSrc ? `<img src="${imageSrc}" alt="${livre.titre}" onerror="this.style.display='none'">` : ''}
        <div class="card-cover-text">
          <span>${livre.titre}</span>
          <small>${livre.auteur}</small>
        </div>
      </div>
      
      <button class="heart-btn ${favoriActif ? 'active' : ''}" 
              onclick="event.preventDefault(); toggleFavori(livres[${index}]); this.classList.toggle('active')" 
              title="Favoris">♥</button>
              
      <div class="card-body">
        <span class="badge-cat">${livre.categorie}</span>
        <h3>${livre.titre}</h3>
        <p class="auteur">${livre.auteur}</p>
        <div class="card-footer">
          <strong class="prix">${livre.prix.toLocaleString('fr-DZ')} DA</strong>
          <button class="btn btn-sm" onclick="ajouterPanier(livres[${index}]); this.textContent='✓'; setTimeout(() => this.textContent='+ Panier', 1500)">
            + Panier
          </button>
        </div>
      </div>
    </div>`;
}

document.addEventListener('DOMContentLoaded', () => { 
  buildNavbar(); 
});
