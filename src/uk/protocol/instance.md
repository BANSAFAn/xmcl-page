# Формат зберігання 

> У розробці....

XMCL, аналогічно multimc, зберігає інформацію про екземпляр.

Ця інформація зберігається в [каталозі даних XMCL] (/ru/guide/manage#xmcl-cache-and-database):

<!-- ```bash
.
├─ instances
│  ├─ .vitepress
│  │  └─ config.js
│  ├─ api-examples.md
│  ├─ markdown-examples.md
│  └─ index.md
└─ package.json
``` -->

```sh
Каталог даних XMCL
└─ 📜instances.json # Файл конфігурації глобального екземпляра
```

А також [каталог ігрових даних XMCL](/uk/guide/manage#minecraft-related-data)─ [каталог ігрових даних XMCL](/uk/guide/manage#minecraft-related-data)─ ``

```sh
Каталог ігрових даних XMCL
└─📂instances # Містить файли для екземплярів
  ├─📂instance-a
  │ └─ 📜instance.json # Конфігураційний файл для екземпляра A
  └─ 📂instance-b
    └─ 📜instance.json # Конфігураційний файл для екземпляра B
```

## Глобальний формат файлу конфігурації

Тут ми припускаємо, що ваші дані XMCL зберігаються у файлі `/path/to/xmcl`.

```json5
{
    // Це останній обраний екземпляр. Програма запуску вибере його при запуску.
    "selectedInstance": "/path/to/xmcl/instances/instance-a",
    // Це кешований список усіх екземплярів. Тут також будуть збережені шляхи до імпортованих зовнішніх екземплярів. Вони будуть недоступні, якщо програму запуску буде видалено.
    "instances": [
        "/path/to/xmcl/instances/instance-a",
        "/path/to/xmcl/instances/instance-b",
        // Зовнішні екземпляри
        "/external/.minecraft"
    ]
}
```

## Файл конфігурації екземпляра

Припустимо, ви створили його в `/path/to/xmcl/instances/mc.hypixel.com`.
```json5
{
    // Це ім'я відображається в лаунчері
    "name": "mc.hypixel.com",
    // На даний момент не ввімкнено. Встановлює роздільну здатність для гри в екземплярі
    "resolution": { "width": 800, "height": 400, "fullscreen": false },
    // Мінімум пам'яті
    "minMemory": 0,
    // Максимум пам'яті
    "maxMemory": 0,
    // Додаткові параметри запуску JVM
    "vmOptions": [],
    // Додаткові параметри запуску MC
    "mcOptions": [],
    "url": «»,
    // URL-адреса значка екземпляра
    "icon": «»,
    // Чи буде XMCL відображати вікно журналу після запуску
    "showLog": false,
    // Чи слід приховувати програму запуску після запуску
    "hideLauncher": true,
    // Необхідна версія, наприклад, порожній рядок означає, що вона не потрібна
    "runtime": {
        "minecraft": "1.16.3",
        "forge": "",
        "liteloader": "",
        "fabricLoader": "",
        "yarn": "",
        "optifine": "",
        "quiltLoader": ""
    },
    // Java шлях, порожній являє собою автоматичне визначення
    "java": "",
    // Зазначена вручну версія запуску, порожня являє собою обчислення, засноване на часі виконання
    "version": "",
    // Адреса сервера, за наявності якого програма запуску підключиться безпосередньо до цього сервера
    "server": { "host": "mc.hypixel.net", "port": 25565 },
    // Автор модпака
    "author": "ci010",
    // Опис
    "description": "",
    "lastAccessDate": 1661774086015,
    "creationDate": 1602514422594,
    "modpackVersion": "",
    "fileApi": "",
    "tags": [],
    "assignMemory": false,
    // Чи варто запускати швидко
    "fastLaunch": false
}

```