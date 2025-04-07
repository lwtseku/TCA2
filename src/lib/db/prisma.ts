import { PrismaClient } from "@prisma/client";

// Singleton загвар ашиглан Prisma Client-ийг үүсгэх
const prismaClientSingleton = () => {
  return new PrismaClient();
};

// globalThis-г зарлаж, prismaGlobal хувьсагчийг хэрэглэнэ
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

// globalThis дээр хадгалаад, development орчинд нэг л удаа үүсгэнэ
const db = globalThis.prismaGlobal ?? prismaClientSingleton();

// db-г экспортлон хэрэглэгчийн модульд ашиглах
export default db;

// Production орчинд хамаарахгүй бол globalThis дээр хадгална
if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = db;
}
