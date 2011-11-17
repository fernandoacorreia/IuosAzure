var URI_BASE_SERVICO = "/IousAzure.Servico/WcfDataService1.svc";
var SERVICO_SOLICITACOES = URI_BASE_SERVICO + "/Solicitacoes";

function Atualizar() {
    $("#lista_solicitacoes").hide();
    $("#nenhuma").hide();
    $("#carregando").show();
    $('.pagina_solicitacao').remove();
    $('.item_solicitacao').remove();
    ObterSolicitacoes();
}

function ObterSolicitacoes() {
    var filtro = "Situacao eq 'EM AVALIAÇÃO'";
    var requestURI = SERVICO_SOLICITACOES + "?$filter=" + filtro;
    OData.jsonHandler.recognizeDates = true;
    OData.read(requestURI, SucessoAoObterSolicitacoes);
}

function SucessoAoObterSolicitacoes(data, response) {
    if (data.results.length == 0) {
        $("#nenhuma").show();
    } else {
        AplicarTemplate(data.results)
    }
    $("#carregando").hide();
}

function AplicarTemplate(data) {
    var templateLista =
        "<li class=\"item_solicitacao\" id=\"item_solicitacao${Id}\">" +
        "<a href=\"#solicitacao${Id}\" data-transition=\"slide\">" +
        "<h3>${Descricao}</h3>" +
        "<p>R$ {{html parseFloat(ValorTotal).toFixed(2) }}</p>" +
        "</a></li>";
    $.tmpl(templateLista, data).appendTo("#lista_solicitacoes");
    $("#lista_solicitacoes").listview("refresh");
    var templatePaginas =
        "<div data-role=\"page\" data-add-back-btn=\"true\" data-theme=\"a\" id=\"solicitacao${Id}\" class=\"pagina_solicitacao\">" +
        "    <div data-role=\"header\">" +
        "        <h1>Solicitações</h1>" +
        "    </div>" +
        "    <div data-role=\"content\">" +
        "        <h2>${Descricao}</h2>" +
        "        <h1>R$ {{html parseFloat(ValorTotal).toFixed(2) }}</h1>" +
        "        <p>${Criacao.toString('d-MMM-yyyy HH:mm')}</p>" +
        "        <br>" +
        "        <a href=\"javascript:Aprovar(${Id})\" class=\"botao_aprovar\" data-role=\"button\" data-icon=\"check\" data-inline=\"true\">Aprovar</a> " +
        "        <a href=\"javascript:Rejeitar(${Id})\" class=\"botao_rejeitar\" data-role=\"button\" data-icon=\"delete\" data-inline=\"true\">Rejeitar</a> " +
        "    </div>" +
        "</div>";
    $.tmpl(templatePaginas, data).appendTo("body");
    $("#lista_solicitacoes").show();
}

function Aprovar(solicitacaoId) {
    AtualizarSolicitacao(solicitacaoId, "APROVADA");

}

function Rejeitar(solicitacaoId) {
    AtualizarSolicitacao(solicitacaoId, "REJEITADA");
}

function AtualizarSolicitacao(solicitacaoId, situacao) {
    var requestOptions = {
        requestUri: SERVICO_SOLICITACOES + "(" + solicitacaoId + ")",
        method: "MERGE",
        data: { Situacao: situacao }
    };
    OData.request(requestOptions, SucessoOperacaoSolicitacao, ErroOperacaoSolicitacao);
}

function SucessoOperacaoSolicitacao(data, response) {
    var id_item = "#item_" + $.mobile.activePage.data("url");
    $(id_item).remove();
    var quantidadeItems = $("#lista_solicitacoes li").length;
    if (quantidadeItems == 0) {
        $("#nenhuma").show();
    }
    $.mobile.changePage("#home", { reverse: true });
}

function ErroOperacaoSolicitacao(error) {
    alert(error.message)
}

$("#home").live('pageinit', function () {
    ObterSolicitacoes();
});

$("#atualizar").live("click", function () {
    Atualizar();
});
