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
import { ApplicationCommandOptionType, CommandInteraction, GuildMember } from 'discord.js';
import { Discord, Slash, SlashOption } from 'discordx';
import { defer } from '../decorator/defer.js';
import block from '../util/block.js';
import isAdmin from '../util/check/isAdmin.js';
import isUser from '../util/check/isUser.js';
import query from '../util/query.js';
import { addUserData } from '../util/set/addUserData.js';
let 등록 = class 등록 {
    async _등록(member) {
        const userCount = Object.keys(await query('select * from user_data')).length;
        const newUserData = {
            id: userCount + 1,
            userid: member.id,
            tear: 0,
            level: 1,
            exp: 0,
            atk: 1,
            hp: 1,
            r: 0,
            atkitem: '없음',
            defitem: '없음',
        };
        await addUserData(newUserData);
    }
    async 등록(interaction) {
        const member = interaction.member;
        if (await isUser(member))
            return await block(interaction, '이미 등록됨', null);
        await this._등록(member);
        await interaction.editReply('✅');
    }
    async 원격등록(대상, interaction) {
        if (!(await isAdmin(interaction.member)))
            return await block(interaction, '관리자가 아님', null);
        if (await isUser(대상))
            return await block(interaction, '이미 등록됨', null);
        await this._등록(대상);
        await interaction.editReply('✅');
    }
};
__decorate([
    Slash({ description: '등록합니다.', name: '등록' }),
    defer,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CommandInteraction]),
    __metadata("design:returntype", Promise)
], 등록.prototype, "\uB4F1\uB85D", null);
__decorate([
    Slash({ description: '[관리자 전용] 다른 사람을 원격으로 등록합니다.', name: '원격등록' }),
    defer,
    __param(0, SlashOption({
        description: '등록할 대상입니다.',
        name: '대상',
        required: true,
        type: ApplicationCommandOptionType.User,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GuildMember,
        CommandInteraction]),
    __metadata("design:returntype", Promise)
], 등록.prototype, "\uC6D0\uACA9\uB4F1\uB85D", null);
등록 = __decorate([
    Discord()
], 등록);
export { 등록 };
