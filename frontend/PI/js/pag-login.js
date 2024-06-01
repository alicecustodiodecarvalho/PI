document.getElementById('form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch('http://localhost:3000/user');
        const result = await response.json()
        const user = result.users.find(user => user.usuario === nome && user.email === email && user.tipo === "Cliente");

       if (user) {
        const login = await fetch('http://localhost:3000/user/login',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            usuario: nome,
            email: email,
            senha: senha
        })
       });

       if (login.ok) {
        const result = await login.json();
        localStorage.setItem("userjwt", JSON.stringify(result))
        alert('Login realizado com sucesso!');

        window.location.href = 'pag-ingresso.html';

       }else{
        alert('Email ou senha incorreto')
       }
       } else {
        alert('Usuario não encontrado')
       }

    } catch (error) {
        console.error('Erro ao realizar login', error);
        alert('Um erro ocorreu, tente novamente mais tarde');
    }
});