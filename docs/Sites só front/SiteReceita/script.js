function trocarPagina(idPagina){

    
    let paginaAtual = document.querySelector(".pagina.active");

  
    paginaAtual.classList.remove("active");

   
    let novaPagina = document.getElementById(idPagina);

    
    novaPagina.classList.add("active");

}