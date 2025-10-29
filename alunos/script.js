function preencherTabela()
{
    const botao = document.getElementById("enviar");
    const tbody = document.getElementById("corpo_tabela");
    const inputNome = document.getElementById("nome");
    const inputIdade = document.getElementById("idade");
    const inputNota_final = document.getElementById("nota_final");
    const optionCurso = document.getElementById("curso");

    botao.addEventListener("click", function(){
        const nome = inputNome.value;
        const idade = inputIdade.value;
        const nota_final = inputNota_final.value;
        const curso = optionCurso.value;

        const novaLinhaHtml = `
        <tr>
            <td>${nome}</td>
            <td>${idade}</td>
            <td>${nota_final}</td>
            <td>${curso}</td>
            <td><button type="button" id="enviar">Excluir</button></td>
            <td><button type="button" id="enviar">Editar</button></td>
        </tr>`;

        tbody.innerHTML += novaLinhaHtml;
        inputNome.value = '';
        inputIdade.value = '';
        inputNota_final.value = '';
        optionCurso.value = JavaScript;
    })
}

preencherTabela();