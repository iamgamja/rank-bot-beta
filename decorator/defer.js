/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommandInteraction } from 'discord.js';
export function defer(target, key, desc) {
    const method = desc.value; // 기존의 method
    target[key] = async function (...arg) {
        const interaction = arg.find((x) => x instanceof CommandInteraction);
        if (!interaction)
            throw new Error('없');
        await interaction.deferReply();
        await method(...arg);
    };
}
