let botao = document.getElementById("enviar");
let tbody = document.getElementById("corpo_tabela");
let inputNome = document.getElementById("nome");
let inputIdade = document.getElementById("idade");
let inputNota_final = document.getElementById("nota_final");
let optionCurso = document.getElementById("curso");
let linha = null;
let dados = null;

function excluirAluno(target)
{
    target.closest("tr").remove();
}

function editarAluno(target)
{
    linha = target.closest("tr");
    dados = linha.querySelectorAll("td");

    inputNome.value = dados[0].textContent;
    inputIdade.value = dados[1].textContent;
    inputNota_final.value = dados[2].textContent;
    optionCurso.value = dados[3].textContent;
    botao.textContent = "Atualizar";
}

tbody.addEventListener('click', function(evento){
    let target = evento.target;
    if(target.classList.contains("excluir"))
    {
        excluirAluno(target);
    }
    if(target.classList.contains("editar"))
    {
        editarAluno(target);
    }
})

botao.addEventListener('click', function(){
    const nome = inputNome.value;
    const idade = inputIdade.value;
    const nota_final = inputNota_final.value;
    const curso = optionCurso.value;

    if(botao.textContent == "Enviar")
    {
        const novaLinhaHtml =`
            <tr>
                <td>${nome}</td>
                <td>${idade}</td>
                <td>${nota_final}</td>
                <td>${curso}</td>
                <td><button type="button" class="editar">Editar</button></td>
                <td><button type="button" class="excluir">Excluir</button></td>
            </tr>`;
        
        tbody.innerHTML += novaLinhaHtml;
    }
    else
    {
        dados[0].textContent = inputNome.value;
        dados[1].textContent = inputIdade.value;
        dados[2].textContent = inputNota_final.value;
        dados[3].textContent = optionCurso.value;
        botao.textContent = "Enviar";
    }

    inputNome.value = '';
    inputIdade.value = '';
    inputNota_final.value = '';
    optionCurso.value = "JavaScript";
})
