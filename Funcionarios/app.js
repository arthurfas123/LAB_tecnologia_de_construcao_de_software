document.addEventListener('DOMContentLoaded', () => {

    //Exercício 1: Classe Funcionario
    class Funcionario {
        constructor(id, nome, idade, cargo, salario) {
            this.id = id;
            this.nome = nome;
            this.idade = idade;
            this.cargo = cargo;
            this.salario = salario;
        }

        getId() { return this.id; }
        getNome() { return this.nome; }
        getIdade() { return this.idade; }
        getCargo() { return this.cargo; }
        getSalario() { return this.salario; }

        setNome(novoNome) { this.nome = novoNome; }
        setIdade(novaIdade) { this.idade = novaIdade; }
        setCargo(novoCargo) { this.cargo = novoCargo; }
        setSalario(novoSalario) { this.salario = novoSalario; }

        toString() {
            return `ID: ${this.id}, Nome: ${this.nome}, Idade: ${this.idade}, Cargo: ${this.cargo}, Salário: R$ ${this.salario.toFixed(2)}`;
        }
    }

    let funcionarios = []; 
    let proximoId = 1;
    let modoEdicao = false;

    const form = document.getElementById('form-funcionario');
    const inputId = document.getElementById('edit-id');
    const inputNome = document.getElementById('nome');
    const inputIdade = document.getElementById('idade');
    const inputCargo = document.getElementById('cargo');
    const inputSalario = document.getElementById('salario');
    const corpoTabela = document.getElementById('corpo-tabela');
    const btnSubmit = document.getElementById('btn-submit');
    const btnCancelar = document.getElementById('btn-cancelar');
    const areaRelatorio = document.getElementById('area-relatorio');

    function listarFuncionarios() {
        corpoTabela.innerHTML = ''; 

        // Exercício 3: Usando arrow function no forEach
        funcionarios.forEach(func => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${func.getId()}</td>
                <td>${func.getNome()}</td>
                <td>${func.getIdade()}</td>
                <td>${func.getCargo()}</td>
                <td>R$ ${func.getSalario().toFixed(2)}</td>
                <td>
                    <button class="btn-acao btn-editar">Editar</button>
                    <button class="btn-acao btn-excluir">Excluir</button>
                </td>
            `;

            tr.querySelector('.btn-editar').addEventListener('click', () => prepararEdicao(func.getId()));
            tr.querySelector('.btn-excluir').addEventListener('click', () => excluirFuncionario(func.getId()));

            corpoTabela.appendChild(tr);
        });
    }

    /**
     * Exercício 2: Preparar formulário para edição 
     */
    function prepararEdicao(id) {
        // Exercício 3: Busca usando find com arrow function 
        const func = funcionarios.find(f => f.getId() === id);
        if (!func) return;

        modoEdicao = true;
        inputId.value = func.getId();
        inputNome.value = func.getNome();
        inputIdade.value = func.getIdade();
        inputCargo.value = func.getCargo();
        inputSalario.value = func.getSalario();

        btnSubmit.textContent = 'Atualizar';
        btnCancelar.style.display = 'inline-block';
    }

    function excluirFuncionario(id) {
        if (confirm('Tem certeza que deseja excluir este funcionário?')) {
            // Exercício 3: Reescrevendo a remoção com filter (arrow function)
            funcionarios = funcionarios.filter(f => f.getId() !== id);
            listarFuncionarios(); 
        }
    }

    function resetarFormulario() {
        form.reset();
        inputId.value = '';
        modoEdicao = false;
        btnSubmit.textContent = 'Salvar';
        btnCancelar.style.display = 'none';
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault(); 

        const nome = inputNome.value;
        const idade = parseInt(inputIdade.value);
        const cargo = inputCargo.value;
        const salario = parseFloat(inputSalario.value);

        if (modoEdicao) {
            const id = parseInt(inputId.value);
            const func = funcionarios.find(f => f.getId() === id);
            if (func) {
                func.setNome(nome);
                func.setIdade(idade);
                func.setCargo(cargo);
                func.setSalario(salario);
            }
        } else {
            const novoFuncionario = new Funcionario(proximoId, nome, idade, cargo, salario);
            funcionarios.push(novoFuncionario);
            proximoId++;
        }

        listarFuncionarios(); 
        resetarFormulario();
    });

    // Evento para o botão "Cancelar Edição"
    btnCancelar.addEventListener('click', resetarFormulario);

    // --- Exercício 4: Relatórios (map, filter, reduce) [cite: 35] ---

    function exibirRelatorio(titulo, dados) {
        areaRelatorio.innerHTML = `<strong>${titulo}:</strong>\n\n`;
        if (Array.isArray(dados)) {
            areaRelatorio.innerHTML += dados.join('\n');
        } else {
            areaRelatorio.innerHTML += dados;
        }
    }

    // Relatório 1: Salários > R$ 5000 (Usando filter [cite: 45])
    document.getElementById('btn-relatorio-salario').addEventListener('click', () => {
        const filtrados = funcionarios
            .filter(f => f.getSalario() > 5000)
            .map(f => f.toString()); // Usa o toString() da classe 
        
        exibirRelatorio('Funcionários com Salário > R$ 5000', filtrados.length > 0 ? filtrados : 'Nenhum encontrado.');
    });

    // Relatório 2: Média Salarial (Usando reduce [cite: 45])
    document.getElementById('btn-relatorio-media').addEventListener('click', () => {
        if (funcionarios.length === 0) {
            exibirRelatorio('Média Salarial', 'Nenhum funcionário cadastrado.');
            return;
        }
        const totalSalarios = funcionarios.reduce((acumulador, f) => acumulador + f.getSalario(), 0);
        const media = totalSalarios / funcionarios.length;
        exibirRelatorio('Média Salarial', `R$ ${media.toFixed(2)}`);
    });

    // Relatório 3: Cargos Únicos (Usando map e Set [cite: 45])
    document.getElementById('btn-relatorio-cargos').addEventListener('click', () => {
        const cargos = funcionarios.map(f => f.getCargo());
        const cargosUnicos = [...new Set(cargos)]; // Dica do 'new Set()' [cite: 45]
        exibirRelatorio('Cargos Únicos na Empresa', cargosUnicos.length > 0 ? cargosUnicos : 'Nenhum cargo cadastrado.');
    });

    // Relatório 4: Nomes em Maiúsculo (Usando map [cite: 45])
    document.getElementById('btn-relatorio-nomes').addEventListener('click', () => {
        const nomesMaiusculos = funcionarios.map(f => f.getNome().toUpperCase());
        exibirRelatorio('Nomes dos Funcionários (em maiúsculo)', nomesMaiusculos.length > 0 ? nomesMaiusculos : 'Nenhum funcionário cadastrado.');
    });
    
    listarFuncionarios();
});