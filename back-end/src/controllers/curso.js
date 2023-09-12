import prisma from '../database/client.js';

const controller = {};  // Objeto vazio

controller.create = async function (req, res) {
  try {
    // Conecta-se ao BD e envia uma instrução de criação de um novo documento, com os dados que estão dentro de req.body
    await prisma.curso.create({data: req.body})
    // Envia uma resposta de sucesso ao front-end
    res.status(201).end();  // HTTP 201: Created
  } catch (error) {
    // Deu errado: exibe o erro no console do back-end
    console.error(error);
    // Envia uma resposta de erro ao front-end
    res.status(500).send(error);  // HTTP 500: Internal Server Error
  }
}

export default controller;
