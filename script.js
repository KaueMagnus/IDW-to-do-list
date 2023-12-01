let tarefasPendentes = [];
let tarefasConcluidas = [];

function adicionarTarefa() {
    const novaTarefaInput = document.getElementById('novaTarefa');
    const textoTarefa = novaTarefaInput.value;

    if (textoTarefa !== '') {
        const novaTarefa = {
            texto: textoTarefa,
            dataConclusao: null,
        };

        tarefasPendentes.push(novaTarefa);
        novaTarefaInput.value = '';
        exibirTarefas();
    }
}

function marcarConcluida(index) {
    const tarefa = tarefasPendentes[index];
    tarefasPendentes.splice(index, 1);
    tarefa.dataConclusao = new Date().toLocaleDateString();
    tarefasConcluidas.push(tarefa);
    exibirTarefas();
    exibirTarefasConcluidas();
}

function removerConcluida(index) {
    tarefasConcluidas.splice(index, 1);
    exibirTarefasConcluidas();
}

function removerPendente(index) {
    tarefasPendentes.splice(index, 1);
    exibirTarefas();
}

function exibirTarefasConcluidas() {
    const ulConcluidas = document.getElementById('tarefasConcluidas').querySelector('ul');
    ulConcluidas.innerHTML = '';
    for (let i = 0; i < tarefasConcluidas.length; i++) {
        const tarefa = tarefasConcluidas[i];
        const li = document.createElement('li');
        li.className = 'tarefa concluida';
        li.innerHTML = `<span class="texto-tarefa">${tarefa.texto}</span> <span class="data-conclusao">${tarefa.dataConclusao}</span> <button class="botao-remover" onclick="removerConcluida(${i})">Remover</button>`;
        ulConcluidas.appendChild(li);
    }
}


function exibirTarefas() {
    const ulPendentes = document.getElementById('tarefasPendentes').querySelector('ul');
    ulPendentes.innerHTML = '';
    for (let i = 0; i < tarefasPendentes.length; i++) {
        const tarefa = tarefasPendentes[i];
        const li = document.createElement('li');
        li.className = 'tarefa';
    
        const spanTextoTarefa = document.createElement('span');
        spanTextoTarefa.classList.add('texto-tarefa');
        spanTextoTarefa.innerText = tarefa.texto;
        li.appendChild(spanTextoTarefa);
    
        const botaoConcluir = document.createElement('button');
        botaoConcluir.innerText = 'Concluir';
        botaoConcluir.onclick = function () {
        marcarConcluida(i);
        };
        li.appendChild(botaoConcluir);
    
        const botaoExcluir = document.createElement('button');
        botaoExcluir.classList.add('botao-excluir');
        botaoExcluir.innerText = 'Remover';
        botaoExcluir.onclick = function () {
            removerPendente(i);
        };
        li.appendChild(botaoExcluir);
    
        ulPendentes.appendChild(li);
    }    
}

function criarElementoTarefa(textoTarefa, pendente = true) {
    const elementoTarefa = document.createElement('li');
    elementoTarefa.classList.add('tarefa');

    const elementoTextoTarefa = document.createElement('span');
    elementoTextoTarefa.classList.add('texto-tarefa');
    elementoTextoTarefa.innerText = textoTarefa;
    elementoTarefa.appendChild(elementoTextoTarefa);

    const botaoExcluir = document.createElement('button');
    botaoExcluir.classList.add('botao-excluir');
    botaoExcluir.innerText = 'Excluir';
    botaoExcluir.onclick = function () {
        elementoTarefa.remove();
    };
    elementoTarefa.appendChild(botaoExcluir);

    if (!pendente) {
        const botaoExcluir = document.createElement('button');
        botaoExcluir.classList.add('botao-excluir');
        botaoExcluir.innerText = 'Excluir';
        botaoExcluir.onclick = function () {
            elementoTarefa.remove();
        };
        elementoTarefa.appendChild(botaoExcluir);
    } else {
        const botaoConcluir = document.createElement('button');
        botaoConcluir.innerText = 'Concluir';
        botaoConcluir.onclick = function () {
            elementoTarefa.classList.add('concluida');
            botaoConcluir.disabled = true;
            const listaConcluidas = document.getElementById('tarefasConcluidas').querySelector('ul');
            listaConcluidas.appendChild(elementoTarefa);
            elementoTarefa.removeChild(botaoConcluir);
        };
        elementoTarefa.appendChild(botaoConcluir);
    }

    return elementoTarefa;
}

