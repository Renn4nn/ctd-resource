# 📝 Visão Geral

Este projeto é a aplicação central de Documentação e Onboarding da CTD. Ele foi concebido para ser a **"fonte única da verdade"** para o time de desenvolvimento, consolidando guias, padrões arquiteturais e manuais de ferramentas em um único local acessível e interativo.

### 🤖 Assistente de IA com `RAG`

O diferencial estratégico deste projeto é o seu Assistente de IA Inteligente. Diferente de chatbots genéricos, ele utiliza a técnica de `RAG` (**Retrieval-Augmented Generation**) para dar resposta mais acertivas pois baseia-se no conhecimento disponível no banco de dados.

- **Recuperação (Retrieval)**: O sistema busca trechos de documentação relevantes no banco de dados vetorial (`pgvector`).
- **Aumentação (Augmented)**: O contexto é enviado ao modelo de linguagem via `Langflow`.
- **Geração (Generation)**: A IA responde baseada nos manuais da CTD, garantindo precisão e evitando alucinações.

### 🏎️ Gerenciamento de Monorepo (`Turborepo`)

Para gerenciar a complexidade de múltiplos projetos (Web, Api e Packages) em um único repositório, utilizamos o `Turborepo`. Ele é o motor que orquestra nossos scripts e builds.

#### Por que o Turbo?

- **Pipeline Inteligente**: Ele entende as dependências entre os projetos. Se você alterar apenas o Back-end, o Turbo sabe que não precisa re-testar o Mobile.
- **Remote Caching**: O Turbo armazena o cache dos builds e testes. Se um colega (ou o CI/CD) já rodou um build, você pode baixar o resultado pronto em vez de compilar tudo do zero.
- **Execução em Paralelo**: Ele roda tarefas simultâneas de forma otimizada, aproveitando todos os núcleos do seu processador.

### 🏗️ Filosofia do Projeto

- **Isolamento**: Ninguém precisa instalar o banco de dados ou o ambiente de IA localmente; o `Docker` cuida disso.
- **Consistência**: O `Biome` garante que o código tenha a mesma "cara", e o `Husky` impede commits fora do padrão.
- **Autonomia**: Com o assistente `RAG`, o desenvolvedor tem suporte 24/7 para tirar dúvidas sobre o ambiente de trabalho sem depender de outro colega.

### 🛠️ Stack Tecnológica

#### Inteligência Artificial & Dados

- **Orquestração de IA**: `Langflow` (Design e gestão dos fluxos de agentes).
- **Vector Database:** `pgvector` (Extensão do `PostgreSQL` para busca semântica).
- **ORM: Prisma** (Gerenciamento de banco de dados e tipos).

#### Core & Infra

- **Monorepo Tooling**: `Turborepo` (Orquestração de builds e pipelines).
- **Ambiente**: `Node.js` (**v25.3.0**) — Gerenciado via `.nvmrc`.
- **Gerenciador de Pacotes**: `pnpm` (Links simbólicos para economia de disco).
- **Containers**: `Docker` (`PostgreSQL` + `pgvector`).

#### Aplicações

- **Web**: `Next.js` (Framework `React`).
- **Api**: `NestJS` (Arquitetura modular e escalável).

# 🧠 O Tipo `vector`: Por que a dimensão importa?

O campo de embedding não é apenas uma coluna de dados comum; ele armazena a identidade semântica do seu conteúdo em um espaço multidimensional. No `PostgreSQL`, através da extensão `pgvector`, definir explicitamente o tamanho desse vetor (ex: **vector(n)**) é uma prática fundamental por três pilares principais:

#### 🚀 1. Performance e Indexação (O Fator Crítico)

Para que a busca por similaridade seja eficiente em larga escala, o uso de índices especializados como `HNSW` ou `IVFFlat` é obrigatório.

- **Estrutura Matemática**: O `pgvector` exige dimensões fixas para construir esses índices. O algoritmo organiza os vetores como pontos em um gráfico complexo; se a dimensão não é definida, o banco não consegue mapear esse espaço.
- **Busca Inteligente vs. Busca Bruta**: Sem um índice (que depende do tamanho fixo), o banco é forçado a realizar um *Sequential Scan*. Isso significa que ele calculará a distância entre sua busca e cada registro da tabela, tornando a aplicação inviável conforme o volume de dados cresce.

#### 🛡️ 2. Integridade e Consistência dos Dados

Diferente de um campo de texto flexível, operações matemáticas entre vetores exigem que ambos tenham o mesmo comprimento.

- **Validação Nativa**: Ao definir **vector(n)**, o `PostgreSQL` atua como um "guardião", impedindo que vetores corrompidos ou de modelos diferentes sejam inseridos acidentalmente.
- **Segurança em Runtime**: Isso evita erros de execução em tempo de busca (*mismatch errors*), garantindo que todos os dados na coluna sigam o mesmo padrão geométrico.

#### 📦 3. Otimização de Armazenamento e I/O

Saber o tamanho exato permite que o motor do banco de dados otimize a alocação de páginas de memória e o armazenamento em disco.

- **Eficiência de Baixo Nível**: O banco consegue prever o payload exato de cada registro, melhorando a velocidade de leitura e escrita (I/O) e otimizando o cache de memória.

### ⚠️ Acoplamento com o Modelo de IA

É importante notar que o tamanho do vetor é intrinsecamente ligado ao modelo de *embedding* escolhido, veja alguns exemplos de modelos abaixo:

| Modelo                         | Provedor       | Dimensão (Size) |
|--------------------------------|----------------|-----------------|
| granite-embedding-multilingual | IBM / Local    | 768             |
| text-embedding-3-small         | OpenAI         | 1536            |
| nomic-embed-text               | Nomic / Ollama | 768             |

> **Nota de Arquitetura**: Como os vetores de modelos diferentes não são compatíveis entre si, qualquer troca de modelo de IA exigirá uma nova migration no banco e a re-geração (re-indexação) de todos os embeddings existentes.
