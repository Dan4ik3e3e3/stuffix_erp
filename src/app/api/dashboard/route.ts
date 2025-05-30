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
    
    if (!session?.user?.id) {
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
      prisma.message.count({
        where: {
          OR: [
            { fromId: session.user.id },
            { toId: session.user.id }
          ]
        }
      }),
      prisma.task.count({
        where: {
          assignedTo: session.user.id
        }
      })
    ]);

    // Получаем данные активности за последние 7 дней
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const activityLogs = await prisma.activityLog.findMany({
      where: {
        userId: session.user.id,
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

      const dayLogs = activityLogs.filter((log: ActivityLog) => {
        const logDate = new Date(log.createdAt);
        return logDate.toISOString().split('T')[0] === dateStr;
      });

      return {
        date: dateStr,
        visits: dayLogs.filter(log => log.type === 'visit').length,
        messages: dayLogs.filter(log => log.type === 'message').length,
        tasks: dayLogs.filter(log => log.type === 'task').length
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