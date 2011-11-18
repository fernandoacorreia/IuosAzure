CREATE TABLE [dbo].[Inquilinos]
(
	Id int IDENTITY NOT NULL, 
	Nome nvarchar(202) NOT NULL,
	VersaoRegistro rowversion,
	CONSTRAINT [PK_Inquilinos] PRIMARY KEY CLUSTERED 
	(
		[Id] ASC
	)
)
