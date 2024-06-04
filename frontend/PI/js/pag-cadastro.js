document.getElementById('cpf').addEventListener('input', function (event) {
    let input = event.target;
    let value = input.value;

    // Remove todos os caracteres que não sejam dígitos
    value = value.replace(/\D/g, '');

    if (value.length > 11) {
        value = value.slice(0, 11);
    }

    // Adiciona a formatação de CPF (xxx.xxx.xxx-xx)
    if (value.length > 3 && value.length <= 6) {
        value = value.replace(/(\d{3})(\d+)/, '$1.$2');
    } else if (value.length > 6 && value.length <= 9) {
        value = value.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
    } else if (value.length > 9) {
        value = value.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4');
    }

    // Atualiza o valor do input com a formatação
    input.value = value;
});


document.getElementById('cadastro').addEventListener('submit', async function(event){
    event.preventDefault();

    const nomeComp = document.getElementById('nomeCompleto').value;
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const cpf = document.getElementById('cpf').value.replace(/\D/g, '');
    const senha = document.getElementById('senha').value;
    const senha2 = document.getElementById('senha2').value;

    if (senha == senha2){
        if (senha.length >= 8) {
            try {
                const response = await fetch('http://localhost:3000/user');
                const result = await response.json()
                const userExists = result.users.filter(user => user.usuario === nome );
                const emailExists = result.users.filter(user => user.email === email );
    
                if (emailExists.length > 0) {
                    alert('o email ja existe')
                } else {
                    
                
                if (userExists.length > 0) {
                    alert('o nome de usuario ja existe')
                }else{
                    const novoUser = {
                        nome_completo: nomeComp,
                        usuario : nome,
                        email: email,
                        cpf: cpf,
                        senha : senha,
                        tipo: "Cliente"
                    };
    
                    const registerResponse = await fetch('http://localhost:3000/user', {
                        method: 'POST',
                        headers:{
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(novoUser)
                    });
                    
                    
                    if (registerResponse.ok) {
                        const result = await registerResponse.json()
                        alert('Cadastro realizado!!!')
                        localStorage.setItem("userjwt", JSON.stringify(result.user))
                        window.location.href = 'pag-ingresso.html'
                    } else {
                        alert('Falha ao cadastrar!')
                    }
                }
            }
    
            } catch (error) {
                console.error('erro ao registrar', error);
                alert('um error ocorreu, tente novamente mais tarde')
            }
        } else {
            alert('A senha é obrigatória e deve ter no minimo 8 caracteres')
        }
    }
    else{
        alert("As senhas não estão iguais")
    }
});

// mostrar senha 1 
document.getElementById('togglePassword').addEventListener('change', function () {
    let password = document.getElementById('senha');
    let confirmPassword = document.getElementById('senha2');
    let type = this.checked ? 'text' : 'password';
    password.type = type;
    confirmPassword.type = type;
});
