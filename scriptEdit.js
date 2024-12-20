function mascaraCPF(input) {
    let cpf = input.value.replace(/\D/g, '');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    input.value = cpf;
}

function mascaraCEP(input) {
    let cep = input.value.replace(/\D/g, '');
    cep = cep.replace(/(\d{5})(\d)/, '$1-$2');
    input.value = cep;
}

async function buscarCEP(cepInput) {
    const cep = cepInput.value.replace(/\D/g, '');
    if (cep.length === 8) {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
            document.getElementById("editRua").value = data.logradouro || "";
            document.getElementById("editBairro").value = data.bairro || "";
            document.getElementById("editCidade").value = data.localidade || "";
            document.getElementById("editEstado").value = data.uf || "";
        }
    }
}

function editUser() {
    const perfil = JSON.parse(localStorage.getItem("bancoDados")) || [];
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogin"));
    const editCount = document.getElementById("editCount");
    editCount.innerHTML = '';
    if (usuarioLogado) {
        const usuario = perfil.find(user => user.email === usuarioLogado.email);
        if (usuario) {
            editCount.innerHTML = `
            <label>Email:</label>
            <input type="email" id="editEmail" value="${usuario.email}" required>
            <label>Nome:</label>
            <input type="text" id="editNome" value="${usuario.nome}" required>
            <label>Senha:</label>
            <input type="text" id="editSenha" value="${usuario.senha}" required>
            <label>Data de Nascimento:</label>
            <input type="date" id="editNascimento" value="${usuario.nascimento}" required>
            <label for="cpf">CPF:</label>
            <input type="text" id="editCpf" maxlength="14" oninput="mascaraCPF(this)" value="${usuario.cpf || ""}" placeholder="Digite o CPF" required>
            <label>CEP:</label>
            <input type="text" id="editCep" maxlength="9" oninput="mascaraCEP(this)" onkeydown="if(event.key === 'Enter') buscarCEP(this)" value="${usuario.cep || ""}" placeholder="Digite o CEP" required>
            <input type="text" id="editRua" value="${usuario.rua || ""}" placeholder="Digite a Rua" required>
            <input type="text" id="editBairro" value="${usuario.bairro || ""}" placeholder="Digite o Bairro" required>
            <input type="text" id="editCidade" value="${usuario.cidade || ""}" placeholder="Digite a Cidade" required>
            <input type="text" id="editEstado" value="${usuario.estado || ""}" placeholder="Digite o Estado" required>
            <button onclick="saveEdit()"><strong>Salvar</strong></button>
            `;
        } else {
            editCount.innerHTML = "<p>Usuário não encontrado no banco de dados.</p>";
        }
    } else {
        editCount.innerHTML = "<p>Nenhum usuário logado.</p>";
    }
}

function saveEdit() {
    const perfil = JSON.parse(localStorage.getItem("bancoDados")) || [];
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogin"));
    const novoEmail = document.getElementById("editEmail").value;
    const novoNome = document.getElementById("editNome").value;
    const novaSenha = document.getElementById("editSenha").value;
    const novaDataNascimento = document.getElementById("editNascimento").value;
    const novoCpf = document.getElementById("editCpf").value;
    const novoCep = document.getElementById("editCep").value;
    const novoRua = document.getElementById("editRua").value;
    const novoBairro = document.getElementById("editBairro").value;
    const novoCidade = document.getElementById("editCidade").value;
    const novoEstado = document.getElementById("editEstado").value;
    const index = perfil.findIndex(user => user.email === usuarioLogado.email);
    if (index !== -1) {
        perfil[index].email = novoEmail;
        perfil[index].nome = novoNome;
        perfil[index].senha = novaSenha;
        perfil[index].nascimento = novaDataNascimento;
        perfil[index].cpf = novoCpf;
        perfil[index].cep = novoCep;
        perfil[index].rua = novoRua;
        perfil[index].bairro = novoBairro;
        perfil[index].cidade = novoCidade;
        perfil[index].estado = novoEstado;
        localStorage.setItem("bancoDados", JSON.stringify(perfil));
        alert("Dados atualizados com sucesso!");
        window.location.href = "PaginaMinhaConta.html";
    } else {
        alert("Erro ao salvar alterações.");
    }
}

window.onload = editUser;
