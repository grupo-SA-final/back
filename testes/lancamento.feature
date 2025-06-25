Feature: Gestão de Lançamento
  Como um usuário do sistema
  Quero gerenciar meus lançamentos financeiros
  Para controlar meus pagamentos e recebimentos

  Scenario: Cadastro de lançamento de recebimento com receita existente
    Given que informo todos os dados obrigatórios e uma receita existente
    When realizo o cadastro do lançamento do tipo recebimento
    Then o sistema deve criar o lançamento com sucesso

  Scenario: Cadastro de lançamento de pagamento com centro de custo existente
    Given que informo todos os dados obrigatórios e um centro de custo existente
    When realizo o cadastro do lançamento do tipo pagamento
    Then o sistema deve criar o lançamento com sucesso

  Scenario: Cadastro de lançamento com conta bancária inexistente
    Given que informo uma conta bancária inexistente
    When tento cadastrar um lançamento
    Then o sistema deve exibir uma mensagem de erro de conta bancária não encontrada

  Scenario: Cadastro de lançamento de recebimento sem receita
    Given que não informo uma receita para um lançamento do tipo recebimento
    When tento cadastrar o lançamento
    Then o sistema deve exibir uma mensagem de erro de receita obrigatória

  Scenario: Cadastro de lançamento de pagamento sem centro de custo
    Given que não informo um centro de custo para um lançamento do tipo pagamento
    When tento cadastrar o lançamento
    Then o sistema deve exibir uma mensagem de erro de centro de custo obrigatório

  Scenario: Atualização de lançamento existente
    Given que possuo um lançamento cadastrado
    When atualizo os dados do lançamento
    Then o sistema deve salvar as alterações

  Scenario: Atualização de lançamento inexistente
    Given que não existe lançamento com o id informado
    When tento atualizar o lançamento
    Then o sistema deve exibir uma mensagem de erro de lançamento não encontrado

  Scenario: Exclusão de lançamento existente
    Given que possuo um lançamento cadastrado
    When solicito a exclusão do lançamento
    Then o sistema deve remover o lançamento

  Scenario: Exclusão de lançamento inexistente
    Given que não existe lançamento com o id informado
    When tento excluir o lançamento
    Then o sistema deve exibir uma mensagem de erro de lançamento não encontrado

  Scenario: Listagem de lançamentos do usuário
    Given que estou autenticado
    When solicito a listagem de lançamentos
    Then o sistema deve retornar todos os lançamentos vinculados ao meu usuário 