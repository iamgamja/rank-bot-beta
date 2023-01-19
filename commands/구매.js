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
import { Discord, Slash, SlashChoice, SlashOption } from 'discordx';
import SHOP_ITEM from '../data/shopItem.js';
import { defer } from '../decorator/defer.js';
import add from '../util/add.js';
import block from '../util/block.js';
import isUser from '../util/check/isUser.js';
import getUserData from '../util/get/getUserData.js';
let 구매 = class 구매 {
    async 구매(아이템, interaction) {
        if (interaction.channelId !== '1025359390544502814')
            return await block(interaction, '잘못된 채널', '1025359390544502814');
        const member = interaction.member;
        if (!(await isUser(member)))
            return await block(interaction, '등록되지 않음', null);
        const userData = await getUserData(member);
        const target = SHOP_ITEM[아이템];
        if (userData.r < target.cost)
            return await block(interaction, '재화 부족', null);
        if ('limit' in target) {
            const [targettear, targetlevel, targetexp] = target.limit;
            const can구매 = (() => {
                if (targettear < userData.tear)
                    return true;
                if (targettear > userData.tear)
                    return false;
                if (targetlevel < userData.level)
                    return true;
                if (targetlevel > userData.level)
                    return false;
                if (targetexp <= userData.exp)
                    return true;
                return false;
            })();
            if (!can구매)
                return await block(interaction, '경험치 부족', null);
        }
        if ('role' in target.get) {
            if (member.roles.cache.get(target.get.role))
                return await block(interaction, '이미 구매함', null);
        }
        // 구매
        await add(member, 'r', -target.cost);
        if ('role' in target.get) {
            const role = interaction.guild?.roles.cache.get(target.get.role);
            await member.roles.add(role, '아이템 구매');
        }
        if ('exp' in target.get) {
            await add(member, 'exp', target.get.exp);
        }
        await interaction.editReply('```diff\n' + `+ ${아이템}을(를) 구매했습니다.\n` + '```');
    }
};
__decorate([
    Slash({ description: '아이템을 구매합니다.', name: '구매' }),
    defer,
    __param(0, SlashChoice(...Object.keys(SHOP_ITEM).map((name) => ({ name: name, value: name })))),
    __param(0, SlashOption({
        description: '구매할 아이템의 이름입니다.',
        name: '아이템',
        required: true,
        type: ApplicationCommandOptionType.String,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandInteraction]),
    __metadata("design:returntype", Promise)
], 구매.prototype, "\uAD6C\uB9E4", null);
구매 = __decorate([
    Discord()
], 구매);
export { 구매 };
