CREATE TABLE [dbo].[SolicitacaoItens]
(
	Id int IDENTITY NOT NULL, 
	InquilinoId int NOT NULL,
	SolicitacaoId int NOT NULL,
	Descricao ntext NOT NULL,
	Quantidade decimal(18,4) NOT NULL,
	ValorUnitario money NOT NULL,
	ValorTotal money NOT NULL,
	VersaoRegistro rowversion,
	CONSTRAINT [PK_SolicitacaoItens] PRIMARY KEY CLUSTERED 
	(
		[Id] ASC
	)
)
