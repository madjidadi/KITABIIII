
let categorieActive = 'Tous';

// Fonction principale pour filtrer, trier et afficher les livres du catalogue
function afficherLeCatalogue() {
  const texteRecherche = document.getElementById('recherche').value.toLowerCase();
  const optionTri = document.getElementById('tri').value;
  const grille = document.getElementById('grille');
  const compteur = document.getElementById('compteur');

  let listeFiltree = [...livres];

  // 1. Filtrage par catégorie
  if (categorieActive !== 'Tous') {
    listeFiltree = listeFiltree.filter(livre => livre.categorie === categorieActive);
  }

  // 2. Filtrage par la barre de recherche (titre ou auteur)
  if (texteRecherche) {
    listeFiltree = listeFiltree.filter(livre => 
      livre.titre.toLowerCase().includes(texteRecherche) || 
      livre.auteur.toLowerCase().includes(texteRecherche)
    );
  }

  // 3. Tri des livres selon l'option choisie
  if (optionTri === 'prix-asc')  listeFiltree.sort((a, b) => a.prix - b.prix);
  if (optionTri === 'prix-desc') listeFiltree.sort((a, b) => b.prix - a.prix);
  if (optionTri === 'note')      listeFiltree.sort((a, b) => b.note - a.note);
  if (optionTri === 'titre')     listeFiltree.sort((a, b) => a.titre.localeCompare(b.titre));

  // 4. Mise à jour du compteur de livres
  const plural = listeFiltree.length > 1 ? 's' : '';
  compteur.textContent = `${listeFiltree.length} livre${plural} disponible${plural}`;

  // 5. Gestion du cas où aucun livre ne correspond à la recherche
  if (listeFiltree.length === 0) {
    grille.innerHTML = `
      <div class="vide">
        <div class="icon">🔍</div>
        <h2>Aucun résultat</h2>
        <p>Essayez d'autres mots-clés ou changez de catégorie.</p>
      </div>`;
    return;
  }

  // 6. Nettoyage de la grille et affichage des cartes de livres
  grille.innerHTML = '';
  listeFiltree.forEach(livre => {
    const originalIndex = livres.indexOf(livre);
    grille.innerHTML += buildCard(livre, originalIndex);
  });
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {

  const urlParams = new URLSearchParams(window.location.search);
  const categorieUrl = urlParams.get('cat');

  if (categorieUrl) {
    categorieActive = categorieUrl;
    document.querySelectorAll('.filtre-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.cat === categorieUrl);
    });
  }

  const conteneurFiltres = document.getElementById('filtres');
  if (conteneurFiltres) {
    conteneurFiltres.addEventListener('click', event => {
      const boutonClique = event.target.closest('.filtre-btn');
      if (!boutonClique) return;

      
      document.querySelectorAll('.filtre-btn').forEach(b => b.classList.remove('active'));
      boutonClique.classList.add('active');

     
      categorieActive = boutonClique.dataset.cat;
      afficherLeCatalogue();
    });
  }

  const inputRecherche = document.getElementById('recherche');
  const selectTri = document.getElementById('tri');

  if (inputRecherche) inputRecherche.addEventListener('input', afficherLeCatalogue);
  if (selectTri) selectTri.addEventListener('change', afficherLeCatalogue);

  
  afficherLeCatalogue();
});
