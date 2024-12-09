# Sistema de Gerenciamento de Pedidos

Este é um sistema de gerenciamento de pedidos desenvolvido com Ionic e Angular, utilizando o Firestore para persistência de dados. O sistema permite listar, adicionar e atualizar o status dos pedidos.

<strong>Desafio Técnico para Vaga de Desenvolvedor Fullstack na empresa Santi Soluções Tecnológicas.</strong>

## Funcionalidades

- **Listagem de Pedidos**: Exibe os pedidos divididos em três status: "Novo", "Em Andamento" e "Concluído".
- **Adicionar Pedido**: Permite adicionar novos pedidos com o nome do cliente e descrição (opcional). O status inicial é "Novo".
- **Atualizar Status**: Os pedidos podem ser arrastados entre colunas para atualizar o status, ou o status pode ser alterado por meio de um botão.
- **Persistência no Firestore**: Todos os dados dos pedidos são armazenados no Firestore.

## Como Rodar o Projeto

### Pré-requisitos

Antes de rodar o projeto, certifique-se de ter as seguintes ferramentas instaladas no seu sistema:

- Node.js (versão 14 ou superior)
- Ionic CLI (global)
- Conta no Firebase para criar um projeto e usar o Firestore.

### Passo 1: Criar uma Conta no Firebase

Se você ainda não tem uma conta no Firebase, siga estas etapas:

1. Acesse o [Firebase Console](https://console.firebase.google.com/).
2. Faça login com sua conta do Google ou crie uma nova conta.
3. Crie um novo projeto clicando em "Adicionar projeto".
4. Após criar o projeto, vá para o Firestore Database e crie uma coleção chamada `orders` para armazenar os dados dos pedidos.

### Passo 2: Clonar o Repositório

Clone o repositório para a sua máquina local:

```bash
git clone https://github.com/usuario/projeto-gerenciamento-pedidos.git
cd projeto-gerenciamento-pedidos
```

### Passo 3: Instalar Dependências

Instale as dependências do projeto usando o npm:

```bash
npm install
```
### Passo 4: Configurar o Firebase

Para rodar o projeto, você precisa configurar as credenciais do Firebase no seu projeto.

1. Crie um arquivo chamado `environment.ts` (para desenvolvimento) e `environment.prod.ts` (para produção) dentro da pasta `src/environments`.
2. Copie as credenciais do Firebase (API Key, Auth Domain, etc.) de seu projeto no Firebase Console e cole no arquivo.

Exemplo do conteúdo do arquivo `environment.example.ts`:

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_AUTH_DOMAIN",
    projectId: "SEU_PROJECT_ID",
    storageBucket: "SEU_STORAGE_BUCKET",
    messagingSenderId: "SEU_MESSAGING_SENDER_ID",
    appId: "SEU_APP_ID",
    measurementId: "SEU_MEASUREMENT_ID"
  }
};
```

**Nota**: Não envie as credenciais do Firebase para o GitHub. Utilize o arquivo `environment.example.ts` como exemplo, e crie seus próprios arquivos `environment.ts` e `environment.prod.ts` para proteger suas credenciais.

### Passo 5: Executar o Projeto

Agora, basta rodar o projeto localmente com o comando:

```bash
ionic serve
```

O aplicativo será iniciado e estará disponível em [http://localhost:8100](http://localhost:8100).

## Erro de Índice no Firestore

Se você encontrar o erro relacionado à falta de um índice no Firestore, como o exemplo abaixo:

```bash
FirebaseError: The query requires an index. You can create it here: https://console.firebase.google.com/v1/r/project/[SEU_PROJETO]/firestore/indexes?create_composite=...
```
Isso ocorre porque o Firestore precisa de um índice específico para realizar consultas compostas (como consultas com filtros múltiplos ou ordenação em mais de um campo).

## Como Resolver

1. Leia a mensagem de erro completa: Ela fornecerá um link para criar o índice necessário.

Exemplo de link fornecido pelo erro:

```bash
https://console.firebase.google.com/v1/r/project/[SEU_PROJETO]/firestore/indexes?create_composite=...
```

## Como Resolver (continuação)

1. **Clique no link**: O link o redirecionará para a página de índices do Firebase, onde você pode criar o índice necessário.

2. **Criação do índice**: Na página de índices, você verá a opção de criar o índice diretamente. Clique em "Criar Índice" e o Firestore gerenciará a criação do índice automaticamente.

3. **Verifique o código de consulta**: Caso o índice esteja relacionado a uma consulta complexa (por exemplo, usando filtros compostos ou ordenação), certifique-se de que sua consulta está estruturada corretamente e que a criação do índice é a única ação necessária.

Depois que o índice for criado, você poderá realizar consultas complexas no Firestore sem problemas.


## Estrutura Geral do Código

A estrutura do projeto é organizada da seguinte forma:

- **src/app**: Contém os arquivos principais da aplicação.
  - **components**: Componentes reutilizáveis.
  - **services**: Serviços de comunicação com o Firebase.
  - **pages**: Páginas que representam as telas do aplicativo (como a tela de pedidos).
  - **models**: Modelos de dados, como a interface `Pedido`.
- **src/environments**: Contém os arquivos `environment.ts` (desenvolvimento) e `environment.prod.ts` (produção) para configuração do Firebase.

## Desafios Encontrados

Durante o desenvolvimento deste sistema, alguns desafios encontrados foram:

- **Configuração do Firebase**: A integração inicial com o Firebase pode ser um pouco desafiadora, especialmente ao lidar com as credenciais e a configuração do Firestore.
- **Drag-and-Drop**: Implementar a funcionalidade de arrastar e soltar (drag-and-drop) para alterar o status dos pedidos foi uma parte interessante e que exigiu o uso do Angular CDK (Component Dev Kit).
- **Responsividade**: Garantir que o aplicativo fosse funcional em dispositivos móveis e desktop exigiu ajustes nas classes de layout e no design das telas.

## Tecnologias Utilizadas

- **Ionic**: Framework para construção de aplicativos móveis e web.
- **Angular**: Framework para desenvolvimento de aplicativos front-end.
- **Firestore**: Banco de dados em tempo real do Firebase para persistência de dados.
- **Angular CDK**: Biblioteca para funcionalidades de arrastar e soltar (drag-and-drop).

## Considerações Finais

Este projeto foi desenvolvido para atender aos requisitos especificados no desafio, com foco na funcionalidade e usabilidade. A integração com o Firestore permite que os dados sejam armazenados e acessados em tempo real, enquanto a interface foi otimizada para dispositivos móveis e desktop.

