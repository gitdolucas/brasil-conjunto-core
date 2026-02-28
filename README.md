# portal-core

**A constituicao do sistema.** Biblioteca compartilhada que define o dominio do negocio — tipos, schemas, migracoes, validacao e constantes. Tudo que os outros workspaces precisam concordar passa por aqui.

---

## Responsabilidade

Portal-core e o **contrato unico** entre todos os workspaces do monorepo. Ele define:

- **O que e um servico publico** (tipos TypeScript)
- **Como um servico deve ser validado** (schemas Zod)
- **Como o banco de dados e estruturado** (migracoes SQL)
- **Quais documentos existem** (constantes padronizadas)
- **Como normalizar texto** (funcoes utilitarias)

Se dois workspaces precisam concordar sobre a forma de um dado, a definicao vive aqui.

### O que portal-core FAZ

- Define interfaces TypeScript (`PublicService`, `DocumentRequired`, `CostItem`, `ServiceVariant`, etc.)
- Exporta schemas Zod para validacao em runtime
- Contem migracoes SQL para o Supabase/PostgreSQL
- Padroniza codigos de documentos (`CPF`, `RG`, `CRLV_VEICULO`, `LAUDO_MEDICO_DETRAN`, etc.)
- Fornece funcoes puras de normalizacao (slugify, sanitize, etc.)

### O que portal-core NAO FAZ

- Nao acessa banco de dados — define schemas, nao executa queries
- Nao tem dependencia de framework (sem Next.js, sem Playwright, sem AI SDK)
- Nao tem UI, componentes ou paginas
- Nao faz IO (sem HTTP, sem filesystem, sem crawling)

---

## Arquitetura Interna

```
packages/portal-core/
├── src/
│   ├── types/                  # Interfaces e tipos TypeScript
│   │   ├── service.ts          # PublicService, ServiceVariant, ServiceSummary
│   │   ├── document.ts         # DocumentRequired, DocumentType, DocumentWithLink
│   │   ├── cost.ts             # CostItem, CostType
│   │   ├── link.ts             # LinkItem
│   │   ├── draft.ts            # ServiceDraft, ServiceDraftStatus, ServiceDraftSource
│   │   ├── location.ts         # Location, LocationLevel
│   │   ├── agency.ts           # Agency
│   │   ├── report.ts           # Report, ReportStatus
│   │   ├── crawl.ts            # CrawlTarget, CrawlRun, CrawlJob
│   │   └── index.ts            # Re-exporta tudo
│   │
│   ├── schemas/                # Schemas Zod (validacao em runtime)
│   │   ├── service.schema.ts   # Valida PublicService
│   │   ├── document.schema.ts  # Valida DocumentRequired
│   │   ├── cost.schema.ts      # Valida CostItem
│   │   ├── draft.schema.ts     # Valida ServiceDraft
│   │   └── index.ts
│   │
│   ├── constants/              # Valores fixos e enums
│   │   ├── document-codes.ts   # CPF, RG, CRLV_VEICULO, LAUDO_MEDICO_DETRAN...
│   │   ├── levels.ts           # federal, estadual, municipal
│   │   ├── service-types.ts    # online, presencial, misto
│   │   ├── categories.ts       # Identificacao, Veiculo, Medico, Residencia...
│   │   └── index.ts
│   │
│   └── utils/                  # Funcoes puras utilitarias
│       ├── slugify.ts          # Gera slug a partir de nome
│       ├── sanitize.ts         # Limpa HTML, normaliza whitespace
│       ├── text.ts             # Remocao de acentos, lowercase, trim
│       ├── validation.ts       # Helpers de validacao (isValidUrl, isGovBr, etc.)
│       └── index.ts
│
├── migrations/                 # Migracoes SQL Supabase
│   ├── 001_create_locations.sql
│   ├── 002_create_agencies.sql
│   ├── 003_create_services.sql
│   ├── 004_create_documents.sql
│   ├── 005_create_reports.sql
│   ├── 006_create_crawl.sql
│   └── ...
│
├── package.json
├── tsconfig.json
└── README.md
```

### Principios de Organizacao

- **Um arquivo por tipo de entidade** — `service.ts` nao mistura com `document.ts`
- **Schemas espelham tipos** — para cada `types/service.ts` existe um `schemas/service.schema.ts`
- **Constantes sao exaustivas** — todos os codigos padrao documentados em um unico lugar
- **Utils sao funcoes puras** — sem side effects, sem IO, sem estado

---

## Integracoes

### Quem importa portal-core

```
portal-core
    ▲         ▲
    │         │
portal-collector    portal-da-pendencia
```

| Workspace | O que importa | Para que |
|-----------|--------------|---------|
| `portal-collector` | Types, Schemas, Constants, Utils | Validar dados extraidos contra o contrato. Usar codigos padrao de documentos. Normalizar texto antes de salvar. |
| `portal-da-pendencia` | Types, Constants | Tipar queries, tipar props de componentes, exibir nomes padrao de documentos. |

### Quem portal-core importa

**Ninguem.** Portal-core e a raiz da arvore de dependencias. Nao tem dependencias internas. Qualquer dependencia circular aqui quebra a arquitetura.

### Banco de dados

Portal-core **define** o schema (via migracoes SQL), mas **nao acessa** o banco. As migracoes sao executadas pelo Supabase CLI ou por scripts em `infra/`.

---

## Como Usar

### Instalacao (workspace)

No `package.json` de qualquer workspace:

```json
{
  "dependencies": {
    "@portal/core": "workspace:*"
  }
}
```

### Importar tipos

```typescript
import type { PublicService, DocumentRequired, CostItem } from "@portal/core/types";
```

### Validar dados

```typescript
import { serviceSchema } from "@portal/core/schemas";

const result = serviceSchema.safeParse(rawData);
if (!result.success) {
  console.error("Dados invalidos:", result.error);
}
```

### Usar constantes

```typescript
import { DOCUMENT_CODES, SERVICE_LEVELS } from "@portal/core/constants";

// DOCUMENT_CODES.CPF === "CPF"
// DOCUMENT_CODES.CRLV_VEICULO === "CRLV_VEICULO"
// SERVICE_LEVELS === ["federal", "estadual", "municipal"]
```

### Normalizar texto

```typescript
import { slugify, sanitizeHtml } from "@portal/core/utils";

slugify("Renovação de CNH — DETRAN-SC");
// → "renovacao-de-cnh-detran-sc"
```

---

## Rodar Migracoes

```bash
# Via Supabase CLI (local)
supabase db push --db-url $DATABASE_URL

# Via script de setup
pnpm --filter @portal/core db:migrate
```

---

## Testes

```bash
pnpm --filter @portal/core test
```

Testes cobrem:
- Schemas Zod aceitam dados validos e rejeitam invalidos
- Funcoes de normalizacao produzem output esperado
- Constantes sao exaustivas e sem duplicatas
- Slugify lida com acentos, caracteres especiais e edge cases

---

## Plano de Expansao

### Fase 1 — MVP (Agora)
- Tipos que espelham o schema atual do banco (`public_services`, `document_types`, etc.)
- Schemas Zod basicos para validacao
- Constantes de codigos de documentos
- Migracoes existentes migradas de `portal-da-pendencia/supabase/migrations/`

### Fase 2 — Modelo Hierarquico
- Adicionar tipos para `service_master` → `service_variants` (servico base + variacoes por localidade)
- Migracoes para reestruturar tabelas
- Schemas para validacao de variantes
- Tipo `Location` com hierarquia (pais → estado → municipio)

### Fase 3 — Versionamento
- Tipos para `service_versions` (snapshot historico)
- Tipos para `service_checks` (monitoramento)
- Schema de diff entre versoes

### Fase 4 — Pacote NPM Privado
- Publicar como `@portal/core` no registry privado
- Versionamento semantico (semver)
- Changelog automatico
- Usado por repos independentes apos separacao do monorepo

---

## Riscos e Mitigacoes

| Risco | Impacto | Mitigacao |
|-------|---------|----------|
| Mudanca no Core quebra Collector e App simultaneamente | Alto | Testes automaticos em CI para ambos workspaces quando Core muda. Nao mergear sem green build. |
| Schema diverge do banco real | Medio | Migracoes como unica fonte de verdade. Nunca alterar banco manualmente. |
| Tipos ficam desatualizados em relacao ao schema | Medio | Gerar tipos a partir do schema (ou manter sincronia via testes). |
| Over-engineering: Core vira monolito de utilidades | Baixo | Regra: so entra no Core se dois ou mais workspaces precisam. Se so um usa, fica local. |
| Constantes incompletas (documento novo nao cadastrado) | Baixo | Zod rejeita codigos desconhecidos. Falha ruidosa forca cadastro. |

---

## Regras de Ouro

1. **Se so um workspace precisa, nao vai pro Core.** Core e compartilhado, nao lixeira.
2. **Toda mudanca no Core exige testes nos consumidores.** CI deve rodar testes de Collector e App quando Core muda.
3. **Migracoes sao append-only.** Nunca editar uma migracao existente. Criar nova para corrigir.
4. **Tipos e schemas andam juntos.** Nao existe tipo sem schema correspondente.
5. **Zero dependencias de framework.** Core importa Zod e nada mais. Sem Next, sem Playwright, sem Supabase client.
