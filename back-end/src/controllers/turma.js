import prisma from '../database/client.js';

const controller = {};  // Objeto vazio

controller.create = async function (req, res) {
  try {
    // Conecta-se ao BD e envia uma instrução de criação de um novo documento, com os dados que estão dentro de req.body
    await prisma.turma.create({data: req.body})
    // Envia uma resposta de sucesso ao front-end
    res.status(201).end();  // HTTP 201: Created
  } catch (error) {
    // Deu errado: exibe o erro no console do back-end
    console.error(error);
    // Envia uma resposta de erro ao front-end
    res.status(500).send(error);  // HTTP 500: Internal Server Error
  }
}

controller.retrieveAll = async function (req, res) {
  try {
    // Por padrão, não inclui nenhum relacionamento
    const include = {};

    if(req.query.professor) include.professor = true;
    if(req.query.curso)     include.curso = true;
    if(req.query.alunos)    include.alunos = true;

    // Manda buscar os dados no servidor
    // Retorna o resultado ordenado por nome, depois nível
    const result = await prisma.turma.findMany({
      // Traz as informações das coleções relacionadas
      include,
      orderBy: [
        {diaSemana: 'asc'},
        {horaInicial: 'asc'}
      ]
    });
    res.send(result); // HTTP 200: Ok (implícito)
  } catch (error) {
    // Deu errado: exibe o erro no console do back-end
    console.error(error);
    // Envia uma resposta de erro ao front-end
    res.status(500).send(error);  // HTTP 500: Internal Server Error
  }
}

controller.retrieveOne = async function (req, res) {
  try {
    // Manda buscar os dados no servidor
    const result = await prisma.turma.findUnique({
      where: { id: req.params.id }
    });

    if (result) res.send(result);   // Encontrou ~> Retorna HTTP 200: Ok
    else res.status(404).end();     // Não encontrou ~> Retorna HTTP 404: Not Found
  } catch (error) {
    // Deu errado: exibe o erro no console do back-end
    console.error(error);
    // Envia uma resposta de erro ao front-end
    res.status(500).send(error);  // HTTP 500: Internal Server Error
  }
}

controller.update = async function (req, res) {
  try {
    const result = await prisma.turma.update({
      where: { id: req.params.id },
      data: req.body
    });

    if (result) res.status(204).end();  // HTTP 204: No Content
    else res.status(404).end();         // Não encontrou (e não atualizou) ~> Retorna HTTP 404: Not Found
  } catch (error) {
    // Deu errado: exibe o erro no console do back-end
    console.error(error);
    // Envia uma resposta de erro ao front-end
    res.status(500).send(error);  // HTTP 500: Internal Server Error
  }
}

controller.delete = async function (req, res) {
  try {
    const result = await prisma.turma.delete({
      where: { id: req.params.id }
    });

    if (result) res.status(204).end();  // HTTP 204: No Content
    else res.status(404).end();         // Não encontrou (e não excluiu) ~> Retorna HTTP 404: Not Found
  } catch (error) {
    // Deu errado: exibe o erro no console do back-end
    console.error(error);
    // Envia uma resposta de erro ao front-end
    res.status(500).send(error);  // HTTP 500: Internal Server Error
  }
}

export default controller;
