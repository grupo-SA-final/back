# Testes Backend

## Como cadastrar e executar tarefas de testes

### 1. Testes de Cenários (Gherkin)
Os arquivos `.feature` descrevem cenários de negócio e podem ser usados com ferramentas como Cucumber.js ou jest-cucumber.

### 2. Testes Unitários
Os testes unitários devem ser criados na pasta `testes` com o sufixo `.test.js` para cada controller/model principal.

### 3. Executando os testes

- Instale as dependências de teste:
  ```bash
  npm install --save-dev jest supertest
  ```
- Para rodar todos os testes unitários:
  ```bash
  npx jest testes
  ```
- Para rodar testes de integração (exemplo com supertest):
  ```bash
  npx jest testes/usuario.test.js
  ```
- Para rodar cenários Gherkin (opcional):
  ```bash
  npm install --save-dev @cucumber/cucumber
  npx cucumber-js testes/*.feature
  ```

--- 