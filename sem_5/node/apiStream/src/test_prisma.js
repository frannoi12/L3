import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.user.create({
        data: {
            email: "john.doe@example.com",
            name: "John Doe",
        }
    })
    const user = await prisma.user.findMany()
    console.log(user)
}


main().then(async () => {
    console.log("succes");    
}).catch(async (e) => {
    console.error(e)
}).finally(async () => {
    await prisma.$disconnect()
})