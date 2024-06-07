 // Fechar o modal de mensagem ao clicar no botão de fechar

// fechar modal fim


// "minha conta" 
document.addEventListener('DOMContentLoaded', function() {
    const logado = JSON.parse(localStorage.getItem('userjwt'));

    console.log(logado);

    // Redirecionar para a página de login se não estiver logado
    if (!logado) {
        window.location.href = 'pag-login.html';
    }

    // Adicionar evento ao botão "Logoff"
    document.getElementById('logoff').onclick = function() {
        localStorage.removeItem('userjwt');
        location.reload();
    };

    // Adicionar evento ao botão "Conta" para abrir o modal
    document.getElementById('account-btn').addEventListener('click', abrirModalEditar);

    // Exibir modal ao clicar no botão "Minha Conta"
    // accountButton.addEventListener('click', () => {
    //     abrirModalEditar();
    // });
    
    // Função para abrir o modal de edição
    async function abrirModalEditar() {
        const modal = document.getElementById('account-modal')
        const closeModal = document.querySelector('.close-editar');
        const form = document.getElementById('form-editar');
        modal.style.display = 'block';

        closeModal.addEventListener('click', function () {
                    modal.style.display = 'none';
                });

        form.reset();

        form.querySelector('#nome').value = logado.usuario;
        form.querySelector('#nome_comp').value = logado.nome_completo;
        form.querySelector('#email').value = logado.email;

        // Evento de envio do formulário
        form.onsubmit = async function(event) {
            event.preventDefault();

            const id = logado.id;
            const nome = document.getElementById('nome').value;
            const nome_comp = document.getElementById('nome_comp').value;
            const email = document.getElementById('email').value;
            const password = ''

            const data = {
                id: id,
                usuario: nome,
                nome_completo: nome_comp,
                email: email
            };
            if (password) {
                data.password = password
            }

            const response = await fetch('http://localhost:3000/user')
            const result = await response.json()
            const userExist = result.users.filter(user => user.usuario === nome && user.id !== id);
            const emailExist = result.users.filter(user => user.email === email && user.id !== id);


            try {
                var token = localStorage.getItem('userjwt');
                token = JSON.parse(token);

                const response = await fetch(`http://localhost:3000/user/${token.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token.accessToken}`
                    },
                    body: JSON.stringify(data)
                });
                const responseData = await response.json();

                localStorage.setItem('userjwt', JSON.stringify(responseData.user));
               
                if (!response.ok) {
                    throw new Error('Erro ao atualizar usuário');
                    return
                }

                alert('Conta atualizada com sucesso');
                location.reload();
            } catch (error) {
                console.error('Erro ao atualizar usuário:', error);
                alert('Erro ao atualizar usuário. Verifique se você tem permissão para atualizar os dados.');
            }
        };
    }
});
// fim "minha conta"
