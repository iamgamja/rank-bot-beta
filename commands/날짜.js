var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { CommandInteraction } from 'discord.js';
import { Discord, Slash } from 'discordx';
let 날짜 = class 날짜 {
    async 날짜(interaction) {
        const diffms = new Date().getTime() - new Date('2020 10 17').getTime();
        const diffday = Math.floor(diffms / 1000 / 60 / 60 / 24);
        await interaction.reply(`오늘은 ${diffday}일 입니다.`);
    }
};
__decorate([
    Slash({ description: '2020년 10월 17일을 0일로 계산해서 오늘 날짜를 확인합니다.', name: '날짜' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CommandInteraction]),
    __metadata("design:returntype", Promise)
], 날짜.prototype, "\uB0A0\uC9DC", null);
날짜 = __decorate([
    Discord()
], 날짜);
export { 날짜 };
