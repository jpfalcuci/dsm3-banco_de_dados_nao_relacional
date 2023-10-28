-- 1. Crie uma column family "carros" com os seguintes campos: 
-- marca(text), placa(text), modelo(text), cor(text), combustivel(set<text>), ano_fabric(int) e preco(decimal).
-- Na chave primária, marca deve ser configurado como partition key e a placa como clustering key.
CREATE TABLE IF NOT EXISTS fatec.carros (
    marca TEXT,
    placa TEXT,
    modelo TEXT,
    cor TEXT,
    combustivel set<TEXT>,
    ano_fabric INT,
    preco DECIMAL,
    PRIMARY KEY (marca, placa)
);


-- 2. Faça oito inserções na column family. Ao terminar, tire um print da tela exibindo as linhas inseridas.
INSERT INTO fatec.carros (marca, placa, modelo, cor, combustivel, ano_fabric, preco) 
VALUES ('Mach 5', 'SPD RCR', 'Speed Racer', 'Branco', {'Gasolina'}, 1967, 100000.00);

INSERT INTO fatec.carros (marca, placa, modelo, cor, combustivel, ano_fabric, preco) 
VALUES ('Batmóvel', 'BAT 1', 'Batmóvel', 'Preto', {'Gás Natural'}, 1989, 200000.00);

INSERT INTO fatec.carros (marca, placa, modelo, cor, combustivel, ano_fabric, preco) 
VALUES ('Ecto-1', 'ECTO 1', 'Ghostbusters', 'Branco', {'Gasolina'}, 1959, 80000.00);

INSERT INTO fatec.carros (marca, placa, modelo, cor, combustivel, ano_fabric, preco) 
VALUES ('DeLorean', 'OUTATIME', 'De Volta para o Futuro', 'Prata', {'Eletricidade'}, 1981, 300000.00);

INSERT INTO fatec.carros (marca, placa, modelo, cor, combustivel, ano_fabric, preco) 
VALUES ('KITT', 'KNIGHT', 'Knight Rider', 'Preto', {'Gasolina'}, 1982, 150000.00);

INSERT INTO fatec.carros (marca, placa, modelo, cor, combustivel, ano_fabric, preco) 
VALUES ('Mystery Machine', 'SCOOBY', 'Scooby-Doo', 'Verde', {'Gasolina'}, 1969, 50000.00);

INSERT INTO fatec.carros (marca, placa, modelo, cor, combustivel, ano_fabric, preco) 
VALUES ('Herbie', '53LOVE', 'Se Meu Fusca Falasse', 'Branco', {'Gasolina'}, 1963, 70000.00);

INSERT INTO fatec.carros (marca, placa, modelo, cor, combustivel, ano_fabric, preco) 
VALUES ('Lightning McQueen', '95RED', 'Carros', 'Vermelho', {'Gasolina'}, 2005, 120000.00);


-- 3. Faça três atualizações na tabela. Pelo menos uma delas deve contemplar uma alteração de combustível.
UPDATE fatec.carros SET modelo = 'New Speed Racer' WHERE marca = 'Mach 5' AND placa = 'SPD RCR';
UPDATE fatec.carros SET cor = 'Amarelo' WHERE marca = 'Herbie' AND placa = '53LOVE';
UPDATE fatec.carros SET combustivel = {'Eletricidade', 'Gasolina'} WHERE marca = 'DeLorean' AND placa = 'OUTATIME';


-- 4. Exclua um dos registros.
DELETE FROM fatec.carros WHERE marca = 'Mystery Machine' AND placa = 'SCOOBY';


-- 5. Tire um print da tela mostrando as linhas da column family em seu estado atual.
SELECT * FROM fatec.carros;
