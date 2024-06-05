// Função para gerar e baixar o código de barras automaticamente
function generateAndDownloadBarcode() {
    // Gerar um código de barras único
    var barcodeValue = generateBarcodeValue(); // Função para gerar um valor único para o código de barras

    // Gerar o código de barras com JsBarcode
    JsBarcode("#barcode", barcodeValue, {
        format: "CODE128",
        width: 2,
        height: 50,
        displayValue: false
    });

    // Obter o SVG do código de barras
    var barcodeSVG = document.getElementById("barcode");
    var svgData = new XMLSerializer().serializeToString(barcodeSVG);

    // Convertendo o SVG para uma imagem PNG
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var img = new Image();
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
        var imageData = canvas.toDataURL("image/png");

        // Criando um link de download
        var link = document.createElement("a");
        link.href = imageData;
        link.download = "barcode.png";
        document.body.appendChild(link);

        // Clicando automaticamente no link para iniciar o download
        link.click();

        // Removendo o link após o download
        document.body.removeChild(link);
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
}

// Função para gerar um valor único para o código de barras
function generateBarcodeValue() {
    // Aqui você pode implementar a lógica para gerar um valor único, como um número aleatório, um timestamp, ou uma combinação de informações relevantes.
    // Por exemplo:
    // return Math.random().toString(36).substr(2, 10); // Gera um ID único de 10 caracteres aleatórios
    return "teste" + Math.floor(Math.random() * 1000); // Gera um código de barras com o prefixo "teste" e um número aleatório entre 0 e 999
}

// Adicionando um evento de clique ao botão "Comprar"
document.getElementById("purchaseButton1").addEventListener("click", function() {
    // Executar a função para gerar e baixar o código de barras
    generateAndDownloadBarcode();

    // Mostrar a mensagem de compra concluída
    var messageBox = document.getElementById('messageBox');
    messageBox.classList.remove('hidden');
    messageBox.style.display = 'block';
});

document.getElementById("purchaseButton2").addEventListener("click", function() {
    // Executar a função para gerar e baixar o código de barras
    generateAndDownloadBarcode();

    // Mostrar a mensagem de compra concluída
    var messageBox = document.getElementById('messageBox');
    messageBox.classList.remove('hidden');
    messageBox.style.display = 'block';
});

document.getElementById("purchaseButton3").addEventListener("click", function() {
    // Executar a função para gerar e baixar o código de barras
    generateAndDownloadBarcode();

    // Mostrar a mensagem de compra concluída
    var messageBox = document.getElementById('messageBox');
    messageBox.classList.remove('hidden');
    messageBox.style.display = 'block';
});

// Fechar o modal de mensagem ao clicar no botão de fechar
const modalAdicionar = document.getElementById("messageBox");
const closeBtnAdicionar = modalAdicionar.querySelector(".close");
closeBtnAdicionar.onclick = function () {
    modalAdicionar.style.display = "none";
}
// codigo de barras 


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
