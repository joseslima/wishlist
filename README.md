# Wishlist

API NodeJS desenvolvida como solução do desafio a seguir:

# Cenário

O Magalu está expandindo seus negócios e uma das novas missões do time de
tecnologia é criar uma funcionalidade de Produtos Favoritos de nossos Clientes, em
que os nossos aplicativos irão enviar requisições HTTP para um novo backend que
deverá gerenciar nossos clientes e seus produtos favoritos.
Esta nova API REST será crucial para ações de marketing da empresa e terá um
grande volume de requisições então tenha em mente que a preocupação com
performance é algo que temos em mente constantemente.

# Requisitos

● Deve ser possível criar, atualizar, visualizar e remover Clientes
○ O cadastro dos clientes deve conter apenas seu nome e endereço de
e-mail
○ Um cliente não pode se registrar duas vezes com o mesmo endereço
de e-mail


● Cada cliente só deverá ter uma única lista de produtos favoritos

● Em uma lista de produtos favoritos podem existir uma quantidade ilimitada
de produtos

	○ Um produto não pode ser adicionado em uma lista caso ele não exista
	○ Um produto não pode estar duplicado na lista de produtos favoritos de um cliente
	○ A documentação da API de produtos pode ser visualizada neste link
	
● O dispositivo que irá renderizar a resposta fornecida por essa nova API irá
apresentar o Título, Imagem, Preço e irá utilizar o ID do produto para formatar
o link que ele irá acessar. Quando existir um review para o produto, o mesmo
será exibido por este dispositivo. Não é necessário criar um frontend para
simular essa renderização (foque no desenvolvimento da API).

● O acesso à api deve ser aberto ao mundo, porém deve possuir autenticação
e autorização.

# Dependências

● Git

● NodeJS

● Docker

● Docker Compose

# Configuração local

#### 1. Em ambiente de desenvolvimento é necessário seguir alguns passos:

 1.1 Primeiro clone o repositório.

	git clone https://github.com/joseslima/wishlist.git

 	1.2 Pode ser necessário instalar as dependências. Para isso acesse a raiz do projeto via terminal e execute os seguintes comandos:

	cd src
	npm i

1.3 Execute o arquivo docker-compose.yml na raiz do projeto via terminal. (É necessária a instalação do docker e docker-compose )
	
	//na raiz do projeto 
	docker-compose up -d 
	
	//ou
	docker-compose up

	//se quiser visualizar os logs da API, execute o seguinte comando
        docker-compose logs --tail 1000 -f server

A api será executada na porta 3000 (http://localhost:3000).

A documentação da API pode ser acessada através da seguinte rota: http://localhost:3000/docs

As únicas rotas que não necessitam de autenticação são as de criação e listagem de clientes. Para se autenticar, utilize a rota de login (http://localhost:3000/auth). Essa rota recebe como parâmetro o email do cliente e retorna um token JWT que deve ser enviado no header das chamadas para as rotas autenticadas através da chave "Authorization". 

(Como essa API é apenas um teste, não foi utilizada senha na autenticação.)

	Exemplo de header:

	  {
	    "Authorization": "myKey"
	  }

