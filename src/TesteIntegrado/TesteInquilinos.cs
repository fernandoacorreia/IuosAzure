using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Threading;
using System.ServiceModel.Web;
using System.Data.Services.Client;
using IousAzure.TesteIntegrado.ReferenciaAoServico;

// VER MAIS EXEMPLOS DE CÓDIGO EM:
// http://aspdotnetcode.source-of-humor.com/Articles/WCF-WebServices/ConsumingWCFDataServiceEntityDataModel.aspx
// http://blog.csdn.net/linyusen/article/details/4022642

namespace TesteIntegrado
{
    [TestClass]
    public class TesteInquilinos
    {
        private static readonly Uri serviceUri = new Uri("http://localhost/IousAzure.Servico/WcfDataService1.svc/");

        [TestMethod]
        public void DeveIncluirInquilino()
        {
            ContextoBd contextoBd = new ContextoBd(serviceUri);
            string nomeInquilino = "Inquilino teste " + System.DateTime.UtcNow.ToString("o");
            Inquilino novoInquilino = new Inquilino { Nome = nomeInquilino };

            contextoBd.AddToInquilinos(novoInquilino);
            contextoBd.SaveChanges();

            var registros = from inquilino
                            in contextoBd.Inquilinos
                            where inquilino.Id == novoInquilino.Id
                            select inquilino;
            var registro = registros.Single<Inquilino>();
            Assert.AreEqual(nomeInquilino, registro.Nome);
        }
    }
}
