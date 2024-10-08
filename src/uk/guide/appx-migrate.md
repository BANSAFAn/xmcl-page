# AppX міграція

На цій сторінці ви дізнаєтеся, як перенести ваші дані з установки AppX на установку zip.

Ідея проста: просто скопіюйте папку AppData xmcl для додатка AppX у папку AppData.

> [!IMPORTANT]
> **НЕ** видаляйте AppX версію програми в процесі міграції.

## Знайдіть ваші AppX дані

Перейдіть за наступним шляхом, щоб знайти свої дані AppX

```cmd [Windows (APPX/appinstaller)]
# Version < 0.34
%LocalAppdata%\Packages\XMCL_ncdvebj03zfcm\LocalCache\Roaming\xmcl
# Version >= 0.34 and < 0.40
%LocalAppData%\Package\XMCL_68mcaawk44tpj\LocalCache\Roaming\xmcl
```

:::tip 
Використовуйте поле введення (для маршрутизації) у провіднику, щоб перейти до зазначеного вище шляху.
:::

## Скопіюйте дані в 

Скопіюйте всю папку «xmcl», зазначену в попередньому кроці, в

```cmd [Windows]
%AppData%\xmcl
```

## Запустіть новий XMCL і видаліть старий

Після копіювання даних, Ви можете запустити новий XMCL із zip.

Як тільки Ви переконаєтеся, що новий XMCL працює правильно, Ви можете видалити старий додаток XMCL.

:::tip
Видалення AppX app призведе до **автоматичного** видалення старих даних, так що вам не потрібно турбуватися про дані, що залишилися.
:::