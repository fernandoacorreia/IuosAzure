// ********** VARIÁVEIS GLOBAIS **********

var URI_BASE_SERVICO = "/IuosAzure.Servico/WcfDataService1.svc";
var URI_METADATA = URI_BASE_SERVICO + "/$metadata";
var SERVICO_SOLICITACOES = URI_BASE_SERVICO + "/Solicitacoes";

// Variáveis do formulário de solicitação.
var descricao = $("#descricao"),
    valor_total = $("#valor_total"),
    todosCampos = $([]).add(descricao).add(valor_total),
	mensagem = $("#mensagem");

// Diálogo de exclusão de solicitação
var dialogoExclusao = null;

// Visões disponíveis
var visoes = {
    "mostrar_minhas": {
        filtro: "UsuarioSolicitanteId eq 1",
        acoes: function (id) {
            return "<a href=\"javascript:AbrirDialogoAlteracaoSolicitacao(" + id + ")\">Editar</a>" +
                   " " +
                   "<a href=\"javascript:AbrirDialogoExclusaoSolicitacao(" + id + ")\">Excluir</a>";
        }
    },
    "mostrar_a_aprovar": {
        filtro: "Situacao eq 'AVALIANDO'",
        acoes: function (id) {
            return "<a href=\"javascript:AbrirDialogoAprovacaoSolicitacao(" + id + ")\">Aprovar</a>" +
                   " " +
                   "<a href=\"javascript:AbrirDialogoRejeicaoSolicitacao(" + id + ")\">Rejeitar</a>";
        }
    }
}

// Visão selecionada
var visaoSelecionada = null;

// ********** INICIALIZAÇÃO **********

// Ações no carregamento da página.
function OnPageLoad() {
    $("#dialog:ui-dialog").dialog("destroy");
    $("#visao_a_mostrar").change(VisaoAlterada);
    $("#formulario_solicitacao").dialog({
        autoOpen: false,
        height: 400,
        width: 450,
        modal: true,
        close: function () {
            todosCampos.val("").removeClass("ui-state-error");
        }
    });
    OData.read(URI_METADATA, function (metadata, response) {
        OData.defaultMetadata = metadata;
        ProsseguirInicializacao();
    }, function (error) {
        alert("Erro obtendo metadados.")
    }, OData.metadataHandler);
}

// Continua a inicialização, após ter lido os metadados.
function ProsseguirInicializacao() {
    $("#criar_solicitacao").button()
        .click(AbrirDialogoNovaSolicitacao);
    $("#atualizar_solicitacoes").button()
        .click(ObterSolicitacoes);
    VisaoAlterada();
}

// ********** LISTA DE SOLICITAÇÕES **********

// Lida com evento de mudança de visão.
function VisaoAlterada() {
    visaoSelecionada = visoes[$("#visao_a_mostrar").val()];
    ObterSolicitacoes();
}

// Obter a lista de solicitações.
function ObterSolicitacoes() {
    $("#carregando_solicitacoes").show();
    var requestURI = SERVICO_SOLICITACOES + "?$filter=" + visaoSelecionada.filtro;
    OData.read(requestURI, SucessoAoObterSolicitacoes);
}

// Lida com evento de sucesso ao obter solicitações.
function SucessoAoObterSolicitacoes(data, response) {
    $("#carregando_solicitacoes").hide();
    $("#minhas_solicitacoes").find("tr:gt(0)").remove();
    AplicarTemplate(data.results);
    $("#area_lista").show();
}

// Monta template da lista de solicitações.
function AplicarTemplate(data) {
    var template = "<tr id=\"solicitacao_${Id}\">" +
                   "<td>${Criacao.toString('d-MMM-yyyy HH:mm')}</td>" +
                   "<td>${Descricao}</td>" +
                   "<td>{{html parseFloat(ValorTotal).toFixed(2) }}</td>" +
                   "<td>${Situacao}</td>" +
                   "<td>" +
                   "{{html visaoSelecionada.acoes(Id) }}" +
                   "</td>" +
                   "</tr>";
    $.tmpl(template, data).appendTo("#minhas_solicitacoes tbody");
}

// ********** INCLUSÃO DE SOLICITAÇÃO **********

// Prepara o diálogo de nova solicitação.
function AbrirDialogoNovaSolicitacao() {
    $("#formulario_solicitacao").dialog("option", "title", "Nova solicitação");
    mensagem.text("Todos os campos são obrigatórios.").removeClass("ui-state-highlight");
    $("#formulario_solicitacao").dialog("option", "buttons", [
        {
            text: "Salvar",
            click: function () {
                var isValid = false;
                isValid = ValidarSolicitacao();
                if (isValid) {
                    IncluirSolicitacao();
                }
            }
        },{
            text: "Cancelar",
            click: function () {
                $("#formulario_solicitacao").dialog("close");
            }
        }
    ]);
    $("#formulario_solicitacao").dialog("open");
}

// Comanda a inclusão de uma nova solicitação.
function IncluirSolicitacao() {
    $("#carregando").show();
    var novaSolicitacao = { Descricao: $("#descricao").val(), ValorTotal: $("#valor_total").val() };
    var requestOptions = {
        requestUri: SERVICO_SOLICITACOES,
        method: "POST",
        data: novaSolicitacao
    };
    OData.request(requestOptions, SucessoAoIncluirSolicitacao, ErroAoIncluirSolicitacao);
}

// Lida com evento de sucesso ao incluir solicitação.
function SucessoAoIncluirSolicitacao(data, response) {
    $("#carregando").hide('slow');
    $("#formulario_solicitacao").dialog("close");
    ObterSolicitacoes();
}

// Lida com evento de erro ao incluir solicitação.
function ErroAoIncluirSolicitacao(error) {
    alert("Erro: " + error.message)
    $("#formulario_solicitacao").dialog("close");
}

// ********** ALTERAÇÃO DE SOLICITAÇÃO **********

// Prepara o diálogo de alteração de solicitação.
function AbrirDialogoAlteracaoSolicitacao(solicitacaoId) {
    $("#carregando").hide();
    var cells = $("#solicitacao_" + solicitacaoId).children("td");
    $("#descricao").val(cells.eq(1).text());
    $("#valor_total").val(cells.eq(2).text());
    $("#formulario_solicitacao").dialog("option", "title", "Atualizar solicitação");
    mensagem.text("Todos os campos são obrigatórios.").removeClass("ui-state-highlight");
    $("#formulario_solicitacao").dialog("option", "buttons", [
        {
            text: "Salvar",
            click: function () {
                var isValid = false;
                isValid = ValidarSolicitacao();
                if (isValid) {
                    AtualizarSolicitacao(solicitacaoId);
                }
            }
        },
        {
            text: "Cancelar",
            click: function () {
                $("#formulario_solicitacao").dialog("close");
            }
        }
    ]);
    $("#formulario_solicitacao").dialog("open");
}

// Comanda a atualização de uma solicitação.
function AtualizarSolicitacao(solicitacaoId) {
    $("#carregando").show();
    var dadosSolicitacao = { Descricao: $("#descricao").val(), ValorTotal: $("#valor_total").val(), Situacao: "AVALIANDO" };
    var requestOptions = {
        requestUri: SERVICO_SOLICITACOES + "(" + solicitacaoId + ")",
        method: "MERGE",  // http://msdn.microsoft.com/en-us/library/dd541276(v=PROT.10).aspx
        data: dadosSolicitacao
    };
    OData.request(requestOptions, SucessoAoAlterarSolicitacao, ErroAoAlterarSolicitacao);
}

// Lida com evento de sucesso ao alterar solicitação.
function SucessoAoAlterarSolicitacao(data, response) {
    $("#carregando").hide('slow');
    $("#formulario_solicitacao").dialog("close");
    ObterSolicitacoes();
}

// Lida com evento de erro ao alterar solicitação.
function ErroAoAlterarSolicitacao(error) {
    alert("Erro: " + error.message)
    $("#formulario_solicitacao").dialog("close");
}

// ********** VALIDAÇÃO **********

function ValidarSolicitacao() {
    var isValid = true;
    todosCampos.removeClass("ui-state-error");
    isValid = isValid && VerificarTamanho(descricao, "descrição", 10, 1000);
    isValid = isValid && VerificarTamanho(valor_total, "valor total", 1, 15);
    isValid = isValid && VerificarPadrao(valor_total, /^([0-9.])+$/, "O campo valor total somente aceita dígitos e ponto decimal.");
    return isValid;
}

function VerificarTamanho(o, n, min, max) {
    if (o.val().length > max || o.val().length < min) {
        o.addClass("ui-state-error");
        AtualizarMensagem("O tamanho do campo " + n + " deve estar entre " + min + " e " + max + ".");
        return false;
    }
    else {
        return true;
    }
}

function VerificarPadrao(o, regexp, n) {
    if (!(regexp.test(o.val()))) {
        o.addClass("ui-state-error");
        AtualizarMensagem(n);
        return false;
    }
    else {
        return true;
    }
}

function AtualizarMensagem(t) {
    mensagem
        .text(t)
        .addClass("ui-state-highlight");
    setTimeout(function () {
        mensagem.removeClass("ui-state-highlight"); 
    }, 1000);
}

// ********** EXCLUSÃO DE SOLICITAÇÃO **********

// Prepara o diálogo de exclusão de solicitação.
function AbrirDialogoExclusaoSolicitacao(solicitacaoId) 
{
    AbrirDialogoOperacaoSolicitacao('exclusão', solicitacaoId, 'Excluir', ExcluirSolicitacao);
}

// Comanda a exclusão da solicitação
function ExcluirSolicitacao(solicitacaoId) 
{
    var requestOptions = {
        requestUri: SERVICO_SOLICITACOES + "(" + solicitacaoId + ")",
        method: "DELETE"
    };
    OData.request(requestOptions, SucessoOperacaoSolicitacao, ErroOperacaoSolicitacao);
}

// ********** APROVAÇÃO DE SOLICITAÇÃO **********

// Prepara o diálogo de aprovação de solicitação.
function AbrirDialogoAprovacaoSolicitacao(solicitacaoId) {
    AbrirDialogoOperacaoSolicitacao('aprovação', solicitacaoId, 'Aprovar', AprovarSolicitacao);
}

// Comanda a aprovação da solicitação
function AprovarSolicitacao(solicitacaoId) {
    var dadosSolicitacao = { Situacao: "APROVADA" };
    var requestOptions = {
        requestUri: SERVICO_SOLICITACOES + "(" + solicitacaoId + ")",
        method: "MERGE",  // http://msdn.microsoft.com/en-us/library/dd541276(v=PROT.10).aspx
        data: dadosSolicitacao
    };
    OData.request(requestOptions, SucessoOperacaoSolicitacao, ErroOperacaoSolicitacao);
}

// ********** REJEIÇÃO DE SOLICITAÇÃO **********

// Prepara o diálogo de rejeição de solicitação.
function AbrirDialogoRejeicaoSolicitacao(solicitacaoId) {
    AbrirDialogoOperacaoSolicitacao('rejeição', solicitacaoId, 'Rejeitar', RejeitarSolicitacao);
}

// Comanda a rejeição da solicitação
function RejeitarSolicitacao(solicitacaoId) {
    var dadosSolicitacao = { Situacao: "REJEITADA" };
    var requestOptions = {
        requestUri: SERVICO_SOLICITACOES + "(" + solicitacaoId + ")",
        method: "MERGE",  // http://msdn.microsoft.com/en-us/library/dd541276(v=PROT.10).aspx
        data: dadosSolicitacao
    };
    OData.request(requestOptions, SucessoOperacaoSolicitacao, ErroOperacaoSolicitacao);
}

// ********** OPERAÇÃO GENÉRICA EM SOLICITAÇÃO **********

function AbrirDialogoOperacaoSolicitacao(nomeOperacao, solicitacaoId, nomeAcao, funcaoOperacao) {
    $("#carregando").hide();
    var cells = $("#solicitacao_" + solicitacaoId).children("td");
    dialogoExclusao = $('<div></div>')
	    .html('Confirma a ' + nomeOperacao + ' da solicitação "' + cells.eq(1).text() + '"?')
	    .dialog({
	        autoOpen: false,
	        width: 400,
	        modal: true,
	        buttons: [
                {
                    text: nomeAcao,
                    click: function () {
                        funcaoOperacao(solicitacaoId);
                    }
                }, {
                    text: "Cancelar",
                    click: function () {
                        $(this).dialog("close");
                    }
                }
	        ],
	        title: nomeAcao + ' solicitação'
	    });
    dialogoExclusao.dialog('open');
}

// Lida com evento de sucesso em operação na solicitação.
function SucessoOperacaoSolicitacao(data, response) {
    dialogoExclusao.dialog('close');
    ObterSolicitacoes();
}

// Lida com evento de erro em operação na solicitação.
function ErroOperacaoSolicitacao(error) {
    alert(error.message)
}
