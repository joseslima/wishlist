# wishlist
 #### 1. Em ambiente de desenvolvimento é necessário seguir alguns passos:

 1.1 Primeiro clone o repositório

 	1.2 Pode ser necessário instalar as dependências

	cd src
	npm i

1.3 Execute o arquivo docker-compose.yml na raiz do projeto (É necessária a instalação do docker e docker-compose )
	
	//na raiz do projeto 
	docker-compose up -d

A api será executada na porta 3000 (http://localhost:3000).

A documentação da API pode ser acessada através da segunte rota: http://localhost:3000/docs

As unicas rotas que não necessitam de autenticação são as de criação e listagem de clientes. Para se autenticar, utilize a rota de login (http://localhost:3000/auth). Essa rota recebe como parâmetro o email do cliente e retorna um token JWT que deve ser enviado no header das chamadas para as rotas autenticadas através da chave "Authorization". 

(Como essa API é apenas um teste, não foi utilizada senha na autenticação.)

	Exemplo de header:

		{
			"Authorization": "myKey"
		}

