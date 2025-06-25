Feature: Gestão de Centro de Custo
  Como um usuário do sistema
  Quero gerenciar meus centros de custo
  Para organizar meus pagamentos

  Scenario: Cadastro de centro de custo com dados válidos
    Given que informo todos os dados obrigatórios corretamente
    When realizo o cadastro do centro de custo
    Then o sistema deve criar o centro de custo com sucesso

  Scenario: Cadastro de centro de custo com campos obrigatórios ausentes
    Given que deixo de informar campos obrigatórios
    When tento cadastrar o centro de custo
    Then o sistema deve exibir uma mensagem de erro de campos obrigatórios

  Scenario: Atualização de centro de custo existente
    Given que possuo um centro de custo cadastrado
    When atualizo os dados do centro de custo
    Then o sistema deve salvar as alterações

  Scenario: Atualização de centro de custo inexistente
    Given que não existe centro de custo com o id informado
    When tento atualizar o centro de custo
    Then o sistema deve exibir uma mensagem de erro de centro de custo não encontrado

  Scenario: Exclusão de centro de custo existente
    Given que possuo um centro de custo cadastrado
    When solicito a exclusão do centro de custo
    Then o sistema deve remover o centro de custo

  Scenario: Exclusão de centro de custo inexistente
    Given que não existe centro de custo com o id informado
    When tento excluir o centro de custo
    Then o sistema deve exibir uma mensagem de erro de centro de custo não encontrado

  Scenario: Listagem de centros de custo do usuário
    Given que estou autenticado
    When solicito a listagem de centros de custo
    Then o sistema deve retornar todos os centros de custo vinculados ao meu usuário 