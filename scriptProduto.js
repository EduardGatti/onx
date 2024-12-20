document.addEventListener("DOMContentLoaded", function () {
    const nomeProduto = document.getElementById("nomeProduto");
    const descricaoProduto = document.getElementById("descricaoProduto");
    const precoProduto = document.getElementById("precoProduto");
    const categoriaProduto = document.getElementById("idCategoria");
    const estoqueProduto = document.getElementById("estoqueProduto");
    const condicaoProduto = document.getElementById("condicaoProduto");
    const imagemProduto = document.getElementById("imagemProduto");
    const previewImagem = document.getElementById("previewImagem");
    
    imagemProduto.addEventListener("change", function () {
        const file = imagemProduto.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewImagem.src = e.target.result;
                previewImagem.style.display = "block";
            };
            reader.readAsDataURL(file);
        } else {
            previewImagem.style.display = "none";
        }
    });

    document.getElementById("btnCadastrar").addEventListener("click", function () {
        const [file] = imagemProduto.files;
        if (
            nomeProduto.value === "" ||
            descricaoProduto.value === "" ||
            categoriaProduto.value === "" ||
            precoProduto.value === "" ||
            estoqueProduto.value === "" ||
            condicaoProduto.value === "" ||
            !file
        ) {
            alert("Preencha todos os campos!");
            return false;
        }

        const reader = new FileReader();
        reader.onloadend = function () {
            const path = reader.result;

            const produto = {
                id: Date.now(),
                nome: nomeProduto.value,
                descricao: descricaoProduto.value,
                categoria: categoriaProduto.value,
                preco: precoProduto.value,
                estoque: estoqueProduto.value,
                condicao: condicaoProduto.value,
                imagem: path,
            };

            let bdProduto = JSON.parse(localStorage.getItem("bancoDadosProduto"));
            if (!bdProduto) {
                bdProduto = [];
            }

            let confirmar = confirm("Você deseja cadastrar este produto?");
            if (confirmar) {
                bdProduto.push(produto);
                localStorage.setItem("bancoDadosProduto", JSON.stringify(bdProduto));
                limparFormulario();
                window.location.href = "PaginaInicial.html";
            }
        };

        reader.readAsDataURL(file);
    });

    function formatarPreco(input) {
        let valor = input.value.replace(/\D/g, "");
        let valorFormatado = valor.replace(/(\d)(\d{2})$/, "$1,$2");
        valorFormatado = valorFormatado.replace(/(?=(\d{3})+(?!\d))/g, ".");
        input.value = "R$ " + valorFormatado;
    }
    
    document.getElementById("precoProduto").addEventListener("input", function () {
        formatarPreco(this);
    });

    function limparFormulario() {
        nomeProduto.value = "";
        descricaoProduto.value = "";
        precoProduto.value = "";
        estoqueProduto.value = "";
        imagemProduto.value = "";
        nomeProduto.focus();
    }
});
