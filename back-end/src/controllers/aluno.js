import prisma from '../database/client.js';

const controller = {};  // Objeto vazio

controller.create = async function (req, res) {
  try {
    // Conecta-se ao BD e envia uma instrução de criação de um novo documento, com os dados que estão dentro de req.body
    await prisma.aluno.create({data: req.body})
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

  // Por padrão, não inclui nenhum relacionamento
  const include = {}

  // Inclui a exibição não apenas dos dados da turma, mas também dos dados do professor e do curso que estão dentro da turma
  if(req.query.turmas)   include.turmas = { include: { professor: true, curso: true } } 

  try {
    // Manda buscar os dados no servidor
    // Retorna o resultado ordenado por nome, depois nível
    const result = await prisma.aluno.findMany({
      include,
      orderBy: [
        {nome: 'asc'}
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
    const result = await prisma.aluno.findUnique({
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
    const result = await prisma.aluno.update({
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
    const result = await prisma.aluno.delete({
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

controller.addTurma = async function(req, res) {
  try {

    // Busca o aluno para recuperar a lista de ids de turmas dele
    const aluno = await prisma.aluno.findUnique({
      where: { id: req.params.alunoId }
    })

    // Se ele não tiver turmas ainda, criamos a lista vazia
    const turmaIds = aluno.turmaIds || []

    // Se o id de turma passado ainda não estiver na lista do aluno, fazemos a respectiva inserção
    if(! turmaIds.includes(req.params.turmaId))
      turmaIds.push(req.params.turmaId)

    // Atualizamos o aluno com uma lista de ids de turma atualizada  
    const result = await prisma.aluno.update({
      where: { id: req.params.alunoId },
      data: { turmaIds }
    })

    // Encontrou e atualizou ~> retorna HTTP 204: No content
    if(result) res.status(204).end()
    // Não encontrou (e não atualizou) ~> retorna HTTP 404: Not found
    else res.status(404).end()

  }
  catch(error) {
    // Deu errado: exibe o erro no console do back-end
    console.error(error)
    // Envia uma resposta de erro ao front-end
    res.status(500).send(error) // HTTP 500: Internal Server Error
  }
}

controller.removeTurma = async function(req, res) {

  try {
    // Busca o aluno para recuperar a lista de ids de turmas dele
    const aluno = await prisma.aluno.findUnique({
      where: { id: req.params.alunoId }
    })

    // Não encontrou o aluno, ou o aluno não tem turmas associadas a ele ~> HTTP 404: Not Found
    if(! aluno || ! aluno.turmaIds) res.send(404).end()

    // Procura, na lista de ids de turma do aluno, se existe o id de turma passado para remoção
    for(let i = 0; i < aluno.turmaIds.length; i++) {
      // Encontrou
      if(aluno.turmaIds[i] === req.params.turmaId) {
        // Remove o id que foi passado da lista de ids de turma
        aluno.turmaIds.splice(i, 1)

        // Faz a atualização no aluno, alterando o conteúdo de turmasId
        const result = await prisma.aluno.update({
          where: { id: req.params.alunoId },
          data: { turmaIds: aluno.turmaIds }
        })

        // Encontrou e atualizou ~> retorna HTTP 204: No content
        if(result) return res.status(204).end()
        // Não encontrou (e não atualizou) ~> retorna HTTP 404: Not found
        else return res.status(404).end()
      
      }
    }

    // Se chegou até aqui, é porque não existe o id da turma passado
    // na lista de ids de turma do aluno ~> HTTP 404: Not found
    return res.status(404).end()    

  }
  catch(error) {
    // Deu errado: exibe o erro no console do back-end
    console.error(error);
    // Envia uma resposta de erro ao front-end
    res.status(500).send(error); // HTTP 500: Internal Server Error
  }
}

export default controller;
