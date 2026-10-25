# AI Assistant Configuration: Agnes AI, ChatGPT, Gemini, Claude, Qwen, Z.ai & Local Models

XMCL comes with a built-in intelligent companion — the **AI Agent**, capable of analyzing crash dumps with one click, identifying incompatible mods, reviewing game configs, and automating everyday launcher workflows.

The agent engine is architected around the standard **OpenAI Chat Completions API protocol** (`/v1/chat/completions`). This means you can plug in the free built-in **Agnes AI** model, any major commercial cloud provider (OpenAI, Google Gemini, Anthropic Claude, Alibaba Qwen, Zhipu Z.ai), or **offline local LLMs running on your own computer** (Ollama, LM Studio) for total data privacy.

::: info Dedicated Guides for Other Models:
* [Cloud Models (ChatGPT, Gemini, Claude, Qwen, Z.ai)](./ai-cloud-models)
* [Local Offline Models (Ollama, LM Studio)](./ai-local-models)
:::

---

## ⚡ Quick Start: Built-in Agnes AI Model

Agnes AI is a dedicated intelligent gaming service partnered with XMCL and optimized for Minecraft troubleshooting.

::: tip Agnes AI is Free
**Agnes AI is completely free to use.** You only need to register and generate a free API key — no credit card, billing, or subscription required.
:::

1. Sign up on the [Agnes AI Portal](https://agnes-ai.com/) and copy your free **API Key**.
2. In XMCL, navigate to **Settings** -> **General**.
3. Toggle on **Developer Mode**.
4. In the **AI Agent** section, configure:
   - **API Key**: Paste your Agnes key.
   - **Model**: Leave blank (or enter `agnes`).
   - **Endpoint**: Leave blank (defaults to `https://apihub.agnes-ai.com/v1/chat/completions`).

![AI Agent settings in XMCL](general-setting.webp)

---

## 🌐 Connecting Cloud Providers (Gemini, ChatGPT, Claude, Qwen, Z.ai)

You can bring your own API keys from any supported model provider:

### 1. Google Gemini (Recommended: Generous Free Tier)
Google provides free and high-speed API access to Gemini models via their OpenAI-compatible endpoint:
* **Where to get key**: [Google AI Studio](https://aistudio.google.com/) (*Get API key* button).
* **Endpoint**: `https://generativelanguage.googleapis.com/v1beta/openai/chat/completions`
* **Model**: `gemini-2.5-flash` or `gemini-1.5-pro`
* **API Key**: Your Gemini key (`AIzaSy...`)

### 2. OpenAI (ChatGPT)
* **Where to get key**: [OpenAI Platform API Keys](https://platform.openai.com/api-keys).
* **Endpoint**: `https://api.openai.com/v1/chat/completions`
* **Model**: `gpt-4o-mini` (fast and cost-effective) or `gpt-4o`
* **API Key**: Your OpenAI API key (`sk-...`)

### 3. Anthropic Claude (via OpenRouter or LiteLLM gateway)
Because Anthropic's native API uses a proprietary schema, connect Claude to XMCL's standard OpenAI client using an OpenAI-compatible gateway such as OpenRouter:
* **Where to get key**: [OpenRouter](https://openrouter.ai/).
* **Endpoint**: `https://openrouter.ai/api/v1/chat/completions`
* **Model**: `anthropic/claude-3.5-sonnet` or `anthropic/claude-3-haiku`
* **API Key**: Your OpenRouter API key (`sk-or-...`)

### 4. Alibaba Qwen (Tongyi Qianwen / DashScope)
High-performance models provided by Alibaba Cloud:
* **Where to get key**: [Alibaba Cloud DashScope Console](https://dashscope.console.aliyun.com/).
* **Endpoint**: `https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions`
* **Model**: `qwen-plus`, `qwen-turbo`, or `qwen-max`
* **API Key**: Your DashScope API key

### 5. Z.ai / Zhipu AI (GLM-4)
* **Where to get key**: [Zhipu AI BigModel Open Platform](https://open.bigmodel.cn/).
* **Endpoint**: `https://open.bigmodel.cn/api/paas/v4/chat/completions`
* **Model**: `glm-4-flash` (free tier) or `glm-4-plus`
* **API Key**: Your BigModel API key

---

## 🖥 Connecting Local Models (Ollama, LM Studio)

If you require 100% offline privacy, zero API costs, and no third-party data transmission, you can run a local model on your GPU or CPU.

### Option A: Via Ollama (Easiest & Recommended)

1. Download and install [Ollama](https://ollama.com/).
2. Open a terminal and pull your desired model:
   ```bash
   ollama run llama3.2
   # or an instruction & coding model:
   ollama run qwen2.5:7b
   ```
3. In XMCL settings (**Settings -> General -> AI Agent**), fill in:
   - **Endpoint**: `http://localhost:11434/v1/chat/completions`
   - **Model**: `llama3.2` (or the exact model tag pulled in Ollama).
   - **API Key**: Any dummy string like `ollama` (Ollama ignores authentication, but XMCL requires a placeholder).

### Option B: Via LM Studio

1. Download [LM Studio](https://lmstudio.ai/) and download any GGUF model.
2. Navigate to the **Developer / Local Server** tab in LM Studio and click **Start Server** (runs on port `1234` by default).
3. In XMCL settings, configure:
   - **Endpoint**: `http://localhost:1234/v1/chat/completions`
   - **Model**: The model identifier loaded in LM Studio.
   - **API Key**: `lm-studio`

---

## 🔒 Secret Storage & API Key Security

* **OS Hardware Encryption**: XMCL stores all entered API keys in your system's secure credential vault (Windows DPAPI / Credential Manager, macOS Keychain, Linux Secret Service).
* **Excluded from Reports**: API keys are isolated and **never included** in launcher crash dumps, log files, or diagnostic ZIP archives.
* **Direct Connections**: All requests are dispatched directly from your machine to the configured endpoint without any intermediary proxy servers.

---

## 🚀 Using the AI Assistant

Once configured, you can take advantage of the assistant:

1. **Hotkey**: Press `Ctrl + Shift + A` (`Cmd + Shift + A` on macOS) anywhere in XMCL to toggle the agent drawer.
2. **One-Click Crash Analysis**: When Minecraft exits unexpectedly with an error, the crash dialog will display an **Analyze with AI** button. The agent reads the crash trace, identifies conflicting mods, and suggests fixes.
3. **Natural Language Commands**: Ask questions directly:
   - *"Why did Minecraft crash when joining my server?"*
   - *"Find optimization mods for Fabric 1.20.1"*
   - *"Disable mods incompatible with Sodium"*

---

## ❓ Common Issues & Troubleshooting

* **`401 Unauthorized`**: Verify that your API key is correctly copied without leading or trailing whitespace.
* **`404 Not Found`**: Ensure the Endpoint URL ends with `/v1/chat/completions` (e.g. `http://localhost:11434/v1/chat/completions`).
* **Connection Refused**: For local setups, verify that Ollama or LM Studio is running in the background.
* **Agent Not Visible**: Confirm that **Developer Mode** is toggled ON under **Settings -> General**.
