// Fonction pour afficher les livres favoris
function afficherFavoris() {
  const grille = document.getElementById('grille-favoris');
  const compteur = document.getElementById('compteur-favoris');
  

  const listeFavoris = livres.filter(livre => isFavori(livre.id));

  
  const s = listeFavoris.length > 1 ? 's' : '';
  compteur.textContent = `${listeFavoris.length} livre${s} enregistré${s} dans vos favoris`;

  // Cas où l'utilisateur n'a aucun favori
  if (listeFavoris.length === 0) {
    grille.innerHTML = `
      <div class="vide">
        <div class="icon">♥</div>
        <h2>Vos favoris sont vides</h2>
        <p>Explorez le catalogue et cliquez sur le cœur pour ajouter des livres.</p>
        <a href="catalogue.html" class="btn btn-primary">Parcourir le catalogue</a>
      </div>`;
    return;
  }

  grille.innerHTML = '';
  listeFavoris.forEach(livre => {
    const originalIndex = livres.indexOf(livre);
    grille.innerHTML += buildCard(livre, originalIndex);
  });
}

document.addEventListener('click', function(e) {
  if (e.target.closest('.heart-btn')) {
   
    setTimeout(afficherFavoris, 50);
  }
});


afficherFavoris();
// Fonction principale pour charger et afficher les livres coups de cœur
function afficherFavorisUtilisateur() {
  const grilleConteneur = document.getElementById('grille-favoris');
  const txtCompteur = document.getElementById('compteur-favoris');
  
  if (!grilleConteneur) return;

  
  const listeFavoris = livres.filter(livre => isFavori(livre.id)); // isFavori vient de app.js


  const plural = listeFavoris.length > 1 ? 's' : '';
  txtCompteur.textContent = `${listeFavoris.length} livre${plural} enregistré${plural} dans vos favoris`;


  if (listeFavoris.length === 0) {
    grilleConteneur.innerHTML = `
      <div class="vide">
        <div class="icon">♥</div>
        <h2>Vos favoris sont vides</h2>
        <p>Explorez notre catalogue soigneusement sélectionné et cliquez sur le petit cœur pour ajouter des livres à votre liste.</p>
        <a href="catalogue.html" class="btn btn-primary">Parcourir le catalogue</a>
      </div>`;
    return;
  }


  grilleConteneur.innerHTML = '';
  listeFavoris.forEach(livre => {
    const indexOriginal = livres.indexOf(livre);
    grilleConteneur.innerHTML += buildCard(livre, indexOriginal); 
  });
}


document.addEventListener('click', function(event) {
  if (event.target.closest('.heart-btn')) {
   
    setTimeout(afficherFavorisUtilisateur, 50);
  }
});


document.addEventListener('DOMContentLoaded', afficherFavorisUtilisateur);
