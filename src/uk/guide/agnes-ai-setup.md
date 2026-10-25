# Налаштування AI Agent: Agnes AI, ChatGPT, Gemini, Claude, Qwen, Z.ai та локальні моделі

XMCL має вбудованого розумного помічника — **AI Agent**, здатного аналізувати краш-логи в 1 клік, знаходити несумісні модифікації, допомагати з конфігураціями гри та автоматизувати рутинні завдання в лаунчері.

Архітектура агента побудована на стандартному протоколі **OpenAI Chat Completions API** (`/v1/chat/completions`). Це дозволяє підключати як безкоштовну вбудовану модель **Agnes AI**, так і будь-яких популярних хмарних провайдерів (OpenAI, Gemini, Claude, Qwen, Z.ai) або **локальні нейромережі на вашому комп'ютері** (Ollama, LM Studio) для повної конфіденційності без доступу до інтернету.

::: info Окремі посібники для різних моделей:
* [Хмарні моделі (ChatGPT, Gemini, Claude, Qwen, Z.ai)](./ai-cloud-models)
* [Локальні моделі без інтернету (Ollama, LM Studio)](./ai-local-models)
:::

---

## ⚡ Швидкий старт: Вбудована модель Agnes AI

Agnes AI — це партнерський інтелектуальний сервіс, оптимізований для Minecraft.

::: tip Agnes AI безкоштовний
**Agnes AI повністю безкоштовний.** Достатньо отримати безкоштовний API key — банківська картка чи платна підписка не потрібні.
:::

1. Зареєструйтесь на порталі [Agnes AI](https://agnes-ai.com/) та згенеруйте ваш безкоштовний **API Key**.
2. Відкрийте в XMCL **Налаштування (Settings)** -> **Загальні (General)**.
3. Увімкніть перемикач **Режим розробника (Developer Mode)**.
4. У секції **AI Agent** вкажіть:
   - **API Key**: ваш скопійований ключ.
   - **Model**: залиште порожнім (або вкажіть `agnes`).
   - **Endpoint**: залиште порожнім (або `https://apihub.agnes-ai.com/v1/chat/completions`).

![Налаштування AI Agent в XMCL](general-setting.webp)

---

## 🌐 Підключення хмарних моделей (Gemini, ChatGPT, Claude, Qwen, Z.ai)

Ви можете використовувати власні акаунти та ключі будь-якого великого провайдера нейромереж:

### 1. Google Gemini (Рекомендовано: безкоштовний ліміт від Google)
Google надає безкоштовний доступ до швидких моделей Gemini через свій OpenAI-сумісний інтерфейс:
* **Де отримати ключ**: [Google AI Studio](https://aistudio.google.com/) (кнопка *Get API key*).
* **Endpoint**: `https://generativelanguage.googleapis.com/v1beta/openai/chat/completions`
* **Model**: `gemini-2.5-flash` або `gemini-1.5-pro`
* **API Key**: ваш ключ Gemini (`AIzaSy...`)

### 2. OpenAI (ChatGPT)
* **Де отримати ключ**: [OpenAI Platform API Keys](https://platform.openai.com/api-keys).
* **Endpoint**: `https://api.openai.com/v1/chat/completions`
* **Model**: `gpt-4o-mini` (швидка та економна) або `gpt-4o`
* **API Key**: ваш ключ OpenAI (`sk-...`)

### 3. Anthropic Claude (через шлюз OpenRouter або LiteLLM)
Оскільки офіційний API Anthropic використовує власний формат повідомлень, для підключення Claude до OpenAI-сумісного клієнта XMCL найкраще скористатися шлюзом, наприклад OpenRouter:
* **Де отримати ключ**: [OpenRouter](https://openrouter.ai/).
* **Endpoint**: `https://openrouter.ai/api/v1/chat/completions`
* **Model**: `anthropic/claude-3.5-sonnet` або `anthropic/claude-3-haiku`
* **API Key**: ключ OpenRouter (`sk-or-...`)

### 4. Alibaba Qwen (Tongyi Qianwen / DashScope)
Потужні двомовні моделі від Alibaba Cloud:
* **Де отримати ключ**: [Alibaba Cloud DashScope Console](https://dashscope.console.aliyun.com/).
* **Endpoint**: `https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions`
* **Model**: `qwen-plus`, `qwen-turbo` або `qwen-max`
* **API Key**: ваш ключ DashScope

### 5. Z.ai / Zhipu AI (GLM-4)
* **Де отримати ключ**: [Zhipu AI BigModel Open Platform](https://open.bigmodel.cn/).
* **Endpoint**: `https://open.bigmodel.cn/api/paas/v4/chat/completions`
* **Model**: `glm-4-flash` (безкоштовна версія) або `glm-4-plus`
* **API Key**: ваш ключ платформи Zhipu

---

## 🖥 Підключення локальних моделей (Ollama, LM Studio)

Якщо ви бажаєте повну приватність, незалежність від інтернету або не хочете витрачати кошти на API-запити, ви можете запустити локальну нейромережу прямо на своїй відеокарті.

### Варіант А: Через Ollama (Найпростіший спосіб)

1. Завантажте та встановіть [Ollama](https://ollama.com/).
2. Відкрийте термінал і завантажте бажану модель, наприклад:
   ```bash
   ollama run llama3.2
   # або чудову модель для коду та інструкцій:
   ollama run qwen2.5:7b
   ```
3. У налаштуваннях XMCL (**Settings -> General -> AI Agent**) вкажіть:
   - **Endpoint**: `http://localhost:11434/v1/chat/completions`
   - **Model**: `llama3.2` (або назву тієї моделі, яку ви завантажили в Ollama).
   - **API Key**: вкажіть будь-яке слово, наприклад `ollama` (локальний сервер не перевіряє ключ, але XMCL потребує заповненого поля).

### Варіант Б: Через LM Studio

1. Завантажте [LM Studio](https://lmstudio.ai/) та завантажте будь-яку модель GGUF.
2. Перейдіть на вкладку **Developer / Local Server** у LM Studio та натисніть **Start Server** (за замовчуванням запускається на порту `1234`).
3. У налаштуваннях XMCL вкажіть:
   - **Endpoint**: `http://localhost:1234/v1/chat/completions`
   - **Model**: вкажіть ідентифікатор моделі з LM Studio.
   - **API Key**: `lm-studio`

---

## 🔒 Безпека та зберігання API ключів

XMCL дбає про безпеку ваших персональних даних:
* **Апаратне шифрування**: усі введені вами API ключі шифруються системними засобами операційної системи (Windows DPAPI, macOS Keychain, Linux Secret Service).
* **Ізоляція від діагностичних звітів**: API ключі ніколи не потрапляють у лог-файли, не додаються до ZIP-репортів і не передаються на сервери XMCL.
* **Пряме з'єднання**: усі запити до обраної нейромережі надсилаються безпосередньо з вашого комп'ютера до вказаного Endpoint без проміжних проксі-серверів лаунчера.

---

## 🚀 Як користуватися AI Агентом

Після збереження налаштувань перевірте роботу помічника:

1. **Гаряча клавіша**: натисніть `Ctrl + Shift + A` (або `Cmd + Shift + A` на macOS) у будь-якому місці лаунчера, щоб відкрити панель асистента.
2. **Аналіз крашів**: якщо гра раптово закрилася з помилкою, у вікні сповіщення з'явиться кнопка **Аналізувати через AI** — агент самостійно прочитає краш-лог, вкаже на конфліктний мод і запропонує рішення.
3. **Керування конфігами та модами**: ви можете писати асистенту запити природною мовою, наприклад:
   - *"Чому вилітає гра при вході в світ?"*
   - *"Знайди мод на оптимізацію для Fabric 1.20.1"*
   - *"Вимкни моди, які конфліктують із Sodium"*

---

## ❓ Поширені проблеми

* **Помилка `401 Unauthorized`**: перевірте, чи правильно скопійовано API key (без пробілів на початку або в кінці).
* **Помилка `404 Not Found`**: переконайтеся, що в полі Endpoint адреса закінчується на `/v1/chat/completions` (наприклад, `http://localhost:11434/v1/chat/completions`).
* **Помилка підключення (Connection Refused)**: для локальних моделей переконайтеся, що Ollama або LM Studio запущені та працюють у фоновому режимі.
* **Агент не з'являється**: переконайтеся, що увімкнено **Developer Mode** у розділі **Settings -> General**.
