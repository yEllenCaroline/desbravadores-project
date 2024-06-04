CREATE DATABASE DesbravaJa;
USE DesbravaJa;


CREATE USER 'desbravaJa'@'localhost' IDENTIFIED BY 'GodIsNotDead';
GRANT ALL PRIVILEGES ON DesbravaJa.* TO 'desbravaJa'@'localhost';
FLUSH PRIVILEGES;

CREATE TABLE Usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45)UNIQUE,
    email VARCHAR(45)UNIQUE,
    senha CHAR(6)
);

CREATE TABLE QuestaoErrada (
    idQuestao INT PRIMARY KEY AUTO_INCREMENT,
	fkUsuario INT,
    numeroQuestao INT,
    FOREIGN KEY(fkUsuario) REFERENCES Usuario(idUsuario) 
);

CREATE TABLE MetricasQuiz (
	idMetricas INT AUTO_INCREMENT,
    fkUsuario INT,
    pontuacao INT,
    tempo TIME,
    ranking varchar(5),
    PRIMARY KEY (idMetricas,fkUsuario),
    FOREIGN KEY (fkUsuario) REFERENCES Usuario(idUsuario)
);

CREATE TABLE Avaliacao (
	idAvaliacao INT PRIMARY KEY AUTO_INCREMENT,
	fkUsuario INT UNIQUE,
	estrelas INT,
    FOREIGN KEY (fkUsuario) REFERENCES Usuario(idUsuario)
);
