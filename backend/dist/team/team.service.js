"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TeamService = class TeamService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createTeamDto) {
        return this.prisma.team.create({
            data: createTeamDto,
        });
    }
    async findAll() {
        const teams = await this.prisma.team.findMany();
        if (!teams) {
            throw new common_1.NotFoundException('Não existe nenhum time');
        }
        return teams;
    }
    async findOne(id) {
        const team = await this.prisma.team.findUnique({
            where: { id },
        });
        if (!team) {
            throw new common_1.NotFoundException('Time não encontrado');
        }
        return team;
    }
    async update(id, updateTeamDto) {
        const team = await this.prisma.team.findUnique({
            where: { id },
        });
        if (!team) {
            throw new common_1.NotFoundException('Time não encontrado');
        }
        return this.prisma.team.update({
            where: { id },
            data: updateTeamDto,
        });
    }
    async remove(id) {
        const team = await this.prisma.team.findUnique({
            where: { id },
        });
        if (!team) {
            throw new common_1.NotFoundException('Time não encontrado');
        }
        const deleteTeam = await this.prisma.team.delete({
            where: { id },
        });
        if (!deleteTeam) {
            throw new Error('Time esta relacionado a um jogador');
        }
        return deleteTeam;
    }
};
exports.TeamService = TeamService;
exports.TeamService = TeamService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TeamService);
//# sourceMappingURL=team.service.js.map