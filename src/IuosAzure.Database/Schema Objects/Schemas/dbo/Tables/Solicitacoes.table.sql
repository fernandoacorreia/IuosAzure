CREATE TABLE [dbo].[Solicitacoes]
(
	Id int IDENTITY NOT NULL, 
	InquilinoId int NOT NULL,
	UsuarioSolicitanteId int NOT NULL,
	UsuarioAvaliadorId int NULL,
	Criacao datetime2 NOT NULL,
	Descricao ntext NOT NULL,
	Situacao nvarchar(202) NOT NULL,
	ValorTotal money NOT NULL,
	VersaoRegistro rowversion,
	CONSTRAINT [PK_Solicitacoes] PRIMARY KEY CLUSTERED 
	(
		[Id] ASC
	)
)
