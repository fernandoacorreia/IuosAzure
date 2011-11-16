using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using IousAzure.TesteIntegrado.ReferenciaAoServico;

namespace IousAzure.TesteIntegrado
{
    [TestClass]
    public class TesteSolicitacoes
    {
        private static readonly Uri serviceUri = new Uri("http://localhost/IousAzure.Servico/WcfDataService1.svc/");

        [TestMethod]
        public void DeveIncluirSolicitacao()
        {
            ContextoBd contextoBd = new ContextoBd(serviceUri);
            string descricao = "Solicitação teste " + System.Guid.NewGuid();
            Solicitacao novaSolicitacao = new Solicitacao { Descricao = descricao };

            contextoBd.AddToSolicitacoes(novaSolicitacao);
            contextoBd.SaveChanges();

            var registros = from solicitacao
                            in contextoBd.Solicitacoes
                            where solicitacao.Id == novaSolicitacao.Id
                            select solicitacao;
            var registro = registros.Single<Solicitacao>();
            Assert.AreEqual(descricao, registro.Descricao);
        }
    }
}
