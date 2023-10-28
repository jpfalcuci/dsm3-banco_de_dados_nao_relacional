-- https://astra.datastax.com/

-- Criação da column family "users" no keyspace "cassandra"
CREATE TABLE cassandra.users(
	id INT,
	country TEXT,
	first_name TEXT,
	last_name TEXT,
	active BOOLEAN,
	PRIMARY KEY(id)
);

-- Para retornar todos os registros da column family
SELECT * FROM cassandra.users;

-- Inserção de registros na column family ("tabela")
INSERT INTO cassandra.users(id, country, first_name, last_name, active)
VALUES(1, 'BR', 'Tonho', 'Torresmo', true);

INSERT INTO cassandra.users(id, country, first_name, active)
VALUES(2, 'AR', 'María', false);

INSERT INTO cassandra.users(id, country, first_name, last_name)
VALUES(3, 'BR', 'Joaquina', 'Jesuína');

INSERT INTO cassandra.users(id, country, first_name, last_name, active)
VALUES(4, 'US', 'John', 'Doe', true);

SELECT * FROM cassandra.users;

-- Comando para excluir a column family
DROP TABLE cassandra.users;

-- Recriando a column family
CREATE TABLE cassandra.users(
	id INT,
	country TEXT,
	first_name TEXT,
	last_name TEXT,
	active BOOLEAN,
	PRIMARY KEY(country, id)
);

-- Criando um índice secundário em um campo para possibilitar consultas a ele
CREATE INDEX idx_first_name ON cassandra.users(first_name);

-- Obtendo informações sobre o keyspace ("banco de dados")
DESCRIBE cassandra;

-- Obtendo informações sobre uma column family
DESCRIBE cassandra.users;

-- Alterando a column family para acrescentar novos campos
ALTER TABLE cassandra.users 
ADD favs map<TEXT, TEXT>;

ALTER TABLE cassandra.users 
ADD interests SET<TEXT>;

ALTER TABLE cassandra.users 
ADD friends list<TEXT>;

-- Atualização de linha
UPDATE cassandra.users
SET last_name = 'López'
WHERE country = 'AR' AND id = 2;    -- Chave primária inteira

-- TRABALHANDO COM MAPS
-- Inserindo um map (equivale a um JSON em outros bancos de dados)
UPDATE cassandra.users
SET favs = {'food': 'torresmo', 'car': 'Caminhonete Rural' }
WHERE country = 'BR' AND id = 1;

UPDATE cassandra.users
SET favs = {'food': 'hamburger', 'sport': 'basebal', 'color': 'green', 'luck_number': '7' }
WHERE country = 'US' AND id = 4;

-- TRABALHANDO COM UM SET
-- Um set é um conjunto de itens, sem repetição
UPDATE cassandra.users
SET interests = { 'moda', 'educação', 'viagens', 'moda', 'línguas' }
WHERE country = 'BR' AND id = 3;

-- TRABALHANDO COM LISTAS
-- Listas são semelhantes a conjuntos, mas permitem repetições
UPDATE cassandra.users
SET friends = ['Zefa S.', 'Turíbio X.', 'Jupira B.', 'Turíbio X.' ]
WHERE country = 'BR' AND id = 1;

-- Atualizando para incluir um novo favorito (map)
UPDATE cassandra.users
SET favs['drink'] = 'cerveja'
WHERE country = 'BR' AND id = 1;

-- excluindo um item de map
DELETE favs['sport'] FROM cassandra.users
WHERE country = 'US' AND id = 4;

-- Atualizando para incluir um novo interesse (set)
UPDATE cassandra.users
SET interests = interests + { 'esportes radicais', 'música' }
WHERE country = 'BR' AND id = 3;

-- Atualizando para excluir interesses (set)
UPDATE cassandra.users
SET interests = interests - { 'moda', 'viagens' }
WHERE country = 'BR' AND id = 3;

-- Atualizando para incluir novos amigos (list)
UPDATE cassandra.users
SET friends = friends + [ 'Gilvanete J.', 'Wesclerson R.' ]
WHERE country = 'BR' AND id = 1;

-- EXCLUIR AMIGOS (LIST) - deve-se passar a POSIÇÃO
-- ! está de acordo com a documentação, mas não funciona
DELETE friends[3] FROM cassandra.users
WHERE country = 'BR' AND id = 1;
