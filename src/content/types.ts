// src/content/types.ts

export type Language = "ru" | "en";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FeatureData {
  id: string; // Можно использовать просто titleEn как ID
  title: string;
  description: string;
  icon: string; // Ключ для iconMap
  order: number;
}

export interface ExampleData {
   id: string; // Можно использовать personalityEn как ID
   personality: string;
   content: string;
   order: number;
}

// Общий интерфейс для данных одного языка
// ВАЖНО: Добавьте сюда ВСЕ ключи, которые вы планируете использовать с функцией t()
export interface ContentData {
  site_name: string;
  hero_title: string;
  hero_subtitle: string;
  cta_button: string;
  telegram_bot_username: string;
  bot_image: string;
  bot_image_alt: string;
  qr_code_button: string;
  qr_code_scan_text: string;
  qr_code_title_centered: string;
  qr_code_subtitle_centered: string;
  qr_code_enlarge_hint: string;
  problem_title: string;
  problem_text: string;
  solution_title: string;
  solution_text: string;
  features_title: string;
  view_all_features: string;
  how_it_works_title: string;
  step1_title: string;
  step1_text: string;
  step2_title: string;
  step2_text: string;
  step3_title: string;
  step3_text: string;
  step4_title: string;
  step4_text: string;
  setup_title: string; // Заголовок страницы установки
  setup_intro: string;
  setup_permissions_title: string;
  setup_permissions_text: string;
  copy_instructions_button?: string; // Опционально, если убрали
  copied_button?: string;           // Опционально
  step_by_step_title: string;
  settings_admin_only: string;
  examples_title: string;
  privacy_title: string;
  privacy_text: string; // Краткий текст для главной
  privacy_policy_title: string;
  privacy_policy_text: string; // Полный текст Markdown
  final_cta_title: string;
  final_cta_text: string;
  final_cta_setup_button: string;
  footer_copyright: string;
  faq_page_title: string;
  faq_link_footer: string;
  support_section_title: string;
  support_channel_card_title: string;
  support_channel_card_text: string;
  support_channel_button: string;
  support_channel_link?: string;
  developer_contact_card_title: string;
  developer_contact_card_text: string;
  developer_contact_button: string;
  developer_contact_link?: string;
  faq_section_title: string;
  faq_loading_or_error: string; // Для сообщения в FAQ
  feedback_card_title: string;
  feedback_card_text: string;
  feedback_button: string;
  feedback_contact_link?: string;
  contact_info_title: string;
  contact_info_text: string;
  toggle_language_aria: string; // Для доступности
  toggle_menu_aria: string; // Для доступности

  // Массивы данных
  features: FeatureData[];
  examples: ExampleData[];
  faq_items: FaqItem[];
}