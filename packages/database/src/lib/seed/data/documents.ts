import type { Prisma } from '../../../generated/prisma/client.js'

export const seedDocuments: Pick<Prisma.DocumentModel, 'title' | 'content'>[] =
	[
		{
			title: '📋 Guia de Documentação de Projetos | CTD',
			content: `
Para garantir a agilidade do time e a consistência técnica, toda aplicação deve possuir uma documentação baseada em três pilares complementares:

### 📄 README.md

Este arquivo deve residir na raiz do repositório. Sua estrutura deve ser clara o suficiente para que um novo desenvolvedor consiga configurar e executar o projeto em poucos minutos.

#### ✅ Tópicos obrigatórios:
- **🔍 Visão Geral**: Breve descrição do propósito do projeto e o problema que ele resolve.
- **🛠️ Stack Tecnológica**: Linguagens e versões (\`Node.js v20\`, \`Python 3.11\`, etc.), banco de dados e frameworks principais.
- **📦 Pré-requisitos**: Ferramentas necessárias (\`Docker\`, \`pnpm\`, \`nvm\`, \`chocolatey\`, etc.).
- **🔑 Variáveis de Ambiente**: Lista de chaves necessárias (ou indicação de um arquivo **.env.example**).
- **🚀 Instalação e Execução**: Comandos para instalar dependências, rodar as migrações do banco e iniciar o servidor.
- **🧪 Testes**: Instruções de como executar a suíte de testes unitários e de integração.

### 🏗️ C4 Model (Documentação de Arquitetura)

Utilizamos o C4 Model como padrão para diagramação, permitindo diferentes níveis de profundidade técnica. Deve-se armazenar esses diagrama junto ao repositório, em uma pasta chamada /docs.

Ele divide a visão em quatro níveis de abstração:
1. **🌐 Contexto (Sistema)**: Visão macro de como o sistema interage com usuários e sistemas externos.
2. **📦 Contêineres**: Detalha as unidades executáveis (ex: API, Frontend, Worker), como elas se comunicam (HTTP, Mensageria) e onde armazenam dados.
3. **🧩 Componentes (Opcional)**: Decomposição de um contêiner em partes menores.
4. **💻 Código (Opcional)**: Diagramas de classe para lógicas de negócio extremamente complexas.

> ⚠️ **É obrigatória a presença dos níveis 1 e 2**. Eles garantem que qualquer colaborador entenda a composição e o fluxo de dados da aplicação rapidamente.

🔗 [Documentação oficial do C4 Model](https://c4model.com/)

### OpenAPI/Swagger (Documentação de API)

Para aplicações que expõem endpoints, utilizamos o padrão do mercado que é o OpenAPI 3.0.

- **🔄 Manutenção**: Garanta que a documentação reflita sempre o estado atual do código.
- **🤖 Automação**: Utilize bibliotecas (ex: \`swagger-jsdoc\`, \`drf-spectacular\`, \`swashbuckle\`) que geram o JSON/YAML automaticamente a partir das rotas e tipos.
- **📝 Exemplos**: Sempre forneça exemplos reais de *payloads* de requisição e as possíveis respostas de erro (4xx, 5xx).
`
		},
		{
			title: 'Guia do Desenvolvedor (CTD)',
			content: `Este guia existe para padronizar o ambiente e deixar o onboarding previsível.

## O que você vai encontrar aqui

- Como preparar o ambiente local
- Como o monorepo está organizado
- Fluxos do dia a dia (dev, build, checks, banco)
- Links oficiais e comandos úteis

## Como este conteúdo está organizado

- Cada documento aqui é um “guia” mais completo
- O conteúdo é Markdown
- Use este material como checklist durante o setup

## Checklist rápido (primeiro dia)

\`\`\`bash
pnpm install
pnpm db:generate
pnpm dev
\`\`\`

Se algo falhar, volte no guia “Ambiente Local e Monorepo”.`
		},
		{
			title: 'Ambiente Local e Monorepo (Node + PNPM + Turbo)',
			content: `## Pré-requisitos

- Node.js (recomendado >= 18)
- PNPM (o repo declara \`pnpm@9\`)

## Node.js (runtime)

Node é usado para:

- Rodar apps e APIs
- Executar scripts (build, lint, migrations)
- Tooling do monorepo

Download:

- https://nodejs.org/en/download

## PNPM (dependências)

Principais razões para PNPM:

- Workspaces/monorepo nativos
- Instalações mais rápidas
- Lockfile que padroniza versões

Docs:

- https://pnpm.io/motivation

## Workspaces (estrutura do repo)

O repositório usa workspaces (\`pnpm-workspace.yaml\`) com:

- \`apps/*\`
- \`packages/*\`

## Turborepo (tarefas)

O Turborepo orquestra tasks como \`dev\`, \`build\`, \`lint\`, \`check-types\`.

Exemplos comuns:

\`\`\`bash
pnpm dev
pnpm build
pnpm lint
pnpm check-types
\`\`\`

## Rodando um app específico

Quando precisar focar em um pacote/app, use filtro do PNPM:

\`\`\`bash
pnpm --filter <nome-do-pacote> dev
\`\`\`

## Problemas comuns (checklist)

- Node antigo: atualize e reinstale dependências
- \`pnpm\` não encontrado: instale e confirme \`pnpm -v\`
- Cache/estado estranho: rode \`pnpm install\` novamente`
		},
		{
			title: 'Git, Pull Requests e Commits',
			content: `## Git (controle de versão)

Git resolve:

- Histórico e rollback seguro
- Trabalho paralelo (branches)
- Merge e resolução de conflito

Download/Docs:

- https://git-scm.com/install/
- https://git-scm.com/docs

## Colaboração (GitHub)

GitHub é usado para:

- Pull Requests
- Revisão de código
- Discussão e rastreabilidade

- https://docs.github.com/pt

## Boas práticas de branch/PR

- Branch pequena e focada (uma intenção)
- PR cedo (mesmo como draft), para feedback rápido
- Descrição objetiva: o que mudou + por quê
- Se quebrou algo, explique o impacto e como testar

## Padrão de commits

O mais importante é consistência.

O repo possui um comando para ajudar a criar commits:

\`\`\`bash
pnpm commit
\`\`\`

Dica: mantenha mensagens curtas e descritivas, e evite “update”, “fix stuff”.`
		},
		{
			title: 'Qualidade e Padrões de Código (Biome + TypeScript)',
			content: `## Objetivo

Qualidade aqui significa:

- Código legível e consistente
- Menos bugs em produção
- Mudanças mais seguras (refactor com confiança)

## Biome (lint + format)

O Biome centraliza o tooling do projeto:

- Formatter (padroniza estilo)
- Linter (aponta problemas)
- Organize imports

Configuração:

- \`biome.json\`

Comandos comuns:

\`\`\`bash
pnpm format
pnpm lint
\`\`\`

Docs:

- https://biomejs.dev/pt-br/guides/getting-started/

## TypeScript (linguagem base)

Benefícios práticos:

- Erros aparecem mais cedo (compile-time)
- Refatoração mais segura
- Melhor auto-complete e contratos entre módulos

Checagem de tipos:

\`\`\`bash
pnpm check-types
\`\`\`

Docs:

- https://www.typescriptlang.org/docs/`
		},
		{
			title: 'Infraestrutura e Dados (Docker + PostgreSQL + Prisma)',
			content: `## Docker (padronização de ambiente)

Docker ajuda a evitar:

- “na minha máquina funciona”
- setups manuais longos
- diferenças de versão entre dev/test/prod

Docs:

- https://docs.docker.com/get-started/

## PostgreSQL (banco de dados)

PostgreSQL é o banco relacional usado no projeto.

Exemplo (docker):

\`\`\`bash
docker run ^
  -p 5432:5432 ^
  -v /tmp/database:/var/lib/postgresql/data ^
  -e POSTGRES_PASSWORD=1234 ^
  -d postgres:alpine3.23
\`\`\`

Docs:

- https://github.com/docker-library/docs/blob/master/postgres/README.md

## Prisma (ORM e migrations)

O Prisma mantém:

- \`schema.prisma\` como fonte de verdade dos modelos
- Migrations versionadas
- Prisma Client gerado com tipagem

Fluxo recomendado quando mudar o schema:

\`\`\`bash
pnpm db:migrate
pnpm db:generate
pnpm db:seed
\`\`\`

Prisma Studio:

\`\`\`bash
pnpm --filter @repo/database exec prisma studio
\`\`\`

Link:

- https://docs.nestjs.com/recipes/prisma#set-up-prisma`
		},
		{
			title: 'Front-end (Web + Mobile)',
			content: `## Web (Next.js)

Next.js é o framework React para web, com foco em:

- Rotas por arquivos
- Renderização híbrida (SSR/SSG/CSR)
- Otimizações de performance

Docs:

- https://nextjs.org/docs

Boas práticas gerais:

- Prefira componentes pequenos e reutilizáveis
- Evite acoplamento entre UI e regras de negócio
- Use TypeScript para contratos claros entre camadas

## Mobile (Expo Router)

Expo Router aplica roteamento por arquivos no mobile.

Ideia central:

- \`app/\` define rotas
- Arquivo vira tela
- Pasta vira grupo

Exemplo:

\`\`\`text
app/
  index.tsx
  login.tsx
  dashboard/index.tsx
\`\`\`

Docs:

- https://docs.expo.dev/router/introduction/`
		},
		{
			title: 'Back-end e APIs (Nest + Swagger)',
			content: `## Nest.js (arquitetura)

Nest é modular por padrão.

Componentes:

- Module: agrupa o domínio
- Controller: rotas HTTP
- Service: regra de negócio

Exemplo:

\`\`\`text
users/
  users.controller.ts
  users.service.ts
  users.module.ts
\`\`\`

Docs:

- https://docs.nestjs.com/

## Swagger (documentação de API)

Swagger (OpenAPI) gera documentação interativa a partir do código.

Acesso (quando a API estiver rodando):

- \`http://localhost:3000/api\`

Docs:

- https://docs.nestjs.com/openapi/introduction`
		}
	]
