Feature: Gestão de Conta Bancária
  Como um usuário do sistema
  Quero gerenciar minhas contas bancárias
  Para controlar meus saldos e movimentações

  Scenario: Cadastro de conta bancária com dados válidos
    Given que informo todos os dados obrigatórios corretamente
    When realizo o cadastro da conta bancária
    Then o sistema deve criar a conta bancária com sucesso

  Scenario: Cadastro de conta bancária com campos obrigatórios ausentes
    Given que deixo de informar campos obrigatórios
    When tento cadastrar a conta bancária
    Then o sistema deve exibir uma mensagem de erro de campos obrigatórios

  Scenario: Atualização de conta bancária existente
    Given que possuo uma conta bancária cadastrada
    When atualizo os dados da conta bancária
    Then o sistema deve salvar as alterações

  Scenario: Atualização de conta bancária inexistente
    Given que não existe conta bancária com o id informado
    When tento atualizar a conta bancária
    Then o sistema deve exibir uma mensagem de erro de conta bancária não encontrada

  Scenario: Exclusão de conta bancária existente
    Given que possuo uma conta bancária cadastrada
    When solicito a exclusão da conta bancária
    Then o sistema deve remover a conta bancária

  Scenario: Exclusão de conta bancária inexistente
    Given que não existe conta bancária com o id informado
    When tento excluir a conta bancária
    Then o sistema deve exibir uma mensagem de erro de conta bancária não encontrada

  Scenario: Listagem de contas bancárias do usuário
    Given que estou autenticado
    When solicito a listagem de contas bancárias
    Then o sistema deve retornar todas as contas bancárias vinculadas ao meu usuário 