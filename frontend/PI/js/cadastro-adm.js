document.getElementById('cadastro').addEventListener('submit', async function(event){
    event.preventDefault();

    const nomeComp = document.getElementById('nomeCompleto').value;
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const senha2 = document.getElementById('senha2').value;

    if (senha == senha2){
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
                    senha : senha,
                    tipo: "Funcionario"
                };

                const registerResponse = await fetch('http://localhost:3000/user', {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(novoUser)
                });

                if (registerResponse.ok) {
                    alert('Cadastro realizado!!!')
                    window.location.href = 'pag-adm.html'
                } else {
                    alert('Falha ao cadastrar!')
                }
            }
        }

        } catch (error) {
            console.error('erro ao registrar', error);
            alert('um error ocorreu, tente novamente mais tarde')
        }
    }
    else{
        alert("As senhas não estão iguais")
    }
})