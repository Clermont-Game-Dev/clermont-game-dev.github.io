  fetch('/CGD-Website/shared/menu.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('menu-placeholder').insertAdjacentHTML('afterbegin', data);
    })
    .catch(err => console.error('Erreur chargement menu :', err));