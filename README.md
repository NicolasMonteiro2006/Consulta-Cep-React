# Consulta de CEP - Aplicação React

## 🚀 Descrição

Este é um projeto de uma aplicação web desenvolvida com **React** para consultar informações de um **CEP** (Código de Endereçamento Postal) no Brasil. A aplicação permite o usuário digitar um CEP e obter detalhes como rua, bairro, cidade e estado. 

A API de consulta de CEP é consumida por meio de um servidor local (Node.js) que fornece as informações baseadas em um banco de dados JSON ou por integração com serviços públicos de consulta de CEP.

## 🛠️ Tecnologias Utilizadas

- **React**: Biblioteca para construção de interfaces de usuário.
- **Node.js**: Ambiente de execução JavaScript para o backend.
- **Express**: Framework para construção do servidor no backend.
- **JSON Server**: Banco de dados fictício em formato JSON para simular uma API RESTful.
- **CSS**: Estilos para o design da interface.

## 🔧 Instalação

### 1. Clonar o repositório

Clone o repositório para a sua máquina local:

git clone https://github.com/seu-usuario/consulta-cep.git
cd consulta-cep

### 2. Instalar as dependências

Primeiro, instale as dependências do **backend**:

cd backend
npm install

Depois, instale as dependências do **frontend**:

cd ../
npm install

### 3. Iniciar o servidor

Inicie o servidor local do **backend** (API):

cd backend
npm start

E depois, inicie o servidor de desenvolvimento do **React**:

cd ..
npm start

Agora você pode acessar a aplicação no navegador através de [http://localhost:3000](http://localhost:3000).


## 🤝 Contribuindo

1. Faça o **fork** do repositório.
2. Crie uma branch para sua feature: `git checkout -b minha-feature`.
3. Faça o commit das suas alterações: `git commit -m 'Adicionando nova feature'`.
4. Envie para o seu fork: `git push origin minha-feature`.
5. Abra um **pull request** para o repositório original.

## 🚧 Dificuldades Encontradas

Durante o desenvolvimento deste projeto, encontrei algumas dificuldades que foram superadas com o tempo e a ajuda de pesquisas. Aqui estão algumas delas:

1. **Integração entre frontend e backend**:
   - Inicialmente, tive dificuldades para configurar o backend (API) e fazer a comunicação com o frontend usando `fetch()`.
   - A solução foi revisar a documentação do **CORS** e garantir que a configuração no servidor estivesse correta para permitir as requisições.

2. **Validação do CEP**:
   - O desafio foi garantir que os CEPs inseridos no frontend fossem validados corretamente antes de serem enviados para o backend.
   - A solução foi implementar uma função no frontend para verificar o formato do CEP antes de realizar a consulta.

3. **Armazenamento dos dados localmente**:
   - O armazenamento dos dados de CEP no backend foi inicialmente um desafio, principalmente no que diz respeito ao uso do **JSON Server** e à persistência dos dados.
   - Após revisar a documentação do **JSON Server**, consegui configurar o arquivo `db.json` para armazenar os dados de forma eficiente.

4. **Exibição de erros**:
   - Durante as requisições de CEP, os erros não estavam sendo exibidos de forma clara no frontend.
   - A solução foi tratar as respostas de erro e implementar mensagens de feedback visual para o usuário.

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
