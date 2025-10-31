let botao = document.getElementById("enviar");
let tbody = document.getElementById("corpo_tabela");
let inputNome = document.getElementById("nome");
let inputIdade = document.getElementById("idade");
let inputNota_final = document.getElementById("nota_final");
let optionCurso = document.getElementById("curso");
let linha = null;
let dados = null;
let alunos = [];

class Aluno
{
    constructor(nome, idade, nota_final, curso)
    {
        this.nome = nome;
        this.idade = idade;
        this.nota_final = nota_final;
        this.curso = curso;
    }

    isAprovado()
    {
        if(this.nota_final >= 7)
        {
            return true;
        }
        return false;
    }

    toString()
    {
        let aluno = "";
        aluno += "Nome: " + this.nome + " Idade: " + this.idade + " Nota final: " + this.nota_final + " Curso: " + this.curso;
        return aluno;
    }
}

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

function atualizarTabela()
{
    tbody.innerHTML = "";
    for(let i = 0; i < alunos.length; i++)
    {
        const novaLinhaHtml =`
            <tr>
                <td>${alunos[i].nome}</td>
                <td>${alunos[i].idade}</td>
                <td>${alunos[i].nota_final}</td>
                <td>${alunos[i].curso}</td>
                <td><button type="button" class="editar">Editar</button></td>
                <td><button type="button" class="excluir">Excluir</button></td>
            </tr>`;
        
        tbody.innerHTML += novaLinhaHtml;
    }
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
        alunos.push(new Aluno(nome, idade, nota_final, curso));
        atualizarTabela();
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