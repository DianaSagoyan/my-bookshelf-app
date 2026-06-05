import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import bcrypt from "bcrypt";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  // clear existing data first
  await prisma.quote.deleteMany();
  await prisma.book.deleteMany();
  await prisma.user.deleteMany();

  //deleteMany()clears existing data before seeding so we don't get duplicates every time we run it.
  // Order matters here — delete Quotes first, then Books, then Users because
  // of the foreign key relationships. Deleting a User before their Books would fail.

  // create a test user
  const hashedPassword = await bcrypt.hash("password123", 10);

  const user = await prisma.user.create({
    data: {
      email: "test@test.com",
      password: hashedPassword,
      books: {
        create: [
          {
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            genre: "Fiction",
            description: "A story about the American dream",
            status: "READ",
            quotes: {
              create: [
                { text: "So we beat on, boats against the current", page: 180 },
              ],
            },
          },
          {
            title: "1984",
            author: "George Orwell",
            genre: "Dystopian",
            description: "A story about a totalitarian society",
            status: "READING",
          },
          {
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            genre: "Fiction",
            description: "A story about racial injustice",
            status: "WANT_TO_READ",
          },
        ],
      },
    },
  });

  console.log("Seeded user:", user.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
