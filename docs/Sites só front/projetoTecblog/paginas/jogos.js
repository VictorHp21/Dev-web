document.addEventListener('DOMContentLoaded', () => {
  const itens = document.querySelectorAll('#jogos-recentes li');

  itens.forEach(item => {
    item.addEventListener('click', () => {
     
      const imgExistente = item.querySelector('img');

      
      if (imgExistente) {
        imgExistente.style.display = 
          imgExistente.style.display === 'none' ? 'block' : 'none';
      } else {
      
        const img = document.createElement('img');
        img.src = item.getAttribute('data-img');
        item.appendChild(img);
        img.style.display = 'block';
      }
    });
  });
});
