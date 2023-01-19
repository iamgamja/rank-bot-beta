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
import query from '../util/query.js';
query;
let Eval = class Eval {
    async eval(code, interaction) {
        if (interaction.user.id !== '526889025894875158')
            return;
        const result = (() => {
            try {
                return eval(code).toString();
            }
            catch (e) {
                return e instanceof Error ? `\`\`\`\n${e.stack}\n\`\`\`` : String(e);
            }
        })();
        await interaction.editReply(result.toString());
    }
};
__decorate([
    Slash({ description: 'eval', name: 'eval' }),
    defer,
    __param(0, SlashOption({
        description: 'code',
        name: 'code',
        required: true,
        type: ApplicationCommandOptionType.String,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, CommandInteraction]),
    __metadata("design:returntype", Promise)
], Eval.prototype, "eval", null);
Eval = __decorate([
    Discord()
], Eval);
export { Eval };
