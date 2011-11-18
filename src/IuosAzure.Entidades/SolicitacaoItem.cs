using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace IuosAzure.Entidades
{
    [Table("SolicitacaoItens")]
    public class SolicitacaoItem
    {
        public int Id { get; set; }
        public int SolicitacaoId { get; set; }
        public string Descricao { get; set; }
        public decimal Quantidade { get; set; }
        public decimal ValorUnitario { get; set; }
        public decimal ValorTotal { get; private set; }
    
        public virtual Solicitacao Solicitacao { get; set; }
    }
}
