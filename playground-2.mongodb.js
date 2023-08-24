// Documentos vinculados

// Criando um novo banco de dados e atividando-o
// use revenda;
use("revenda");

// Inserindo três modelos de carro
db.modelos.insertMany([
    {
        nome: "Opala",
        marca: "Chevrolet",
    },
    {
        nome: "Fusca",
        marca: "Volkswagen",
    },
    {
        nome: "Corcel",
        marca: "Ford",
    }
]);

db.modelos.find();

// Inserindo um Fusca
db.veiculos.insertOne({
    modelo_id: ObjectId("64e691bf20b51159390f7140"), // Fusca
    cor: "Azul",
    ano: 1978,
    placa: "ABC-1234",
    preco: 5000
});

// Inserindo um Corcel e um Opala
db.veiculos.insertMany([
    {
        modelo_id: ObjectId("64e691bf20b51159390f7141"), // Corcel
        cor: "Vermelho",
        ano: 1975,
        placa: "DEF-9876",
        preco: 6200
    },
    {
        modelo_id: ObjectId("64e691bf20b51159390f713f"), // Opala
        cor: "Preto",
        ano: 1981,
        placa: "GHI-3333",
        preco: 7500
    }
]);
