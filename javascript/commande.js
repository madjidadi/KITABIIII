// Liste des 58 Wilayas d'Algérie
const listeWilayas = [
  "01 - Adrar", "02 - Chlef", "03 - Laghouat", "04 - Oum El Bouaghi", "05 - Batna", 
  "06 - Béjaïa", "07 - Biskra", "08 - Béchar", "09 - Blida", "10 - Bouira", 
  "11 - Tamanrasset", "12 - Tébessa", "13 - Tlemcen", "14 - Tiaret", "15 - Tizi Ouzou", 
  "16 - Alger", "17 - Djelfa", "18 - Jijel", "19 - Sétif", "20 - Saïda", 
  "21 - Skikda", "22 - Sidi Bel Abbès", "23 - Annaba", "24 - Guelma", "25 - Constantine", 
  "26 - Médéa", "27 - Mostaganem", "28 - M'Sila", "29 - Mascara", "30 - Ouargla", 
  "31 - Oran", "32 - El Bayadh", "33 - Illizi", "34 - Bordj Bou Arreridj", "35 - Boumerdès", 
  "36 - El Tarf", "37 - Tindouf", "38 - Tissemsilt", "39 - El Oued", "40 - Khenchela", 
  "41 - Souk Ahras", "42 - Tipaza", "43 - Mila", "44 - Aïn Defla", "45 - Naâma", 
  "46 - Aïn Témouchent", "47 - Ghardaïa", "48 - Relizane", "49 - El M'Ghair", "50 - El Meniaa", 
  "51 - Ouled Djellal", "52 - Bordj Badji Mokhtar", "53 - Béni Abbès", "54 - In Salah", "55 - In Guezzam", 
  "56 - Touggourt", "57 - Djanet", "58 - In Salah"
];

// Génération automatique des options d'Algérie dans le menu déroulant
function chargerOptionsWilayas() {
  const selectWilaya = document.getElementById('c-wilaya');
  if (!selectWilaya) return;
  
  listeWilayas.forEach(wilaya => {
    const option = document.createElement('option');
    option.value = wilaya;
    option.textContent = wilaya;
    selectWilaya.appendChild(option);
  });
}

// Initialisation et affichage des données de facturation
function initPageCommande() {
  const panierData = getPanier(); 
  const user = getUser(); 
  // Sécurité 1 : Si le panier est vide, la commande est impossible
  if (panierData.length === 0) {
    window.location.href = 'panier.html';
    return;
  }

  // Sécurité 2 : Si aucun utilisateur n'est connecté, direction la page de connexion
  if (!user) {
    window.location.href = 'connexion.html';
    return;
  }

  // Pré-remplir automatiquement le champ Nom complet avec le profil actif (Ahmed)
  document.getElementById('c-nom').value = user.nom;

  // Injection des articles à droite dans le résumé minimaliste
  const conteneurRecap = document.getElementById('commande-articles-recap');
  conteneurRecap.innerHTML = panierData.map(item => `
    <div style="display:flex; justify-content:space-between; font-size:0.85rem; color:#6b6050;">
      <span style="max-width:200px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
        ${item.titre} <b>×${item.qte}</b>
      </span>
      <span>${(item.prix * item.qte).toLocaleString('fr-DZ')} DA</span>
    </div>
  `).join('');

 
  document.getElementById('commande-total-txt').textContent = `${totalPanier().toLocaleString('fr-DZ')} DA`;
}


document.getElementById('form-finaliser-commande').addEventListener('submit', function(e) {
  e.preventDefault();

  // Création du pack de coordonnées client
  const coordonneesClient = {
    nom: document.getElementById('c-nom').value.trim(),
    tel: document.getElementById('c-tel').value.trim(),
    wilaya: document.getElementById('c-wilaya').value,
    adresse: document.getElementById('c-adresse').value.trim(),
    paiement: 'cash'
  };

  // Enregistrement de la commande dans l'historique et vidage du panier
  const nouveauNumeroCommandeId = ajouterCommande(coordonneesClient);

 
  document.getElementById('zone-formulaire-commande').style.display = 'none';
  
  const zoneSucces = document.getElementById('zone-succes-commande');
  zoneSucces.style.display = 'block';
  
  document.getElementById('msg-succes-cmd-id').textContent = `Numéro de facture : ${nouveauNumeroCommandeId}`;
});

// Lancement automatique dès la préparation du DOM par le navigateur
document.addEventListener('DOMContentLoaded', () => {
  chargerOptionsWilayas(); 
  initPageCommande();       
});
