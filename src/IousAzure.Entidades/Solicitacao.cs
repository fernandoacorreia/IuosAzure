using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace IousAzure.Entidades
{
    [Table("Solicitacoes")]
    public class Solicitacao
    {
        public int Id { get; set; }
        public int InquilinoId { get; set; }
        [Column("UsuarioSolicitanteId")]
        public int UsuarioSolicitanteId { get; set; }
        [Column("UsuarioAvaliadorId")]
        public int UsuarioAvaliadorId { get; set; }
        public System.DateTime Criacao { get; set; }
        public string Descricao { get; set; }
        public string Situacao { get; set; }
        public decimal ValorTotal { get; set; }

        //[ForeignKey("InquilinoId")]
        //public virtual Inquilino Inquilino { get; set; }
        //[ForeignKey("UsuarioSolicitanteId")]
        //public virtual Usuario UsuarioSolicitante { get; set; }
        //[ForeignKey("UsuarioAvaliadorId")]
        //public virtual Usuario UsuarioAvaliador { get; set; }
        //public virtual ICollection<SolicitacaoItem> Itens { get; set; }
    }
}
