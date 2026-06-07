
function chargerPageDetail() {
  const zoneContenu = document.getElementById('contenu');
  const zoneSimilaires = document.getElementById('grid-sim');
  const sectionSimilaires = document.getElementById('similaires');

  if (!zoneContenu) return;

  
  const parametres = new URLSearchParams(window.location.search);
  const livreId = parametres.get('id');

 
  const livre = livres.find(l => l.id === livreId);

  //  Si le livre n'existe pas, on met un message d'erreur
  if (!livre) {
    zoneContenu.innerHTML = `
      <div class="vide">
        <h2>Livre introuvable</h2>
        <a href="catalogue.html" class="btn btn-primary">Retour au catalogue</a>
      </div>`;
    if (sectionSimilaires) sectionSimilaires.style.display = 'none';
    return;
  }

  
  document.title = 'Kitabi - ' + livre.titre;

 
  const imageSrc = coverUrl(livre);
  const favoriActif = isFavori(livre.id);

 
  zoneContenu.innerHTML = `
    <div class="detail-grid">
      <div>
        ${imageSrc 
          ? `<img src="${imageSrc}" alt="${livre.titre}" class="detail-cover" onerror="this.style.display='none'; document.getElementById('cover-fb').style.display='flex'">` 
          : ''
        }
        <div class="detail-cover" id="cover-fb" style="${imageSrc ? 'display:none' : ''}">
          <span>${livre.titre}</span>
          <small>${livre.auteur}</small>
        </div>
      </div>
      
      <div class="detail-info">
        <div class="cat-badge">${livre.categorie}</div>
        <h1>${livre.titre}</h1>
        <p class="a">${livre.auteur}</p>
        <p class="note-livre">★ ${livre.note}</p>
        <p>${livre.desc}</p>
        
        <div class="detail-meta">
          <div><div class="m-val">${livre.annee}</div><div class="m-lbl">Année</div></div>
          <div><div class="m-val">${livre.stock} ex.</div><div class="m-lbl">Stock</div></div>
          <div><div class="m-val">${livre.categorie}</div><div class="m-lbl">Genre</div></div>
        </div>
        
        <div class="detail-prix">${livre.prix.toLocaleString('fr-DZ')} DA</div>
        
        <div class="actions-boutons">
          <button class="btn btn-primary" id="btn-panier">🛒 Ajouter au panier</button>
          <button class="btn btn-outline" id="btn-fav">
            ${favoriActif ? '♥ Dans les favoris' : '♡ Ajouter aux favoris'}
          </button>
        </div>
      </div>
    </div>`;

 
  
 
  document.getElementById('btn-panier').addEventListener('click', function() {
    ajouterPanier(livre); // Fonction de app.js
    this.textContent = '✓ Ajouté !';
    setTimeout(() => this.textContent = '🛒 Ajouter au panier', 2000);
  });

 
  const boutonFav = document.getElementById('btn-fav');
  boutonFav.addEventListener('click', function() {
    toggleFavori(livre); // Fonction de app.js
    this.textContent = isFavori(livre.id) ? '♥ Dans les favoris' : '♡ Ajouter aux favoris';
  });

  
  const similaires = livres.filter(l => l.categorie === livre.categorie && l.id !== livre.id).slice(0, 4);

  if (zoneSimilaires && similaires.length > 0) {
    zoneSimilaires.innerHTML = '';
    similaires.forEach(l => {
      const indexOriginal = livres.indexOf(l);
      zoneSimilaires.innerHTML += buildCard(l, indexOriginal); 
    });
  } else if (sectionSimilaires) {
    sectionSimilaires.style.display = 'none'; 
  }
}


document.addEventListener('DOMContentLoaded', chargerPageDetail);
