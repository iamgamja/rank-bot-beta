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
import DUNGEON from '../data/dungeon.js';
import { defer } from '../decorator/defer.js';
import add from '../util/add.js';
import block from '../util/block.js';
import can던전쿨타임 from '../util/check/can던전쿨타임.js';
import isUser from '../util/check/isUser.js';
import getUserData from '../util/get/getUserData.js';
import get던전쿨타임 from '../util/get/get던전쿨타임.js';
let 던전 = class 던전 {
    async 처치(몬스터, interaction) {
        const target = DUNGEON[몬스터];
        if (interaction.channelId !== target.channelId)
            return await block(interaction, '잘못된 채널', target.channelId);
        const member = interaction.member;
        if (!(await isUser(member)))
            return await block(interaction, '등록되지 않음', null);
        const channel = interaction.channel;
        if (!(await can던전쿨타임(member, channel)))
            return await block(interaction, '던전 쿨타임', await get던전쿨타임(member, channel));
        const userData = await getUserData(member);
        const can공격 = (() => {
            if (target.공격력 === 0)
                return true;
            else
                return Math.ceil(target.체력 / userData.atk) < Math.ceil(userData.hp / target.공격력);
        })();
        if (!can공격)
            return await block(interaction, '약함', null);
        // 처치
        const items = [];
        // 아이템 획득
        for (const item of Object.entries(target.드롭아이템)) {
            const [itemName, percentage] = item;
            if (Math.random() < percentage / 100) {
                items.push(itemName);
            }
        }
        const items_str = items.map((s) => `+ ${s}`).join('\n');
        await add(member, 'exp', target.획득경험치);
        await add(member, 'r', target.획득R);
        await interaction.editReply({ content: '```diff\n처치했습니다.\n' + `+ EXP ${target.획득경험치}\n+ R ${target.획득R}\n${items_str}` + '```' });
    }
};
__decorate([
    Slash({ description: '몬스터를 처치합니다.', name: '처치' }),
    defer,
    __param(0, SlashChoice(...Object.keys(DUNGEON).map((name) => ({ name: name, value: name })))),
    __param(0, SlashOption({
        description: '처치할 몬스터의 이름입니다.',
        name: '몬스터',
        required: true,
        type: ApplicationCommandOptionType.String,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandInteraction]),
    __metadata("design:returntype", Promise)
], 던전.prototype, "\uCC98\uCE58", null);
던전 = __decorate([
    Discord()
], 던전);
export { 던전 };
