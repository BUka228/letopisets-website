// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ============================================================================
// --- ВАШИ ДАННЫЕ ДЛЯ НАПОЛНЕНИЯ ---
// ЗАМЕНИТЕ ЭТИ ПЛЕЙСХОЛДЕРЫ НА ВАШ РЕАЛЬНЫЙ КОНТЕНТ!
// ============================================================================

const contentData = [
  // Hero Section & CTA
  { key: 'hero_title', valueRu: 'Летописец Чата: Ваш ИИ-помощник для Telegram', valueEn: 'Chat Chronicler: Your AI Assistant for Telegram' },
  { key: 'hero_subtitle', valueRu: 'Превращает хаос чата в увлекательные истории и дайджесты. Помогает не упустить важное и экономит ваше время.', valueEn: 'Turns chat chaos into engaging stories and digests. Helps you catch up and saves your time.' },
  { key: 'cta_button', valueRu: 'Добавить в Telegram', valueEn: 'Add to Telegram' },
  { key: 'telegram_bot_username', valueRu: 'LetopisetsChatBot', valueEn: 'LetopisetsChatBot' },
  { key: 'bot_image', valueRu: '/images/bot-avatar.png', valueEn: '/images/bot-avatar.png' },

  // Problem/Solution
  { key: 'problem_title', valueRu: 'Проблема: Информационная перегрузка', valueEn: 'Problem: Information Overload' },
  { key: 'problem_text', valueRu: 'Сложно следить за активными чатами? Пропускаете важные обсуждения и решения? Устали пролистывать сотни сообщений?', valueEn: 'Hard to keep up with active chats? Missing important discussions and decisions? Tired of scrolling through hundreds of messages?' },
  { key: 'solution_title', valueRu: 'Решение: Летописец Чата', valueEn: 'Solution: Chat Chronicler' },
  { key: 'solution_text', valueRu: 'Наш ИИ-бот анализирует историю чата и создает понятные сводки: краткие дайджесты или увлекательные истории дня с разными "личностями".', valueEn: 'Our AI bot analyzes chat history and creates clear summaries: concise digests or engaging stories of the day with different "personalities".' },

  // Titles
  { key: 'features_title', valueRu: 'Возможности', valueEn: 'Features' },
  { key: 'how_it_works_title', valueRu: 'Как это работает?', valueEn: 'How It Works?' },
  { key: 'examples_title', valueRu: 'Примеры работы (Личности ИИ)', valueEn: 'Examples (AI Personalities)' },
  { key: 'privacy_title', valueRu: 'Приватность и Безопасность', valueEn: 'Privacy & Security' },
  { key: 'privacy_policy_title', valueRu: 'Политика Конфиденциальности', valueEn: 'Privacy Policy' },
  { key: 'setup_title', valueRu: 'Установка и Настройка', valueEn: 'Setup & Configuration' },

  // How It Works Steps
  { key: 'step1_title', valueRu: 'Добавьте Бота', valueEn: 'Add the Bot' },
  { key: 'step1_text', valueRu: 'Нажмите кнопку "Добавить в Telegram" и выберите группу, в которую хотите установить Летописца.', valueEn: 'Click the "Add to Telegram" button and select the group where you want to install the Chronicler.' },
  { key: 'step2_title', valueRu: 'Дайте Права', valueEn: 'Grant Permissions' },
  { key: 'step2_text', valueRu: 'Сделайте бота администратором группы. Ему нужны права на чтение сообщений для анализа и отправку сообщений для сводок.', valueEn: 'Make the bot an administrator of the group. It needs permissions to read messages for analysis and send messages for summaries.' },
  { key: 'step3_title', valueRu: 'Настройте', valueEn: 'Configure' },
  { key: 'step3_text', valueRu: 'Используйте команду /story_settings (доступна админам), чтобы выбрать язык, формат сводки, личность ИИ, время генерации и другие параметры.', valueEn: 'Use the /story_settings command (admins only) to choose the language, summary format, AI personality, generation time, and other options.' },
  { key: 'step4_title', valueRu: 'Готово!', valueEn: 'Enjoy!' },
  { key: 'step4_text', valueRu: 'Бот начнет собирать историю чата и будет присылать сводки согласно вашим настройкам. Используйте /help для списка команд.', valueEn: 'The bot will start collecting chat history and send summaries according to your settings. Use /help for a list of commands.' },

  // Setup Page Specific
   { key: 'setup_intro', valueRu: 'Следуйте этим простым шагам, чтобы Летописец начал работать в вашем чате.', valueEn: 'Follow these simple steps to get the Chronicler working in your chat.' },
   { key: 'setup_permissions_title', valueRu: 'Необходимые права администратора:', valueEn: 'Required Admin Permissions:' },
   { key: 'setup_permissions_text', valueRu: 'Боту необходимы права для чтения сообщений (чтобы анализировать чат) и отправки сообщений (чтобы публиковать сводки). Он не будет удалять сообщения (кроме как по команде /purge_history), банить пользователей или менять настройки чата.', valueEn: 'The bot needs permissions to read messages (to analyze the chat) and send messages (to publish summaries). It will not delete messages (except via /purge_history), ban users, or change chat settings.' },

  // Privacy Section on Home
  { key: 'privacy_text', valueRu: 'Мы серьезно относимся к вашей конфиденциальности. Данные чатов используются только для генерации сводок и не передаются третьим лицам, кроме как для обработки ИИ через наш защищенный прокси. Узнайте больше в нашей Политике Конфиденциальности.', valueEn: 'We take your privacy seriously. Chat data is used solely for generating summaries and is not shared with third parties, except for AI processing via our secure proxy. Learn more in our Privacy Policy.' },

  // Footer
  { key: 'footer_copyright', valueRu: `© ${new Date().getFullYear()} Летописец Чата. Все права защищены.`, valueEn: `© ${new Date().getFullYear()} Chat Chronicler. All rights reserved.` },

  // Privacy Policy Page (Full Text in Markdown)
  // В файле prisma/seed.ts, замените существующее значение для privacy_policy_text

// --- РУССКАЯ ВЕРСИЯ ---
{ key: 'privacy_policy_text', valueRu: `
# Политика Конфиденциальности для Бота "Летописец Чата"

**Дата вступления в силу:** [Дата вступления в силу, например: 28 Апреля 2025 года]

## 1. Введение

Добро пожаловать! Настоящая Политика Конфиденциальности описывает, как [Ваш/Ваше Имя или Название Проекта] ("мы", "нас" или "наш") собирает, использует и раскрывает информацию пользователей ("вы") при использовании нашего Telegram-бота "Летописец Чата" ("Бот") и связанного с ним веб-сайта ([Адрес вашего сайта]) ("Сайт").

Используя Бота или Сайт, вы соглашаетесь с условиями настоящей Политики Конфиденциальности. Если вы не согласны с этими условиями, пожалуйста, не используйте Бота или Сайт. Администраторы Telegram-групп, добавляющие Бота в свои чаты, несут ответственность за информирование участников своих чатов о работе Бота и данной Политике.

## 2. Какую информацию мы собираем

Бот собирает следующую информацию для выполнения своих функций:

*   **Информация из сообщений в группах:**
    *   Текстовое содержание сообщений.
    *   Telegram User ID и Username (если доступен) пользователя, отправившего сообщение.
    *   Chat ID группы, в которой установлен Бот.
    *   Время отправки сообщения (Timestamp).
    *   Тип сообщения (текст, фото, стикер, видео и т.д.).
    *   File ID и File Unique ID для медиафайлов (фото, видео, документы и т.д.).
    *   Подписи (captions) к медиафайлам.
*   **Настройки Чата:**
    *   Язык интерфейса Бота (\`lang\`).
    *   Статус активности Бота в чате (\`enabled\`).
    *   Пользовательское время генерации сводок (\`custom_schedule_time\`).
    *   Часовой пояс чата (\`timezone\`).
    *   Выбранный жанр для "Историй" (\`story_genre\`).
    *   Выбранный формат сводки ("История" или "Дайджест") (\`output_format\`).
    *   Выбранная личность Летописца (\`story_personality\`).
    *   Настроенный срок хранения сообщений (\`retention_days\`).
    *   Настройки функции "Вмешательства" (\`allow_interventions\`, \`last_intervention_ts\`, \`intervention_cooldown_minutes\`, \`intervention_min_msgs\`, \`intervention_timespan_minutes\`).
*   **Данные Обратной Связи:**
    *   Telegram User ID пользователя, оставившего отзыв.
    *   Chat ID и Message ID сообщения, к которому относится отзыв.
    *   Оценка (👍 или 👎).
    *   Время оставления отзыва.
*   **Информация, передаваемая для обработки ИИ:**
    *   Текстовое содержание сообщений и подписей к медиа.
    *   Информация из изображений (обрабатывается моделью Google Gemini). Данные передаются через наш прокси-сервис.
    
## 3. Как мы собираем информацию

*   Информация из сообщений и данные пользователей собираются автоматически через Telegram Bot API, когда вы или другие участники отправляете сообщения в группе, где установлен Бот.
*   Настройки чата собираются при использовании команды \`/story_settings\` и взаимодействии с меню настроек.
*   Данные обратной связи собираются при нажатии на кнопки 👍/👎 под сгенерированными сводками.

## 4. Цели сбора и использования информации

Мы используем собранную информацию для следующих целей:

*   **Предоставление основной функциональности Бота:** Генерация ежедневных "Историй" или "Дайджестов", создание кратких выжимок по команде \`/summarize\`, расчет статистики чата по команде \`/chat_stats\`.
*   **Обработка с помощью Искусственного Интеллекта:** Передача текстовых данных и данных изображений (через прокси-сервис) в Google Gemini API для анализа и генерации текстовых сводок и комментариев.
*   **Персонализация:** Применение настроек чата (язык, время, личность, формат и т.д.), выбранных администратором.
*   **Функция "Вмешательства":** Генерация и отправка коротких комментариев в чат (только если эта функция явно включена администратором и соблюдены настроенные условия).
*   **Улучшение Бота:** Анализ данных обратной связи для повышения качества генерируемых сводок и работы Бота.
*   **Поддержка и Диагностика:** Помощь в устранении неполадок и ошибок в работе Бота.
*   **Обеспечение Соблюдения Политики:** Мониторинг использования для предотвращения злоупотреблений.

## 5. Хранение данных

*   Собранные данные (сообщения, настройки, отзывы) хранятся в базе данных SQLite, расположенной на нашем сервере ([Укажите тип хостинга/локацию, например: на виртуальной машине Cloud.ru в России]).
*   Срок хранения сообщений определяется настройкой "Срок хранения" (\`retention_days\`) в настройках чата. По умолчанию сообщения хранятся [Ваше значение DEFAULT_RETENTION_DAYS] дней. Администратор может изменить этот срок или установить бессрочное хранение (значение 0 или пусто). Сообщения старше установленного срока автоматически удаляются Ботом.
*   Администраторы могут вручную удалить всю историю сообщений, хранящуюся у Бота для их чата, с помощью команды \`/purge_history\`.
*   Настройки чата и данные обратной связи хранятся до тех пор, пока Бот установлен в чате или пока не будут удалены вручную.

## 6. Передача данных третьим лицам

Мы не продаем и не передаем вашу личную информацию третьим лицам в маркетинговых целях. Мы можем передавать некоторые данные следующим категориям третьих лиц только для обеспечения работы Бота:

*   **Google (Gemini API):** Текстовое содержание сообщений и информация из изображений передаются в Google Gemini API для обработки искусственным интеллектом и генерации сводок/комментариев. Передача осуществляется через наш защищенный прокси-сервис. Мы используем стандартные условия использования Google Cloud AI Services.
*   **Cloudflare (Workers):** Наш прокси-сервис, работающий на Cloudflare Workers, обрабатывает запросы к Google Gemini API и передает ответы обратно Боту. Cloudflare может собирать служебные логи в соответствии со своей политикой конфиденциальности.
*   **Telegram:** Платформа Telegram обрабатывает все сообщения и взаимодействия с Ботом в соответствии со своей Политикой Конфиденциальности.
*   **Хостинг-провайдеры:** [Название вашего хостинг-провайдера для сервера Бота, например, Cloud.ru] и [Название хостинг-провайдера для сайта, например, Vercel] могут иметь доступ к техническим логам серверов в соответствии со своими политиками.

Мы требуем от всех третьих лиц, с которыми мы делимся данными, соблюдения конфиденциальности и безопасности ваших данных.

## 7. Безопасность данных

Мы принимаем разумные технические и организационные меры для защиты собранной информации от несанкционированного доступа, изменения, раскрытия или уничтожения. К таким мерам относятся использование переменных окружения для хранения токенов и ключей API, ограничение доступа к серверам и базе данных. Однако ни один метод передачи данных через Интернет или метод электронного хранения не является на 100% безопасным.

## 8. Ваши права

В зависимости от вашего местоположения, у вас могут быть определенные права в отношении ваших данных. В рамках функциональности Бота, вы (или администратор вашего чата) можете:

*   Настроить срок хранения сообщений.
*   Удалить историю сообщений, хранящуюся у Бота, с помощью команды \`/purge_history\`.
*   Удалить Бота из чата, что приведет к прекращению сбора новых данных для этого чата.

Если вы хотите реализовать другие права (например, доступ, исправление данных) или у вас есть вопросы о ваших данных, пожалуйста, свяжитесь с нами.

## 9. Конфиденциальность детей

Наш Бот и Сайт не предназначены для использования лицами младше 13 лет (или иного возраста, установленного законодательством вашей страны). Мы сознательно не собираем личную информацию от детей. Если вы считаете, что мы могли получить информацию от ребенка, пожалуйста, свяжитесь с нами.

## 10. Изменения в Политике Конфиденциальности

Мы можем время от времени обновлять настоящую Политику Конфиденциальности. Мы уведомим вас о любых существенных изменениях, опубликовав новую Политику на Сайте ([Адрес вашего сайта]) и/или через канал поддержки Бота (https://t.me/letopisets_chat_official). Рекомендуется периодически просматривать эту Политику на предмет изменений.

`,

    // --- АНГЛИЙСКАЯ ВЕРСИЯ ---
    valueEn: `
# Privacy Policy for "Chat Chronicler" Bot

**Effective Date:** [Date, e.g., April 28, 2025]

## 1. Introduction

Welcome! This Privacy Policy describes how [Your Name or Project Name] ("we", "us", or "our") collects, uses, and discloses user information ("you") when you use our Telegram bot "Chat Chronicler" ("Bot") and its associated website ([Your Website Address]) ("Site").

By using the Bot or the Site, you agree to the terms of this Privacy Policy. If you do not agree with these terms, please do not use the Bot or the Site. Administrators of Telegram groups who add the Bot to their chats are responsible for informing their chat members about the Bot's operation and this Policy.

## 2. Information We Collect

The Bot collects the following information to perform its functions:

*   **Information from Group Messages:**
    *   Text content of messages.
    *   Telegram User ID and Username (if available) of the user sending the message.
    *   Chat ID of the group where the Bot is installed.
    *   Timestamp of the message.
    *   Type of message (text, photo, sticker, video, etc.).
    *   File ID and File Unique ID for media files (photos, videos, documents, etc.).
    *   Captions for media files.
*   **Chat Settings:**
    *   Bot interface language (\`lang\`).
    *   Bot activity status in the chat (\`enabled\`).
    *   Custom summary generation time (\`custom_schedule_time\`).
    *   Chat timezone (\`timezone\`).
    *   Selected genre for "Stories" (\`story_genre\`).
    *   Selected summary format ("Story" or "Digest") (\`output_format\`).
    *   Selected Chronicler personality (\`story_personality\`).
    *   Configured message retention period (\`retention_days\`).
    *   "Interventions" feature settings (\`allow_interventions\`, \`last_intervention_ts\`, \`intervention_cooldown_minutes\`, \`intervention_min_msgs\`, \`intervention_timespan_minutes\`).
*   **Feedback Data:**
    *   Telegram User ID of the user providing feedback.
    *   Chat ID and Message ID of the message the feedback refers to.
    *   Rating (👍 or 👎).
    *   Timestamp of the feedback.
*   **Information Transmitted for AI Processing:**
    *   Text content of messages and media captions.
    *   Information from images (processed by the Google Gemini model). Data is transmitted via our proxy service.

## 3. How We Collect Information

*   Information from messages and user data is collected automatically via the Telegram Bot API when you or other members send messages in a group where the Bot is installed.
*   Chat settings are collected when using the \`/story_settings\` command and interacting with the settings menu.
*   Feedback data is collected when you press the 👍/👎 buttons under generated summaries.

## 4. Purposes of Data Collection and Use

We use the collected information for the following purposes:

*   **Providing Core Bot Functionality:** Generating daily "Stories" or "Digests," creating brief summaries via the \`/summarize\` command, calculating chat statistics via the \`/chat_stats\` command.
*   **Artificial Intelligence Processing:** Transmitting text and image data (via a proxy service) to the Google Gemini API for analysis and generation of text summaries and comments.
*   **Personalization:** Applying chat settings (language, time, personality, format, etc.) selected by the administrator.
*   **"Interventions" Feature:** Generating and sending short comments in the chat (only if this feature is explicitly enabled by the administrator and the configured conditions are met).
*   **Bot Improvement:** Analyzing feedback data to enhance the quality of generated summaries and Bot performance.
*   **Support and Diagnostics:** Assisting in troubleshooting issues and errors in the Bot's operation.
*   **Policy Enforcement:** Monitoring usage to prevent abuse.

## 5. Data Storage

*   Collected data (messages, settings, feedback) is stored in an SQLite database located on our server ([Specify hosting type/location, e.g., on a Cloud.ru VM in Russia]).
*   The message retention period is determined by the "Retention Period" setting (\`retention_days\`) in the chat settings. By default, messages are stored for [Your DEFAULT_RETENTION_DAYS value] days. The administrator can change this period or set indefinite storage (value 0 or null). Messages older than the set period are automatically deleted by the Bot.
*   Administrators can manually delete the entire message history stored by the Bot for their chat using the \`/purge_history\` command.
*   Chat settings and feedback data are stored as long as the Bot is installed in the chat or until manually deleted.

## 6. Third-Party Data Sharing

We do not sell or transfer your personal information to third parties for marketing purposes. We may share some data with the following categories of third parties solely to ensure the Bot's operation:

*   **Google (Gemini API):** Text content of messages and information from images are sent to the Google Gemini API for artificial intelligence processing and generation of summaries/comments. Transmission occurs via our secure proxy service. We adhere to the standard terms of use for Google Cloud AI Services.
*   **Cloudflare (Workers):** Our proxy service, running on Cloudflare Workers, handles requests to the Google Gemini API and relays responses back to the Bot. Cloudflare may collect service logs according to its privacy policy.
*   **Telegram:** The Telegram platform processes all messages and interactions with the Bot according to its Privacy Policy.
*   **Hosting Providers:** [Your Bot Server Hosting Provider, e.g., Cloud.ru] and [Your Website Hosting Provider, e.g., Vercel] may have access to technical server logs in accordance with their policies.

We require all third parties with whom we share data to respect the confidentiality and security of your data.

## 7. Data Security

We take reasonable technical and organizational measures to protect the collected information from unauthorized access, alteration, disclosure, or destruction. Such measures include using environment variables for storing tokens and API keys, and restricting access to servers and databases. However, no method of transmission over the Internet or method of electronic storage is 100% secure.

## 8. Your Rights

Depending on your location, you may have certain rights regarding your data. Within the Bot's functionality, you (or your chat administrator) can:

*   Configure the message retention period.
*   Delete the message history stored by the Bot using the \`/purge_history\` command.
*   Remove the Bot from the chat, which will cease the collection of new data for that chat.

If you wish to exercise other rights (e.g., access, correction) or have questions about your data, please contact us.

## 9. Children's Privacy

Our Bot and Site are not intended for use by individuals under the age of 13 (or the relevant age in your jurisdiction). We do not knowingly collect personal information from children. If you believe we may have received information from a child, please contact us.

## 10. Changes to This Privacy Policy

We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new Policy on the Site ([Your Website Address]) and/or via the Bot's support channel (https://t.me/letopisets_chat_official). It is recommended to review this Policy periodically for any changes.

` }, // Конец объекта для privacy_policy_text

 {
  key: 'support_channel_link',
  valueRu: 'https://t.me/letopisets_chat_official', // Ваша ссылка
  valueEn: 'https://t.me/letopisets_chat_official'  // Ваша ссылка
 },
 {
  key: 'developer_contact_link',
  valueRu: 'https://t.me/nikirO1', // Ваша ссылка
  valueEn: 'https://t.me/nikirO1'  // Ваша ссылка
},
// Добавьте также ключи для ТЕКСТА кнопок, если еще не добавили
 { key: 'support_channel_button', valueRu: 'Канал поддержки', valueEn: 'Support Channel'},
 { key: 'developer_contact_button', valueRu: 'Связаться с разработчиком', valueEn: 'Contact Developer'},
 // Ключи для заголовка и текста секции
 { key: 'contact_info_title', valueRu: 'Контактная информация', valueEn: 'Contact Information'},
 { key: 'contact_info_text', valueRu: 'Если у вас есть вопросы по поводу политики конфиденциальности, свяжитесь с нами:', valueEn: 'If you have questions about this privacy policy, please contact us:'},
  // FAQ Page (Items as a JSON string)
  { key: 'faq_items', valueRu: JSON.stringify([
    { question: 'Почему боту нужны права администратора?',
      answer: 'Права нужны для чтения сообщений (чтобы анализировать чат и создавать сводки) и для отправки этих сводок в чат. Бот не будет банить пользователей, менять настройки чата или удалять сообщения (кроме как по явной команде администратора `/purge_history`).'
    },
    { question: 'Где хранятся данные моего чата?',
      answer: 'Сообщения и настройки чата хранятся в базе данных SQLite на защищенном сервере [Укажите хостинг, если хотите, напр. Cloud.ru]. Доступ к базе строго ограничен. Данные сообщений и изображений передаются в Google Gemini API через наш защищенный прокси исключительно для генерации текста сводок и не хранятся у Google после обработки.'
    },
    { question: 'Как изменить настройки (время, язык, личность и т.д.)?',
      answer: 'Все настройки доступны по команде `/story_settings` внутри чата, где установлен бот. Эту команду могут использовать только администраторы чата.'
    },
    { question: 'Бот перестал отправлять сводки. Что делать?',
      answer: '1. **Проверьте статус:** Убедитесь, что бот включен для чата командой `/story_settings`. \n2. **Проверьте права:** Убедитесь, что у бота все еще есть права администратора в чате (особенно право читать и отправлять сообщения). \n3. **Попробуйте вручную:** Выполните команду `/generate_now`, чтобы проверить, генерируется ли сводка по запросу. \n4. **Проверьте канал поддержки:** Загляните в наш канал @letopisets_chat_official – возможно, есть информация о временных сбоях.'
    },
    { question: 'Как работают "Вмешательства"? Это безопасно?',
      answer: 'Функция "Вмешательства" позволяет боту (если она включена в `/story_settings`) иногда отправлять короткие комментарии в стиле выбранной Личности, основываясь на последних сообщениях. Это экспериментальная функция для оживления чата. Она не отвечает пользователям напрямую и не должна содержать оскорблений. Вы можете полностью отключить ее или настроить частоту появления в настройках. Используйте на свое усмотрение.'
    },
    { question: 'Бот платный?',
      answer: 'Сам бот предоставляется бесплатно. Однако для генерации текста он использует внешний сервис Google Gemini API. На данный момент использование этого сервиса через бота бесплатно в разумных пределах. В будущем возможны изменения в тарификации API, о чем мы сообщим в канале поддержки.'
    },
    { question: 'Сводка получилась странной или неточной. Почему?',
      answer: 'Качество генерации зависит от возможностей искусственного интеллекта (ИИ) и характера сообщений в вашем чате за день. Иногда ИИ может неправильно интерпретировать контекст или допустить неточности. Пожалуйста, используйте кнопки 👍/👎 под сводкой – ваш фидбек очень важен для улучшения алгоритмов! Также вы можете попробовать пересоздать сводку командой `/regenerate_story`.'
    },
    { question: 'Как удалить историю сообщений, которую хранит бот?',
      answer: 'Администратор чата может использовать команду `/purge_history all` для удаления всей истории или `/purge_history days N`, чтобы удалить сообщения старше N дней. Также в `/story_settings` можно настроить автоматическое удаление старых сообщений по истечении заданного срока (например, 90 дней).'
    }
  ]), valueEn: JSON.stringify([
    { question: 'Why does the bot need admin rights?',
      answer: 'Permissions are needed to read messages (to analyze the chat and create summaries) and to send these summaries to the chat. The bot will not ban users, change chat settings, or delete messages (except via the explicit `/purge_history` command by an admin).'
    },
    { question: 'Where is my chat data stored?',
      answer: 'Messages and chat settings are stored in an SQLite database on a secure server [Specify hosting if desired, e.g., Cloud.ru]. Access to the database is strictly limited. Message and image data is sent to the Google Gemini API via our secure proxy solely for generating summary text and is not retained by Google after processing.'
    },
    { question: 'How to change settings (time, language, personality, etc.)?',
      answer: 'All settings are available via the `/story_settings` command within the chat where the bot is installed. Only chat administrators can use this command.'
    },
    { question: 'The bot stopped sending summaries. What should I do?',
      answer: '1. **Check Status:** Ensure the bot is enabled for the chat using the `/story_settings` command.\n2. **Check Permissions:** Verify that the bot still has administrator rights in the chat (especially the rights to read and send messages).\n3. **Try Manually:** Execute the `/generate_now` command to see if a summary is generated on demand.\n4. **Check Support Channel:** Look at our channel @letopisets_chat_official – there might be information about temporary outages.'
    },
    { question: 'How do "Interventions" work? Is it safe?',
      answer: '"Interventions" is an optional feature (enabled via `/story_settings`) that allows the bot to occasionally send short comments in the style of the selected Personality, based on recent messages. It\'s an experimental feature to liven up the chat. It doesn\'t reply directly to users and should not contain insults. You can disable it entirely or configure its frequency in the settings. Use at your discretion.'
    },
    { question: 'Is the bot free?',
      answer: 'The bot itself is provided free of charge. However, it uses the external Google Gemini API for text generation. Currently, using this service through the bot is free within reasonable limits. API pricing might change in the future, and we will announce any changes in the support channel.'
    },
    { question: 'The summary seems weird or inaccurate. Why?',
      answer: 'The generation quality depends on the Artificial Intelligence (AI) capabilities and the nature of the messages in your chat for that day. Sometimes the AI might misinterpret context or make inaccuracies. Please use the 👍/👎 buttons under the summary – your feedback is crucial for improving the algorithms! You can also try regenerating the summary with the `/regenerate_story` command.'
    },
    { question: 'How to delete the message history stored by the bot?',
      answer: 'A chat administrator can use the `/purge_history all` command to delete the entire history or `/purge_history days N` to delete messages older than N days. You can also configure automatic deletion of old messages after a set period (e.g., 90 days) in `/story_settings`.'
    }
  ]) },
  // ... добавьте ВСЕ ОСТАЛЬНЫЕ ключи, используемые в t() ...
];

const featuresData = [
  // ЗАПОЛНИТЕ РЕАЛЬНЫМИ ОПИСАНИЯМИ
  { titleRu: 'Истории и Дайджесты', titleEn: 'Stories & Digests', descriptionRu: 'Бот создает ежедневные сводки в виде связной истории или краткого дайджеста.', descriptionEn: 'The bot creates daily summaries as a coherent story or a concise digest.', icon: 'BookOpen', order: 1 },
  { titleRu: 'Личности ИИ', titleEn: 'AI Personalities', descriptionRu: 'Выберите, кто будет писать сводку: Мудрец, Поэт, Саркаст или Нейтральный наблюдатель.', descriptionEn: 'Choose who writes the summary: Wise Elder, Poet, Sarcastic Observer, or Neutral narrator.', icon: 'UserCircle', order: 2 },
  { titleRu: 'Анализ Изображений', titleEn: 'Image Analysis', descriptionRu: 'Летописец может "видеть" изображения и учитывать их при составлении сводки.', descriptionEn: 'The Chronicler can "see" images and consider them when creating the summary.', icon: 'Image', order: 3 },
  { titleRu: 'Статистика Чата', titleEn: 'Chat Statistics', descriptionRu: 'Получите статистику активности: топ пользователей, количество сообщений, фото, стикеров.', descriptionEn: 'Get activity statistics: top users, message counts, photos, stickers.', icon: 'BarChart', order: 4 },
  { titleRu: 'Гибкая Настройка', titleEn: 'Flexible Settings', descriptionRu: 'Настройте время, язык, формат, личность, срок хранения и другие параметры под ваш чат.', descriptionEn: 'Customize time, language, format, personality, retention period, and other parameters for your chat.', icon: 'Settings', order: 5 },
  // ... добавьте другие фичи, если есть ...
];

const examplesData = [
  // ЗАПОЛНИТЕ РЕАЛЬНЫМИ ПРИМЕРАМИ ТЕКСТА
  { personalityRu: 'Мудрец', personalityEn: 'Wise Elder', contentRu: 'День прошел в размышлениях о вечном и обсуждении планов на выходные. Помните, что путь в тысячу ли начинается с одного шага...', contentEn: 'The day passed in contemplation of the eternal and discussion of weekend plans. Remember, the journey of a thousand miles begins with a single step...', order: 1 },
  { personalityRu: 'Саркастичный Наблюдатель', personalityEn: 'Sarcastic Observer', contentRu: 'Уровень прокрастинации достиг новых высот, сопровождаемый активным обменом мемами. Кажется, продуктивность сегодня не в приоритете.', contentEn: 'Procrastination levels reached new heights, accompanied by active meme exchange. Productivity seems not to be a priority today.', order: 2 },
  { personalityRu: 'Поэт-Романтик', personalityEn: 'Romantic Poet', contentRu: 'Словно бабочки, идеи порхали в чате, оставляя легкий след вдохновения. Вечер окутал беседу теплым пледом уюта.', contentEn: 'Like butterflies, ideas fluttered through the chat, leaving a light trail of inspiration. The evening wrapped the conversation in a warm blanket of comfort.', order: 3 },
  { personalityRu: 'Нейтральный', personalityEn: 'Neutral', contentRu: 'В течение дня обсуждались рабочие задачи X и Y. Пользователь А поделился ссылкой на статью. Активность была средней.', contentEn: 'During the day, work tasks X and Y were discussed. User A shared a link to an article. Activity was moderate.', order: 4 },
  // ... добавьте другие примеры, если есть ...
];

// ============================================================================
// --- Логика Сидинга ---
// ============================================================================

async function main() {
  console.log(`Start seeding ...`);

  // Seed Content
  console.log('Seeding Content...');
  for (const item of contentData) {
    try {
        const content = await prisma.content.upsert({
          where: { key: item.key },
          update: { valueRu: item.valueRu, valueEn: item.valueEn },
          create: item,
        });
        console.log(`  Upserted content key: ${content.key}`);
    } catch(error) {
        console.error(`  Failed to upsert content key ${item.key}:`, error)
    }
  }

  // Seed Features
  console.log('Seeding Features...');
  for (const item of featuresData) {
     try {
        // Используем order как уникальный идентификатор для upsert
        const feature = await prisma.feature.upsert({
          where: { order: item.order }, // Убедитесь, что order уникален!
          update: {
              titleRu: item.titleRu, titleEn: item.titleEn,
              descriptionRu: item.descriptionRu, descriptionEn: item.descriptionEn,
              icon: item.icon
          },
          create: item,
        });
        console.log(`  Upserted feature order ${feature.order}: ${feature.titleEn}`);
    } catch(error) {
        console.error(`  Failed to upsert feature order ${item.order}:`, error)
    }
  }

  // Seed Examples
  console.log('Seeding Examples...');
  for (const item of examplesData) {
    try {
        // Используем order как уникальный идентификатор для upsert
        const example = await prisma.example.upsert({
          where: { order: item.order }, // Убедитесь, что order уникален!
           update: {
              personalityRu: item.personalityRu, personalityEn: item.personalityEn,
              contentRu: item.contentRu, contentEn: item.contentEn
           },
          create: item,
        });
        console.log(`  Upserted example order ${example.order}: ${example.personalityEn}`);
     } catch(error) {
        console.error(`  Failed to upsert example order ${item.order}:`, error)
    }
  }

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    console.log('Disconnecting Prisma Client...');
    await prisma.$disconnect();
  });