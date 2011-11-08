using System;
using System.Collections.Generic;
using System.Data.Services;
using System.Data.Services.Common;
using System.Linq;
using System.ServiceModel.Web;
using System.Web;
using System.Data.Objects;
using IousAzure.Entidades;
using System.Data.Entity.Infrastructure;

namespace IousAzure.Servico
{
    // http://code.msdn.microsoft.com/Code-First-Northwind-Data-874c947b
    // http://social.technet.microsoft.com/wiki/contents/articles/5234.aspx
    public class WcfDataService1 : DataService<ObjectContext>
    {
        // This method is called only once to initialize service-wide policies.
        public static void InitializeService(DataServiceConfiguration config)
        {
            // We need to explicitly set the less restrictive rights.
            config.SetEntitySetAccessRule("Inquilinos", EntitySetRights.All);

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

            // Return the underlying context.
            return objectContext;
        }
    }
}
