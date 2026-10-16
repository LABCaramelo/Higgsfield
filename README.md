# Higgsfield AI — Reconstructed Suite & MCP Server

Implementação limpa e completa do ecossistema **Higgsfield AI**, recriada e validada através de engenharia reversa estática com o **MCP REA** (*Reverse Engineer Anything*).

Inclui o **Servidor MCP Oficial stdio** para conectar no Antigravity, Claude Code, Cursor ou Claude Desktop, SDK completo em Python, CLI compatível com `hf` e motor de prompts clean-room de 5 segundos.

---

## 🚀 Funcionalidades

- **Servidor MCP (`src/mcp_server.py`):**
  - `higgsfield_generate_video`: Geração cinematográfica via **Seedance 2.5**, **Seedance 2.0**, **Kling 3.0**, **Veo 3.1**, **Gemini Omni**.
  - `higgsfield_generate_image`: Imagens ultra-realistas via **Nano Banana Pro**, **GPT Image 2.5**, **FLUX.2**, **Soul V2**.
  - `higgsfield_build_motion_prompt`: Gerador de prompts de 5 segundos com coreografia de câmera (push, orbit, tracking, drone).
  - `higgsfield_virality_predictor`: Análise de retenção e pontuação de viralidade (Brain Activity).
  - `higgsfield_upload_media`: Upload de imagens/áudio/vídeo locais para o CDN Higgsfield via URL pré-assinada.
  - `higgsfield_get_status`: Consulta de status de jobs assíncronos.
  - `higgsfield_list_models`: Catálogo de mais de 40 modelos com restrições e padrões.

- **SDK Python (`src/client.py`):**
  - Suporte completo às APIs V1 e V2 com autenticação `Key <id>:<secret>`.
  - Polling assíncrono automático com backoff exponencial.
  - Upload direto para buckets de armazenamento com URLs pré-assinadas.

- **CLI (`src/cli.py`):**
  - Comandos equivalentes ao binário nativo `hf`.

---

## 📦 Configuração Rápida

### 1. Variáveis de Ambiente
Copie `.env.example` para `.env` ou configure no seu ambiente:

```bash
# Formato V2 / Unificado (Recomendado)
HF_CREDENTIALS="SEU_KEY_ID:SEU_KEY_SECRET"

# Ou formato V1
HF_API_KEY="SEU_KEY_ID"
HF_API_SECRET="SEU_KEY_SECRET"
```

### 2. Adicionar ao Antigravity / Claude Desktop (MCP)
No seu arquivo de configuração MCP (`mcp_config.json` ou `claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "higgsfield": {
      "command": "python",
      "args": [
        "d:/meus documentos/higgsfield/src/mcp_server.py"
      ],
      "env": {
        "HF_CREDENTIALS": "SEU_KEY_ID:SEU_KEY_SECRET"
      }
    }
  }
}
```

---

## 🛠️ Uso da CLI

```bash
# Listar modelos de vídeo
python src/cli.py model list --video

# Construir prompt cinematográfico de 5 segundos
python src/cli.py prompt-engine --subject "o turbilhão do relógio girando com precisão" --camera camera_push

# Gerar vídeo com Seedance 2.5
python src/cli.py generate create seedance_2_5 --prompt "drone shot over a misty canyon at sunrise, natural and realistic motion"
```

---

## 📑 Documentação Técnica
Consulte o [Dossier de Engenharia Reversa (docs/RECONSTRUCTION_DOSSIER.md)](./docs/RECONSTRUCTION_DOSSIER.md) para detalhes sobre as evidências do MCP REA (`ev_584aa8aef5cbd481976a11e8e7237f25d1a3bbe8efd2d312d6e1d577387ebb79`), contratos de API e análise estática do binário e pacotes.
