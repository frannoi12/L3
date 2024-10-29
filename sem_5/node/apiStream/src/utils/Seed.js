import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

class Seed {
  async run() {
    await this.createUsers();
  }

  async createUsers() {
    const users = [
      { email: 'alice@example.com', name: 'Alice' },
      { email: 'bob@example.com', name: 'Bob' },
      { email: 'charlie@example.com', name: 'Charlie' },
      { email: 'diana@example.com', name: 'Diana' },
      { email: 'eve@example.com', name: 'Eve' },
    ];

    await prisma.user.createMany({
      data: users,
    });
  }
}

// Exécution du seed
async function main() {
  const seed = new Seed();
  await seed.run();
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
