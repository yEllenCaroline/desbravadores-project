var usuarioModel = require("../models/usuarioModel");
var aquarioModel = require("../models/aquarioModel");

let usuario = '';

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        usuario = resultadoAutenticar[0].idUsuario
                        console.log(resultadoAutenticar);

                        res.json({
                            idUsuario: resultadoAutenticar[0].idUsuario,
                            email: resultadoAutenticar[0].email,
                            nome: resultadoAutenticar[0].nome,
                            senha: resultadoAutenticar[0].senha,

                        });

                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrarMetricasQuiz(req, res) {
    var usuario = req.body.usuarioServer;
    var pontuacao = req.body.pontuacaoServer;
    var tempo = req.body.tempoServer;
    var rank = req.body.rankServer;
    // var quiz = req.body.quizServer


    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel.cadastrarMetricasQuiz(usuario, pontuacao, tempo, rank)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro das metricas do quiz! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );

}

function cadastrarQuestaoErrada(req, res) {
    var usuario = req.body.usuarioServer;
    var questao = req.body.questaoServer;
    // var quiz = req.body.quizServer


    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel.cadastrarQuestaoErrada(usuario, questao)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro da avaliacao do quiz! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );

}

function cadastrarAvaliacao(req, res) {
    var usuario = req.body.usuarioServer;
    var estrelas = req.body.avaliacaoServer;
    // var quiz = req.body.quizServer


    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel.cadastrarAvaliacao(usuario, estrelas)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro da avaliacao do quiz! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function listar(req, res) {

    usuarioModel.listar()
        .then(function (resultado) {
            res.status(200).json(resultado);
        }).catch(function (erro) {
            res.status(500).json(erro.sqlMessage);
        });
}

function listarKpi(req, res) {
    console.log(usuario)
    var usuario = req.query.usuario

    usuarioModel.listarKpi(usuario)
        .then(function (resultado) {
            res.status(200).json(resultado);
        }).catch(function (erro) {
            res.status(500).json(erro.sqlMessage);
        });
}

function capturarEstrelas(req, res) {

    usuarioModel.capturarEstrelas()
        .then(function (resultado) {
            res.status(200).json(resultado);
        }).catch(function (erro){
            res.status(500).json(erro.sqlMessage);
        });
}


module.exports = {
    autenticar,
    cadastrar,
    cadastrarAvaliacao,
    cadastrarQuestaoErrada,
    cadastrarMetricasQuiz,
    listar,
    listarKpi,
    capturarEstrelas,
}