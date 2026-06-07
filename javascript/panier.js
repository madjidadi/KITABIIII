// Fonction principale pour générer l'affichage complet du panier d'achats
function rafraichirAffichagePanier() {
  const panierData = getPanier(); // Récupère le panier localisé dans app.js
  const txtCompteur = document.getElementById('nb-articles');
  const boxVide = document.getElementById('panier-vide');
  const gridContenu = document.getElementById('panier-contenu');

  //  Calcul et affichage du nombre total d'exemplaires dans le caddie
  const nbTotal = panierData.reduce((total, x) => total + x.qte, 0);
  txtCompteur.textContent = `${nbTotal} article${nbTotal > 1 ? 's' : ''}`;

  //  Vérification : Si le panier est totalement vide
  if (panierData.length === 0) {
    boxVide.style.display = 'block';
    gridContenu.style.display = 'none';
    return;
  }

  boxVide.style.display = 'none';
  gridContenu.style.display = 'grid';

  //  Injection dynamique de la liste des livres (partie gauche de l'écran)
  const conteneurArticles = document.getElementById('liste-articles');
  conteneurArticles.innerHTML = panierData.map(item => {
    const imageLivre = coverUrl(item); // Va chercher le visuel du livre via app.js
    
    return `
      <div class="panier-item-card">
        <div class="item-img-area">
          ${imageLivre 
            ? `<img src="${imageLivre}" alt="${item.titre}" class="item-pic" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">` 
            : ''
          }
          <div class="item-pic-fallback" style="${imageLivre ? 'display:none' : ''}">
            <span>📖</span>
          </div>
        </div>
        
        <div class="item-details-area">
          <div class="item-meta-info">
            <h4><a href="detail.html?id=${item.id}">${item.titre}</a></h4>
            <p class="item-author-txt">${item.auteur}</p>
          </div>
          
          <div class="item-controls-row">
            <!-- Sélecteur de quantité numérique interactif -->
            <div class="custom-qte-picker">
              <button onclick="modifierQuantiteItem('${item.id}', ${item.qte - 1})">−</button>
              <span class="qte-value">${item.qte}</span>
              <button onclick="modifierQuantiteItem('${item.id}', ${item.qte + 1})">+</button>
            </div>
            
            <!-- Calcul automatique du sous-total pour cette ligne -->
            <div class="item-subtotal-price">
              ${(item.prix * item.qte).toLocaleString('fr-DZ')} DA
            </div>
            
            <!-- Bouton de suppression directe -->
            <button class="custom-delete-btn" onclick="supprimerItemDuPanier('${item.id}')" title="Retirer cet ouvrage">
              🗑️ <span class="lbl-btn-del">Retirer</span>
            </button>
          </div>
        </div>
      </div>`;
  }).join('');

  //  Injection des lignes de facturation dans le résumé 
  const conteneurRecapLines = document.getElementById('recap-lignes');
  conteneurRecapLines.innerHTML = panierData.map(x => `
    <div class="recap-summary-line">
      <span class="summary-title-txt">${x.titre} <small>×${x.qte}</small></span>
      <span>${(x.prix * x.qte).toLocaleString('fr-DZ')} DA</span>
    </div>
  `).join('');

  // Mise à jour de la zone de prix total final du panier
  document.getElementById('total-prix').textContent = `${totalPanier().toLocaleString('fr-DZ')} DA`;


  const conteneurWrapperBtn = document.getElementById('btn-commander-wrapper');
  
  if (isLoggedIn()) {

    conteneurWrapperBtn.innerHTML = `
      <a href="commande.html" class="btn btn-primary btn-checkout-action">
        Valider et Commander →
      </a>`;
  } else {

    conteneurWrapperBtn.innerHTML = `
      <a href="connexion.html" class="btn btn-primary btn-checkout-action btn-locked-action">
        🔒 Se connecter pour commander
      </a>
      <p class="basket-saved-notice">Votre sélection actuelle est sauvegardée</p>`;
  }
}

//  FONCTIONS COMPOSANTS 

function modifierQuantiteItem(id, nouvelleQte) {
  changerQte(id, nouvelleQte); 
  rafraichirAffichagePanier(); 
}

function supprimerItemDuPanier(id) {
  retirerPanier(id); 
  rafraichirAffichagePanier(); 
}

document.addEventListener('DOMContentLoaded', rafraichirAffichagePanier);
