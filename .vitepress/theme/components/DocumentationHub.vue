<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useData } from 'vitepress'
import { openSearchModal } from '../composables/useSearchModal'

const { lang } = useData()
const isMac = ref(false)

onMounted(() => {
  isMac.value = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)
})

const isUk = computed(() => (lang.value || 'en').toLowerCase().startsWith('uk'))
const currentLocale = computed(() => lang.value || 'en')

const kicker = computed(() => isUk.value ? 'Офіційний хаб документації' : 'Official Documentation')
const title = computed(() => isUk.value ? 'Центр документації XMCL' : 'XMCL Documentation Hub')
const subtitle = computed(() => 
  isUk.value 
    ? 'Все про встановлення, налаштування модів, мережеву гру, вирішення проблем та архітектуру ядра лаунчера.' 
    : 'Everything you need to install, manage mods, play multiplayer, troubleshoot, and explore the launcher architecture.'
)
const searchPlaceholder = computed(() => 
  isUk.value ? 'Пошук у всій документації (натисніть або Ctrl+K)...' : 'Search all documentation (click or Ctrl+K)...'
)

const quickChips = computed(() => {
  const loc = currentLocale.value
  if (isUk.value) {
    return [
      { text: '📥 Встановлення', link: `/${loc}/guide/install` },
      { text: '⚙️ Forge & Fabric', link: `/${loc}/guide/modloader` },
      { text: '🤝 XMCL Together', link: `/${loc}/guide/together` },
      { text: '📡 Мережа P2P', link: `/${loc}/guide/p2p` },
      { text: '🎨 Скіни & CSS', link: `/${loc}/guide/appearance` },
      { text: '⚡ Core Document', link: '/en/core/' },
      { text: '🛠️ Вирішення проблем', link: `/${loc}/guide/troubleshooting` },
    ]
  }
  return [
    { text: '📥 Installation', link: `/${loc}/guide/install` },
    { text: '⚙️ Modloaders', link: `/${loc}/guide/modloader` },
    { text: '🤝 Together', link: `/${loc}/guide/together` },
    { text: '📡 P2P LAN', link: `/${loc}/guide/p2p` },
    { text: '🎨 Skins & CSS', link: `/${loc}/guide/appearance` },
    { text: '⚡ Core Document', link: '/en/core/' },
    { text: '🛠️ Troubleshooting', link: `/${loc}/guide/troubleshooting` },
  ]
})

interface DocItem {
  title: string
  desc: string
  link: string
  badge?: string
}

interface DocBlock {
  id: string
  number: string
  kicker: string
  title: string
  desc: string
  icon: string
  accentColor: string
  items: DocItem[]
}

const blocks = computed<DocBlock[]>(() => {
  const loc = currentLocale.value
  if (isUk.value) {
    return [
      {
        id: 'getting-started',
        number: '01',
        kicker: 'ОСНОВИ',
        title: 'Початок роботи',
        desc: 'Швидкий старт з XMCL: встановлення на Windows, macOS та Linux, вхід Microsoft, офлайн-режим та перенесення даних.',
        icon: '🚀',
        accentColor: '#c9f85a',
        items: [
          {
            title: 'Інструкція з встановлення',
            desc: 'Windows (Installer/Portable), macOS, Linux (Flathub, AppImage) та Steam Deck',
            link: `/${loc}/guide/install`,
            badge: 'Важливо',
          },
          {
            title: 'Оновлення XMCL',
            desc: 'Автоматичне оновлення версій та ручне встановлення нових релізів',
            link: `/${loc}/guide/update`,
          },
          {
            title: 'Гра без ліцензії (Офлайн-режим)',
            desc: 'Створення офлайн-профілів та гра без акаунта Microsoft',
            link: `/${loc}/guide/offline-mode`,
          },
          {
            title: 'Проблеми зі входом через Microsoft',
            desc: 'Розмежування Bedrock vs Java, виправлення помилок ліцензії та авторизації',
            link: `/${loc}/guide/microsoft-login-issues`,
          },
          {
            title: 'Переміщення XMCL на інший диск',
            desc: 'Як перенести дані гри та лаунчера і звільнити місце на системному диску C:',
            link: `/${loc}/guide/change-drive`,
          },
          {
            title: 'Міграція AppX',
            desc: 'Безпечний перехід зі старого формату пакунків Windows Store без втрати файлів',
            link: `/${loc}/guide/appx-migrate`,
          },
        ],
      },
      {
        id: 'game-mods',
        number: '02',
        kicker: 'КОНФІГУРАЦІЯ',
        title: 'Керування грою та моди',
        desc: 'Завантажувачі Forge, Fabric, NeoForge, кастомізація UI, теми, власні скіни та розумний помічник Agnes AI.',
        icon: '🎮',
        accentColor: '#4ade80',
        items: [
          {
            title: 'Що таке завантажувач модів',
            desc: 'Порівняння та встановлення Forge, Fabric, Quilt, NeoForge та OptiFine',
            link: `/${loc}/guide/modloader`,
            badge: 'Моди',
          },
          {
            title: 'Налаштування вигляду та CSS',
            desc: 'Зміна тем оформлення, фонових зображень, прозорості та кастомних CSS-стилів',
            link: `/${loc}/guide/appearance`,
          },
          {
            title: 'Посібник з кастомних скінів',
            desc: 'Безкоштовна інтеграція скінів та плащів через Ely.by та LittleSkin',
            link: `/${loc}/guide/custom-skins`,
          },
          {
            title: 'Налаштування Agnes AI',
            desc: 'Підключення розумного AI-помічника прямо всередині вашого лаунчера',
            link: `/${loc}/guide/agnes-ai-setup`,
          },
          {
            title: 'Управління даними та сховищем',
            desc: 'Як XMCL організовує інстанси, ізоляцію модів та сховище файлів',
            link: `/${loc}/guide/manage`,
          },
          {
            title: 'Minecraft Bedrock Edition',
            desc: 'Підтримка та запуск Bedrock видання поруч із версіями Java',
            link: `/${loc}/guide/bedrock`,
          },
        ],
      },
      {
        id: 'multiplayer',
        number: '03',
        kicker: 'МУЛЬТИПЛЕЄР',
        title: 'Спільна гра та діагностика',
        desc: 'Грайте з друзями онлайн без білого IP, налаштовуйте пряме P2P підключення та виправляйте будь-які збої або краші.',
        icon: '🌐',
        accentColor: '#38bdf8',
        items: [
          {
            title: 'XMCL Together: Хмарний мультиплеєр',
            desc: 'Швидка спільна гра з друзями в 1 клік, оренда серверів та налаштування кімнат',
            link: `/${loc}/guide/together`,
            badge: 'Together',
          },
          {
            title: 'Посібник з мережевої гри P2P (LAN)',
            desc: 'Безкоштовне пряме з’єднання гравців без публічної IP-адреси та сторонніх програм',
            link: `/${loc}/guide/p2p`,
          },
          {
            title: 'Вирішення проблем із запуском та збоями',
            desc: 'Аналіз краш-логів, вирішення несумісності Java, драйверів відеокарти та модів',
            link: `/${loc}/guide/troubleshooting`,
            badge: 'Діагностика',
          },
        ],
      },
      {
        id: 'architecture-core',
        number: '04',
        kicker: 'ЯДРО ТА РОЗРОБКА',
        title: 'Базова документація ядра та розробка',
        desc: 'Офіційна технічна документація ядра лаунчера (Core Document), відкриті мережеві протоколи та участь у розробці.',
        icon: '🛠️',
        accentColor: '#f59e0b',
        items: [
          {
            title: 'Core Document (Документація ядра лаунчера)',
            desc: 'Повний API довідник модулів ядра @xmcl/core: завантаження, автентифікація, запуск',
            link: '/en/core/',
            badge: 'Ядро API',
          },
          {
            title: 'Специфікація P2P протоколів',
            desc: 'Технічний опис децентралізованих протоколів передачі даних та з’єднання',
            link: `/${loc}/protocol/p2p`,
          },
          {
            title: 'Посібник розробника (Contributing)',
            desc: 'Як налаштувати оточення розробки, запустити лаунчер з коду та створити Pull Request',
            link: `/${loc}/guide/contributing`,
          },
          {
            title: 'Локалізація та переклад (i18n)',
            desc: 'Додавання та вдосконалення перекладів лаунчера вашою рідною мовою',
            link: `/${loc}/guide/i18n`,
          },
        ],
      },
    ]
  }

  // English fallback
  return [
    {
      id: 'getting-started',
      number: '01',
      kicker: 'ESSENTIALS',
      title: 'Getting Started',
      desc: 'Quick start with XMCL: installation across Windows, macOS and Linux, Microsoft login, offline mode, and data migration.',
      icon: '🚀',
      accentColor: '#c9f85a',
      items: [
        {
          title: 'Installation Guide',
          desc: 'Windows (Installer/Portable), macOS, Linux (Flathub, AppImage) & Steam Deck',
          link: `/${loc}/guide/install`,
          badge: 'Essential',
        },
        {
          title: 'Update Guide',
          desc: 'Automatic version updates and manual release installations',
          link: `/${loc}/guide/update`,
        },
        {
          title: 'Playing Without a License (Offline Mode)',
          desc: 'Creating offline profiles and playing without a Microsoft account',
          link: `/${loc}/guide/offline-mode`,
        },
        {
          title: 'Microsoft Login & License Issues',
          desc: 'Bedrock vs Java distinction, account authorization and license troubleshooting',
          link: `/${loc}/guide/microsoft-login-issues`,
        },
        {
          title: 'How to Move XMCL to Another Drive',
          desc: 'Transfer game files and launcher data away from the C: drive',
          link: `/${loc}/guide/change-drive`,
        },
        {
          title: 'AppX Migration',
          desc: 'Migrate smoothly from older Windows Store packages without losing data',
          link: `/${loc}/guide/appx-migrate`,
        },
      ],
    },
    {
      id: 'game-mods',
      number: '02',
      kicker: 'CONFIGURATION',
      title: 'Game Management & Mods',
      desc: 'Modloaders (Forge, Fabric, NeoForge), UI themes, custom CSS, Ely.by skins, and built-in Agnes AI assistant.',
      icon: '🎮',
      accentColor: '#4ade80',
      items: [
        {
          title: 'Modloaders: Forge, Fabric, Quilt, NeoForge',
          desc: 'Understanding modloaders, version compatibility, and installation choices',
          link: `/${loc}/guide/modloader`,
          badge: 'Mods',
        },
        {
          title: 'Appearance & Custom CSS Guide',
          desc: 'Themes, background images, transparency, and tailored CSS styles',
          link: `/${loc}/guide/appearance`,
        },
        {
          title: 'Custom Skins Guide (Ely.by / LittleSkin)',
          desc: 'Setting up custom skins and cloaks with alternative skin systems',
          link: `/${loc}/guide/custom-skins`,
        },
        {
          title: 'Agnes AI Setup',
          desc: 'Configuring the local intelligent AI assistant inside XMCL',
          link: `/${loc}/guide/agnes-ai-setup`,
        },
        {
          title: 'Data & Storage Management',
          desc: 'How XMCL stores data, manages instances, and keeps resources clean',
          link: `/${loc}/guide/manage`,
        },
        {
          title: 'Minecraft Bedrock Edition Guide',
          desc: 'Running and configuring Bedrock edition alongside Java profiles',
          link: `/${loc}/guide/bedrock`,
        },
      ],
    },
    {
      id: 'multiplayer',
      number: '03',
      kicker: 'MULTIPLAYER',
      title: 'Multiplayer & Diagnostics',
      desc: 'Play with friends online without a public IP, configure direct P2P connections, and diagnose crashes effectively.',
      icon: '🌐',
      accentColor: '#38bdf8',
      items: [
        {
          title: 'XMCL Together: Cloud Multiplayer',
          desc: 'Instant 1-click cloud multiplayer, server hosting, and session management',
          link: `/${loc}/guide/together`,
          badge: 'Together',
        },
        {
          title: 'Minecraft LAN Multiplayer (P2P)',
          desc: 'Direct peer-to-peer connection without port forwarding or third-party tools',
          link: `/${loc}/guide/p2p`,
        },
        {
          title: 'Troubleshooting Installation & Launch Issues',
          desc: 'Analyze crash logs, solve Java version mismatches, and fix launch errors',
          link: `/${loc}/guide/troubleshooting`,
          badge: 'Diagnostics',
        },
      ],
    },
    {
      id: 'architecture-core',
      number: '04',
      kicker: 'CORE & DEV',
      title: 'Core Architecture & Development',
      desc: 'Official technical core documentation (Core Document), network protocols, data formats, and contributing guide.',
      icon: '🛠️',
      accentColor: '#f59e0b',
      items: [
        {
          title: 'Core Document (Launcher Core Docs)',
          desc: 'Full API documentation for @xmcl/core: downloads, auth, launch lifecycle',
          link: '/en/core/',
          badge: 'Core API',
        },
        {
          title: 'P2P Online Protocols Explained',
          desc: 'Technical specification of peer-to-peer communication and signaling protocols',
          link: `/${loc}/protocol/p2p`,
        },
        {
          title: 'Contributing to XMCL',
          desc: 'How to set up the dev environment, build locally, and submit Pull Requests',
          link: `/${loc}/guide/contributing`,
        },
        {
          title: 'Getting Started with Localization (i18n)',
          desc: 'Translate the launcher UI and documentation into your native language',
          link: `/${loc}/guide/i18n`,
        },
      ],
    },
  ]
})
</script>

<template>
  <div class="doc-hub-container">
    <!-- Header Hero Section -->
    <header class="doc-hub-hero">
      <div class="doc-hub-kicker-wrap">
        <span class="doc-hub-kicker">{{ kicker }}</span>
        <span class="doc-hub-pill">v0.56+</span>
      </div>
      <h1 class="doc-hub-title">{{ title }}</h1>
      <p class="doc-hub-subtitle">{{ subtitle }}</p>

      <!-- Prominent Interactive Search Bar -->
      <div class="doc-hub-search-container">
        <button
          type="button"
          class="doc-hub-search-trigger"
          :aria-label="searchPlaceholder"
          @click="openSearchModal"
        >
          <div class="doc-hub-search-left">
            <svg
              class="doc-hub-search-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span class="doc-hub-search-text">{{ searchPlaceholder }}</span>
          </div>
          <div class="doc-hub-search-keys" aria-hidden="true">
            <kbd class="hub-key">{{ isMac ? '⌘' : 'Ctrl' }}</kbd>
            <kbd class="hub-key">K</kbd>
          </div>
        </button>

        <!-- Quick suggestion chips -->
        <div class="doc-hub-quick-chips">
          <span class="chips-label">{{ isUk ? 'Швидкий перехід:' : 'Quick links:' }}</span>
          <div class="chips-list">
            <a
              v-for="chip in quickChips"
              :key="chip.text"
              :href="chip.link"
              class="chip-item"
            >
              {{ chip.text }}
            </a>
          </div>
        </div>
      </div>
    </header>

    <!-- The 4 Core Documentation Blocks -->
    <main class="doc-hub-grid">
      <article
        v-for="block in blocks"
        :id="block.id"
        :key="block.id"
        class="doc-block-card"
      >
        <!-- Block Card Header -->
        <header class="block-card-header">
          <div class="block-header-top">
            <div class="block-icon-badge" :style="{ borderColor: block.accentColor }">
              <span class="block-icon" aria-hidden="true">{{ block.icon }}</span>
            </div>
            <div class="block-meta">
              <span class="block-number">{{ block.number }}</span>
              <span class="block-kicker">{{ block.kicker }}</span>
            </div>
          </div>
          <h2 class="block-title">{{ block.title }}</h2>
          <p class="block-desc">{{ block.desc }}</p>
        </header>

        <!-- Block Sub-Articles List -->
        <ul class="block-articles-list">
          <li
            v-for="item in block.items"
            :key="item.title"
            class="article-item-wrap"
          >
            <a :href="item.link" class="article-link">
              <div class="article-link-content">
                <div class="article-title-row">
                  <span class="article-title">{{ item.title }}</span>
                  <span v-if="item.badge" class="article-badge">{{ item.badge }}</span>
                </div>
                <p class="article-desc">{{ item.desc }}</p>
              </div>
              <span class="article-arrow" aria-hidden="true">→</span>
            </a>
          </li>
        </ul>

        <!-- Block Footer Quick Jump -->
        <footer class="block-card-footer">
          <a :href="block.items[0]?.link" class="block-footer-btn">
            <span>{{ isUk ? 'Переглянути розділ' : 'Explore section' }}</span>
            <span aria-hidden="true">→</span>
          </a>
        </footer>
      </article>
    </main>

    <!-- Community & Contribution Section -->
    <footer class="doc-hub-bottom">
      <div class="help-card">
        <div class="help-content">
          <div class="help-icon">💡</div>
          <div>
            <h3>{{ isUk ? 'Потрібна додаткова допомога?' : 'Need additional help?' }}</h3>
            <p>
              {{
                isUk
                  ? 'Приєднуйтесь до нашого дружнього Discord-ком’юніті, запитуйте поради у розробників та спільноти.'
                  : 'Join our welcoming Discord community to ask questions, discuss issues, and connect with devs.'
              }}
            </p>
          </div>
        </div>
        <a
          href="https://discord.gg/W5XVwYY7GQ"
          target="_blank"
          rel="noopener noreferrer"
          class="help-btn discord-btn"
        >
          {{ isUk ? 'Спільнота в Discord' : 'Join Discord' }}
        </a>
      </div>

      <div class="help-card">
        <div class="help-content">
          <div class="help-icon">📝</div>
          <div>
            <h3>{{ isUk ? 'Допомогти вдосконалити документацію' : 'Contribute to Documentation' }}</h3>
            <p>
              {{
                isUk
                  ? 'Помітили помилку або хочете додати новий посібник? Створіть Pull Request на GitHub!'
                  : 'Found a typo or want to write a new tutorial? Open a Pull Request on GitHub!'
              }}
            </p>
          </div>
        </div>
        <a
          href="https://github.com/voxelum/xmcl-page"
          target="_blank"
          rel="noopener noreferrer"
          class="help-btn github-btn"
        >
          {{ isUk ? 'Репозиторій на GitHub' : 'GitHub Repository' }}
        </a>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.doc-hub-container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px 24px 80px;
  box-sizing: border-box;
}

/* Hero Section */
.doc-hub-hero {
  text-align: center;
  max-width: 860px;
  margin: 0 auto 48px;
  padding-top: 16px;
}

.doc-hub-kicker-wrap {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.doc-hub-kicker {
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--xmcl-lime, #c9f85a);
}

.doc-hub-pill {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  background-color: var(--xmcl-soft, rgba(201, 248, 90, 0.1));
  border: 1px solid var(--xmcl-line, #334139);
  border-radius: 9999px;
  color: var(--xmcl-muted, #9aa9a1);
}

.doc-hub-title {
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.025em;
  color: var(--xmcl-ink, #edf3ed);
  margin-bottom: 16px;
}

.doc-hub-subtitle {
  font-size: clamp(16px, 2vw, 18px);
  line-height: 1.6;
  color: var(--xmcl-muted, #9aa9a1);
  margin-bottom: 32px;
}

/* Prominent Search Container */
.doc-hub-search-container {
  max-width: 720px;
  margin: 0 auto;
}

.doc-hub-search-trigger {
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background-color: var(--xmcl-panel, #1b241f);
  border: 2px solid var(--xmcl-line, #334139);
  border-radius: 14px;
  color: var(--xmcl-muted, #9aa9a1);
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  outline: none;
}

.doc-hub-search-trigger:hover,
.doc-hub-search-trigger:focus {
  border-color: var(--xmcl-lime, #c9f85a);
  background-color: var(--xmcl-soft, #151d18);
  box-shadow: 0 0 0 3px rgba(201, 248, 90, 0.18), 0 8px 30px rgba(0, 0, 0, 0.25);
  color: var(--xmcl-ink, #edf3ed);
}

.doc-hub-search-left {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
  flex: 1;
}

.doc-hub-search-icon {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  color: var(--xmcl-lime, #c9f85a);
  transition: transform 0.2s ease;
}

.doc-hub-search-trigger:hover .doc-hub-search-icon {
  transform: scale(1.1);
}

.doc-hub-search-text {
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.doc-hub-search-keys {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 12px;
}

.hub-key {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 24px;
  padding: 0 6px;
  font-family: inherit;
  font-size: 12px;
  font-weight: 700;
  color: var(--xmcl-muted, #9aa9a1);
  background-color: var(--xmcl-paper, #101612);
  border: 1px solid var(--xmcl-line, #334139);
  border-radius: 6px;
}

/* Quick Suggestion Chips */
.doc-hub-quick-chips {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
  justify-content: center;
}

.chips-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--xmcl-muted, #718078);
  margin-right: 4px;
}

.chips-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.chip-item {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 8px;
  background-color: var(--xmcl-soft, rgba(201, 248, 90, 0.06));
  border: 1px solid var(--xmcl-line, #334139);
  color: var(--xmcl-ink, #edf3ed);
  text-decoration: none;
  transition: all 0.18s ease;
}

.chip-item:hover {
  background-color: var(--xmcl-panel, #1b241f);
  border-color: var(--xmcl-lime, #c9f85a);
  color: var(--xmcl-lime, #c9f85a);
  transform: translateY(-1px);
}

/* Grid of 4 Core Blocks */
.doc-hub-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 28px;
  margin-bottom: 60px;
}

@media (max-width: 900px) {
  .doc-hub-grid {
    grid-template-columns: 1fr;
  }
}

/* Block Card */
.doc-block-card {
  display: flex;
  flex-direction: column;
  background-color: var(--xmcl-panel, #1b241f);
  border: 1px solid var(--xmcl-line, #334139);
  border-radius: 18px;
  padding: 28px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
  transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.22s ease, box-shadow 0.22s ease;
}

.doc-block-card:hover {
  transform: translateY(-3px);
  border-color: var(--xmcl-line, rgba(201, 248, 90, 0.4));
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.22);
}

.block-card-header {
  margin-bottom: 20px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--xmcl-line, #334139);
}

.block-header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.block-icon-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background-color: var(--xmcl-soft, #151d18);
  border: 2px solid;
  border-radius: 12px;
  font-size: 20px;
}

.block-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.block-number {
  font-family: inherit;
  font-size: 13px;
  font-weight: 800;
  color: var(--xmcl-muted, #718078);
  letter-spacing: 0.05em;
}

.block-kicker {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 2px 7px;
  background-color: var(--xmcl-soft, #151d18);
  border-radius: 6px;
  color: var(--xmcl-muted, #9aa9a1);
}

.block-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--xmcl-ink, #edf3ed);
  margin-bottom: 8px;
  line-height: 1.25;
}

.block-desc {
  font-size: 14px;
  line-height: 1.5;
  color: var(--xmcl-muted, #9aa9a1);
  margin: 0;
}

/* Block Sub-articles List */
.block-articles-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.article-item-wrap {
  margin: 0;
  padding: 0;
}

.article-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  border-radius: 10px;
  background-color: var(--xmcl-soft, rgba(21, 29, 24, 0.4));
  border: 1px solid transparent;
  text-decoration: none;
  transition: all 0.18s ease;
}

.article-link:hover {
  background-color: var(--xmcl-soft, #151d18);
  border-color: var(--xmcl-line, #334139);
  transform: translateX(4px);
}

.article-link-content {
  min-width: 0;
  flex: 1;
}

.article-title-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 3px;
}

.article-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--xmcl-ink, #edf3ed);
  transition: color 0.18s ease;
}

.article-link:hover .article-title {
  color: var(--xmcl-lime, #c9f85a);
}

.article-badge {
  font-size: 10px;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 4px;
  background-color: rgba(201, 248, 90, 0.15);
  color: var(--xmcl-lime, #c9f85a);
}

.article-desc {
  font-size: 12px;
  color: var(--xmcl-muted, #9aa9a1);
  line-height: 1.4;
  margin: 0;
}

.article-arrow {
  font-size: 14px;
  color: var(--xmcl-muted, #718078);
  margin-left: 12px;
  transition: transform 0.18s ease, color 0.18s ease;
}

.article-link:hover .article-arrow {
  color: var(--xmcl-lime, #c9f85a);
  transform: translateX(3px);
}

/* Card Footer */
.block-card-footer {
  margin-top: 20px;
  padding-top: 14px;
  border-top: 1px solid var(--xmcl-line, #334139);
  display: flex;
  justify-content: flex-end;
}

.block-footer-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  color: var(--xmcl-lime, #c9f85a);
  text-decoration: none;
  transition: gap 0.18s ease;
}

.block-footer-btn:hover {
  gap: 10px;
}

/* Bottom Section */
.doc-hub-bottom {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

@media (max-width: 768px) {
  .doc-hub-bottom {
    grid-template-columns: 1fr;
  }
}

.help-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
  border-radius: 14px;
  background-color: var(--xmcl-panel, #1b241f);
  border: 1px solid var(--xmcl-line, #334139);
}

.help-content {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

.help-icon {
  font-size: 28px;
  flex-shrink: 0;
}

.help-content h3 {
  font-size: 16px;
  font-weight: 700;
  color: var(--xmcl-ink, #edf3ed);
  margin-bottom: 6px;
}

.help-content p {
  font-size: 13px;
  line-height: 1.5;
  color: var(--xmcl-muted, #9aa9a1);
  margin: 0;
}

.help-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 18px;
  font-size: 13px;
  font-weight: 700;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.discord-btn {
  background-color: #5865f2;
  color: #ffffff;
}

.discord-btn:hover {
  background-color: #4752c4;
}

.github-btn {
  background-color: var(--xmcl-soft, #151d18);
  border: 1px solid var(--xmcl-line, #334139);
  color: var(--xmcl-ink, #edf3ed);
}

.github-btn:hover {
  border-color: var(--xmcl-lime, #c9f85a);
  color: var(--xmcl-lime, #c9f85a);
}
</style>
