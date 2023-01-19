var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { ApplicationCommandOptionType, CommandInteraction } from 'discord.js';
import { Discord, Slash, SlashOption } from 'discordx';
import { defer } from '../decorator/defer.js';
import block from '../util/block.js';
import isUser from '../util/check/isUser.js';
import { makeProfileStringByUser } from '../util/makeString/makeProfileString.js';
let 프로필 = class 프로필 {
    async 프로필(유저, interaction) {
        const member = 유저 ?? interaction.member;
        if (!(await isUser(member)))
            return await block(interaction, '등록되지 않음', null);
        await interaction.editReply(await makeProfileStringByUser(member));
    }
};
__decorate([
    Slash({ description: '다른 사람(또는 자신)의 프로필을 확인합니다!', name: '프로필' }),
    defer,
    __param(0, SlashOption({
        description: '프로필을 확인할 유저입니다. 입력하지 않으면 자신의 프로필을 확인합니다.',
        name: '유저',
        required: false,
        type: ApplicationCommandOptionType.User,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandInteraction]),
    __metadata("design:returntype", Promise)
], 프로필.prototype, "\uD504\uB85C\uD544", null);
프로필 = __decorate([
    Discord()
], 프로필);
export { 프로필 };
