const materias = [
    "Matemática",
    "Português",
    "História",
    "Geografia",
    "Biologia",
    "Química",
    "Física",
    "Inglês"
];

const duvidas = [];
const materiais = [];

const inicio = document.getElementById("inicio");
const areaAluno = document.getElementById("areaAluno");
const areaProfessor = document.getElementById("areaProfessor");

function mostrarArea(area) {
    inicio.hidden = true;
    areaAluno.hidden = true;
    areaProfessor.hidden = true;
    area.hidden = false;
}

document.getElementById("botaoAluno").addEventListener("click", () => {
    mostrarArea(areaAluno);
});

document.getElementById("botaoProfessor").addEventListener("click", () => {
    mostrarArea(areaProfessor);
});

document.getElementById("voltarAluno").addEventListener("click", () => {
    mostrarArea(inicio);
});

document.getElementById("voltarProfessor").addEventListener("click", () => {
    mostrarArea(inicio);
});

function preencherMaterias(id) {
    const select = document.getElementById(id);

    materias.forEach(materia => {
        const opcao = document.createElement("option");
        opcao.value = materia;
        opcao.textContent = materia;
        select.appendChild(opcao);
    });
}

preencherMaterias("materia");
preencherMaterias("materiaProfessor");

document.getElementById("formDuvida").addEventListener("submit", event => {
    event.preventDefault();

    const materia = document.getElementById("materia").value;
    const serie = document.getElementById("serieAluno").value;
    const data = document.getElementById("data").value;
    const texto = document.getElementById("duvida").value.trim();

    if (!materia || !serie || !data || !texto) {
        alert("Preencha todos os campos.");
        return;
    }

    const postagem = {
        id: Date.now(),
        materia,
        serie,
        data,
        duvida: texto,
        respostas: []
    };

    duvidas.push(postagem);

    event.target.reset();

    mostrarDuvidas();
    alert("Sua dúvida foi enviada!");
});

function criarTexto(tag, texto) {
    const elemento = document.createElement(tag);
    elemento.textContent = texto;
    return elemento;
}

function mostrarDuvidas() {
    const listaAluno = document.getElementById("listaDuvidas");
    const listaProfessor = document.getElementById("duvidasProfessor");

    listaAluno.replaceChildren();
    listaProfessor.replaceChildren();

    duvidas.forEach(postagem => {
        const cardAluno = document.createElement("article");

        cardAluno.append(
            criarTexto("h3", postagem.materia),
            criarTexto("p", "Série: " + postagem.serie),
            criarTexto("p", "Data: " + postagem.data),
            criarTexto("p", postagem.duvida)
        );

        postagem.respostas.forEach(resposta => {
            cardAluno.append(
                criarTexto("h4", "Resposta do professor"),
                criarTexto("p", resposta)
            );
        });

        listaAluno.appendChild(cardAluno);

        const cardProfessor = document.createElement("article");

        cardProfessor.append(
            criarTexto("h3", postagem.materia),
            criarTexto("p", "Série: " + postagem.serie),
            criarTexto("p", "Data: " + postagem.data),
            criarTexto("p", postagem.duvida)
        );

        const campoResposta = document.createElement("textarea");
        campoResposta.placeholder = "Digite sua resposta";
        campoResposta.required = true;

        const botaoResponder = document.createElement("button");
        botaoResponder.type = "button";
        botaoResponder.textContent = "Responder";

        botaoResponder.addEventListener("click", () => {
            const resposta = campoResposta.value.trim();

            if (!resposta) {
                alert("Digite uma resposta.");
                return;
            }

            postagem.respostas.push(resposta);
            mostrarDuvidas();
            alert("Resposta adicionada!");
        });

        cardProfessor.append(campoResposta, botaoResponder);

        listaProfessor.appendChild(cardProfessor);
    });
}

document.getElementById("formMaterial").addEventListener("submit", event => {
    event.preventDefault();

    const nome = document.getElementById("nomeProfessor").value.trim();
    const email = document.getElementById("emailProfessor").value.trim();
    const materia = document.getElementById("materiaProfessor").value;
    const titulo = document.getElementById("tituloMaterial").value.trim();
    const tipo = document.getElementById("tipoMaterial").value;
    const descricao = document.getElementById("descricaoMaterial").value.trim();
    const arquivo = document.getElementById("arquivo").files[0];

    if (!nome || !email || !materia || !titulo || !tipo || !descricao) {
        alert("Preencha todos os campos obrigatórios.");
        return;
    }

    materiais.push({
        nome,
        email,
        materia,
        titulo,
        tipo,
        descricao,
        arquivo: arquivo ? arquivo.name : ""
    });

    mostrarMateriais();
    event.target.reset();

    alert("Material cadastrado!");
});

function mostrarMateriais() {
    const lista = document.getElementById("listaMateriais");
    lista.replaceChildren();

    materiais.forEach(material => {
        const card = document.createElement("article");

        card.append(
            criarTexto("h3", material.titulo),
            criarTexto("p", "Matéria: " + material.materia),
            criarTexto("p", "Tipo: " + material.tipo),
            criarTexto("p", material.descricao),
            criarTexto("p", "Professor: " + material.nome)
        );

        if (material.arquivo) {
            card.appendChild(
                criarTexto("p", "Arquivo selecionado: " + material.arquivo)
            );
        }

        lista.appendChild(card);
    });
}
