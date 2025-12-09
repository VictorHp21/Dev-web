
  const botoes = document.querySelectorAll('.leia_mais');

  botoes.forEach(botao => {
    botao.addEventListener('click', () => {
      const textoCompleto = botao.previousElementSibling;
      const textoCurto = textoCompleto.previousElementSibling;

      if (textoCompleto.style.display === 'none' || textoCompleto.style.display === '') {
        textoCompleto.style.display = 'block';
        textoCurto.style.display = 'none';
        botao.textContent = 'Mostrar menos';
      } else {
        textoCompleto.style.display = 'none';
        textoCurto.style.display = 'block';
        botao.textContent = 'Leia mais';
      }
    });
  });

