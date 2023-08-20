# MongoDB

## 1. Introdução ao MongoDB

O MongoDB é um banco de dados NoSQL orientado a documentos, conhecido por sua flexibilidade e escalabilidade.

## 2. Comandos de Gerenciamento

### 2.1. Bancos de Dados

- `show dbs`: Mostra os bancos de dados disponíveis.
- `use nomeDoBanco`: Acessa ou cria um banco de dados.
- `db.createCollection(nome)`: Cria uma nova coleção no banco de dados atual.

### 2.2. Coleções

- Renomear: `db.colecao.renameCollection(novoNome)`.
- Excluir: `db.colecao.drop()`.
- Metadados: `db.colecao.stats()`.
- Gerenciar Índices: `getIndexes()`, `dropIndex({ campo: 1 })`.

### 2.3. Bancos de Dados

- Listar: `show dbs`.
- Excluir: `db.dropDatabase()`.

### 2.4. Gerenciamento de Usuários

- Criar usuário: `db.createUser({ user: "username", pwd: "password", roles: ["role"] })`.
- Listar usuários: `db.getUsers()`.
- Remover usuário: `db.dropUser("username")`.

### 2.5. Backup e Restauração

- Backup: `mongodump --out /caminho/para/diretorio`.
- Restauração: `mongorestore /caminho/para/diretorio`.

### 2.6. Arquivo de Configuração

- `mongod --config /caminho/para/arquivo.conf`: Inicia o servidor MongoDB com um arquivo de configuração personalizado.

### 2.7. Sharding

- `sh.enableSharding("nomeDoBanco")`: Ativa o sharding em um banco de dados.
- `sh.shardCollection("banco.colecao", { campoShard: 1 })`: Define uma coleção para ser shardada.

## 3. Comandos CRUD

### 3.1. Criação

- `insertOne(documento)`: Insere um documento na coleção.
- `insertMany([doc1, doc2])`: Insere vários documentos de uma vez.

### 3.2. Leitura

- `find()`: Recupera todos os documentos da coleção.
- `findOne({ critérios })`: Recupera um documento que atenda aos critérios.
- `find({ critérios })`: Recupera documentos que atendam aos critérios.

### 3.3. Atualização

- `updateOne({ critérios }, { $set: { campos } })`: Atualiza um documento que atenda aos critérios.
- `updateMany({ critérios }, { $set: { campos } })`: Atualiza vários documentos que atendam aos critérios.

### 3.4. Remoção

- `deleteOne({ critérios })`: Remove um documento que atenda aos critérios.
- `deleteMany({ critérios })`: Remove vários documentos que atendam aos critérios.

## 4. Filtros e Operadores

O MongoDB oferece diversos operadores para filtrar e consultar dados de forma flexível. Aqui estão alguns exemplos de como esses operadores podem ser usados:

### eq, ne, gt, lt, gte, lte

- `$eq`: Igual a um valor específico.
- `$ne`: Diferente de um valor específico.
- `$gt`: Maior que um valor específico.
- `$lt`: Menor que um valor específico.
- `$gte`: Maior ou igual a um valor específico.
- `$lte`: Menor ou igual a um valor específico.

Exemplo:
```javascript
// Encontre documentos com idade igual a 25
db.colecao.find({ idade: { $eq: 25 } });

// Encontre documentos com pontuação maior que 80
db.colecao.find({ pontuacao: { $gt: 80 } });
```

### in, nin
- `$in`: Valor presente em uma lista.
- `$nin`: Valor ausente em uma lista.

Exemplo:
```javascript
// Encontre documentos com categorias "A" ou "B"
db.colecao.find({ categoria: { $in: ["A", "B"] } });

// Encontre documentos com cores que não sejam "vermelho" ou "azul"
db.colecao.find({ cor: { $nin: ["vermelho", "azul"] } });
```

### and, or, not
- `$and`: Combinação lógica E.
- `$or`: Combinação lógica OU.
- `$not`: Negação lógica.

Exemplo:
```javascript
// Encontre documentos com idade entre 25 e 40
db.colecao.find({ $and: [{ idade: { $gte: 25 } }, { idade: { $lte: 40 } }] });

// Encontre documentos com categoria "A" OU pontuação maior que 90
db.colecao.find({ $or: [{ categoria: "A" }, { pontuacao: { $gt: 90 } }] });

// Encontre documentos com idade NÃO igual a 30
db.colecao.find({ idade: { $not: { $eq: 30 } } });
```

### exists

Verifica se um campo existe nos documentos.

Exemplo:
```javascript
// Encontre documentos com o campo "endereco" existente
db.colecao.find({ endereco: { $exists: true } });

// Encontre documentos com o campo "telefone" ausente
db.colecao.find({ telefone: { $exists: false } });
```

## 5. Ordenação, Limitação e Paginação

- `.sort({ campo: 1 ou -1 })`: Ordena os resultados em ordem crescente (1) ou decrescente (-1).
- `.limit(numero)`: Limita o número de documentos retornados.
- `.skip(numero)`: Pula uma quantidade específica de documentos.

Exemplo de uso:

```javascript
db.colecao.find().sort({ nome: 1 }).limit(10).skip(20);
```

## 6. Índices

- `createIndex({ campo: 1 ou -1 })`: Cria um índice na coleção.
- `getIndexes()`: Retorna todos os índices da coleção.

## 7. Aggregation Framework

O Aggregation Framework permite realizar operações complexas de agregação e transformação de dados usando um pipeline de estágios.

Exemplo de uso para calcular a média de idades por categoria:

```javascript
db.colecao.aggregate([
  { $group: { _id: "$categoria", mediaIdade: { $avg: "$idade" } } }
]);
```

## 8. Trabalhando com Data e Tempo

- `Date`: Tipo de dado para armazenar datas e horas.
- `ISODate`: Formato ISO para inserção de datas.

## 9. Gerenciamento de Sessões

- `startSession`: Inicia uma sessão no MongoDB para transações e operações específicas.

## 10. Encerrando

- `quit()`: Sai do shell do MongoDB.

---
