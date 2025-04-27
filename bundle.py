import os
import argparse
import fnmatch
from pathlib import Path
import datetime

# --- КОНФИГУРАЦИЯ СКРИПТА ---

# Файлы и шаблоны для ВКЛЮЧЕНИЯ в бандл
# Используйте стандартные Unix-шаблоны (glob): *, ?, []
INCLUDE_PATTERNS = [
    # Конфигурация проекта
    "package.json",
    "tailwind.config.ts",        # Конфиг Tailwind
    "postcss.config.mjs",        # Конфиг PostCSS
    "tsconfig.json",             # Конфиг TypeScript
    "next.config.mjs",           # Конфиг Next.js (или .js/.ts)

    # Prisma / База данных
    "prisma/schema.prisma",      # Схема БД
    "prisma/seed.ts",            # Скрипт наполнения БД

    # Исходный код Next.js App Router
    "src/app/layout.tsx",        # Корневой макет
    "src/app/globals.css",       # Глобальные стили
    "src/app/providers.tsx",     # Клиентские провайдеры
    "src/app/api/content/route.ts",# API маршрут для контента
    "src/app/_components/*.tsx", # Основные компоненты (Layout, Provider)
    "src/app/**/page.tsx",       # ВСЕ страницы во всех подпапках app

    # Клиент API
    "src/client/api.ts",

    # Компоненты UI (shadcn/ui) - РАСКОММЕНТИРУЙТЕ, если изменяли их и хотите включить
    # "src/components/ui/button.tsx",
    # "src/components/ui/card.tsx",
    # "src/components/ui/separator.tsx",
    # "src/components/ui/skeleton.tsx", # Добавьте другие, если нужно

    # Прочее
    ".gitignore",
    "README.md",                 # Полезно для контекста
]

# Файлы, папки и шаблоны для ИСКЛЮЧЕНИЯ из бандла
EXCLUDE_PATTERNS = [
    # Стандартные исключения
    "node_modules/*",
    ".next/*",
    "*.log",
    ".env*",                     # Исключаем .env файлы (ВАЖНО!)
    "*.lock",                    # Исключаем lock-файлы (package-lock.json, yarn.lock)

    # Специфичные для проекта (можно добавить)
    "public/*",                  # Исключаем статические ассеты (картинки и т.д.)
    "prisma/migrations/*",       # Исключаем сгенерированные миграции
    "prisma/dev.db*",            # Исключаем локальную SQLite БД (если используется)

    # Исключаем стандартные компоненты UI, если они не изменялись
    "src/components/ui/*",       # ЗАКОММЕНТИРУЙТЕ, если хотите включить UI компоненты
    "src/lib/utils.ts",          # Стандартный utils.ts от shadcn, если не меняли
]

# Имя выходного файла
OUTPUT_FILENAME = "website_bundle.txt"

# --- КОНЕЦ КОНФИГУРАЦИИ ---

def should_include(filepath: Path, project_root: Path, include_patterns: list, exclude_patterns: list) -> bool:
    """Проверяет, должен ли файл быть включен в бандл."""
    relative_path_str = str(filepath.relative_to(project_root)).replace("\\", "/")

    # 1. Проверка на исключение
    for pattern in exclude_patterns:
        if fnmatch.fnmatch(relative_path_str, pattern) or \
           any(fnmatch.fnmatch(part, pattern.rstrip('/*')) for part in filepath.relative_to(project_root).parts if Path(project_root, part).is_dir()):
             # Добавлена проверка на исключение директории по шаблону (например, "node_modules/*")
            # print(f"Excluding '{relative_path_str}' due to pattern '{pattern}'") # Отладка
            return False

    # 2. Проверка на включение
    for pattern in include_patterns:
        if fnmatch.fnmatch(relative_path_str, pattern):
            # print(f"Including '{relative_path_str}' due to pattern '{pattern}'") # Отладка
            return True

    # print(f"Skipping '{relative_path_str}' (no include pattern match)") # Отладка
    return False


def create_bundle(project_dir: str, output_file: str, include_patterns: list, exclude_patterns: list):
    """Создает бандл-файл из указанных файлов проекта."""
    project_path = Path(project_dir).resolve()
    output_path = Path(output_file).resolve()
    included_files_count = 0

    if not project_path.is_dir():
        print(f"Ошибка: Директория проекта '{project_dir}' не найдена.")
        return

    print(f"Начинаю сборку бандла для проекта: {project_path}")
    print(f"Выходной файл: {output_path}")

    try:
        with open(output_path, "w", encoding="utf-8") as outfile:
            now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            outfile.write("=" * 79 + "\n")
            outfile.write(f" ПРОЕКТНЫЙ БАНДЛ\n")
            outfile.write(f" Создан: {now}\n")
            outfile.write(f" Исходная директория: {project_path}\n")
            outfile.write("=" * 79 + "\n\n")

            # Используем rglob для рекурсивного поиска всех файлов
            for filepath in project_path.rglob('*'):
                if filepath.is_file():
                    if should_include(filepath, project_path, include_patterns, exclude_patterns):
                        relative_path_str = str(filepath.relative_to(project_path)).replace("\\", "/")
                        print(f"  Добавляю: {relative_path_str}")
                        included_files_count += 1

                        outfile.write(f"--- START OF FILE: {relative_path_str} ---\n\n")
                        try:
                            with open(filepath, "r", encoding="utf-8", errors='ignore') as infile:
                                outfile.write(infile.read())
                        except Exception as e:
                            outfile.write(f"\n--- ОШИБКА ЧТЕНИЯ ФАЙЛА: {e} ---\n")
                            print(f"  Предупреждение: Не удалось прочитать файл {relative_path_str}: {e}")
                        outfile.write(f"\n\n--- END OF FILE: {relative_path_str} ---\n\n")
                        outfile.write("-" * 79 + "\n\n") # Добавим разделитель

            outfile.write("=" * 79 + "\n")
            outfile.write(" КОНЕЦ БАНДЛА\n")
            outfile.write("=" * 79 + "\n")

        print("-" * 30)
        print(f"✅ Бандл успешно создан: {output_path}")
        print(f"   Включено файлов: {included_files_count}")
        print("-" * 30)

    except IOError as e:
        print(f"Ошибка записи в файл '{output_path}': {e}")
    except Exception as e:
        print(f"Произошла непредвиденная ошибка: {e}")

if __name__ == "__main__":
    # Настройка парсера аргументов командной строки
    parser = argparse.ArgumentParser(description="Собрать необходимые файлы проекта в один текстовый бандл.")
    parser.add_argument(
        "project_dir",
        nargs='?',
        default='.', # По умолчанию текущая директория
        help="Путь к корневой директории проекта (по умолчанию: текущая директория)."
    )
    parser.add_argument(
        "-o", "--output",
        default=OUTPUT_FILENAME,
        help=f"Имя выходного файла бандла (по умолчанию: {OUTPUT_FILENAME})."
    )

    args = parser.parse_args()

    # Запуск функции сборки бандла
    create_bundle(args.project_dir, args.output, INCLUDE_PATTERNS, EXCLUDE_PATTERNS)