# PROJETO BACK-END

## Para iniciar o projeto
`npx @aka-demy/create-express-app`
* _Install package...?:_ y
* _Name:_ back-end
* _Language:_ JavaScript
* _Template engine:_ None
* _Package Manager:_ npm

## Mudar para a pasta do projeto
`cd back-end`

## Atualizar pacotes vulneráveis com atualizações de segurança
`npm audit fix --force`

## Instalar o Prisma como dependência de desenvolvimento
`npm install prisma --save-dev`

## Inicializar o Prisma com conector para MongoDB
`npx prisma init --datasource-provider mongodb`

## Instalar a extensão Prisma no VSCode

## Iniciar o servidor
`npm run dev`

## Adicionar o Prisma Client ao projeto
`npm install @prisma/client`

## Gerar cliente do Prisma
`npx prisma generate`
- Precisa ser executado sempre que houver alterações no arquivo `schema.prisma`

## Exibir os dados cadastrados com o Prisma Studio
`npx prisma studio`
- Deve ser executado em um segundo terminal, enquanto o projeto está sendo executado no primeiro

## Criar um novo CRUD a partir de outro já existente

### _Controller_

1. Copie o arquivo do _controller_ (`Ctrl+C Ctrl+V`) e renomeie-o de acordo com a nova entidade para a qual será feito o novo CRUD.
2. Substitua (`Ctrl+H`) todas as ocorrências de `prisma.xxxx` por `prisma.yyyy`, onde `xxxx` é o nome da entidade antiga e `yyyy` é o nome da entidade nova.
3. Verifique, no método `revieveAll()` da entidade, se há campos sendo usados no _orderby_ e substitua-os conforme a nova entidade.

### _Route_

1. Copie o arquivo da _route_ (`Ctrl+C Ctrl+V`) e renomeie-o de acordo com a nova entidade para a qual será feito o novo CRUD.
2. Na linha de `import` do _controller_, substitua o nome da entidade antiga pelo nome dda entidade nova.

### _Arquivo 'app.js'_

1. Na parte inferior do arquivo, na seção de rotas, copie e cole as duas linhas correspondentes a uma rota já existentes e faça as substituições necessárias.
    * São **quatro substituições** ao todo, duas em cada linha.
