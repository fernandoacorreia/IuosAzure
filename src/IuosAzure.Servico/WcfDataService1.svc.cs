using System;
using System.Collections.Generic;
using System.Data.Services;
using System.Data.Services.Common;
using System.Linq;
using System.ServiceModel.Web;
using System.Web;
using System.Data.Objects;
using IuosAzure.Entidades;
using System.Data.Entity.Infrastructure;

// VER Service Operation Considerations
// http://social.technet.microsoft.com/wiki/contents/articles/5234.aspx

namespace IuosAzure.Servico
{
    // http://code.msdn.microsoft.com/Code-First-Northwind-Data-874c947b
    // http://social.technet.microsoft.com/wiki/contents/articles/5234.aspx
    public class WcfDataService1 : DataService<ObjectContext>
    {
        // This method is called only once to initialize service-wide policies.
        public static void InitializeService(DataServiceConfiguration config)
        {
#if DEBUG
            config.UseVerboseErrors = true;
#endif

            // We need to explicitly set the less restrictive rights.
            config.SetEntitySetAccessRule("Inquilinos", EntitySetRights.All);
            config.SetEntitySetAccessRule("Solicitacoes", EntitySetRights.All);

            // Set the remaining entity sets to read all.
            config.SetEntitySetAccessRule("*", EntitySetRights.AllRead);

            config.DataServiceBehavior.MaxProtocolVersion = DataServiceProtocolVersion.V2;
        }

        // We must override CreateDataSource to manually return an ObjectContext,
        // otherwise the runtime tries to use the built-in reflection provider instead of 
        // the Entity Framework provider.
        protected override ObjectContext CreateDataSource()
        {
            ContextoBd contextoBd = new ContextoBd();

            // Configure DbContext before we provide it to the 
            // data services runtime.
            contextoBd.Configuration.ValidateOnSaveEnabled = false;

            // Get the underlying ObjectContext for the DbContext.
            var objectContext = ((IObjectContextAdapter)contextoBd).ObjectContext;

            // Disable proxy creation as this messes up the data service.
            objectContext.ContextOptions.ProxyCreationEnabled = false; 

            // Return the underlying context.
            return objectContext;
        }

        [ChangeInterceptor("Solicitacoes")]
        public void OnChangeSolicitacoes(Solicitacao solicitacao, UpdateOperations operacao)
        {
            if (operacao == UpdateOperations.Add)
            {
                solicitacao.InquilinoId = 1;  // Inquilino fixo para demonstração
                solicitacao.Criacao = System.DateTime.UtcNow;
                solicitacao.UsuarioSolicitanteId = 1;  // Usuário fixo para demonstração
                solicitacao.UsuarioAvaliadorId = 2;  // Usuário fixo para demonstração
                solicitacao.Situacao = "EM AVALIAÇÃO";
            }
        }
    }
}
