export const fakeTeams = [
  {
    id: 1,
    name: 'Atlético',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    name: 'Santos',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 20,
    name: 'São Paulo',
    created_at: new Date(),
    updated_at: new Date(),
  },
];

const prismaMock = {
  team: {
    create: jest.fn().mockReturnValue(fakeTeams[0]),
    findMany: jest.fn().mockResolvedValue(fakeTeams),
    findUnique: jest.fn().mockResolvedValue(fakeTeams[0]),
    update: jest.fn().mockResolvedValue(fakeTeams[0]),
    delete: jest.fn(),
  },
};
export default prismaMock;
