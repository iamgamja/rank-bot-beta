/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommandInteraction } from 'discord.js'

export function defer(target: any, key: string, desc: PropertyDescriptor): void {
  const method = desc.value // 기존의 method

  target[key] = async function (...arg: any[]) {
    const interaction = arg.find((x: any): x is CommandInteraction => x instanceof CommandInteraction)
    if (!interaction) throw new Error('없')

    await interaction.deferReply()

    await method(...arg)
  }
}
