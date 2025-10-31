// Espera o DOM carregar para iniciar o script
document.addEventListener('DOMContentLoaded', () => {

    // --- Exercício 1: Classe Funcionario  ---
    class Funcionario {
        // Construtor
        constructor(id, nome, idade, cargo, salario) {
            this.id = id;
            this.nome = nome;
            this.idade = idade;
            this.cargo = cargo;
            this.salario = salario;
        }

        // Métodos de acesso (get)
        getId() { return this.id; }
        getNome() { return this.nome; }
        getIdade() { return this.idade; }
        getCargo() { return this.cargo; }
        getSalario() { return this.salario; }

        // Métodos de acesso (set) - Útil para o Exercício 2 [cite: 25]
        setNome(novoNome) { this.nome = novoNome; }
        setIdade(novaIdade) { this.idade = novaIdade; }
        setCargo(novoCargo) { this.cargo = novoCargo; }
        setSalario(novoSalario) { this.salario = novoSalario; }

        // Método toString()
        toString() {
            return `ID: ${this.id}, Nome: ${this.nome}, Idade: ${this.idade}, Cargo: ${this.cargo}, Salário: R$ ${this.salario.toFixed(2)}`;
        }
    }

    // --- Variáveis Globais ---
    let funcionarios = []; // Array para armazenar os funcionários [cite: 13]
    let proximoId = 1;
    let modoEdicao = false;

    // --- Referências do DOM ---
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

    // --- Funções Principais ---

    /**
     * Exercício 1: Listar/Exibir funcionários na tabela 
     * Atualizado para Exercício 2: Adiciona botões de Ação [cite: 23]
     */
    function listarFuncionarios() {
        corpoTabela.innerHTML = ''; // Limpa a tabela antes de recriar

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

            // Adiciona eventos de clique (Ex 2 e 3)
            tr.querySelector('.btn-editar').addEventListener('click', () => prepararEdicao(func.getId()));
            tr.querySelector('.btn-excluir').addEventListener('click', () => excluirFuncionario(func.getId()));

            corpoTabela.appendChild(tr);
        });
    }

    /**
     * Exercício 2: Preparar formulário para edição [cite: 24]
     */
    function prepararEdicao(id) {
        // Exercício 3: Busca usando find com arrow function [cite: 31]
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

    /**
     * Exercício 2: Excluir funcionário
     */
    function excluirFuncionario(id) {
        if (confirm('Tem certeza que deseja excluir este funcionário?')) {
            // Exercício 3: Reescrevendo a remoção com filter (arrow function) [cite: 33]
            funcionarios = funcionarios.filter(f => f.getId() !== id);
            listarFuncionarios(); // Atualiza a <table>
        }
    }

    /**
     * Limpa o formulário e volta ao modo de cadastro
     */
    function resetarFormulario() {
        form.reset();
        inputId.value = '';
        modoEdicao = false;
        btnSubmit.textContent = 'Salvar';
        btnCancelar.style.display = 'none';
    }

    // --- Event Listeners ---

    /**
     * Evento de Submit do Formulário (Exercício 1, 2 e 3)
     * Usa função anônima para o evento [cite: 30]
     */
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o recarregamento da página

        // Coleta de dados do formulário 
        const nome = inputNome.value;
        const idade = parseInt(inputIdade.value);
        const cargo = inputCargo.value;
        const salario = parseFloat(inputSalario.value);

        if (modoEdicao) {
            // --- Exercício 2: Lógica de Alteração ---
            const id = parseInt(inputId.value);
            const func = funcionarios.find(f => f.getId() === id);
            if (func) {
                // Usando métodos 'set' da classe [cite: 25]
                func.setNome(nome);
                func.setIdade(idade);
                func.setCargo(cargo);
                func.setSalario(salario);
            }
        } else {
            // --- Exercício 1: Lógica de Cadastro [cite: 15] ---
            const novoFuncionario = new Funcionario(proximoId, nome, idade, cargo, salario);
            funcionarios.push(novoFuncionario);
            proximoId++;
        }

        listarFuncionarios(); // Atualiza a <table> 
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

    // [cite: 40] Relatório 1: Salários > R$ 5000 (Usando filter [cite: 45])
    document.getElementById('btn-relatorio-salario').addEventListener('click', () => {
        const filtrados = funcionarios
            .filter(f => f.getSalario() > 5000)
            .map(f => f.toString()); // Usa o toString() da classe 
        
        exibirRelatorio('Funcionários com Salário > R$ 5000', filtrados.length > 0 ? filtrados : 'Nenhum encontrado.');
    });

    // [cite: 41] Relatório 2: Média Salarial (Usando reduce [cite: 45])
    document.getElementById('btn-relatorio-media').addEventListener('click', () => {
        if (funcionarios.length === 0) {
            exibirRelatorio('Média Salarial', 'Nenhum funcionário cadastrado.');
            return;
        }
        const totalSalarios = funcionarios.reduce((acumulador, f) => acumulador + f.getSalario(), 0);
        const media = totalSalarios / funcionarios.length;
        exibirRelatorio('Média Salarial', `R$ ${media.toFixed(2)}`);
    });

    // [cite: 42] Relatório 3: Cargos Únicos (Usando map e Set [cite: 45])
    document.getElementById('btn-relatorio-cargos').addEventListener('click', () => {
        const cargos = funcionarios.map(f => f.getCargo());
        const cargosUnicos = [...new Set(cargos)]; // Dica do 'new Set()' [cite: 45]
        exibirRelatorio('Cargos Únicos na Empresa', cargosUnicos.length > 0 ? cargosUnicos : 'Nenhum cargo cadastrado.');
    });

    // [cite: 43] Relatório 4: Nomes em Maiúsculo (Usando map [cite: 45])
    document.getElementById('btn-relatorio-nomes').addEventListener('click', () => {
        const nomesMaiusculos = funcionarios.map(f => f.getNome().toUpperCase());
        exibirRelatorio('Nomes dos Funcionários (em maiúsculo)', nomesMaiusculos.length > 0 ? nomesMaiusculos : 'Nenhum funcionário cadastrado.');
    });

    // Carga inicial (apenas para exemplo, se desejar)
    funcionarios.push(new Funcionario(proximoId++, 'Ana Silva', 28, 'Desenvolvedora Front-end', 5500));
    funcionarios.push(new Funcionario(proximoId++, 'Bruno Costa', 34, 'Desenvolvedor Back-end', 7000));
    funcionarios.push(new Funcionario(proximoId++, 'Carla Dias', 25, 'Designer UX', 4500));
    listarFuncionarios();
});