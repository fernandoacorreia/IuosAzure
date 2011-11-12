var SERVICO_SOLICITACOES = "/IousAzure.Servico/WcfDataService1.svc/Solicitacoes";

//Page Load Actions
function OnPageLoad() {
    $("#dialog:ui-dialog").dialog("destroy");
    $("#formulario_solicitacao").dialog({
        autoOpen: false,
        height: 375,
        width: 450,
        modal: true,
        close: function () {
            allFields.val("").removeClass("ui-state-error");
        }
    });
    $("#criar_solicitacao").button()
        .click(AbrirDialogoCriarSolicitacao);
    $("#atualizar_solicitacoes").button()
        .click(ObterSolicitacoes);
    ObterSolicitacoes();
}

// Obter a lista de solicitações
function ObterSolicitacoes() {
    $("#carregando_solicitacoes").show();
    OData.read(SERVICO_SOLICITACOES, ObterSolicitacoesCallback);
}

// Callback de sucesso de ObterSolicitacoes
function ObterSolicitacoesCallback(data, request) {
    $("#carregando_solicitacoes").hide();
    $("#minhas_solicitacoes").find("tr:gt(0)").remove();
    AplicarTemplate(data.results);
}

// Monta template da lista de solicitações
function AplicarTemplate(data) {
    var template = "<tr id=\"solicitacao_${Id}\">" +
                   "<td>${Descricao}</td>" +
                   "<td>${ValorTotal}</td>" +
                   "<td>${Situacao}</td>" +
                   "<td>" +
                   "<a href=\"javascript:OpenUpdateDialog(${userid})\">Editar</a>" +
                   " " +
                   "<a href=\"javascript:OpenDeleteDialog(${userid})\">Excluir</a>" +
                   "</td>" +
                   "</tr>";
    $.tmpl(template, data).appendTo("#minhas_solicitacoes tbody");
}

//Handle Create User Account button click
function AbrirDialogoCriarSolicitacao() {
    $("#formulario_solicitacao").dialog("option", "title", "Nova solicitação");
    $("#formulario_solicitacao").dialog("option", "buttons", [
        {
            text: "Salvar",
            click: function () {
                var bValid = false;
                bValid = ValidarSolicitacao();
                if (bValid) {
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

function ValidarSolicitacao() {
}

function IncluirSolicitacao() {
}
