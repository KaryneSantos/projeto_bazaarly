function validarSenha(senha) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(senha); // Exige que o usuário digite pelo menos 8 caracteres, com maiusculas, minisculas, números e caracteres especiais
}

function validarEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
}

document.getElementById("signup-btn").addEventListener("click", function () {
    const form = document.getElementById("form-cadastro");

    // Realize as validações aqui (ou apenas invoque o `form.submit()` se as validações do back-end já estiverem cobrindo tudo)
    const nome_usuario = form.elements["nome_usuario"].value;
    const email = form.elements["email"].value;
    const senha = form.elements["senha"].value;
    const confirmacao_senha = form.elements["confirmacao_senha"].value;

    // Exemplo básico de validações no front-end
    if (!nome_usuario || !email || !senha || !confirmacao_senha) {
        alert("Todos os campos são obrigatórios!");
        return;
    }
    if (senha !== confirmacao_senha) {
        alert("As senhas não coincidem!");
        return;
    }
    if (!validarEmail(email)) {
        alert("Por favor, insira um e-mail válido!");
        return;
    }
    if (!validarSenha(senha)) {
        alert("A senha deve conter pelo menos 8 caracteres, com letras maiúsculas, minúsculas, números e caracteres especiais!");
        return;
    }

    // Se todas as validações passarem, envie o formulário
    form.submit();
});
