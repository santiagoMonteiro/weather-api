## Prisma ORM

`npx prisma init` => Iniciar as configurações de banco de dados com o Prisma
`npx prisma generate` => Criar a tipagem do schema
`npx prisma migrate dev` => Criar ponto na história do controle de versões do banco
`npx prisma migrate deploy` => roda as migrations no banco de dados para produção
`npx prisma studio` => Interface para navegação no Banco de dados


## Docker
`docker ps` => Listar os containeres que estão executando
`docker ps -a` => Listar os containeres que já executaram
`docker start container-name` => iniciar o container
`docker stop container-name` => parar o container
`docker rm container-name` => remover o container
`docker logs container-name` => visualizar os logs do container
`docker logs container-name -f` => visualizar os logs continuamente

`docker compose up -d` => subir os containeres definidos no arquivo de compose
  (o parâmetro -d oculta os logs)
`docker compose stop` => parar os containeres definidos no arquivo de compose
`docker compose down` => deletar os containeres definidos no arquivo de compose



