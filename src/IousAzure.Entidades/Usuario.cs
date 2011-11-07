using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace IousAzure.Entidades
{
    [Table("Usuarios")]
    public class Usuario
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Nome { get; set; }
        public string SaltDaSenha { get; set; }
        public string HashDaSenha { get; set; }
        public int InquilinoId { get; set; }
    
        public virtual Inquilino Inquilino { get; set; }
        public virtual ICollection<Solicitacao> SolicitacoesDoUsuario { get; set; }
        public virtual ICollection<Solicitacao> SolicitacoesAAvaliar { get; set; }
    }
}
