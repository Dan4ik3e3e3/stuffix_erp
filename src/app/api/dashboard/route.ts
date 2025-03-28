import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

type ActivityLog = {
  type: string;
  createdAt: Date;
};

// Указываем, что этот маршрут динамический
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Получаем метрики
    const [
      clientsCount,
      projectsCount,
      messagesCount,
      tasksCount
    ] = await Promise.all([
      prisma.client.count(),
      prisma.project.count(),
      prisma.message.count(),
      prisma.task.count()
    ]);

    // Получаем данные активности за последние 7 дней
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const activityLogs = await prisma.activityLog.findMany({
      where: {
        createdAt: {
          gte: sevenDaysAgo
        }
      },
      select: {
        type: true,
        createdAt: true
      }
    }) as ActivityLog[];

    // Преобразуем данные в нужный формат
    const activityData = Array.from({ length: 7 }).map((_, index) => {
      const date = new Date();
      date.setDate(date.getDate() - index);
      const dateStr = date.toISOString().split('T')[0];

      return {
        date: dateStr,
        visits: activityLogs.filter((log: ActivityLog) => log.type === 'visit').length,
        messages: activityLogs.filter((log: ActivityLog) => log.type === 'message').length,
        tasks: activityLogs.filter((log: ActivityLog) => log.type === 'task').length
      };
    }).reverse();

    return NextResponse.json({
      metrics: {
        clients: clientsCount,
        projects: projectsCount,
        messages: messagesCount,
        tasks: tasksCount
      },
      activityData
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
} 