document.getElementById('purchaseButton1').addEventListener('click', function () {
    var messageBox = document.getElementById('messageBox');
    messageBox.classList.remove('hidden');
    messageBox.style.display = 'block';
});

document.getElementById('purchaseButton2').addEventListener('click', function () {
    var messageBox = document.getElementById('messageBox');
    messageBox.classList.remove('hidden');
    messageBox.style.display = 'block';
});

document.getElementById('purchaseButton3').addEventListener('click', function () {
    var messageBox = document.getElementById('messageBox');
    messageBox.classList.remove('hidden');
    messageBox.style.display = 'block';
});

const modalAdicionar = document.getElementById("messageBox");
const closeBtnAdicionar = modalAdicionar.querySelector(".close");
closeBtnAdicionar.onclick = function () {
    modalAdicionar.style.display = "none";
}

window.onclick = function (event) {
    if (event.target === modalAdicionar) {
        modalAdicionar.style.display = "none";
    } else if (event.target === modalAtualizar) {
        modalAtualizar.style.display = "none";
    }
};

// "conta" 
// document.addEventListener('DOMContentLoaded', function() {
//     const logado = JSON.parse(localStorage.getItem('userjwt'));

//     console.log(logado);

//     // Redirecionar para a página de login se não estiver logado
//     if (!logado) {
//         window.location.href = 'pag-login.html';
//     }

//     // Adicionar evento ao botão "Logoff"
//     document.getElementById('logoff').onclick = function() {
//         localStorage.removeItem('userjwt');
//         location.reload();
//     };

//     // Adicionar evento ao botão "Conta" para abrir o modal
//     document.getElementById('conta').addEventListener('click', abrirModalEditar);

//     // Função para abrir o modal de edição
//     async function abrirModalEditar() {
//         const form = document.getElementById('form-editar');
//         form.reset();

//         form.querySelector('#nome').value = logado.nome;
//         form.querySelector('#nome_comp').value = logado.nome_completo;
//         form.querySelector('#email').value = logado.email;

//         // Evento de envio do formulário
//         form.onsubmit = async function(event) {
//             event.preventDefault();

//             const id = logado.id;
//             const nome = document.getElementById('nome').value;
//             const nome_comp = document.getElementById('nome_comp').value;
//             const email = document.getElementById('email').value;

//             const data = {
//                 id: id,
//                 usuario: nome,
//                 nome_completo: nome_comp,
//                 email: email
//             };

//             try {
//                 const response = await fetch(`http://localhost:3000/user/${id}`, {
//                     method: 'PUT',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${logado.accessToken}`
//                     },
//                     body: JSON.stringify(data)
//                 });

//                 if (!response.ok) {
//                     throw new Error('Erro ao atualizar usuário');
//                 }

//                 const responseData = await response.json();
//                 localStorage.setItem('userjwt', JSON.stringify(responseData.user));
//                 alert('Conta atualizada com sucesso');
//                 location.reload();
//             } catch (error) {
//                 console.error('Erro ao atualizar usuário:', error);
//                 alert('Erro ao atualizar usuário. Verifique se você tem permissão para atualizar os dados.');
//             }
//         };
//     }
// });
// fim "conta"

// "minha conta" 
document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('login-btn');
    const accountButton = document.getElementById('account-btn');
    const logoffButton = document.getElementById('logoff');
    const modal = document.getElementById('account-modal');
    const closeModal = document.querySelector('.close-editar');
    const form = document.getElementById('form-editar');

    // Função para verificar se o usuário está logado
    const logado = JSON.parse(localStorage.getItem('userjwt'));
    console.log('Token:', logado);

    if (logado) {
        accountButton.style.display = 'inline-block';
        logoffButton.style.display = 'inline-block';
    } else {
        window.location.href = 'pag-login.html';
    }

    // Exibir modal ao clicar no botão "Minha Conta"
    accountButton.addEventListener('click', () => {
        abrirModalEditar(logado);
        modal.style.display = 'block';
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    logoffButton.onclick = function() {
        localStorage.removeItem('userjwt');
        location.reload();
    };

    async function abrirModalEditar(user) {
        form.reset();

        form.querySelector('#nome').value = user.nome_completo;
        form.querySelector('#nome_comp').value = user.nome_completo;
        form.querySelector('#email').value = user.email;
    }

    // Evento de envio do formulário
    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const id = logado.id;
        const nome = document.getElementById('nome').value;
        const nome_comp = document.getElementById('nome_comp').value;
        const email = document.getElementById('email').value;

        const data = {
            id: id,
            usuario: nome,
            nome_completo: nome_comp,
            email: email
        };

        try {
            const token = JSON.parse(localStorage.getItem('userjwt'));
            console.log('Token:', token.accessToken);

            const response = await fetch(`http://localhost:3000/user/${token.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.accessToken}`
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar usuário');
            }

            const responseData = await response.json();
            localStorage.setItem('userjwt', JSON.stringify(responseData.user));
            alert('Conta atualizada com sucesso');
            location.reload();
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            alert('Erro ao atualizar usuário. Verifique se você tem permissão para atualizar os dados.');
        }
    });
    
});
// fim "minha conta" 




