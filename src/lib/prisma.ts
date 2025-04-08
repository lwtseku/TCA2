import { PrismaClient } from "@prisma/client";

// Initialize the Prisma client
const prisma = new PrismaClient();

// Export prisma instance for use in your application
export { prisma };
