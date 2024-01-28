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

  Scenario Outline: Confirmo Pagamento
    Given "pagamentos/criar" já cadastrados com os dados:
      | identificador | valorPedido |
      | 123           | 100         |
    When é enviado <body> para "pagamentos/confirmar"
    Then status do retorno é <status>
    And a mensagem de retorno é <mensagem>
    And json com "status" <situacao> é retornado se status 201
    Examples:
      | body                    | status | mensagem               | situacao |
      | '{}'                    | '400'  | 'Pagamento não encontrado' | '' |
      | '{"identificador": 321}' | '400' | 'Pagamento não encontrado' | '' |
      | '{"identificador": 123}' | '400' | 'Status inválido' | '' |
      | '{"identificador": 123, "status": "NOVO"}'      | '400' | 'Status inválido' | '' |
      | '{"identificador": 123, "status": "PAGO"}'      | '201' | '' | 'PAGO' |
      | '{"identificador": 123, "status": "CANCELADO"}' | '201' | '' | 'CANCELADO' |
      | '{"identificador": 123, "status": "REJEITADO"}' | '201' | '' | 'REJEITADO' |

