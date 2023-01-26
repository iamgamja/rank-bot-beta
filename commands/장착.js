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
import { Discord, Slash, SlashChoice, SlashOption } from 'discordx';
import { defer } from '../decorator/defer.js';
import block from '../util/block.js';
import isAdmin from '../util/check/isAdmin.js';
import isUser from '../util/check/isUser.js';
import editUserInfoMsg from '../util/editUserInfoMsg.js';
import query from '../util/query.js';
let 장착 = class 장착 {
    async 장착(종류, 대상, 이름, interaction) {
        if (!(await isAdmin(interaction.member)))
            return await block(interaction, '관리자가 아님', null);
        if (!(await isUser(대상)))
            return await block(interaction, '등록되지 않음', null);
        // await add(대상, 'atk', 수치)
        await query(`update user_data set ${종류} = "${이름}" where userid = "${대상.id}"`);
        await editUserInfoMsg();
        await interaction.editReply('✅');
    }
};
__decorate([
    Slash({ description: '[관리자 전용] 무기/방어구를 장착시킵니다.', name: '장착' }),
    defer,
    __param(0, SlashChoice({ name: '무기', value: 'atkitem' })),
    __param(0, SlashChoice({ name: '방어구', value: 'defitem' })),
    __param(0, SlashOption({
        description: '장착할 아이템의 종류입니다.',
        name: '종류',
        required: true,
        type: ApplicationCommandOptionType.String,
    })),
    __param(1, SlashOption({
        description: '장착할 대상입니다.',
        name: '대상',
        required: true,
        type: ApplicationCommandOptionType.User,
    })),
    __param(2, SlashOption({
        description: '장착할 아이템의 이름입니다.',
        name: '이름',
        required: true,
        type: ApplicationCommandOptionType.String,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, GuildMember, String, CommandInteraction]),
    __metadata("design:returntype", Promise)
], 장착.prototype, "\uC7A5\uCC29", null);
장착 = __decorate([
    Discord()
], 장착);
export { 장착 };
