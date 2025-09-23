const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  // Hash the password before storing
  const hashedPassword = await bcrypt.hash('123456', 10);
  // Örnek kullanıcı ekle
  await prisma.user.create({
    data: {
      name: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: hashedPassword,
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
