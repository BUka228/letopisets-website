// src/app/api/content/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Параллельно запрашиваем данные
    const [content, features, examples] = await Promise.all([
      prisma.content.findMany(),
      prisma.feature.findMany({ orderBy: { order: 'asc' } }), // Сортируем по order
      prisma.example.findMany({ orderBy: { order: 'asc' } }), // Сортируем по order
    ]);

    // Формируем ответ
    const responseData = {
      content,
      features,
      examples,
    };

    // Возвращаем JSON
    return NextResponse.json(responseData);

  } catch (error) {
    console.error("API Error fetching content:", error);
    return NextResponse.json(
      { error: "Failed to fetch content" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // Закрываем соединение
  }
}