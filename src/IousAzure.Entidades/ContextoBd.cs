using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;

namespace IousAzure.Entidades
{
    public class ContextoBd : DbContext
    {
        public ContextoBd()
        {
            // Disable proxy creation as this messes up the data service.
            this.Configuration.ProxyCreationEnabled = false;
        }

        public DbSet<Inquilino> Inquilinos { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Solicitacao> Solicitacoes { get; set; }
        public DbSet<SolicitacaoItem> SolicitacaoItens { get; set; }
    }
}
