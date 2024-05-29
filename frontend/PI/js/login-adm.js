document.getElementById('form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch('http://localhost:3000/user');
        const result = await response.json();
        const user = result.users.find(user => user.usuario === nome && user.email === email && user.tipo !== "Cliente");

        if (user) {
            if (user.senha === senha) {
                alert('Login realizado com sucesso!');
                window.location.href = 'pag-adm.html'; // Redirecionar para a página de dashboard ou qualquer outra
            } else {
                alert('Senha incorreta!');
            }
        } else {
            alert('Administrador ou funcionário não encontrado!');
        }
    } catch (error) {
        console.error('Erro ao realizar login', error);
        alert('Um erro ocorreu, tente novamente mais tarde');
    }
});