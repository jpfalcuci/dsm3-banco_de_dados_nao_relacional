// Listar bancos de dados existentes
// show dbs;

// Cria um novo BD ou alterna para um já existente
// use estoque;
use('estoque');

// Cria uma coleção
db.createCollection("produtos");

// Inserindo um produto
db.produtos.insertOne({
    nome: "Vassoura de piaçava",
    preco: 27.88,
    categoria: "Limpeza"
});

// Toda ver que fazemos uma inserção, o campo insertedId: ObjectId("hash24char") é adicionado automaticamente (único no mundo)

// Consultando o item inserido
db.produtos.find();

// Outra inserção
db.produtos.insertOne({
    nome: "Café",
    marca: "Dubom",
    quantidade: 500,
    unidade: "g",
    preco: 17.47,
    categoria: "Alimentos e bebidas",
    estoque: 52
});

// Mais uma inserção
db.produtos.insertOne({
    nome_oficial: "República Francesa",
    nome_comum: "França",
    capital: "Paris",
    continente: "Europa",
    chefe_estado: "Emanuel Macron",
    lingua_oficial: "francês"
});

// Inserção com subdocumento (neste caso, fornecedor)
db.produtos.insertOne({
    nome: "Biscoito",
    marca: "Crocantão",
    quantidade: 200,
    unidade: "g",
    preco: 4.19,
    categoria: "Alimentos e bebidas",
    estoque: 100,
    fornecedor: {
        nome: "Indústria de Alimentos Bacana S/A",
        cnpj: "01.234.567/0001-89"
    }
});

// Mais um produto com subdocumento
db.produtos.insertOne({
    nome: "Doce de leite",
    marca: "Mineirim",
    preco: 15.87,
    fornecedor: {
        nome: "Indústria de Alimentos Bacana S/A",
        cnpj: "01.234.567/0001-89"
    }
});

db.produtos.find();

// Listando todos os produtos ordenados por nome (ascendente = 1)
db.produtos.find().sort({ nome: 1 });

// Listando apenas o produto cujo nome é "Café"
db.produtos.find({ nome: "Café" });

// Listando todos os produtos fornecidos pela CNPJ 01.234.567/001-89
db.produtos.find({ "fornecedor.cnpj": "01.234.567/0001-89" });

// Produtos com mais de um fornecedor (vetor de subdocumentos)
// Campo multivalorável (mais de um valor)
db.produtos.insertOne({
    nome: "Paçoca",
    marca: "Junina",
    preco: 20.65,
    fornecedor: [
        {
            nome: "Indústria de Alimentos Bacana S/A",
            cnpj: "01.234.567/0001-89"
        },
        {
            nome: "Distribuidora de Doces Pingo de Mel Ltda.",
            cnpj: "98.765.432/0001-10"
        }
    ]
});

// Inserção de produto com campo multivalorado
db.produtos.insertOne({
    nome: "Bicarbonato de sódio",
    marca: "Q-Rente",
    preco: 3.45,
    categoria: [
        "Alimentos e bebidas",
        "Limpeza"
    ],
    fornecedor: {
        nome: "Distribuidora de Doces Pingo de Mel Ltda.",
        cnpj: "98.765.432/0001-10"
    }
});

// Busca pela categoria "Limpeza"
db.produtos.find({ categoria: "Limpeza" });

// Usar aspas na chave quando houver espaço, acento ou caractere especial

// Busca pelos produtos que NÃO SÃO da categoria "Limpeza"
// Operador $ne (not equal)
db.produtos.find({ categoria: { $ne: "Limpeza" } });

// Busca pelos produtos cujo preço é maior que 20.00
// Operador $gt = greater than
db.produtos.find({ preco: { $gt: 20 }});


// Atualizações e exclusões

// Adicionando um campo a um objeto já existente
db.produtos.updateOne(
    {
        nome: "Paçoca"
    },
    {
        $set: {
            categoria: "Alimentos e bebidas"
        }
    }
);

db.produtos.find({nome: "Paçoca"});

// Alterando o valor de um campo já existente no produto "Café" (_id: ObjectId("64e3ec89efe66adc625ad102"))
db.produtos.updateOne({
    _id: ObjectId("64e3ec89efe66adc625ad102")
}, {
    $set: {
        nome: "Café", 
        marca: "Alta Mogiana"
    }
});

db.produtos.find({nome: "Café"});

// Decrementando a quantidade do estoque do produto "Biscoito" (_id: ObjectId("64e3ec98efe66adc625ad104"))
// Diminuição de 10 unidades do estoque
db.produtos.updateOne({
    _id: ObjectId("64e3ec98efe66adc625ad104")
}, {
    $inc: { estoque: -10 }
});

db.produtos.find({nome: "Biscoito"});

// Aumentando o preço do "Doce de leite" (_id: ObjectId("64e3eca0efe66adc625ad105")) em 2.50

db.produtos.updateOne({
    _id: ObjectId("64e3eca0efe66adc625ad105")
}, {
    $inc: { preco: 2.50 }
});

db.produtos.find({nome: "Doce de leite"});

// Aumentando todos os preços em 10% (apenas documentos onde exista o campo "preco")

db.produtos.find();
// Vassoura: 27.88
// Café: 17.47
// Biscoito: 4.19
// Doce de leite: 18.37
// Paçoca: 20.65
// Bicarbonato: 3.45

db.produtos.updateMany({
    preco: { $exists: true }
}, {
    $mul: { preco: 1.1 }
});

db.produtos.find();


// Exclusões

// Excluindo a intrusa "República Francesa" (_id: ObjectId("64e3ec91efe66adc625ad103"))
db.produtos.deleteOne({
    _id: ObjectId("64e3ec91efe66adc625ad103")
});

db.produtos.find();

// Exclusão todos os produtos cujo preço < 20

// Deletando apenas o primeiro documento:
db.produtos.deleteOne({
    preco: { $lt: 20 }
});

// Deletando todos os documentos:
db.produtos.deleteMany({
    preco: { $lt: 20 }
});
