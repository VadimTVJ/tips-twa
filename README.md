## Tips Service — Telegram Mini App Example

____

image

### Features
:white_check_mark: Разработанный с нуля простой UI kit с интеграцией Telegram Mini Apps API (@tma.js/sdk)
:white_check_mark: Интеграция с Telegram платежами
:white_check_mark: Поддержка нескольких точек входа: Main Bot Button, Inline Button, Direct Link, Direct Link с хендлером startapp параметра
:white_check_mark: Проработанный developer experience: eruda для дебага в режиме development, Sentry в режиме production. Sentry настроена так, чтобы сенситив данные (например, хеш пользователя) не логгировались

____

### Оглавление
1. Клиентская часть (TMA)
   1. Стек и фичи
   2. Архитектура проекта
   3. UI Kit
   4. Установка и деплой
2. Серверная часть (бот)
   1. Стек и фичи       
   2. Установка и деплой
3. Полезные советы для разработчиков Telegram Mini Apps 
4. Полезные ресурсы
5. Лицензия

____

### Клиентская часть (TMA)
#### Стек и фичи
- React + Typescript + SCSS Modules
- Vite
- Feature-sliced design в качестве архитектуры проекта
- Axios + @tanstack/react-query for data fetching
- React-router-dom
- Разработанный с нуля простой UI kit с интеграцией Telegram Mini Apps API (@tma.js/sdk)
- Eruda для дебага в режиме development, Sentry в режиме production

#### Архитектура проекта

ЗДЕСЬ БУДЕТ МЭМ

Проект построен на основе архитектурной методологии Feature-Sliced design (FSD). 
В рамках этой методологии, проект состоит 6 слайсов:
1. app — настройки, стили и провайдеры для всего приложения
2. pages (страницы) — композиционный слой для сборки полноценных страниц из сущностей, фич и виджетов
3. widgets (виджеты) — композиционный слой для соединения сущностей и фич в самостоятельные блоки
4. features (фичи) — взаимодействия с пользователем, действия, которые несут бизнес-ценность для пользователя
5. entities (сущности) — бизнес-сущности приложения (tip, waiter)
6. shared — переиспользуемый код, не имеющий отношения к специфике приложения/бизнеса

Данная методология обеспечивает низкую связанность компонентов приложения и высокую сплоченность, что уменьшает bus-фактор и делает кодовую базу приложения более масштабируемой

Полезные ссылки:
- Официальный сайт документации
- Отличный доклад от одного из соавторов методологии (RUS)

#### UI Kit
Для мини-приложения был разработан собственный UI Kit, компоненты которого "из коробки" интегрированы с TMA API (@tma.js/sdk)

##### Фичи
- Storybook available
- Поддержка светлой/темной темы
- 13 базовых компонетов: Button, TextField, SegmentedControl, Page etc.
- Компонент Page, который позволяет управлять интерфейсом TMA через пропы:
  - backgroundColor - устанавливает фон страницы TMA
  - headerBackgroundColor - устаналивает фон шапки TMA
  - withCloseAppConfirmation - флаг, нужно ли запрашивать потдерждение при закртии мини-приложения
  - shouldExpanded - флаг, должно ли мини-приложение быть раскрытым при открытии страницы
  - withQuit - флаг, нужно ли скрывать backButton, чтобы у пользователя была возможность закрыть мини-приложение через нативный крестик в шапке приложения
- Компоненты с поддержкой haptic feedback: Button, Radio, ListItem, SegmentedControl
- @radix-ui/react-slot для полиморфных компонентов

UI Kit является MVP, был собран в рамках хакатона Telegram Mini App Contest 2023, соответственно компоненты могут содержать баги и недочеты.

#### Установка

##### Требования:
- NODEJS 16.15.0+
- YARN 1.22.18+

##### Установка:
`yarn install`

#### Environment variables:
Создайте файл .env в корне проекта и укажите следующие переменные:

| Variable Name  | Required | Description | Example |
| --- | --- | --- | --- |
| `VITE_API_URL` | True | Backend url with prefix /api | `https://my-server.com/api`
| `VITE_SENTRY` | False | Sentry DSN | `https://fw89ew89g7g8ew7g8we8@k3940287.ingest.sentry.io/234234543635523`

##### Запуск проекта:
`yarn dev`

##### Сборка проекта
`yarn build`

##### Деплой проекта
После сборки проекта, в корне будет сгенерирована директория /dist с исходным кодом проекта

### Серверная часть (бот)
#### Стек и фичи
- Fastify + Typescript
- MSQL + TypeORM
- node-telegram-bot-api as bot core

##### Требования:
- NODEJS 16.15.0+
- YARN 1.22.18+
- MYSQL 8.1.0+

##### Установка:
`yarn install`

#### Environment variables:
Создайте файл .env в корне проекта и укажите следующие переменные:

| Variable Name  | Required | Description | Example |
| --- | --- | --- | --- |
| `TG_TOKEN` | True | Telegram BOT token |
| `TG_PAYMENT_TOKEN` | True | Telegram BOT Payment token |
| `TG_BOT_NAME` | True | Telegram BOT username (t.me/USERNAME) | tips_web_app_bot
| `TG_BOT_APP_NAME` | True | Telegram Mini App name (t.me/username/APP_NAME) | tip
| `TG_BOT_QR_URL` | True | Ссылка на изображение, которое бот будет отправлять пользователю при отправке команды /qr |
| `DOMAIN` | True | Домен приложения, используется для вебхука | https://my-server.com
| `PORT` | True | Порт приложения |
| `DB_HOST` | True | Database host |
| `DB_PORT` | True | Database port |
| `DB_USER` | True | Database user |
| `DB_PASSWORD` | True | Database password |
| `DB_DATABASE` | True | Database name |

##### Запуск проекта:
`yarn dev`

##### Сборка проекта
`yarn build`

##### Запуск проекта
`yarn start`

____

### Полезные советы для разработчиков Telegram Mini Apps 

#### Sentry and sensitive data

Сервис Sentry позволяет удаленно мониторить баги в фронтенд-приложениях, написанных на JavaScript.
Если ваше фронтенд пришложение крашится, Eruda автоматически отправляет информацию об ошибке.
Однако, помимо информации об ошибке, Sentry также отпарвляет sensitive данные пользователя — hash подпись параметров запуска.

| AS IS  | TO BE |
| --- | --- |
| ![alt text](http://url/to/img.png) | ![alt text](http://url/to/img.png) |
| 123123 | 123 |

Чтобы это исправить, нужно фильтровать данные перед отправкой ошибки в Sentry DSN. 
Это можно делать с помощью метода Sentry.beforeSend: example

#### Дебаг на мобильных устройствах
В ходе разработки Telegram Mini App может возникнуть необходимость дебага на реальном устростве.
С этим вам может помочь Eruda — Console for mobile browsers

#### Viewport
todo

#### User-select
todo

### Полезные ресурсы

### Лицензия
This project is licensed under the MIT - see the [LICENSE](LICENSE) file for details
