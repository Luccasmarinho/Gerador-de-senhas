const value = document.querySelector("#value");
const input = document.querySelector(".barra");
const form = document.querySelector("form");

const letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
const letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numeros = "0123456789";
const caracteresEspeciais = "#$%@&()*!?<>[]-$_,.{}|:";

let dados = []

value.textContent = input.value;
input.addEventListener("input", (event) => {
    value.textContent = event.target.value;
});


form.addEventListener("submit", (event) => {
    event.preventDefault();
    gerandoSenha()
})


function gerandoSenha() {
    const minuscula = document.querySelector("#minuscula")
    const maiuscula = document.querySelector("#maiuscula")
    const numero = document.querySelector("#numeros")
    const caracteres = document.querySelector("#caractere-especial")

    validacao(minuscula, maiuscula, numero, caracteres)

    for (let i = 0; i < input.value; i++) {

        if (minuscula.checked) guardandoDados(letrasMinusculas)

        if (maiuscula.checked) guardandoDados(letrasMaiusculas)

        if (numero.checked) guardandoDados(numeros)

        if (caracteres.checked) guardandoDados(caracteresEspeciais)

    }

    const resultado = dados.slice(0, input.value).join("")
    document.querySelector("#result-password").textContent = resultado

    dados = []
}

function guardandoDados(string) {
    const totalStringMenosUm = string.length - 1
    const tamanhoString = totalStringMenosUm < 0 ? 0 : totalStringMenosUm

    const indiceDoNumeroSorteado = Math.round(Math.random() * tamanhoString)

    dados.push(string[indiceDoNumeroSorteado])
}

function validacao(checkbox1, checkbox2, checkbox3, checkbox4) {
    document.querySelector(".container-result-password-hidden").style.display = "none"

    if (!checkbox1.checked && !checkbox2.checked && !checkbox3.checked && !checkbox4.checked) {

        notificacaoMensagem("Marque ao menos uma opção.")

        return
    }

    if (input.value < 4) {
        document.querySelector(".container-result-password-hidden").style.display = "none"

        notificacaoMensagem("Tamanho inválido. Coloque um número entre 4 e 25.")

        return
    }

    document.querySelector(".container-result-password-hidden").style.display = "block"

}

function notificacaoMensagem(mensagem, background = "#dc2626, #dc2626") {
    Toastify({
        text: `${mensagem}`,
        duration: 5000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true, 
        style: {
            background: `linear-gradient(to right, ${background})`,
            boxShadow: "none"
        },
        onClick: function () { }
    }).showToast();
}

function copiarTexto() {
    const textoCopiar = document.querySelector("#result-password").textContent;

    try {
        navigator.clipboard.writeText(textoCopiar)
        notificacaoMensagem("Texto copiado com sucesso.", "#00b09b, #96c93d")
    } catch (error) {
        notificacaoMensagem("Erro ao copiar o texto", error);
    }
}

document.querySelector("#icon-copy").addEventListener("click", copiarTexto);