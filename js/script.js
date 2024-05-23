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
