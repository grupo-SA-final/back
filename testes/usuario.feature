Feature: Gestão de Usuário
  Como um usuário do sistema
  Quero gerenciar meu cadastro e autenticação
  Para acessar e proteger meus dados

  Scenario: Cadastro com dados válidos
    Given que informo todos os dados obrigatórios corretamente
    When realizo o cadastro
    Then o sistema deve criar o usuário com sucesso

  Scenario: Cadastro com email já existente
    Given que já existe um usuário com o email informado
    When tento cadastrar um novo usuário com o mesmo email
    Then o sistema deve exibir uma mensagem de erro de email já cadastrado

  Scenario: Cadastro com CPF inválido
    Given que informo um CPF inválido
    When tento realizar o cadastro
    Then o sistema deve exibir uma mensagem de erro de CPF inválido

  Scenario: Cadastro com campos obrigatórios ausentes
    Given que deixo de informar campos obrigatórios
    When tento realizar o cadastro
    Then o sistema deve exibir uma mensagem de erro de campos obrigatórios

  Scenario: Login com credenciais válidas
    Given que sou um usuário cadastrado
    When informo email e senha corretos
    Then devo ser autenticado com sucesso

  Scenario: Login com senha incorreta
    Given que sou um usuário cadastrado
    When informo o email correto e senha incorreta
    Then devo receber uma mensagem de erro de autenticação

  Scenario: Login com email não cadastrado
    Given que não existe usuário com o email informado
    When tento realizar login
    Then devo receber uma mensagem de erro de autenticação

  Scenario: Atualização de dados do usuário
    Given que estou autenticado
    When atualizo meus dados pessoais
    Then o sistema deve salvar as alterações

  Scenario: Alteração de senha com senha atual correta
    Given que estou autenticado e informo a senha atual correta
    When altero minha senha
    Then o sistema deve atualizar a senha com sucesso

  Scenario: Alteração de senha com senha atual incorreta
    Given que estou autenticado e informo a senha atual incorreta
    When tento alterar minha senha
    Then o sistema deve exibir uma mensagem de erro de senha atual incorreta

  Scenario: Exclusão de usuário existente
    Given que estou autenticado
    When solicito a exclusão da minha conta
    Then o sistema deve remover meu usuário

  Scenario: Exclusão de usuário inexistente
    Given que não existe usuário com o id informado
    When tento excluir o usuário
    Then o sistema deve exibir uma mensagem de erro de usuário não encontrado 