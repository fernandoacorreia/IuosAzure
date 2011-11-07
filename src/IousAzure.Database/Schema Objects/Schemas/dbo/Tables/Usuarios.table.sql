CREATE TABLE [dbo].[Usuarios]
(
	Id int IDENTITY NOT NULL, 
	InquilinoId int NOT NULL,
	Email nvarchar(202) NOT NULL,
	Nome nvarchar(202) NOT NULL,
	SaltDaSenha nvarchar(202) NOT NULL,
	HashDaSenha nvarchar(202) NOT NULL,
	VersaoRegistro rowversion,
	CONSTRAINT [PK_Usuarios] PRIMARY KEY CLUSTERED 
	(
		[Id] ASC
	)
)
