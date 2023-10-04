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

controller.addAluno = async function(req, res) {
  try {

    // Busca a turma para recuperar a lista de ids de alunos dele
    const turma = await prisma.turma.findUnique({
      where: { id: req.params.turmaId }
    })

    // Se ele não tiver alunos ainda, criamos a lista vazia
    const alunoIds = turma.alunoIds || []

    // Se o id de aluno passado ainda não estiver na lista da
    // turma, fazemos a respectiva inserção
    if(! alunoIds.includes(req.params.alunoId))
      alunoIds.push(req.params.alunoId)

    // Atualizamos a turma com uma lista de ids de aluno atualizada  
    const result = await prisma.turma.update({
      where: { id: req.params.turmaId },
      data: { alunoIds }
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

controller.removeAluno = async function(req, res) {
  try {

    // Busca a turma para recuperar a lista de ids de alunos dela
    const turma = await prisma.turma.findUnique({
      where: { id: req.params.turmaId }
    })

    // Não encontrou a turma, ou a turma não tem alunos associados a ele ~> HTTP 404: Not Found
    if(! turma || ! turma.alunoIds) res.send(404).end();

    // Procura, na lista de ids de aluno da turma, se existe o id de aluno passado para remoção
    for(let i = 0; i < turma.alunoIds.length; i++) {
      // Encontrou
      if(turma.alunoIds[i] === req.params.alunoId) {
        // Remove o id que foi passado da lista de ids de alunos
        turma.alunoIds.splice(i, 1);

        // Faz a atualização na turma, alterando o conteúdo de alunoIds
        const result = await prisma.turma.update({
          where: { id: req.params.turmaId },
          data: { alunoIds: turma.alunoIds }
        })

        // Encontrou e atualizou ~> retorna HTTP 204: No content
        if(result) return res.status(204).end();
        // Não encontrou (e não atualizou) ~> retorna HTTP 404: Not found
        else return res.status(404).end();
      }
    }

    // Se chegou até aqui, é porque não existe o id da turma passado na lista de ids de turma do aluno ~> HTTP 404: Not found
    return res.status(404).end();  
  }
  catch(error) {
    // Deu errado: exibe o erro no console do back-end
    console.error(error)
    // Envia uma resposta de erro ao front-end
    res.status(500).send(error) // HTTP 500: Internal Server Error
  }
}

export default controller;
