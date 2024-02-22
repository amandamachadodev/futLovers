export const fakePlayers = [
  {
    id: 1,
    name: 'Messi',
    age: 35,
    team_id: 1,
    created_at: new Date(),
    updated_at: new Date(),
    team: {
      id: 1,
      name: 'São Paulo',
      created_at: new Date(),
      updated_at: new Date(),
    },
  },
  {
    id: 2,
    name: 'Ronaldo',
    age: 30,
    team_id: 2,
    created_at: new Date(),
    updated_at: new Date(),
    team: {
      id: 2,
      name: 'Santos',
      created_at: new Date(),
      updated_at: new Date(),
    },
  },
  {
    id: 3,
    name: 'Maradona',
    age: 48,
    team_id: 3,
    created_at: new Date(),
    updated_at: new Date(),
    team: {
      id: 3,
      name: 'Corinthians',
      created_at: new Date(),
      updated_at: new Date(),
    },
  },
];

const prismaMock = {
  player: {
    create: jest.fn().mockReturnValue(fakePlayers[0]),
    findMany: jest.fn().mockResolvedValue(fakePlayers),
    findUnique: jest.fn().mockResolvedValue(fakePlayers[0]),
    update: jest.fn().mockResolvedValue(fakePlayers[0]),
    delete: jest.fn(),
  },
};
export default prismaMock;
