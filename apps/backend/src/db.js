const { PrismaClient } = require("../../../db/generated/client");

const prisma = new PrismaClient();

module.exports = prisma;
