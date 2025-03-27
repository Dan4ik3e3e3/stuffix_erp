This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Stuffix ERP

## Создание администратора

Для создания первого администратора системы выполните следующие команды в MongoDB Shell:

```mongodb
// Проверяем, есть ли уже пользователи
const usersCount = db.users.countDocuments();

if (usersCount > 0) {
  print('Admin already exists');
} else {
  // Создаем администратора
  db.users.insertOne({
    name: 'Admin',
    email: 'dkuzmitskiyy@bk.ru',
    password: '$2b$12$aiG/dqbJET5YwCy14IVuf.hpbzov/tphxXdBhkj3LzmgiFxPOhMqi',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  });
  print('Admin created successfully');
}
```

После создания администратора вы сможете войти в систему с учетными данными:
- Email: dkuzmitskiyy@bk.ru
- Пароль: Strelok101
