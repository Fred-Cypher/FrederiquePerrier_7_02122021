const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    await prisma.user.create({
        data: {
            first_name: 'Jean',
            last_name: 'Simon',
            alias: 'jojo',
            email: 'jean@test.com',
            password: 'jojoS',
        },
    })

    const allUsers = await prisma.user.findMany()
    console.dir(allUsers, { depth: null })
};

main()
    .catch((error) => {
        throw error
    })
    .finally(async () => {
        await prisma.$disconnect()
    })