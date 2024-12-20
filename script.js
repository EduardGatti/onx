const nomeCadastro = document.getElementById("cadastroNome")
const emailCadastro = document.getElementById("cadastroEmail")
const senhaCadastro = document.getElementById("cadastroSenha")
const repetirSenhaCadastro = document.getElementById("cadastroRepetirSenha")

//login
const email = document.getElementById("emailLogin")
const senha = document.getElementById("senhaLogin")




function cadastro() {
    let mensagem = "Preencha todos os campos."
    if (nomeCadastro.value == "" || emailCadastro.value == "" || senhaCadastro.value == "" || repetirSenhaCadastro.value == "") {
        alert(mensagem)
        return;
    }
    let emailValido = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(emailCadastro.value);
    if (!emailValido) {
        alert("Por favor, insira um email válido com '@' e '.'");
        return false;
    }
    if (senhaCadastro.value !== repetirSenhaCadastro.value) {
        alert("As senhas não coincidem.");
        return;
    }

    const usuario = {
        email: emailCadastro.value,
        nome: nomeCadastro.value,
        senha: senhaCadastro.value,
    }

    let bd = JSON.parse(localStorage.getItem("bancoDados"))
    if (bd == null) {
        bd = [];
    }

    if (existe(usuario, bd)) {
        mensagem = "Usuário já cadastrado."
        alert(mensagem)
    }
    else {
        bd.push(usuario)
        localStorage.setItem("bancoDados", JSON.stringify(bd))
        alert("Usuário cadastrado com sucesso.")
        window.location.href = "PaginaLogin.html"
    }
}

function login() {
    let emailL = email.value;
    let senhaL = senha.value;
    let mensagem = "Nenhum usuário cadastrado no momento";

    if (emailL == "" || senhaL == "") {
        mensagem = "Preencha todos os campos.";
        alert(mensagem);
        return;
    } else {
        let bd = JSON.parse(localStorage.getItem("bancoDados"));
        if (bd == null) {
            alert("Nenhum usuário cadastrado no momento.");
            return;
        }

        for (let usuario of bd) {
            if (usuario.email == emailL && usuario.senha == senhaL) {
                mensagem = "Login realizado com sucesso.";
                localStorage.setItem("usuarioLogin", JSON.stringify(usuario));
                window.location.href = "PaginaInicial.html";
                break;
            }
        }

        alert(mensagem);
    }
}



function existe(usuario, bancoDeDados) {
    for (let verificado of bancoDeDados) {
        if (verificado.nome === usuario.nome) {
            return true;
        }
    }
    return false;
}



function deslogar() {

    let bd = JSON.parse(localStorage.getItem("bancoDados"));

    for (let usuario of bd) {

        localStorage.removeItem("usuarioLogin", JSON.stringify(usuario))
        window.location.replace("PaginaLogin.html")
        break;

    }

}
function toggleSearchInput() {


    const searchContainer = document.querySelector(".search");
    const searchInput = document.getElementById("search-input");

    if (searchInput.style.display === "none" || searchInput.style.display === "") {
        searchInput.style.display = "block";
        searchInput.focus();
        searchContainer.classList.toggle("show-input");
    } else {
        searchInput.style.display = "none";
    }
}

function convertDate(dataBR) {
    if (!dataBR) return '';
    const [dia, mes, ano] = dataBR.split('-');
    return `${ano}-${mes}-${dia}`;
}



function editCount() {
    const perfil = JSON.parse(localStorage.getItem("bancoDados")) || [];
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogin"));
    const dados = document.getElementById("count");

    if (dados) {
        dados.innerHTML = '';
    } else {
        console.error("Elemento 'dados' não encontrado!");
    }

    if (usuarioLogado) {
        const usuario = perfil.find(user => user.email === usuarioLogado.email);

        if (usuario) {
            let dateNascimento = convertDate(usuario.nascimento)
            let cpf = usuario.cpf
            let cep = usuario.cep
            let rua = usuario.rua
            let cidade = usuario.cidade
            let estado = usuario.estado


            dados.innerHTML = `
            <label>Email:</label>
                <input type="email" value="${usuario.email}" disabled>
                <label>Nome:</label>
                <input type="text" value="${usuario.nome}" disabled>
                <label>Senha:</label>
                <input type="password" value="${usuario.senha}" disabled>
                <label>Data de Nascimento:</label>
                <input type="date" value="${usuario.nascimento}" disabled>
                <label for="cpf">CPF:</label>
                <input type="text" id="editCpf" maxlength="14" oninput="mascaraCPF(this)" value="${usuario.cpf || "CPF não informado"}" disabled> 
                <label>CEP:</label>
                <input type="text"value="${usuario.cep || "CEP não informado"}" disabled> 
                <input type="text"value="${usuario.rua || "Rua não informada"}" disabled> 
                <input type="text"value="${usuario.bairro || "Bairro não informado"}" disabled> 
                <input type="text"value="${usuario.cidade || "Cidade não informada"}" disabled> 
                <input type="text"value="${usuario.estado || "Estado não informado"}" disabled> 
                


                <button onclick="goedit()"><strong>Editar Usuario</strong></button>
            `;
        } else {
            dados.innerHTML = "<p>Usuário não encontrado no banco de dados.</p>";
        }
    } else {
        dados.innerHTML = "<p>Nenhum usuário logado.</p>";
    }
}

window.onload = editCount;

function goedit() {
    window.location.href = "PaginaEditarUsuario.html"
}

function infoConfig() {

    window.location.href = "PaginaConfig.html"

}

function voltarPaginaInicial() {

    window.location.href = "PaginaInicial.html"

}

function voltarPaginaConfig() {

    window.location.href = "PaginaConfig.html"

}

function irPaginaAnuncio() {

    window.location.href = "PaginaAnuncio.html"

}

const dbProduto = JSON.parse(localStorage.getItem("bancoDadosProduto")) || []; 

function mostraCards() {
    const gridCard = document.getElementById("grid-container"); 

    if (dbProduto.length === 0) {
        gridCard.innerHTML = "<p>Nenhum produto cadastrado.</p>";
        return; 
    }


    gridCard.innerHTML = '';

    for (let i = 0; i < dbProduto.length; i++) {
        gridCard.innerHTML += `
            <div class="card">
                <img src="${dbProduto[i].imagem}" alt="Imagem do Produto">
                <h3 class="card-title">${dbProduto[i].nome}</h3>
                <p class="card-text">${dbProduto[i].descricao}</p>
                <p class="card-categoria">${dbProduto[i].categoria}</p>
                <p class="card-preco">${dbProduto[i].preco}</p>
            </div>
        `;
    }
}
