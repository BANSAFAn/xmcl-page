# Зберігання даних

XMCL дані діляться на дві частини:

1. XMCL як кеш і база даних, згенеровані chromium
2. Дані, пов'язані з Майнкрафтом

## XMCL кеш і база даних

Кеш, пов'язаний із самим XMCL, зберігається в системному шляху appdata, який відрізняється на різних платформах.

::: code-group
```cmd [Windows]
%AppData%\xmcl
```
```cmd [Windows (APPX/appinstaller)]
# Version < 0.34
%LocalAppData%\Packages\XMCL_ncdvebj03zfcm\LocalCache\Roaming\xmcl
# Version >= 0.34 and < 0.40
%LocalAppData%\Packages\XMCL_68mcaawk44tpj\LocalCache\Roaming\xmcl
```
```sh [macOS]
~/Library/Application Support/xmcl
```
```sh [Linux]
~/.config/xmcl
```
:::

:::warning Note
Не видаляйте наведені тут файли, якщо ви не знаєте, що робите.
:::

Тут ви знайдете кілька файлів «json», які використовуються для зберігання різних конфігурацій, і база даних також буде зберігатися тут.

- [User data](../protocol/user.md). Зберігає облікові записи користувачів, посилання на скіни тощо. Зберігається у файлі `/user.json`.
- [Global settings](../protocol/setting.md). Глобальні налаштування, такі як мова, URL-адреса проксі-сервера, вузол завантаження тощо. Зберігаються у файлі «/settings.json».
- [Instance cache](../protocol/instance.md). Записує шлях до останнього обраного екземпляра і шляхи до всіх відомих екземплярів. Зберігається у файлі `/instances.json`.
- [Java cache](../protocol/java.md). Записує виявлені шляхи до Java, інформацію про версію тощо. Зберігається у файлі `/java.json`.
- [Resource database](../protocol/resources.md). Метадані для файлів ресурсів, такі як проаналізована інформація про модулі. Зберігаються у форматі `leveldb` у папці `/resources-v2`.
- [Logs](../protocol/logs.md). Архівні журнали XMCL. Зберігаються в папці `/logs`.

## Дані, пов'язані з Minecraft

Я вважаю, ви добре знайомі зі структурою каталогів даних Minecraft.
Каталог даних у XMCL трохи відрізняється від каталогу даних у Minecraft:

```sh
"Public Data folder"
└─ 📂mods # Загальна папка модів для всіх екземплярів
  └─ modA.jar # Конкретний файл мода, наприклад, може пов'язувати моди з нього.
├─ 📂resourcepacks # Загальна папка resourcepacks для всіх екземплярів
├─ 📂shaderpacks # Загальна папка shaderpacks для всіх екземплярів
├─ 📂versions # Загальна папка версій для всіх екземплярів
├─ 📂assets # Загальна папка асетів для всіх екземплярів
├─ 📂libraries # Папка загальних бібліотек для всіх екземплярів
└─ 📂instances # Містить екземпляри, створені за допомогою XMCL
```

Більша частина вмісту насправді така сама, як і в Minecraft, серед яких папка `instance` містить усі файли екземплярів.