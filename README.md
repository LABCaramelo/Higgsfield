# Higgsfield AI — Reconstructed Suite, Web Studio & MCP Server

Implementação limpa e completa do ecossistema **Higgsfield AI**, recriada e validada através de engenharia reversa com o **MCP REA** (*Reverse Engineer Anything*) e análise estática da plataforma oficial.

Inclui:
1. **Web Studio UI (`web/`)**: Plataforma web interativa inspirada em `https://higgsfield.ai` (Explore, Motions Presets, Video Studio, 5s Motion Engine, MCP Console).
2. **Servidor API (`src/api.py`)**: Backend FastAPI servindo a interface web e conectando aos endpoints oficiais.
3. **Servidor MCP (`src/mcp_server.py`)**: Model Context Protocol stdio universal (JSON-RPC 2.0) para Antigravity IDE, Claude Desktop, Cursor e Claude Code.
4. **SDK Python (`src/client.py`)**: Cliente resiliente com suporte a V1, V2, polling e uploads pré-assinados.
5. **Motor de Prompts Cinematográficos (`src/prompt_engine.py`)**: Motor clean-room de 5 segundos.
6. **CLI Terminal (`src/cli.py`)**: Interface de linha de comando compatível com o binário `hf`.

---

## 🎨 Como Iniciar a Plataforma Web Studio

Para rodar a plataforma completa localmente (Interface Web + API):

```bash
# Iniciar o servidor web completo em http://localhost:8000
python src/api.py
```

Acesse **`http://localhost:8000`** no seu navegador para usar o estúdio com:
- **Explore & Motions**: Explore e recrie em 1 clique os presets virais (Floating Fall, High Flip, Studio Slide).
- **Video Studio**: Controles completos para **Seedance 2.5**, **Kling 3.0**, **Veo 3.1**, proporções de tela e resoluções.
- **5s Motion Prompt Engine**: Construtor guiado passo-a-passo com física realista e sufixo canônico.
- **MCP Console**: Visualizador e gerador de configurações do servidor MCP para seu agente de IA.

---

## 🤖 Como Conectar o Servidor MCP no Antigravity / Claude

No arquivo de configuração do seu ambiente (`mcp_config.json` ou `claude_desktop_config.json`):

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

## 🛠️ Uso da Linha de Comando (CLI)

```bash
# Listar modelos de vídeo
python src/cli.py model list --video

# Gerar prompt de 5 segundos
python src/cli.py prompt-engine --subject "o turbilhão do relógio girando com precisão" --camera camera_push

# Gerar vídeo
python src/cli.py generate create seedance_2_5 --prompt "slow cinematic camera push-in towards the subject, natural and realistic motion"
```

---

## 📑 Documentação Técnica
Consulte o [Dossier de Engenharia Reversa (docs/RECONSTRUCTION_DOSSIER.md)](./docs/RECONSTRUCTION_DOSSIER.md) para detalhes sobre as evidências do MCP REA (`ev_584aa8aef5cbd481976a11e8e7237f25d1a3bbe8efd2d312d6e1d577387ebb79`), contratos de API e análise estática da aplicação web.
