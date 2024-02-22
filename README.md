# `FutLovers`

FutLovers é um projeto full stack que cria, edita, busca e remove jogadores.

A aplicação começou a ser inmplementada a partir no backend, onde foram usadas as tecnologias Nest.js + PrismaORM + MySQL.
Ao finalizar boa parte do backend inciei a criação do frontend integrando-o ao servidor, para isso utilizei Next.js + CSS MODULES + Sweet Alert 2 + React Icons.
Depois de finalizar o projeto implementei testes unitários para a camada service com Jest.

Funcionalidades criadas no backend:
- Criar jogador
- Editar jogador
- Remover Jogador
- Listar jogadores
- Buscar jogador pelo id
- Criar time
- Editar time
- Remover time
- Listar times
- Bucar time pelo id
- Relação de um para muitos entra as tabelas time e jogador

Funcionalidades criadas no frontend:
- Pagina '/' que lista jogadores 
    - Possui 1 botão 'ADD JOGADOR' que redireciona para o caminho '/jogadores/novo' onde é possível adicionar um novo jogador.
    - Possui 1 ícone que redireciona a página para a o caminho '/jogador/{id}' onde é possível editar o jogador.
    - Possui 1 ícone para remover o jogador. Antes de remover envia um alerta se tem certeza que deseja detela-lo.
- Pagina '/jogador/novo
    - Adiciona novo jogador
    - Possui 2 inputs e um dropdown para adicionar os dados
    - Possui um botão de Submit para enviar os dados recebidos
    - Ao salvar o jogador é acionado um alerta de sucesso
- Página '/jogador/{id}
    - Edita jogador
    - Possui um loader que espera receber os dados do jogador que será editado
    - Possui 2 inputs e um dropdown para adicionar os dados
    - Possui um botão de Submit para enviar os dados recebidos
    - Ao editar o jogador é acionado um alerta de sucesso




Como ver o projeto funcionando 
 
 * Passo 1 - clonar o repositório
   * Rodar o comando 'git clone git@github.com:amandamachadodev/futLovers.git' no seu terminal, em uma pasta onde você quiser que fique salvo o diretório do projeto.
 * Passo 2 - baixar as dependências do backend
   * Para isso é necessário estar o diretório raiz do backend /backend e rodar o comando 'npm i'
 * Passo 3 - baixar as depenências do frontend
   * Para isso é necessário estar o diretório raiz do frontend /frontend e rodar o comando 'npm i'
 * Passo 4 - criar um banco de dados mysql com o nome nestprismadb
 * Passo 5 - adicionar sua DATABASE_URL no arquivo .env
 * Passo 6 - rodar o backend
    * Para isso é necessário estar o diretório raiz do backend /backend e rodar o comando 'npm run start dev'
 * Passo 7 - rodar o frontend
   * Para isso é necessário estar o diretório raiz do frontend /frontend e rodar o comando 'npm run dev'
 * Passo 8 - Abrir a apricação no brower
   * Abrir a aplicação do browser com a url localhost:3001/

