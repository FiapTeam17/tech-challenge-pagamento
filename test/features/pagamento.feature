Feature: Cadastro de Produto
  Scenario Outline: Cadastro de novo Pagamento
    When é enviado <body> para "pagamentos/criar"
    Then status do retorno é <status>
    And a mensagem de retorno é <mensagem>

    Examples:
      | body                    | status | mensagem            |
      | '{}'                    | '400'  | 'Pedido não informado' |
      | '{"pedidoId":"123"}'    | '400'  | 'Valor não informado' |
      | '{"pedidoId":"123", "valorPedido": -1}' | '400'  | 'Valor deve ser maior que zero' |
      | '{"pedidoId":"123", "valorPedido": 100}' | '201'  | '' |


