

let total = 0;

let listaCompras = [];

document.getElementById("form-produto").addEventListener("submit", async function (e) {
    e.preventDefault()


    const produto = document.getElementById("produto").value
    const quantidade = Number(document.getElementById("qtd").value)
    const precoUnitario = Number(document.getElementById("prcUnit").value)


    const subtotal = precoUnitario * quantidade

    const item = {
        produto: produto,
        quantidade: quantidade,
        precoUnitario: precoUnitario,
        subtotal: subtotal
    }

    listaCompras.push(item)

    const tabela = document.getElementById("lista-itens")

    const mensagem = document.getElementById("sem-itens");

    if (mensagem) {
        mensagem.remove();
    }

    const novaLinha =
        `
    <tr>
    <td>${produto}</td>
    <td>${quantidade}</td>
    <td>${precoUnitario}</td>
    <td class="subtotal">${subtotal.toFixed(2)}</td>
    <td><button class = "btn btn-outline-danger w-10" onclick="excluirLinha(this)">X</button></td>
    </tr>
    `



    tabela.insertAdjacentHTML("beforeend", novaLinha);


    total += subtotal

    document.getElementById("total-valor").innerText = "R$ " + total.toFixed(2)

    salvarLista()


})

let linhaParaExcluir = null;

function excluirLinha(botao){

    linhaParaExcluir = botao.closest("tr");

    const modal = new bootstrap.Modal(document.getElementById("modalConfirmarItem"));
    modal.show();

}


document.getElementById("confirmarDeleteItem").addEventListener("click", function(){

    if(linhaParaExcluir){

        const subtotalLinha = Number(
            linhaParaExcluir.querySelector(".subtotal").innerText
        );

        total -= subtotalLinha;

        document.getElementById("total-valor").innerText = "R$ " + total.toFixed(2);

        linhaParaExcluir.remove();
        salvarLista()
    }

    const modalElement = document.getElementById("modalConfirmarItem");
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();

});





function limparForm() {
    document.getElementById("form-produto").reset()
}


function deletarLista(){

    const modal = new bootstrap.Modal(document.getElementById("modalDeletarLista"))
    modal.show()

}


document.getElementById("confirmarDeleteLista").addEventListener("click", function(){

    const tabela = document.getElementById("lista-itens")

    tabela.innerHTML = `
    <tr id="sem-itens">
        <td colspan="5" style="text-align:center;">
            Nenhum item adicionado
        </td>
    </tr>
    `

    listaCompras = []

    total = 0

    document.getElementById("total-valor").innerText = "R$ 0,00"

    const modalElement = document.getElementById("modalDeletarLista")
    const modal = bootstrap.Modal.getInstance(modalElement)
    modal.hide()

    salvarLista()

})


//Local storage para permanência de dados

function salvarLista(){
    localStorage.setItem("listaCompras", JSON.stringify(listaCompras))
}



window.addEventListener("DOMContentLoaded", function(){

    const dadosSalvos = localStorage.getItem("listaCompras")

    if(dadosSalvos){

        listaCompras = JSON.parse(dadosSalvos)

        const tabela = document.getElementById("lista-itens")
        tabela.innerHTML = ""

        listaCompras.forEach(item => {

            const novaLinha = `
            <tr>
            <td>${item.produto}</td>
            <td>${item.quantidade}</td>
            <td>${item.precoUnitario}</td>
            <td class="subtotal">${item.subtotal.toFixed(2)}</td>
            <td><button class="btn btn-outline-danger" onclick="excluirLinha(this)">X</button></td>
            </tr>
            `

            tabela.insertAdjacentHTML("beforeend", novaLinha)

            total += item.subtotal

        })

        document.getElementById("total-valor").innerText = "R$ " + total.toFixed(2)

    }

})