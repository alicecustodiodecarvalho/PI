 // tabela 1 
 var users = [];
 document.addEventListener("DOMContentLoaded", function () {
     // mudanças (editar/excluir/add)
     const modalAdicionar = document.getElementById("modalAdicionar");
     const formAdicionar = document.getElementById("formAdicionar");

     // Função para abrir o modal de adicionar usuário
     function abrirModalAdicionar() {
         modalAdicionar.style.display = "block";
     }

     // Função para fechar o modal de adicionar usuário
     function fecharModalAdicionar() {
         modalAdicionar.style.display = "none";
     }

     // Adiciona um evento de clique ao botão de adicionar usuário para abrir o modal
     document.getElementById("btnAbrirModalAdicionar").addEventListener("click", abrirModalAdicionar);

     // Adiciona um evento de envio ao formulário de adicionar usuário
     formAdicionar.addEventListener("submit", async function (event) {
         event.preventDefault();

         // Obtenha os valores dos campos do formulário
         const nome = document.getElementById("nomeAdicionar").value;
         const email = document.getElementById("emailAdicionar").value;
         const nome_usuario = document.getElementById("nome_usuarioAdicionar").value;

         // Aqui você pode fazer o que quiser com os valores, como enviá-los para o backend
         try {
             const response = await fetch('http://localhost:3000/user');
             const result = await response.json();
             const userExists = result.users.filter(user => user.email === email);

             if (userExists.length > 0) {
                 alert('O email já existe. Por favor, escolha um email diferente.');
             } else {
                 const newUser = {
                     nome_completo: nome,
                     usuario: nome_usuario,
                     email: email,
                     tipo: "Cliente"
                 };

                 const registerResponse = await fetch('http://localhost:3000/user', {
                     method: 'POST',
                     headers: {
                         'Content-Type': 'application/json'
                     },
                     body: JSON.stringify(newUser)
                 });

                 if (registerResponse.ok) {
                     alert('Cadastro realizado com sucesso!');
                     carregarUsers()
                 } else {
                     alert('Cadastro falhou');
                 }
             }
         } catch (error) {
             console.error('Erro ao registrar usuário:', error);
             alert('Um erro ocorreu. Por favor, tente novamente mais tarde.');
         }

         // Após lidar com os valores, feche o modal
         fecharModalAdicionar();
     });
     //   fim mudanças (editar/excluir/add)

     async function carregarUsers() {
         try {
             const response = await fetch("http://localhost:3000/user");
             const data = await response.json();
             users = data.users;
             console.log("Users carregados: ", users);
             exibirUsers();
         } catch (error) {
             console.error("Erro ao carregar users: ", error);
         }
     }

     function exibirUsers() {
         const listaUsers = document.getElementById("lista-users1");
         listaUsers.innerHTML = "";

         users.forEach((user, index) => {
             const row = criarUser(user, index);
             listaUsers.appendChild(row);
         });
     }

     function criarUser(user, index, id) {
         const row = document.createElement("tr");

         if (user.tipo == "Cliente") {
             const idUser = user.id

             const tdNome = document.createElement("td");
             tdNome.textContent = user.nome_completo;

             const tdTipo = document.createElement("td");

             tdTipo.textContent = user.tipo;

             const tdQuantidade = document.createElement("td");
             tdQuantidade.textContent = user.quantidade;

             const tdData = document.createElement("td");
             tdData.textContent = user.data;

             const tdValor = document.createElement("td");
             tdValor.textContent = user.valor;

             // <button type="button" id="btn-excluir"class="btn-excluir">
             //     <i class="icofont icofont-delete-alt"></i>
             // </button>

             const tdEditar = document.createElement("td");
             const aEditar = document.createElement("a");
             aEditar.classList.add("btn-abrirEditar")
             const iconeEditar = document.createElement("i");
             iconeEditar.classList.add("icofont", "icofont-edit-alt");
             aEditar.addEventListener("click", () => {
                 abrirModalEditar(user, index)
             });
             aEditar.appendChild(iconeEditar);
             tdEditar.appendChild(aEditar);

             const tdExcluir = document.createElement("td");
             const aExcluir = document.createElement("button");
             const iconeExcluir = document.createElement("i");
             iconeExcluir.classList.add("icofont", "icofont-delete-alt");
             aExcluir.addEventListener("click", () => {
                 excluirUser(idUser)
             })
             aExcluir.appendChild(iconeExcluir);
             tdExcluir.appendChild(aExcluir);

             row.appendChild(tdNome);
             row.appendChild(tdTipo);
             row.appendChild(tdQuantidade);
             row.appendChild(tdData);
             row.appendChild(tdValor);
             row.appendChild(tdEditar);
             row.appendChild(tdExcluir);

             // // mudanças (excluir/editar/add)

             // const btnAtualizar = document.createElement("button");
             // btnAtualizar.textContent = "Edit"
             // btnAtualizar.classList.add("btn-abrirEditar")
             // btnAtualizar.addEventListener("click", () => {
             //     abrirModalEditar(user, index)
             // });


             // row.appendChild(btnAtualizar);
             // fim mudanças (excluir/editar/add)

         }
         return row;
     }

     // mudanças (editar/excluir/add) 
     async function excluirUser(id) {
         if (confirm("Tem certeza de que deseja excluir este usuário?")) {
             try {
                 const response = await fetch(`http://localhost:3000/user/${id}`, {
                     method: 'DELETE'
                 });

                 if (!response.ok) {
                     throw new Error('Erro ao deletar usuário');
                 }

                 alert("Usuário deletado com sucesso");
                 carregarUsers();

             } catch (error) {
                 console.error('Erro ao deletar usuário:', error);
                 alert("Erro ao deletar usuário");
             }
         }
     }

     function abrirModalEditar(user, index) {
         const modal = document.getElementById("modal-editar");
         const form = document.getElementById("form-editar");

         form.reset();

         form.querySelector("#id").value = user.id;
         form.querySelector("#nome").value = user.nome_completo;
         form.querySelector("#email").value = user.email;

         modal.style.display = "block"

         form.onsubmit = async function (event) {
             event.preventDefault();



             users[index].id = form.querySelector("#id").value,
                 users[index].nome_completo = form.querySelector("#nome").value,
                 users[index].email = form.querySelector("#email").value

             try {
                 console.log(users[index]);
                 const response = await fetch(`http://localhost:3000/user/${user.id}`, {
                     method: 'PUT',
                     headers: {
                         'Content-Type': 'application/json'
                     },
                     body: JSON.stringify(users[index])
                 });

                 if (!response.ok) {
                     throw new Error('Erro ao atualizar usuário');
                 }

                 // Fechando o modal após a atualização
                 modal.style.display = "none";

                 // Recarregando os usuários após a atualização
                 carregarUsers();

             } catch (error) {
                 console.error('Erro ao atualizar usuário:', error);
             }

             modal.style.display = "none";

             exibirUsers();
         }

         document.getElementById("btn-excluir").onclick = function () {
             excluirUser(user.id);
             modal.style.display = "none"
         }

     }

     const modalAtualizar = document.getElementById("modal-editar");
     const closeBtnAtualizar = modalAtualizar.querySelector(".close-editar");
     closeBtnAtualizar.onclick = function () {
         modalAtualizar.style.display = "none";
     }

     const closeBtnAdicionar = modalAdicionar.querySelector(".close-adicionar");
     closeBtnAdicionar.onclick = function () {
         modalAdicionar.style.display = "none";
     }

     window.onclick = function (event) {
         if (event.target === modalAdicionar) {
             modalAdicionar.style.display = "none"
         }
         else if (event.target === modalAtualizar) {
             modalAtualizar.style.display = "none"
         }
     }
     // fim mudanças (editar/excluir/add) 

     document.addEventListener("DOMContentLoaded", () => {
         carregarUsers();
     });
     carregarUsers();
 })
 // fim tabela 1 

 // tabela 2 
 var users = [];
 document.addEventListener("DOMContentLoaded", function () {

     // mudanças (editar/excluir/add)
     const modalAdicionar = document.getElementById("modalAdicionarFunc");
     const formAdicionar = document.getElementById("formAdicionarFunc");

     // Função para abrir o modal de adicionar usuário
     function abrirModalAdicionar() {
         modalAdicionar.style.display = "block";
     }

     // Função para fechar o modal de adicionar usuário
     function fecharModalAdicionar() {
         modalAdicionar.style.display = "none";
     }

     // Adiciona um evento de clique ao botão de adicionar usuário para abrir o modal
     document.getElementById("btnAbrirModalAdicionarFunc").addEventListener("click", abrirModalAdicionar);

     // Adiciona um evento de envio ao formulário de adicionar usuário
     formAdicionar.addEventListener("submit", async function (event) {
         event.preventDefault();

         // Obtenha os valores dos campos do formulário
         const nome = document.getElementById("nomeAdicionarFunc").value;
         const email = document.getElementById("emailAdicionarFunc").value;
         const nome_usuario = document.getElementById("nome_usuarioAdicionarFunc").value;

         // Aqui você pode fazer o que quiser com os valores, como enviá-los para o backend
         try {
             const response = await fetch('http://localhost:3000/user');
             const result = await response.json();
             const userExists = result.users.filter(user => user.email === email);

             if (userExists.length > 0) {
                 alert('O email já existe. Por favor, escolha um email diferente.');
             } else {
                 const newUsers = {
                     nome_completo: nome,
                     usuario: nome_usuario,
                     email: email,
                     tipo: "Funcionario"
                 };

                 const registerResponse = await fetch('http://localhost:3000/user', {
                     method: 'POST',
                     headers: {
                         'Content-Type': 'application/json'
                     },
                     body: JSON.stringify(newUsers)
                 });

                 if (registerResponse.ok) {
                     alert('Cadastro realizado com sucesso!');
                     carregarUsers()
                 } else {
                     alert('Cadastro falhou');
                 }
             }
         } catch (error) {
             console.error('Erro ao registrar usuário:', error);
             alert('Um erro ocorreu. Por favor, tente novamente mais tarde.');
         }

         // Após lidar com os valores, feche o modal
         fecharModalAdicionar();
     });
     //   fim mudanças (editar/excluir/add)

     async function carregarUsers() {
         try {
             const response = await fetch("http://localhost:3000/user");
             const data = await response.json();
             users = data.users;
             console.log("Users carregados: ", users);
             exibirUsers();
         } catch (error) {
             console.error("Erro ao carregar users: ", error);
         }
     }

     function exibirUsers() {
         const listaUsers = document.getElementById("lista-users2");
         listaUsers.innerHTML = "";

         users.forEach((user, index, id) => {
             const row = criarUser(user, index, id);
             listaUsers.appendChild(row);
         });
     }

     function criarUser(user, index, id) {
         const row = document.createElement("tr");

         if (user.tipo == "Funcionario" || user.tipo == "Administrador") {
             const idUser = user.id

             const tdNome = document.createElement("td");
             tdNome.textContent = user.nome_completo;

             const tdTipo = document.createElement("td");

             tdTipo.textContent = user.tipo;

             // const tdQuantidade = document.createElement("td");
             // tdQuantidade.textContent = user.quantidade;

             // const tdData = document.createElement("td");
             // tdData.textContent = user.data;

             // const tdValor = document.createElement("td");
             // tdValor.textContent = user.valor;

             const tdEditar = document.createElement("td");
             const aEditar = document.createElement("a");
             aEditar.classList.add("btn-abrirEditar")
             const iconeEditar = document.createElement("i");
             iconeEditar.classList.add("icofont", "icofont-edit-alt");
             aEditar.addEventListener("click", () => {
                 abrirModalEditar(user, index)
             });
             aEditar.appendChild(iconeEditar);
             tdEditar.appendChild(aEditar);

             const tdExcluir = document.createElement("td");
             const aExcluir = document.createElement("button");
             const iconeExcluir = document.createElement("i");
             iconeExcluir.classList.add("icofont", "icofont-delete-alt");
             aExcluir.addEventListener("click", () => {
                 excluirUser(idUser)
             })
             aExcluir.appendChild(iconeExcluir);
             tdExcluir.appendChild(aExcluir);

             row.appendChild(tdNome);
             row.appendChild(tdTipo);
             // row.appendChild(tdQuantidade);
             // row.appendChild(tdData);
             // row.appendChild(tdValor);
             row.appendChild(tdEditar);
             row.appendChild(tdExcluir);

         }
         return row;
     }

     async function excluirUser(id) {
         if (confirm("Tem certeza de que deseja excluir este usuário?")) {
             try {
                 const response = await fetch(`http://localhost:3000/user/${id}`, {
                     method: 'DELETE'
                 });

                 if (!response.ok) {
                     throw new Error('Erro ao deletar usuário');
                 }

                 alert("Usuário deletado com sucesso");
                 carregarUsers();

             } catch (error) {
                 console.error('Erro ao deletar usuário:', error);
                 alert("Erro ao deletar usuário");
             }
         }
     }

     function abrirModalEditar(user, index) {
         const modal = document.getElementById("modal-editar");
         const form = document.getElementById("form-editar");

         form.reset();

         form.querySelector("#id").value = user.id;
         form.querySelector("#nome").value = user.nome_completo;
         form.querySelector("#email").value = user.email;

         modal.style.display = "block"

         form.onsubmit = async function (event) {
             event.preventDefault();



             users[index].id = form.querySelector("#id").value,
                 users[index].nome_completo = form.querySelector("#nome").value,
                 users[index].email = form.querySelector("#email").value

             try {
                 console.log(users[index]);
                 const response = await fetch(`http://localhost:3000/user/${user.id}`, {
                     method: 'PUT',
                     headers: {
                         'Content-Type': 'application/json'
                     },
                     body: JSON.stringify(users[index])
                 });

                 if (!response.ok) {
                     throw new Error('Erro ao atualizar usuário');
                 }

                 // Fechando o modal após a atualização
                 modal.style.display = "none";

                 // Recarregando os usuários após a atualização
                 carregarUsers();

             } catch (error) {
                 console.error('Erro ao atualizar usuário:', error);
             }

             modal.style.display = "none";

             exibirUsers();
         }

         document.getElementById("btn-excluir").onclick = function () {
             excluirUser(user.id);
             modal.style.display = "none"
         }

     }

     const modalAtualizar = document.getElementById("modal-editar");
     const closeBtnAtualizar = modalAtualizar.querySelector(".close-editar");
     closeBtnAtualizar.onclick = function () {
         modalAtualizar.style.display = "none";
     }

     const closeBtnAdicionar = modalAdicionar.querySelector(".close-adicionarFunc");
     closeBtnAdicionar.onclick = function () {
         modalAdicionar.style.display = "none";
     }

     window.onclick = function (event) {
         if (event.target === modalAdicionar) {
             modalAdicionar.style.display = "none";
         }
         else if (event.target === modalAtualizar) {
             modalAtualizar.style.display = "none";
         }
     }
     // fim mudanças (editar/excluir/add) 

     document.addEventListener("DOMContentLoaded", () => {
         carregarUsers();
     });
     carregarUsers();
 })
 // fim tabela 2 