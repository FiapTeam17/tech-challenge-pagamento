Feature: Cadastro de Produto
  Scenario Outline: Cadastro de novo Pagamento
    When é enviado <body> para "pagamentos/criar"
    Then status do retorno é <status>
    And a mensagem de retorno é <mensagem>
    And json com "status" PENDENTE é retornado se status 201
    Examples:
      | body                    | status | mensagem            |
      | '{}'                    | '400'  | 'Pedido não informado' |
      | '{"identificador":"123"}'    | '400'  | 'Valor não informado' |
      | '{"identificador":"123", "valorPedido": -1}'  | '400'  | 'Valor deve ser maior que zero' |
      | '{"identificador":"123", "valorPedido": 100}' | '201'  | '' |


