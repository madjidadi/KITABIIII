// Liste des catégories affichées sur la page d'accueil avec leur design
const categoriesConfiguration = [
  { nom: "Roman",       couleur: "#8b1a2b", bg: "rgba(139,26,43,.08)",  icon: "📖", desc: "Histoires inoubliables" },
  { nom: "Histoire",    couleur: "#b8912a", bg: "rgba(184,145,42,.09)", icon: "🏛️", desc: "Mémoire de notre peuple" },
  { nom: "Science",     couleur: "#2e6b3e", bg: "rgba(46,107,62,.08)",  icon: "🔬", desc: "Explorer l'univers" },
  { nom: "Philosophie", couleur: "#4a3a8b", bg: "rgba(74,58,139,.08)",  icon: "💡", desc: "Penser, questionner" },
  { nom: "Jeunesse",    couleur: "#c75b1a", bg: "rgba(199,91,26,.08)",  icon: "🌟", desc: "L'éveil des jeunes" },
  { nom: "Poésie",      couleur: "#a0295f", bg: "rgba(160,41,95,.08)",  icon: "🌸", desc: "Les mots qui touchent" },
  { nom: "Biographie",  couleur: "#2a6b8b", bg: "rgba(42,107,139,.08)", icon: "👤", desc: "Des vies inspirantes" }
];

// Fonction principale qui initialise la page d'accueil
function initAccueil() {
  // 1. Affichage de la grille "À la une" 
  const grilleUne = document.getElementById('grid-une');
  if (grilleUne) {
    grilleUne.innerHTML = '';
    livres.slice(0, 4).forEach((livre, index) => { 
      grilleUne.innerHTML += buildCard(livre, index); 
    });
  }

  // 2. Affichage de la grille "Tendances" 
  const grilleTendances = document.getElementById('grid-tendances');
  if (grilleTendances) {
    grilleTendances.innerHTML = '';
    livres.slice(4, 8).forEach((livre, index) => { 
      grilleTendances.innerHTML += buildCard(livre, index + 4); 
    });
  }

  // 3. Affichage des catégories et calcul dynamique du nombre de livres
  const grilleCategories = document.getElementById('grid-cats');
  if (grilleCategories) {
    grilleCategories.innerHTML = '';
    categoriesConfiguration.forEach(cat => {
      // On compte combien de livres possèdent cette catégorie
      const nombreLivres = livres.filter(l => l.categorie === cat.nom).length;
      const plural = nombreLivres > 1 ? 's' : '';

      grilleCategories.innerHTML += `
        <a href="catalogue.html?cat=${cat.nom}" class="cat-card">
          <div class="cat-bar" style="background:${cat.couleur}"></div>
          <div class="cat-icon">${cat.icon}</div>
          <div class="cat-name">${cat.nom}</div>
          <div class="cat-desc">${cat.desc}</div>
          <div class="cat-count" style="background:${cat.bg}; color:${cat.couleur}; border:1px solid ${cat.couleur}30">
            ${nombreLivres} livre${plural}
          </div>
        </a>`;
    });
  }
}

// Lancement automatique dès que la page est chargée
document.addEventListener('DOMContentLoaded', () => {
  initAccueil();
});
