import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function addTeams() {
  const team1 = await prisma.team.create({
    data: { name: 'Athletico-PR' },
  });
  const team2 = await prisma.team.create({
    data: { name: 'América-MG' },
  });
  const team3 = await prisma.team.create({
    data: { name: 'Corinthians' },
  });
  const team4 = await prisma.team.create({
    data: { name: 'Coritiba' },
  });
  const team5 = await prisma.team.create({
    data: { name: 'Cruzeiro' },
  });
  const team6 = await prisma.team.create({
    data: { name: 'Flamengo' },
  });
  const team7 = await prisma.team.create({
    data: { name: 'Vasco da Gama' },
  });
  const team8 = await prisma.team.create({
    data: { name: 'Palmeiras' },
  });
  const team9 = await prisma.team.create({
    data: { name: 'Santos' },
  });
  const team10 = await prisma.team.create({
    data: { name: 'São Paulo' },
  });
  console.log({
    team1,
    team2,
    team3,
    team4,
    team5,
    team6,
    team7,
    team8,
    team9,
    team10,
  });
}

addTeams()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
