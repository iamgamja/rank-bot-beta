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
import add from '../util/add.js';
import block from '../util/block.js';
import can도박쿨타임 from '../util/check/can도박쿨타임.js';
import isUser from '../util/check/isUser.js';
import getUserData from '../util/get/getUserData.js';
import get도박쿨타임 from '../util/get/get도박쿨타임.js';
import set도박쿨타임 from '../util/set/set도박쿨타임.js';
let 도박 = class 도박 {
    async 도박(배팅, interaction) {
        if (interaction.channelId !== '1025359305689550869')
            return await block(interaction, '잘못된 채널', '1025359305689550869');
        const member = interaction.member;
        if (!(await isUser(member)))
            return await block(interaction, '등록되지 않음', null);
        if (!(await can도박쿨타임(member)))
            return await block(interaction, '도박 쿨타임', await get도박쿨타임(member));
        if (배팅 % 10)
            return await block(interaction, '배팅 단위가 맞지 않음', null);
        if (배팅 < 0)
            return await block(interaction, '배팅 금액이 음수', null);
        const userData = await getUserData(member);
        if (배팅 > userData.r)
            return await block(interaction, '재화 부족', null);
        await set도박쿨타임(member);
        const 배율 = (() => {
            let x = Math.random() * 100;
            if (x < 5)
                return 2; // 5%
            x -= 5;
            if (x < 10)
                return 1.5; // 10%
            x -= 10;
            if (x < 50)
                return 1; // 50%
            x -= 50;
            if (x < 25)
                return 0.5; // 25%
            return 0; // 10%
        })();
        const res = -배팅 + 배율 * 배팅;
        await add(member, 'r', res);
        await interaction.editReply('```diff\n' + `x${배율}\n` + '```');
    }
};
__decorate([
    Slash({ description: '도박을 진행합니다.', name: '도박' }),
    defer,
    __param(0, SlashOption({
        description: '배팅할 R입니다.',
        name: '배팅',
        required: true,
        type: ApplicationCommandOptionType.Number,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, CommandInteraction]),
    __metadata("design:returntype", Promise)
], 도박.prototype, "\uB3C4\uBC15", null);
도박 = __decorate([
    Discord()
], 도박);
export { 도박 };
