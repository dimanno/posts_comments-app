import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function seed() {
    await prisma.user.deleteMany();
    await prisma.comment.deleteMany();
    const kyle = await prisma.user.create({ data: { userName: "Dima", email: "dima@gmail.com", password: "12345678" } })
    const sally = await prisma.user.create({ data: { userName: "Marianna",email: "marianna@gmail.com", password: "12345678" } })

    const comment1 = await prisma.comment.create({
        data: {
            message: "I am a root comment",
            userId: kyle.id,
        },
    })

    const comment2 = await prisma.comment.create({
        data: {
            parentId: comment1.id,
            message: "I am a nested comment",
            userId: sally.id,
        },
    })

    const comment3 = await prisma.comment.create({
        data: {
            message: "I am another root comment",
            userId: sally.id,
        },
    })
}

seed()