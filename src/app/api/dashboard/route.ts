import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

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

    const activityLogs = await prisma.activityLog.groupBy({
      by: ['type'],
      where: {
        createdAt: {
          gte: sevenDaysAgo
        }
      },
      _count: true
    });

    // Преобразуем данные в нужный формат
    const activityData = Array.from({ length: 7 }).map((_, index) => {
      const date = new Date();
      date.setDate(date.getDate() - index);
      const dateStr = date.toISOString().split('T')[0];

      return {
        date: dateStr,
        visits: activityLogs.find(log => log.type === 'visit')?._count ?? 0,
        messages: activityLogs.find(log => log.type === 'message')?._count ?? 0,
        tasks: activityLogs.find(log => log.type === 'task')?._count ?? 0
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