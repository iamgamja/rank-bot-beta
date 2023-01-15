import { makeBlockedString } from './makeString/makeBlockedString.js';
export default async function block(interaction, type, param) {
    return await interaction.reply(makeBlockedString(type, param));
}
