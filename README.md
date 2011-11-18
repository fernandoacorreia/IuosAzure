IuosAzure
=========

Prova de conceito de arquitetura de software como serviço para a plataforma Windows Azure.

Copyright 2011, Fernando de Alcântara Correia (@facorreia).
Todos os direitos reservados.

Licença de uso: GNU Affero General Public License, version 3.
Ver arquivo "LICENSE.TXT".


Histórias
---------

### Solicitar autorização para despesa

Como funcionário de uma empresa, eu quero solicitar autorização para despesas para que eu possa executar uma atividade.
	
### Avaliar solicitações

Como ordenador de despesas, eu quero avaliar as solicitações de despesas pelas quais sou responsável para que eu possa aprová-las ou rejeitá-las.

### Consultar minhas solicitações

Como funcionário de uma empresa, eu quero consultar as solicitações de despesas que eu fiz, para saber se foram aprovadas ou rejeitadas.


Arquitetura
-----------

### Banco de dados

Base de dados relacional usando SQL Azure.

### Serviço de aplicação

Serviço WCF implementado com WCF Data Services que expõe o modelo de entidades usando ADO.NET Entity Framework.

### Cliente rico desktop

Aplicativo JavaScript implementado com JQuery e datajs que utiliza o serviço de aplicação para incluir, alterar, excluir, consultar, aprovar e rejeitar solicitações.

### Cliente rico móvel

Aplicativo JavaScript implementado com JQuery Mobile e datajs que utiliza o serviço de aplicação para consultar, aprovar e rejeitar solicitações.


Estrutura da Solução
--------------------

* _IousAzure.Database:_ Projeto para criar a base de dados.
* _IousAzure.Entidades:_ Entidades e persistência.
* _IousAzure.Principal:_ Serviço do Windows Azure.
* _IousAzure.Servico:_ Serviço de aplicação.
* _IousAzure.TesteIntegrado:_ Testes de integração.
* _IousAzure.Website:_ Aplicativos clientes.

Limitações
----------

Esta é uma prova de conceito, não uma aplicação apta para produção.

Estas são algumas das principais limitações, entre outras:

### Limitações de requisitos funcionais

* As funcionalidades de negócio são restritas ao mínimo necessário para demonstração.
* Não foi implementada a especificação dos itens de despesa.
* Não é mantido registro das operações para auditoria.
* Não há autenticação de usuários.

### Limitações de requisitos não funcionais

* Não há qualquer verificação de segurança ou permissão.
* Não há restrição de acesso a dados de outros inquilinos.
* Não há suporte a particionamento (sharding) da base de dados.
