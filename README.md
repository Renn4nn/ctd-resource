# Turborepo starter

This Turborepo starter is maintained by the Turborepo core team.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo build

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo build
yarn dlx turbo build
pnpm exec turbo build
```

You can build a specific package by using a [filter](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters):

```
# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo build --filter=docs

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo build --filter=docs
yarn exec turbo build --filter=docs
pnpm exec turbo build --filter=docs
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev
yarn exec turbo dev
pnpm exec turbo dev
```

You can develop a specific package by using a [filter](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters):

```
# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev --filter=web

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev --filter=web
yarn exec turbo dev --filter=web
pnpm exec turbo dev --filter=web
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo login

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo login
yarn exec turbo login
pnpm exec turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
# With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended)
turbo link

# Without [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation), use your package manager
npx turbo link
yarn exec turbo link
pnpm exec turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.dev/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.dev/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.dev/docs/reference/configuration)
- [CLI Usage](https://turborepo.dev/docs/reference/command-line-reference)


## 🧠 O Tipo `vector`: Por que a dimensão importa?

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
