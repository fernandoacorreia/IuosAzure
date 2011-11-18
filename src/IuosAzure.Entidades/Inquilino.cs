using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;

namespace IuosAzure.Entidades
{
    [Table("Inquilinos")]
    public class Inquilino
    {
        public int Id { get; set; }
        public string Nome { get; set; }
    
        public virtual ICollection<Usuario> Usuarios { get; set; }
        public virtual ICollection<Solicitacao> Solicitacoes { get; set; }
    }
}
