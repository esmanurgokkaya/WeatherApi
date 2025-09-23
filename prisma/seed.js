const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Örnek kullanıcı ekle
  await prisma.user.create({
    data: {
      name: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: '123456',
      preferences: {
        create: {
          tempUnit: 'C',
          windUnit: 'kmh',
          notifyChannel: 'email'
        }
      }
    }
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
