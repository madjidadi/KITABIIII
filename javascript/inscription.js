if (getUser()) {
  window.location.href = 'compte.html';
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mdpRegex   = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

document.getElementById('r-mdp').addEventListener('input', function() {
  const p = this.value;
  let force = [p.length >= 8, /[A-Z]/.test(p), /\d/.test(p), /[^A-Za-z\d]/.test(p)].filter(Boolean).length;
  const couleurs = ['#d8cfbe', '#b71c1c', '#f59e0b', '#65a30d', '#8b1a2b'];
  
  for (let i = 1; i <= 4; i++) {
    document.getElementById('f' + i).style.background = i <= force ? couleurs[force] : '#d8cfbe';
  }
});

document.getElementById('form-register').addEventListener('submit', function(e) {
  e.preventDefault();
  const nom     = document.getElementById('r-nom').value.trim();
  const email   = document.getElementById('r-email').value.trim();
  const mdp     = document.getElementById('r-mdp').value;
  const confirm = document.getElementById('r-confirm').value;
  let valide = true;

  ['e-nom', 'e-email', 'e-mdp', 'e-confirm'].forEach(id => document.getElementById(id).textContent = '');

  if (nom.length < 2) { 
    document.getElementById('e-nom').textContent = 'Nom invalide (min. 2 lettres)'; 
    valide = false; 
  }
  if (!emailRegex.test(email)) { 
    document.getElementById('e-email').textContent = 'Format email invalide'; 
    valide = false; 
  }
  if (!mdpRegex.test(mdp)) { 
    document.getElementById('e-mdp').textContent = 'Min. 8 car., 1 majuscule, 1 chiffre, 1 spécial'; 
    valide = false; 
  }
  if (mdp !== confirm) { 
    document.getElementById('e-confirm').textContent = 'Les mots de passe ne correspondent pas'; 
    valide = false; 
  }
  
  if (!valide) return;

  if (doRegister(nom, email, mdp)) {
    window.location.href = 'compte.html'; // Redirection vers l'espace membre
  } else {
    const err = document.getElementById('err-register');
    err.textContent = 'Cet email est déjà utilisé.';
    err.style.display = 'block';
  }
});
