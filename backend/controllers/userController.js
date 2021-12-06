const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/*const User = require('../prisma/schema.prisma');*/

/*async function main() {
    const allUsers = await prisma.user.findMany()
    console.log(allUsers)
}*/



async function main() {
    await prisma.user.create({
        data: {
            first_name: 'Marc',
            last_name: 'Durand',
            alias: 'Marco',
            email: 'marc@test.com',
            password: 'marc07',
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