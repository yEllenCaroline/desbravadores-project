var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT idUsuario, nome, email FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function cadastrarAvaliacao(usuario, estrelas) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED', \n \t\t >> verifique suas credenciais de acesso so banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarAvaliacao():", usuario, estrelas)

    var instrucaoSql = `
    INSERT INTO Avaliacao (fkUsuario, estrelas) VALUES ('${usuario}', '${estrelas}')
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarQuestaoErrada(usuario, questao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED', \n \t\t >> verifique suas credenciais de acesso so banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarAvaliacao():", usuario, questao)

    var instrucaoSql = `
    INSERT INTO QuestaoErrada (fkUsuario, numeroQuestao) VALUES ('${usuario}', '${questao}')
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function cadastrarMetricasQuiz(usuario, pontuacao, tempo, rank) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED', \n \t\t >> verifique suas credenciais de acesso so banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarMetricasQuiz():", usuario, pontuacao, tempo, rank)

    var instrucaoSql = `
    INSERT INTO MetricasQuiz (fkUsuario, pontuacao, tempo, ranking) VALUES ('${usuario}', '${pontuacao}', '${tempo}', '${rank}')
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listar() {
    var instrucaoSql = `
    SELECT * FROM metricasQuiz JOIN Usuario ON fkUsuario = idUsuario ORDER BY pontuacao DESC, tempo ASC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarKpi(usuario) {
    // SELECT ranking FROM metricasQuiz JOIN Usuario ON fkUsuario = idUsuario WHERE idUsuario = '${usuario}' ORDER BY pontuacao DESC, tempo ASC LIMIT 1;
    var instrucaoSql = `
    select max(pontuacao) as Maximo, ranking FROM metricasQuiz where fkUsuario = ${usuario} group by pontuacao, ranking order by pontuacao desc limit 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    console.log('resultado do id script: ' + usuario)
    return database.executar(instrucaoSql);
}

function capturarEstrelas() {
    const instrucaoSql = `SELECT COUNT(idAvaliacao) AS star5, 
    (SELECT COUNT(idAvaliacao) FROM Avaliacao WHERE estrelas = 4) AS star4, 
    (SELECT COUNT(idAvaliacao) FROM Avaliacao WHERE estrelas = 3) AS star3, 
    (SELECT COUNT(idAvaliacao) FROM Avaliacao WHERE estrelas = 2) AS star2, 
    (SELECT COUNT(idAvaliacao) FROM Avaliacao WHERE estrelas = 1) AS star1 
    FROM Avaliacao WHERE estrelas = 5;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarUsuarioPorId(id) {

    var instrucaoSql = `SELECT * FROM usuario a WHERE id = ${id}`;
  
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
  } 

module.exports = {
    autenticar,
    cadastrar,
    cadastrarAvaliacao,
    cadastrarQuestaoErrada,
    listar,
    cadastrarMetricasQuiz,
    listarKpi,
    capturarEstrelas,
};