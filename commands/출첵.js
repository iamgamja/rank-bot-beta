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
import { defer } from '../decorator/defer.js';
import add from '../util/add.js';
import block from '../util/block.js';
import { calculate누적레벨ByUser } from '../util/calculate누적레벨.js';
import can출첵쿨타임 from '../util/check/can출첵쿨타임.js';
import isUser from '../util/check/isUser.js';
import get출첵쿨타임 from '../util/get/get출첵쿨타임.js';
import set출첵쿨타임 from '../util/set/set출첵쿨타임.js';
let 출첵 = class 출첵 {
    async 출첵(interaction) {
        if (interaction.channelId !== '1001389058473345154')
            return await block(interaction, '잘못된 채널', '1001389058473345154');
        const member = interaction.member;
        if (!(await isUser(member)))
            return await block(interaction, '등록되지 않음', null);
        if (!(await can출첵쿨타임(member)))
            return await block(interaction, '출첵 쿨타임', await get출첵쿨타임(member));
        await set출첵쿨타임(member);
        const n = 2 ** ((await calculate누적레벨ByUser(member)) - 1) * 10;
        await add(member, 'exp', n);
        await add(member, 'r', n);
        await interaction.editReply('```diff\n출첵했습니다.\n' + `+ EXP ${n}\n+ R ${n}\n` + '```');
    }
};
__decorate([
    Slash({ description: '출첵합니다.', name: 'ㅊㅊ' }),
    defer,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CommandInteraction]),
    __metadata("design:returntype", Promise)
], 출첵.prototype, "\uCD9C\uCCB5", null);
출첵 = __decorate([
    Discord()
], 출첵);
export { 출첵 };
