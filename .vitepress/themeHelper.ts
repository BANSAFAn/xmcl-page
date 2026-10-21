import { existsSync, readFileSync, readdirSync } from "fs";
import { join } from "path";
import { DefaultTheme, LocaleConfig } from "vitepress";
import { parse } from 'yaml';

export function loadSidebarSection(location: string, locale: string, type: string) {
    try {
        const files = readdirSync(join(location, type))
        const items = files.map(f => {
            if (f === 'index.md') return undefined
            const content = readFileSync(join(location, type, f), 'utf-8').trim()
            const lines = content.split(/\r?\n/).filter(v => !!v)
            let title = ''
            let inFrontmatter = false
            for (const line of lines) {
                const trimmed = line.trim()
                if (trimmed === '---') {
                    inFrontmatter = !inFrontmatter
                    continue
                }
                if (!inFrontmatter && trimmed.startsWith('#')) {
                    title = trimmed.replace(/^#+\s*/, '')
                    break
                }
            }
            if (title) {
                return {
                    file: f,
                    text: title,
                    link: `/${locale}/${type}/${f}`,
                }
            }
        }).filter((v): v is { file: string; text: string; link: string } => !!v)
        return items
    } catch {
        return []
    }
}

function getChangelogsFiles(location: string) {
    try {
        return readdirSync(join(location, './changelogs')).filter(f => f.endsWith('.md') && !f.startsWith('index')).map(f => f.slice(0, -3)).reverse()
    } catch {
        return []
    }
}

export function loadTheme(location: string, locale: string) {
    const localeFile = join(__dirname, '..', 'locales', locale + '.yml')
    const localeMessages = parse(readFileSync(localeFile, 'utf-8'))
    const sidebar: DefaultTheme.SidebarMulti = {}

    const coreSidebarPath = join(location, 'core', 'sidebar.json')
    if (existsSync(coreSidebarPath)) {
        const coreSidebar = JSON.parse(readFileSync(coreSidebarPath, 'utf-8')) as DefaultTheme.SidebarItem[]
        if (coreSidebar) {
            for (const bar of coreSidebar) {
                bar.link = '/en/core/' + bar.link
                for (let i of bar.items!) {
                    i.link = '/en/core/' + i.link
                }
            }
            sidebar[`/en/core/`] = [
                {
                    text: '📚 ' + (localeMessages.documentation || 'Documentation'),
                    items: [
                        { text: '← ' + (localeMessages.docHub?.backToHub || 'Back to Documentation Hub'), link: `/${locale}/guide/` }
                    ]
                },
                ...coreSidebar
            ]
        }
    }

    const nav: DefaultTheme.NavItem[] = [
        {
            text: localeMessages.documentation || 'Documentation',
            link: `/${locale}/guide/`,
            activeMatch: '^/(?:[a-zA-Z-]+/)?(?:guide|core)/'
        },
    ]
    nav.splice(1, 0, { text: localeMessages.features?.label || 'Features', link: `/${locale}/features/`, activeMatch: `/${locale}/features/(.+)?` })

    const guideSection = loadSidebarSection(location, locale, 'guide')
    const protocolSection = loadSidebarSection(location, locale, 'protocol')
    const changelogFiles = getChangelogsFiles(location)

    const gettingStartedFiles = [
        'install.md',
        'update.md',
        'offline-mode.md',
        'microsoft-login-issues.md',
        'change-drive.md',
        'appx-migrate.md',
    ]

    const gameAndModsFiles = [
        'manage.md',
        'modloader.md',
        'appearance.md',
        'custom-skins.md',
        'agnes-ai-setup.md',
        'bedrock.md',
    ]

    const multiplayerFiles = [
        'together.md',
        'p2p.md',
        'troubleshooting.md',
    ]

    const coreAndDevFiles = [
        'contributing.md',
        'i18n.md',
    ]

    const guideMap = new Map(guideSection.map(item => [item.file, item]))
    const gettingStartedItems = gettingStartedFiles.map(f => guideMap.get(f)).filter((v): v is { file: string; text: string; link: string } => !!v)
    const gameAndModsItems = gameAndModsFiles.map(f => guideMap.get(f)).filter((v): v is { file: string; text: string; link: string } => !!v)
    const multiplayerItems = multiplayerFiles.map(f => guideMap.get(f)).filter((v): v is { file: string; text: string; link: string } => !!v)

    const coreAndDevItems: DefaultTheme.SidebarItem[] = [
        { text: '⚡ ' + (localeMessages.coreDocument || 'Core Document'), link: '/en/core/' }
    ]
    if (protocolSection.length > 0) {
        coreAndDevItems.push({ text: '🤝 ' + (localeMessages.protocol || 'Protocol (P2P)'), link: `/${locale}/protocol/p2p` })
    }
    for (const f of coreAndDevFiles) {
        const item = guideMap.get(f)
        if (item) coreAndDevItems.push({ text: item.text, link: item.link })
    }

    const categorizedFiles = new Set([...gettingStartedFiles, ...gameAndModsFiles, ...multiplayerFiles, ...coreAndDevFiles])
    const extraItems = guideSection.filter(item => !categorizedFiles.has(item.file))

    const docGroups = localeMessages.docGroups || {}
    const commonSidebar: DefaultTheme.SidebarItem[] = []

    if (gettingStartedItems.length > 0) {
        commonSidebar.push({
            text: docGroups.gettingStarted || '🚀 Getting Started',
            collapsed: false,
            items: gettingStartedItems.map(item => ({ text: item.text, link: item.link }))
        })
    }
    if (gameAndModsItems.length > 0) {
        commonSidebar.push({
            text: docGroups.gameAndMods || '🎮 Game & Mods',
            collapsed: false,
            items: gameAndModsItems.map(item => ({ text: item.text, link: item.link }))
        })
    }
    if (multiplayerItems.length > 0) {
        commonSidebar.push({
            text: docGroups.multiplayerAndTroubleshooting || '🌐 Multiplayer & Diagnostics',
            collapsed: false,
            items: multiplayerItems.map(item => ({ text: item.text, link: item.link }))
        })
    }
    if (coreAndDevItems.length > 0) {
        commonSidebar.push({
            text: docGroups.coreAndDev || '🛠️ Architecture & Core',
            collapsed: false,
            items: coreAndDevItems
        })
    }
    if (extraItems.length > 0) {
        commonSidebar.push({
            text: '📌 ' + (localeMessages.other || 'More'),
            collapsed: false,
            items: extraItems.map(item => ({ text: item.text, link: item.link }))
        })
    }

    if (commonSidebar.length > 0) {
        sidebar[`/${locale}/guide/`] = commonSidebar
    }

    if (protocolSection.length > 0) {
        sidebar[`/${locale}/protocol/`] = [
            {
                text: '📚 ' + (localeMessages.documentation || 'Documentation'),
                items: [
                    { text: '← ' + (localeMessages.docHub?.backToHub || 'Back to Documentation Hub'), link: `/${locale}/guide/` }
                ]
            },
            {
                text: '🤝 ' + localeMessages.protocol,
                items: protocolSection
            }
        ]
    }
    if (changelogFiles.length > 0) {
        const changelogsSidebar = [
            {
                text: '📜 ' + localeMessages.changelogs,
                items: changelogFiles.map(f => ({ text: f, link: `/${locale}/changelogs/${f}` }))
            }
        ]
        sidebar[`/${locale}/changelogs/`] = changelogsSidebar
        nav.push({ text: localeMessages.changelogs, link: `/${locale}/changelogs/${changelogFiles[0]}`, activeMatch: `/${locale}/changelogs/(.+)?` })
    }
    if (existsSync(join(location, 'blog'))) {
        nav.push(
            { text: (localeMessages.blogs || 'Blogs'), link: `/${locale}/blog/`, activeMatch: `/${locale}/blog/(.+)?` },
        )
    }
    const theme: LocaleConfig<DefaultTheme.Config>[string] = {
        label: localeMessages.label,
        lang: locale,
        dir: locale === 'ar' ? 'rtl' : 'ltr',
        themeConfig: {
            logo: { src: '/logo.svg', alt: 'XMCL', width: '24', height: '24' },
            logoLink: `/${locale}/`,
            search: {
                provider: 'local',
                options: {
                    translations: localeMessages.search,
                }
            },
            socialLinks: [
                { icon: 'github', link: 'https://github.com/voxelum/x-minecraft-launcher' },
                { icon: 'discord', link: 'https://discord.gg/W5XVwYY7GQ' },
                {
                    icon: {
                        svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Reddit</title><path d="M24 11.5c0-1.65-1.35-3-3-3-.96 0-1.86.48-2.42 1.24-1.64-1-3.85-1.64-6.29-1.72l1.3-4.14 4.15.9c.02.94.78 1.7 1.74 1.7 1.02 0 1.85-.83 1.85-1.85S20.5 3 19.48 3c-.76 0-1.42.47-1.7 1.12l-4.58-1c-.2-.04-.42.06-.49.26l-1.5 4.77C8.75 8.24 6.5 8.87 4.83 9.87 4.25 9.1 3.32 8.6 2.25 8.6c-1.65 0-3 1.35-3 3 0 1.12.63 2.1 1.56 2.6-.08.4-.12.82-.12 1.25 0 3.6 4.38 6.5 9.75 6.5s9.75-2.9 9.75-6.5c0-.43-.04-.85-.12-1.25.93-.5 1.56-1.48 1.56-2.6zm-18.66 3c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5zm11.3 4.5c-1.68 1.68-4.88 1.68-6.56 0-.08-.08-.08-.22 0-.3l.45-.45c.08-.08.22-.08.3 0 1.2 1.2 3.86 1.2 5.06 0 .08-.08.22-.08.3 0l.45.45c.08.08.08.22 0 .3zm.44-3c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>'
                    },
                    link: 'https://www.reddit.com/r/XMCL/'
                },
            ],
            nav,
            sidebar,
            outline: {
                label: '📚 ' + localeMessages.outline,
                level: [2, 3],
            },
            darkModeSwitchLabel: localeMessages.darkModeSwitchLabel,
            darkModeSwitchTitle: localeMessages.darkModeSwitchTitle,
            lightModeSwitchTitle: localeMessages.lightModeSwitchTitle,
            sidebarMenuLabel: localeMessages.sidebarMenuLabel,
            returnToTopLabel: localeMessages.returnToTopLabel,
            langMenuLabel: localeMessages.langMenuLabel,
            docFooter: localeMessages.docFooter,
            lastUpdatedText: localeMessages.lastUpdatedText,
            editLink: {
                text: localeMessages.editLink,
                pattern: 'https://github.com/voxelum/xmcl-page/edit/master/src/:path'
            }
        }
    }
    return theme
}
