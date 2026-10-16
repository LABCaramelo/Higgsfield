# Dossier de Engenharia Reversa e Recriação: Higgsfield AI via MCP REA

**Data de Execução:** 15 de Outubro de 2026  
**Ambiente:** Windows x64 (NTFS)  
**Ferramentas Utilizadas:** MCP REA (Reverse Engineer Anything v6.4.0), Node.js, Python 3.14  
**Status de Reconstrução:** 100% Concluído e Validado (Backend, MCP e Plataforma Web Studio)

---

## 1. Origem e Descoberta de Alvos (Target Routing)

Durante o processo de sondagem e auditoria de alvos, localizamos e analisamos os artefatos oficiais do ecossistema Higgsfield:

1. **Binário Nativo CLI:** `hf.exe` (Windows PE x86_64, versão 1.1.26, 19.46 MB)
   - SHA-256: `0e973c9cf072ec27af8be61e374c8aba5842766bd21654e28dfa758605ca76da`
   - Procedência: GitHub Releases `higgsfield-ai/cli`
   - Registro em sessão REA via `open_binary`:
     ```json
     {
       "path": "D:\\meus documentos\\higgsfield\\hf.exe",
       "format": "pe",
       "kind": "executable",
       "architecture": "x86_64"
     }
     ```

2. **Aplicação JavaScript / SDK Oficial:** `@higgsfield/client` (v0.2.6)
   - SHA-256 do Container: `33e588610bfd1f0a6b3e8823947e29d8c17c7470375ebbd75258addcd546643a`
   - Submetido ao `analyze_javascript_application` do MCP REA.

3. **Plataforma Web Oficial:** `https://higgsfield.ai/`
   - Análise estática do DOM, sistema de design `quanta` (`data-theme="default-dark"`, `#030304`), tipografia (`Space Grotesk` + `Inter`), paleta oficial com acento laranja elétrico (`#FF5C00`), catálogo de movimentos e rotas de estúdio.

---

## 2. Evidências Registradas pelo MCP REA

A análise estática detalhada gerou os registros imutáveis no ledger de evidências:

- **Evidence ID Principal:** `ev_584aa8aef5cbd481976a11e8e7237f25d1a3bbe8efd2d312d6e1d577387ebb79`
- **Parent Evidence ID:** `ev_583e7d8746441a56f58ea333f3ce373ceeeb6ec5474b7364a34b27344f32ce57`
- **Métricas Extraídas:**
  - Arquivos JavaScript/TypeScript auditados: 42
  - Nodos de AST inspecionados: 10.971
  - Relações de fluxo de dados identificadas: 2.857
  - Relações de chamada recuperadas: 179
  - Findings de segurança e integridade: 312

---

## 3. Arquitetura e Protocolo Revertido

### 3.1. Endpoints Base
- **REST API:** `https://api.higgsfield.ai`
- **Hosted MCP Endpoint:** `https://mcp.higgsfield.ai/mcp`

### 3.2. Mecanismo de Autenticação
O Higgsfield aceita dois padrões de credenciais:
- **V2 / Agent API:**
  - Header: `Authorization: Key <KEY_ID>:<KEY_SECRET>`
- **V1 API:**
  - Headers: `hf-api-key: <KEY_ID>` e `hf-secret: <KEY_SECRET>`
- **Variáveis de Ambiente Mapeadas:**
  - `HF_CREDENTIALS` ou `HF_KEY` (no formato `<KEY_ID>:<KEY_SECRET>`)
  - `HF_API_KEY` e `HF_API_SECRET`

### 3.3. Header de Identificação (User-Agent Ofuscado)
No runtime oficial do Node, o cabeçalho é montado dinamicamente via `String.fromCharCode`:
- `User-Agent: higgsfield-server-js/2.0`

### 3.4. Ciclo de Vida de Geração e Polling
1. **Despacho:**
   `POST /subscribe/{model}` ou `POST /{model}`
   Corpo: `{ "prompt": "...", "aspect_ratio": "16:9", ... }`
   Retorno imediato: `{ "request_id": "<UUID>", "status": "queued" }`

2. **Polling de Status:**
   `GET /requests/{request_id}/status`
   Estados possíveis:
   - `queued` / `in_progress` → continua polling com backoff exponencial (2s → 10s)
   - `completed` → retorna `{ status: "completed", images: [{ url }], video: { url } }`
   - `nsfw` → aborta com flag de moderação
   - `failed` / `canceled` → erro com mensagem da API

3. **Upload de Mídia (Presigned Storage):**
   - V1: `POST /files/generate-upload-url` com `{ content_type }` → `upload_url`, `public_url`
   - Presigned `PUT` direto para o bucket S3/GCS
   - Retorno da URL pública para injeção no prompt/parâmetro de imagem.

---

## 4. Componentes Recriados

1. **`web/` (Web Studio UI):**
   - Interface web inspirada na plataforma original com tema obsidian `#030304` e acento `#FF5C00`.
   - Seções: Explore & Motions, Video Studio (Seedance 2.5), 5s Motion Engine e MCP Console.
   - Build de produção compilado em `web/dist`.
2. **`src/api.py`:** Servidor FastAPI servindo os endpoints REST e a aplicação web montada em `http://localhost:8000`.
3. **`src/mcp_server.py`:** Servidor MCP oficial stdio (JSON-RPC 2.0) completo, plugável diretamente no Claude, Antigravity, Cursor ou VS Code, expondo ferramentas de vídeo, imagem, upload, predição de viralidade e status.
4. **`src/client.py`:** Cliente Python robusto implementando V1, V2, upload presigned e polling resiliente.
5. **`src/prompt_engine.py`:** Motor limpo de engenharia de prompts de movimento de 5 segundos.
6. **`src/models_catalog.py`:** Especificações, restrições e valores padrão para mais de 40 modelos.
7. **`src/cli.py`:** CLI completo compatível com o executável original `hf`.
