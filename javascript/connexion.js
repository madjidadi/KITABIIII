// Initialisation de la page de connexion
function initConnexion() {
  // Remplissage par défaut des comptes de démonstration dans le LocalStorage
  if (!localStorage.getItem('kitabi_comptes')) {
    localStorage.setItem('kitabi_comptes', JSON.stringify([
      { nom: 'Ahmed Benali',   email: 'ahmed@kitabi.dz',  mdp: 'Password123!' },
      { nom: 'Fatima Bouzidi', email: 'fatima@kitabi.dz', mdp: 'Kitabi2024#'  }
    ]));
  }

  
  if (getUser()) {
    window.location.href = 'compte.html';
  }
}

// Gestion de la soumission du formulaire
document.getElementById('form-login').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('l-email').value.trim();
  const mdp   = document.getElementById('l-mdp').value;

  
  if (doLogin(email, mdp)) {
    window.location.href = 'compte.html'; 
  } else {
    const err = document.getElementById('err-login');
    err.textContent = 'Email ou mot de passe incorrect.';
    err.style.display = 'block';
  }
});

// Permet de remplir automatiquement les champs via les boutons de démo
function demoLogin(email, mdp) {
  document.getElementById('l-email').value = email;
  document.getElementById('l-mdp').value   = mdp;
}

// Lancement automatique
initConnexion();
