﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using IuosAzure.TesteIntegrado.ReferenciaAoServico;

namespace IuosAzure.TesteIntegrado
{
    [TestClass]
    public class TesteSolicitacoes
    {
        private static readonly Uri serviceUri = new Uri("http://localhost/IuosAzure.Servico/WcfDataService1.svc/");

        [TestMethod]
        public void DeveIncluirSolicitacao()
        {
            ContextoBd contextoBd = new ContextoBd(serviceUri);
            string descricao = "Solicitação teste " + System.Guid.NewGuid();
            Solicitacao novaSolicitacao = new Solicitacao { Descricao = descricao, 
                                                            ValorTotal = new Random().Next(1,10000) };

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
