using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace IuosAzure.Entidades
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

        //public virtual Inquilino Inquilino { get; set; }
        //public virtual Usuario UsuarioSolicitante { get; set; }
        //public virtual Usuario UsuarioAvaliador { get; set; }
        //public virtual ICollection<SolicitacaoItem> Itens { get; set; }
    }
}
