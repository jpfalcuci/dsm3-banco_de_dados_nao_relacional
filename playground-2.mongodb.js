// Documentos vinculados

// Criando um novo banco de dados e atividando-o
// use revenda;
use("revenda");

// show collections;

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
    modelo_id: "64e691bf20b51159390f7140", // Fusca
    cor: "Azul",
    ano: 1978,
    placa: "ABC-1234",
    preco: 5000
});

// Inserindo um Corcel e um Opala
db.veiculos.insertMany([
    {
        modelo_id: "64e691bf20b51159390f7141", // Corcel
        cor: "Vermelho",
        ano: 1975,
        placa: "DEF-9876",
        preco: 6200
    },
    {
        modelo_id: "64e691bf20b51159390f713f", // Opala
        cor: "Preto",
        ano: 1981,
        placa: "GHI-3333",
        preco: 7500
    }
]);

// Inserindo mais um Fusca e um Corcel
db.veiculos.insertMany([
    {
        modelo_id: "64e691bf20b51159390f7140", // Fusca
        cor: "Preto",
        ano: 1969,
        placa: "KLM-0001",
        preco: 8100
    },
    {
        modelo_id: "64e691bf20b51159390f7141", // Corcel
        cor: "Laranja",
        ano: 1976,
        placa: "QRS-9000",
        preco: 5800
    }
]);

db.veiculos.find();


// Aggregations

// Acessar Compass, selecionar o banco de dados revenda e a coleção veiculos

// Clicar em Aggregations, Create New, Add Stage e selecionar $addFields
// {
//     modelo_objid: { $toString: "$modelo_id" }
// } 

// Clicar em Add Stage e selecionar $lookup
// {
//     from: "modelos",
//     localField: "modelo_objid",
//     foreignField: "_id",
//     as: "modelo"
// }

// Clicar em Add Stage e selecionar $addFields
// {
//     modelo: { $first: "$modelo" }
// } 

// Clicar em Export:
db.getCollection('veiculos').aggregate(
    [
      {
        $addFields: {
          modelo_objid: {
            $toObjectId: '$modelo_id'
          }
        }
      },
      {
        $lookup: {
          from: 'modelos',
          localField: 'modelo_objid',
          foreignField: '_id',
          as: 'modelo'
        }
      },
      {
        $addFields: {
          modelo: { $first: '$modelo' }
        }
      }
    ],
    { maxTimeMS: 60000, allowDiskUse: true }
);


// Selecionar a coleção modelos => NÃO DEU CERTO

// Clicar em Aggregations, Create New, Add Stage e selecionar $addFields
// {
//     id_str: { $toString: "$_id" }
// }

// Clicar em Add Stage e selecionar $lookup
// {
//     from: "veiculos",
//     localField: "id_str",
//     foreignField: "modelo_id",
//     as: "veiculos"
// }

// Clicar em Export:
db.getCollection('modelos').aggregate(
    [
      {
        $addFields: {
          id_str: { $toString: '$_id' }
        }
      },
      {
        $lookup: {
          from: 'veiculos',
          localField: 'id_str',
          foreignField: 'modelo_id',
          as: 'veiculos'
        }
      }
    ],
    { maxTimeMS: 60000, allowDiskUse: true }
);
