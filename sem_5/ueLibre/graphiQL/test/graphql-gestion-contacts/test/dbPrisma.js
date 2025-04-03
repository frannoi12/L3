import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Création d'un utilisateur
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'securepassword123',  // Assure-toi de hacher le mot de passe dans un vrai cas d'utilisation
      contacts: {
        create: [
          {
            firstName: 'Alice',
            lastName: 'Smith',
            phone: '123-456-7890',
            email: 'alice.smith@example.com',
            address: '123 Main St, Springfield',
          },
          {
            firstName: 'Bob',
            lastName: 'Johnson',
            phone: '987-654-3210',
            email: 'bob.johnson@example.com',
            address: '456 Elm St, Springfield',
          }
        ]
      }
    }
  });

  console.log('Utilisateur créé :', user);
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
