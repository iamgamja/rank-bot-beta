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
import { Discord, Slash, SlashGroup, SlashOption } from 'discordx';
import add from '../util/add.js';
import block from '../util/block.js';
import isAdmin from '../util/check/isAdmin.js';
import isUser from '../util/check/isUser.js';
let 설정 = class 설정 {
    async 공격력(수치, 대상, interaction) {
        if (!(await isAdmin(interaction.member)))
            return await block(interaction, '관리자가 아님', null);
        if (!(await isUser(대상)))
            return await block(interaction, '등록되지 않음', null);
        await add(대상, 'atk', 수치);
        await interaction.reply('✅');
    }
    async 경험치(수치, 대상, interaction) {
        if (!(await isAdmin(interaction.member)))
            return await block(interaction, '관리자가 아님', null);
        if (!(await isUser(대상)))
            return await block(interaction, '등록되지 않음', null);
        await add(대상, 'exp', 수치);
        await interaction.reply('✅');
    }
    async 체력(수치, 대상, interaction) {
        if (!(await isAdmin(interaction.member)))
            return await block(interaction, '관리자가 아님', null);
        if (!(await isUser(대상)))
            return await block(interaction, '등록되지 않음', null);
        await add(대상, 'hp', 수치);
        await interaction.reply('✅');
    }
    async 재화(수치, 대상, interaction) {
        if (!(await isAdmin(interaction.member)))
            return await block(interaction, '관리자가 아님', null);
        if (!(await isUser(대상)))
            return await block(interaction, '등록되지 않음', null);
        await add(대상, 'r', 수치);
        await interaction.reply('✅');
    }
};
__decorate([
    Slash({ description: '[관리자 전용] 공격력을 설정합니다.', name: '공격력' }),
    __param(0, SlashOption({
        description: '더하려면 양수로, 빼려면 음수로 입력해주세요.',
        name: '수치',
        required: true,
        type: ApplicationCommandOptionType.Number,
    })),
    __param(1, SlashOption({
        description: '설정할 대상입니다.',
        name: '대상',
        required: true,
        type: ApplicationCommandOptionType.User,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, GuildMember,
        CommandInteraction]),
    __metadata("design:returntype", Promise)
], 설정.prototype, "\uACF5\uACA9\uB825", null);
__decorate([
    Slash({ description: '[관리자 전용] 경험치를 설정합니다.', name: '경험치' }),
    __param(0, SlashOption({
        description: '더하려면 양수로, 빼려면 음수로 입력해주세요.',
        name: '수치',
        required: true,
        type: ApplicationCommandOptionType.Number,
    })),
    __param(1, SlashOption({
        description: '설정할 대상입니다.',
        name: '대상',
        required: true,
        type: ApplicationCommandOptionType.User,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, GuildMember,
        CommandInteraction]),
    __metadata("design:returntype", Promise)
], 설정.prototype, "\uACBD\uD5D8\uCE58", null);
__decorate([
    Slash({ description: '[관리자 전용] 체력을 설정합니다.', name: '체력' }),
    __param(0, SlashOption({
        description: '더하려면 양수로, 빼려면 음수로 입력해주세요.',
        name: '수치',
        required: true,
        type: ApplicationCommandOptionType.Number,
    })),
    __param(1, SlashOption({
        description: '설정할 대상입니다.',
        name: '대상',
        required: true,
        type: ApplicationCommandOptionType.User,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, GuildMember,
        CommandInteraction]),
    __metadata("design:returntype", Promise)
], 설정.prototype, "\uCCB4\uB825", null);
__decorate([
    Slash({ description: '[관리자 전용] 재화를 설정합니다.', name: '재화' }),
    __param(0, SlashOption({
        description: '더하려면 양수로, 빼려면 음수로 입력해주세요.',
        name: '수치',
        required: true,
        type: ApplicationCommandOptionType.Number,
    })),
    __param(1, SlashOption({
        description: '설정할 대상입니다.',
        name: '대상',
        required: true,
        type: ApplicationCommandOptionType.User,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, GuildMember,
        CommandInteraction]),
    __metadata("design:returntype", Promise)
], 설정.prototype, "\uC7AC\uD654", null);
설정 = __decorate([
    Discord(),
    SlashGroup({ description: '[관리자 전용] 스탯을 설정합니다.', name: '설정' }),
    SlashGroup('설정')
], 설정);
export { 설정 };
