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

## Gerar cliente do Prisma
`npx prisma generate`
- Precisa ser executado sempre que houver alterações no arquivo `schema.prisma`
