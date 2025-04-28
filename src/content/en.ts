// src/content/en.ts
import type { ContentData } from './types';

export const enContent: ContentData = {
  site_name: "Chat Chronicler",
  hero_title: "Chat Chronicler: Turn Chat Chaos into Engaging AI Stories!",
  hero_subtitle: "AI assistant for Telegram groups that analyzes message history and generates unique daily summaries.",
  cta_button: "Add to Telegram",
  telegram_bot_username: "LetopisetsChatBot", // Use the actual username!
  bot_image: "/images/bot-avatar.png", // Path to image in /public
  bot_image_alt: "Chat Chronicler Demo",
  qr_code_button: "QR Code",
  qr_code_scan_text: "Scan to add bot",
  qr_code_title_centered: "Quick Start with QR",
  qr_code_subtitle_centered: "Point your phone's camera at the QR code to quickly add Chat Chronicler to your Telegram group.",
  qr_code_enlarge_hint: "(Click to enlarge)",
  problem_title: "Problem: Information Overload",
  problem_text: "Active chats fill up quickly, making it hard to track important discussions. Missing a day can mean losing crucial context.",
  solution_title: "Solution: Chat Chronicler",
  solution_text: "Chat Chronicler analyzes all messages and creates engaging daily summaries in your chosen style, helping everyone stay informed.",
  features_title: "Key Features",
  view_all_features: "View All Features",
  how_it_works_title: "How It Works",
  step1_title: "Add the Bot",
  step1_text: "Add Chat Chronicler to your Telegram group.",
  step2_title: "Grant Permissions",
  step2_text: "Provide the bot with admin rights to read messages.",
  step3_title: "Configure",
  step3_text: "Choose the format, AI personality, and summary generation time.",
  step4_title: "Get Summaries",
  step4_text: "Enjoy daily summaries in your selected style.",
  setup_title: "Setup & Configuration",
  setup_intro: "Follow these simple steps to get the Chronicler working in your chat.",
  setup_permissions_title: "Why Admin Rights Needed?",
  setup_permissions_text: "Admin rights are required for the bot to read all messages in the group (including history), send summaries, and execute setting commands. The bot will not perform any other admin actions.",
  step_by_step_title: 'Step-by-Step Guide',
  settings_admin_only: '(Command available only to chat administrators)',
  examples_title: "Summary Examples from Different Personalities",
  privacy_title: "Privacy & Security",
  privacy_text: "The bot stores messages in an encrypted database. You can configure the retention period or clear the history at any time. Data is sent to the Google Gemini API via a secure proxy.",
  privacy_policy_title: "Privacy Policy",
  privacy_policy_text: `
  # Privacy Policy for "Chat Chronicler" Bot

**Effective Date:** April 28, 2025

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
`, 
  final_cta_title: "Ready to try Chat Chronicler?",
  final_cta_text: "Add the bot to your Telegram group right now!",
  final_cta_setup_button: "Setup Instructions",
  footer_copyright: `© ${new Date().getFullYear()} Chat Chronicler. All rights reserved.`,
  faq_page_title: "Support / FAQ / Community",
  faq_link_footer: "Support / FAQ",
  support_section_title: "Support & Community",
  support_channel_card_title: "Support Channel",
  support_channel_card_text: "Join our official channel for updates, tips, and support:",
  support_channel_button: "Go to Channel",
  support_channel_link: 'https://t.me/letopisets_chat_official',
  developer_contact_card_title: "Contact Developer",
  developer_contact_card_text: "For direct contact with the developer or to suggest ideas:",
  developer_contact_button: "Send Message",
  developer_contact_link: 'https://t.me/nikirO1',
  faq_section_title: "Frequently Asked Questions",
  faq_loading_or_error: "Questions not found or failed to load.",
  feedback_card_title: "Suggest an Idea / Report a Bug",
  feedback_card_text: "We value your feedback and are constantly working to improve Chat Chronicler.",
  feedback_button: "Send Feedback",
  feedback_contact_link: 'https://t.me/nikirO1',
  contact_info_title: "Contact Information",
  contact_info_text: "If you have questions about this privacy policy, please contact us:",
  toggle_language_aria: 'Toggle language',
  toggle_menu_aria: 'Toggle menu',

  features: [
    { id: 'f1', title: 'Stories & Digests', description: 'Choose between a coherent narrative or a structured list of key events.', icon: 'BookOpen', order: 1 },
    { id: 'f2', title: 'Unique AI Personalities', description: 'Customize the bot\'s character: Neutral, Wise Elder, Sarcastic Observer, or Romantic Poet.', icon: 'UserCircle', order: 2 },
    { id: 'f3', title: 'Image Analysis', description: 'The bot understands the context of up to 5 images per day and includes their descriptions in the summary.', icon: 'Image', order: 3 },
    { id: 'f4', title: 'Chat Statistics', description: 'Get chat activity data: message counts, photos, stickers, and top users.', icon: 'BarChart', order: 4 },
    { id: 'f5', title: 'Flexible Settings', description: 'Configure language, format, generation time, time zone, and message retention period.', icon: 'Settings', order: 5 },
    // Add other features if needed
  ],
  examples: [
    // Add your examples
    { id: 'e1', personality: 'Neutral', content: 'Today the chat discussed a new movie. Maria shared the trailer, while Ivan and Alex expressed opposing views on the director...', order: 1 },
    { id: 'e2', personality: 'Wise Elder', content: 'In the stream of our chat\'s time today, the art of cinema was reflected. Maria, like a messenger, brought us a vision of a future creation...', order: 2 },
    { id: 'e3', personality: 'Sarcastic Observer', content: 'Oh, we had a real film club today! Maria decided we\'d all die of curiosity if we didn\'t see THIS trailer...', order: 3 },
    { id: 'e4', personality: 'Romantic Poet', content: 'In the twilight of our chat\'s digital space, the beautiful flower of art blossomed today. Maria\'s gentle fingers touched our hearts...', order: 4 },
  ],
  faq_items: [
    // Add your FAQs
    { question: 'Why does the bot need admin rights?', answer: 'Admin rights are required for the bot to read all messages in the group (including history), send summaries, and execute setting commands. The bot will not perform any other admin actions.' },
    { question: 'Where is my chat data stored?', answer: 'Data is stored in an encrypted SQLite database on a secure server. You can configure the message retention period or delete them at any time using the /purge_history command.' },
    { question: 'The bot isn\'t working, what should I do?', answer: 'Ensure the bot has admin rights and access to messages. Check settings with /story_settings. If the problem persists, contact us via the support channel.' },
    { question: 'How to change the summary generation time?', answer: 'Use the /story_settings command and select "Generation Time". You can set any convenient time and configure the time zone.' },
    { question: 'What are "Interventions" and how to disable them?', answer: 'Interventions is an optional feature where the bot occasionally sends short comments in chat. You can disable them via /story_settings in the "Interventions" section.' },
  ],
};