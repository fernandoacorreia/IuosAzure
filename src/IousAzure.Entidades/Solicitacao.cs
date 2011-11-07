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
        public int UsuarioSolicitanteId { get; set; }
        public int UsuarioAvaliadorId { get; set; }
        public System.DateTime Data { get; set; }
        public string Descricao { get; set; }
        public string Situacao { get; set; }
        public decimal ValorTotal { get; private set; }
    
        public virtual Inquilino Inquilino { get; set; }
        public virtual Usuario UsuarioSolicitante { get; set; }
        public virtual Usuario UsuarioAvaliador { get; set; }
        public virtual ICollection<SolicitacaoItem> Itens { get; set; }
    }
}
