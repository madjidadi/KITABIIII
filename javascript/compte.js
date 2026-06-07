// Fonction principale pour charger le tableau de bord
function initTableauDeBord() {
  const user = getUser(); 

  // Sécurité : si l'utilisateur n'est pas connecté, on renvoie vers l'identification
  if (!user) {
    window.location.href = 'connexion.html';
    return;
  }

  // Injecter les textes du profil d'étudiant
  document.getElementById('user-nom').textContent = user.nom;
  document.getElementById('user-email').textContent = user.email;

 
  renderCommandesUtilisateur();
}

// Fonction pour générer le HTML ouvert des commandes globales
function renderCommandesUtilisateur() {
  const commandes = getCommandes(); 
  const conteneurListe = document.getElementById('liste-commandes');
  const compteurTxt = document.getElementById('nb-cmds');

  if (!conteneurListe) return;

  compteurTxt.textContent = `${commandes.length} commande(s) passée(s)`;

  // Si l'historique général est vide
  if (commandes.length === 0) {
    conteneurListe.innerHTML = `
      <div class="vide" style="background: #fdfaf4; border: 1px solid #d8cfbe; border-radius: 16px; padding: 40px; text-align: center; max-width: 600px; margin: 20px auto;">
        <div class="icon" style="font-size: 2.5rem; margin-bottom: 12px; opacity: 0.5;">📦</div>
        <h2>Aucune commande pour l'instant</h2>
        <p style="color: #8a837a; font-size: 0.9rem; margin-bottom: 20px;">Votre historique d'achats apparaîtra ici une fois votre premier panier validé.</p>
        <a href="catalogue.html" class="btn btn-primary">Parcourir le catalogue</a>
      </div>`;
    return;
  }

  // Injection du HTML fixe (Toujours ouvert et visible)
  conteneurListe.innerHTML = commandes.map(cmd => `
    <div class="cmd-card" style="background: #fdfaf4; border: 1px solid #d8cfbe; border-radius: 14px; margin-bottom: 20px; overflow: hidden;">
      <div class="cmd-header-fixe" style="display: flex; justify-content: space-between; align-items: center; padding: 18px 20px; background: rgba(139, 26, 43, 0.02); border-bottom: 1px solid #ebe4d6;">
        <div>
          <div class="cmd-id" style="font-weight: 600; font-size: .9rem;">Commande #${cmd.id}</div>
          <div class="cmd-date" style="font-size: .78rem; color: #8a837a; margin-top: 2px;">📅 ${cmd.date} — ${cmd.articles.length} article(s)</div>
        </div>
        <div class="cmd-header-right" style="display: flex; align-items: center; gap: 12px;">
          <span class="status en-attente">${cmd.statut}</span>
          <span class="cmd-total" style="font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; font-weight: 700; color: #8b1a2b;">${cmd.total.toLocaleString('fr-DZ')} DA</span>
        </div>
      </div>
      
      <div class="cmd-body open" id="body-${cmd.id}" style="display: block; padding: 20px;">
        <div class="cmd-client-grid">
          <!-- CASIER 1 : ADRESSE -->
          <div class="info-client-card">
            <div class="card-client-title">📍 Informations de Livraison</div>
            <div class="card-client-row"><strong>Destinataire :</strong> <span>${cmd.nom}</span></div>
            <div class="card-client-row"><strong>Adresse :</strong> <span>${cmd.adresse}</span></div>
            <div class="card-client-row"><strong>Wilaya :</strong> <span>${cmd.wilaya || 'Non spécifiée'}</span></div>
            <div class="card-client-row"><strong>Téléphone :</strong> <span class="client-phone-highlight">📞 ${cmd.tel}</span></div>
          </div>

          <!-- CASIER 2 : MODE DE PAIEMENT -->
          <div class="info-client-card">
            <div class="card-client-title">💳 Mode de Paiement</div>
            <div class="card-client-row"><strong>Type :</strong> <span>Paiement en espèces (Cash)</span></div>
            <div class="card-client-row"><strong>Moment :</strong> <span>À la livraison du colis</span></div>
            <div class="card-client-row"><strong>Statut :</strong> <span class="status en-attente">${cmd.statut}</span></div>
          </div>
        </div>

        <!-- CASIER 3 : PANIER DES ARTICLES ENCADRÉ -->
        <div class="info-client-card cmd-articles-box-style">
          <div class="card-client-title">🛒 Détails des articles</div>
          ${cmd.articles.map(art => `
            <div class="cmd-article">
              <span class="article-name-txt">📖 ${art.titre} <small>×${art.qte}</small></span>
              <span class="article-price-txt">${(art.prix * art.qte).toLocaleString('fr-DZ')} DA</span>
            </div>
          `).join('')}
        </div>

        <!-- BARRE FINALE BORDEAUX DU TOTAL COMPLET -->
        <div class="cmd-footer-summary">
          <span class="total-lbl">Montant Global Payé</span>
          <strong class="total-val">${cmd.total.toLocaleString('fr-DZ')} DA</strong>
        </div>
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', initTableauDeBord);
// À coller tout en bas de ton fichier compte.js
function viderHistoriqueCommandes() {
  if (confirm("Voulez-vous vraiment effacer tout l'historique des commandes ?")) {
    localStorage.removeItem('kitabi_commandes');
    renderCommandesUtilisateur();
  }
}
