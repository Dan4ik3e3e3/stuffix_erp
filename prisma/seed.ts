import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Создаем тестового пользователя
  const user = await prisma.user.create({
    data: {
      name: 'Test User',
      email: 'test@example.com',
    },
  });

  // Создаем клиентов
  const clients = await Promise.all(
    Array.from({ length: 5 }).map((_, i) =>
      prisma.client.create({
        data: {
          name: `Client ${i + 1}`,
          email: `client${i + 1}@example.com`,
          phone: `+7900555${String(i + 1).padStart(4, '0')}`,
        },
      })
    )
  );

  // Создаем проекты
  const projects = await Promise.all(
    Array.from({ length: 3 }).map((_, i) =>
      prisma.project.create({
        data: {
          name: `Project ${i + 1}`,
          description: `Description for project ${i + 1}`,
          status: ['active', 'completed', 'pending'][i],
          clientId: clients[i % clients.length].id,
        },
      })
    )
  );

  // Создаем сообщения
  await Promise.all(
    Array.from({ length: 10 }).map((_, i) =>
      prisma.message.create({
        data: {
          content: `Test message ${i + 1}`,
          fromId: user.id,
          toId: clients[i % clients.length].id,
        },
      })
    )
  );

  // Создаем задачи
  await Promise.all(
    Array.from({ length: 8 }).map((_, i) =>
      prisma.task.create({
        data: {
          title: `Task ${i + 1}`,
          description: `Description for task ${i + 1}`,
          status: ['todo', 'in_progress', 'done'][i % 3],
          assignedTo: user.id,
          projectId: projects[i % projects.length].id,
        },
      })
    )
  );

  // Создаем логи активности
  const today = new Date();
  await Promise.all(
    Array.from({ length: 7 }).map((_, i) => {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      return Promise.all([
        prisma.activityLog.create({
          data: {
            type: 'visit',
            userId: user.id,
            createdAt: date,
          },
        }),
        prisma.activityLog.create({
          data: {
            type: 'message',
            userId: user.id,
            createdAt: date,
          },
        }),
        prisma.activityLog.create({
          data: {
            type: 'task',
            userId: user.id,
            createdAt: date,
          },
        }),
      ]);
    })
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 