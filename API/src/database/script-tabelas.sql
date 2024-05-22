CREATE DATABASE DesbravaJa;
USE DesbravaJa;


CREATE USER 'ellen'@'localhost' IDENTIFIED BY 'dbv';
GRANT ALL PRIVILEGES ON DesbravaJa.* TO 'ellen'@'localhost';
FLUSH PRIVILEGES;

CREATE TABLE Usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45)UNIQUE,
    email VARCHAR(45)UNIQUE,
    senha CHAR(6)
);

CREATE TABLE Questoes (
    idQuestao INT PRIMARY KEY AUTO_INCREMENT
);

CREATE TABLE Quiz (
	idQuiz INT PRIMARY KEY AUTO_INCREMENT,
    tempo DATETIME,
    pontuacao INT
);

CREATE TABLE MetricasQuiz (
	idMetricas INT,
    fkQuiz INT,
    fkUsuario INT,
    fkQuestao INT,
    erros INT,
    acertos INT,
    pontos INT,
    CONSTRAINT pkComposta PRIMARY KEY (fkUsuario, fkQuestao, idMetricas),
    CONSTRAINT fkQuiz FOREIGN KEY (fkQuiz) REFERENCES Quiz(idQuiz),
    CONSTRAINT fkUsuarioQuiz FOREIGN KEY (fkUsuario) REFERENCES Usuario(idUsuario),
    CONSTRAINT fkQuestao FOREIGN KEY (fkQuestao) REFERENCES Questoes(idQuestao)
);