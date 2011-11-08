using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Threading;
using System.ServiceModel.Web;
using System.Data.Services.Client;

namespace TesteIntegrado
{
    /// <summary>
    /// Summary description for TesteDataService
    /// </summary>
    [TestClass]
    public class TesteDataService
    {
        private static readonly Uri serviceUri = new Uri("http://localhost:58036/WcfDataService1.svc/");

        [TestMethod]
        public void DevemHaverDoisInquilinos()
        {
            DataServiceContext contexto = new DataServiceContext(serviceUri);
            DataServiceQuery query = contexto.CreateQuery<ReferenciaAoServico.Inquilino>("Inquilinos");
            var results = contexto.Execute<ReferenciaAoServico.Inquilino>(query.RequestUri);
            int quantidadeInquilinos = results.Count<ReferenciaAoServico.Inquilino>();
            Assert.AreEqual(2, quantidadeInquilinos);
        }
    }
}
