[**EN**](README.md) | [**RU**](README-ru.md)
____
## Tips — Telegram Mini App Example
> [!NOTE]  
> APP DESCRIPTION

Demo: [t.me/tips_web_app_bot](https://t.me/tips_web_app_bot)

<img src="/.readme-assets/preview.png" width="100%" alt="Preview">

## 🔥 Features
- [x] 💅🏼 Developed from scratch a simple set of UI with  [@tma.js/sdk](https://www.npmjs.com/package/@tma.js/sdk) <br>
- [x] 💳 Integration with Telegram payments<br>
- [x] 🛠 Support for multiple entry points: Main Bot Button, Inline Button, Direct Link, Direct Link with _startapp_ parameter<br>
____
## 📋 Table of contents
1. [Client side](#client-side)
   1. [Tech Stack and features](#стек-и-фичи)
   2. [Frontend architecture](#архитектура-проекта)
   3. [UI kit](#ui-kit)
   4. [Build and run](#установка-и-сборка)
2. [Server side](#серверная-часть)
   1. [Tech Stack and features](#стек-и-фичи-1)
   2. [Build and run](#установка-и-сборка-1)
3. [Tips for Telegram Mini Apps](#советы-для-telegram-mini-apps)
4. [Learn More](#полезные-ресурсы)
5. [License](#лицензия)
____
## ⭐️ Client side
### Tech Stack and features
- React + Typescript + SCSS Modules
- Vite
- Feature-sliced design as a project architecture
- Axios + @tanstack/react-query
- React-router-dom
- Developed from scratch a simple set of UI with  [@tma.js/sdk](https://www.npmjs.com/package/@tma.js/sdk)
- Eruda for debug in development mode, Sentry in production mode
### Frontend architecture
<img src=".readme-assets/fsd.jpg" width="100%" alt="FSD">

The client part is built based on the **Feature-Sliced design (FSD)** architectural methodology. 
Within this methodology, the project consists of 6 slices:
1. **app** — нapp-wide settings, styles and providers
2. **pages** —  compositional layer to construct full pages from entities, features and widgets
3. **widgets** — compositional layer to combine entities and features into meaningful blocks
4. **features** — user interactions, actions that bring business value to the user
5. **entities** — business entities (tip, waiter)
6. **shared** — reusable functionality, detached from the specifics of the project/business: UI kit, api, libs

This methodology provides low coupling of application components and high cohesion, which makes the application code more structured and scalable

[**Feature-sliced Design documentation**](https://feature-sliced.design/)
### UI kit
#### Features
- [**Storybook available**](https://tips-twa-storybook.vercel.app/)
- Support for light/dark theme
- 13 basic components: Button, TextField, SegmentedControl, Page etc.
- Page component that allows you to control the TMA interface via props:
  - **backgroundColor** - sets the background of the TMA page
  - **headerBackgroundColor** - sets the background of the TMA header
  - **withCloseAppConfirmation** - flag whether to ask for confirmation when closing the mini-application
  - **shouldExpanded** - flag whether the mini-application should be expanded when the page is opened
  - **withQuit** - flag whether the backButton should be hidden, so that the user has the option to close the mini-application via the native cross in the application header
- Components with support for haptic feedback: Button, Radio, ListItem, SegmentedControl
- @radix-ui/react-slot to merge component props with an immediate child element

UI kit is **MVP**, was built as part of Telegram Mini App Contest 2023 hackathon, components may contain bugs and errors

### Build and run
#### Requirements:
- node js 16.15.0+
- yarn 1.22.18+
#### Installation:
```yarn install``` - installs dependencies from package.json
#### Environment variables:
Create an `.env` file in the project root and specify the following variables:

| Variable Name  | Required | Description | Example |
| --- | --- | --- | --- |
| `VITE_API_URL` | **True** | Backend url with prefix /api | `https://my-server.com/api`
| `VITE_SENTRY` | False | Sentry DSN | `https://fw89ew89g7g8ew7g8we8@k3940287.ingest.sentry.io/234234543635523`
#### Running locally:
```yarn dev``` - runs the project locally, in development mode
#### Building
```yarn build``` - builds the project in the /dist directory
#### Deploying
After building the project, a /dist directory with the project source code will be generated in the root.
You can use any static hosting service, such as Vercel or Github Pages, for the deployment

## ⭐️ Server side
### Tech Stack and features
- Fastify + Typescript
- MSQL + TypeORM
- node-telegram-bot-api

### Build and run
#### Requirements:
- node js 16.15.0+
- yarn 1.22.18+
- MySQL 8+

#### Installation:
```yarn install``` - installs dependencies from package.json

#### Environment variables:
Create an `.env` file in the project root and specify the following variables:

| Variable Name  | Required | Description | Example |
| --- | --- | --- | --- |
| `TG_TOKEN` | **True** | Telegram BOT token |
| `TG_PAYMENT_TOKEN` | **True** | Telegram BOT Payment token |
| `TG_BOT_NAME` | **True** | Telegram BOT username (t.me/USERNAME) | tips_web_app_bot
| `TG_BOT_APP_NAME` | **True** | Telegram Mini App name (t.me/username/APP_NAME) | tip
| `TG_BOT_QR_URL` | **True** | Link to the image that the bot will send to the user when sending the /qr command |
| `DOMAIN` | **True** | Application domain, used for webhook | https://my-server.com
| `PORT` | **True** | Port |
| `DB_HOST` | **True** | Database host |
| `DB_PORT` | **True** | Database port |
| `DB_USER` | **True** | Database user |
| `DB_PASSWORD` | **True** | Database password |
| `DB_DATABASE` | **True** | Database name |

#### Running locally:
```yarn dev``` - runs the project locally, in development mode

#### Building
```yarn build``` - builds the project in production mode

#### Startig
```yarn start``` - starts backend
____
### 💻 Tips for Telegram Mini Apps
#### Sentry and sensitive user data
[**Sentry**](https://sentry.io/) allows you to remotely monitor bugs in frontend applications written in JavaScript.
If your frontend application crashes, Sentry automatically sends error information to the remote Sentry server.

However, in addition to error information, Sentry can also log the user's secret data - hash signature of startup parameters.
If the backend does not check the auth_date parameter, then knowing the user's signature, an attacker can open the mini-application on behalf of other users.

To prevent this, it is necessary to filter the data before logging the error in Sentry DSN. 
This can be done using the Sentry.beforeSend method.

In addition to filtering data, you can create your own Sentry context, for example, one that stores user information obtained from launch-params.

| AS IS | TO BE |
| --- | --- |
| ![Preview](.readme-assets/sentry-before.png) _Sentry stores the tgWebAppData, along with a hash parameter for authorization on the backend_ | ![Preview](.readme-assets/sentry-after-1.png) _Sentry does not save the #hash of the request_ |
| _Initially, there is no user information available in a convenient way_ | ![Preview](.readme-assets/sentry-after-2.png) _Only useful information about the user (from launch params) is displayed in a convenient way_ |
[**Example**](src/shared/lib/sentry/index.ts)
#### Mobile debugging
While developing Telegram Mini App, you may need to debug on a real device.
[**Eruda**](https://github.com/liriliri/eruda), a mobile developer console, can help you with that
#### Viewport settings
Add a viewport tag to display the interface correctly on smartphones
```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
/>
```
#### Disable text selection
<img src=".readme-assets/user-select.jpg" width="180px">

To improve UX, you can disable text selection in the application, leaving the ability to select only the necessary elements - input, textarea.
```css
*:not(input):not(textarea),
::after,
::before {
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
```

### 🛠 Learn More
[**Telegram Api**](https://core.telegram.org/api) <br>
[**Bot Payments Api**](https://core.telegram.org/bots/payments) <br>
[**Introducing into Telegram Mini Apps**](https://docs.ton.org/develop/dapps/telegram-apps/) <br>
[**Documentation @tma-js**](https://docs.telegram-mini-apps.com/docs/introduction/about-platform) <br>


### License
This project is licensed under the MIT - see the [LICENSE](LICENSE) file for details
