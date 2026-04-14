const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const entries = [
  {
    name: "Kwame Asante",
    message:
      "DevCraft transformed our online brand. Engagement jumped and our leads doubled in less than a quarter."
  },
  {
    name: "Ama Serwaa",
    message:
      "Their team blended design and performance perfectly. The campaign launch felt effortless and premium."
  },
  {
    name: "Kofi Mensah",
    message:
      "Excellent communication and delivery. The new web platform gives our company a real competitive edge."
  }
];

async function main() {
  await prisma.testimonial.deleteMany();
  await prisma.testimonial.createMany({ data: entries });
  console.log("Seeded testimonials.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
