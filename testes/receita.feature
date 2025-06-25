Feature: Gestão de Receita
  Como um usuário do sistema
  Quero gerenciar minhas receitas
  Para organizar meus recebimentos

  Scenario: Cadastro de receita com dados válidos
    Given que informo todos os dados obrigatórios corretamente
    When realizo o cadastro da receita
    Then o sistema deve criar a receita com sucesso

  Scenario: Cadastro de receita com campos obrigatórios ausentes
    Given que deixo de informar campos obrigatórios
    When tento cadastrar a receita
    Then o sistema deve exibir uma mensagem de erro de campos obrigatórios

  Scenario: Atualização de receita existente
    Given que possuo uma receita cadastrada
    When atualizo os dados da receita
    Then o sistema deve salvar as alterações

  Scenario: Atualização de receita inexistente
    Given que não existe receita com o id informado
    When tento atualizar a receita
    Then o sistema deve exibir uma mensagem de erro de receita não encontrada

  Scenario: Exclusão de receita existente
    Given que possuo uma receita cadastrada
    When solicito a exclusão da receita
    Then o sistema deve remover a receita

  Scenario: Exclusão de receita inexistente
    Given que não existe receita com o id informado
    When tento excluir a receita
    Then o sistema deve exibir uma mensagem de erro de receita não encontrada

  Scenario: Listagem de receitas do usuário
    Given que estou autenticado
    When solicito a listagem de receitas
    Then o sistema deve retornar todas as receitas vinculadas ao meu usuário 