import { CommandInteraction, Snowflake } from 'discord.js'
import { BlockedSubType } from '../type/BlockedSubType'
import { BlockedType } from '../type/BlockedType'
import { makeBlockedString } from './makeString/makeBlockedString'

export default async function block<type extends BlockedType>(interaction: CommandInteraction, type: type, param: type extends BlockedSubType ? Snowflake | string : null) {
  return await interaction.reply(makeBlockedString(type, param))
}
