function validarSenha(senha) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(senha); // Exige que o usuário digite pelo menos 8 caracteres, com maiusculas, minisculas, números e caracteres especiais
}


document.getElementById('form').addEventListener('submit', function(event) {
    const nome = document.getElementById('nome_usuario').value;
    const email = document.getElementById('nome_usuario').value;
    const senha= document.getElementById('nome_usuario').value;
    const confim_senha = document.getElementById('nome_usuario').value;

    const alerta = document.querySelector('.msg');

    // Verificar se todos os campos obrigátorios estão preenchidos

    if(!nome || !email || !senha || !confim_senha) {
        console.log('Todos os campos são obrigátorios');
        alerta.innerHTML = 'Todos os campos são obrigátorios';
        event.preventDefault();
        return;
    }


    // Validação de email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if(!emailRegex.test(email)){
        console.log('Por favor, insira um e-mail válido!');
        alerta.innerHTML = 'Por favor, insira um e-mail válido!';
        event.preventDefault();
        return;
    }

    // Validação de senha
    if(!validarSenha(senha)){
        console.log('A senha deve conter pelo menos 8 caracteres, com letras maiúsculas, minúsculas, números e caracteres especiais!');
        alerta.innerHTML = 'A senha deve conter pelo menos 8 caracteres, com letras maiúsculas, minúsculas, números e caracteres especiais!';
        event.preventDefault();
        return;
    }

    if(senha != confim_senha) {
        console.log('As senhas não coincidem!');
        alerta.innerHTML = 'As senhas não coincidem!';
        event.preventDefault();
        return;
    }

    alerta.innerHTML = 'Formulário enviado com sucesso!';
});