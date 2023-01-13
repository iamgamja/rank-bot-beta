import { TextChannel } from 'discord.js'
import { COOLTIME } from '../../data/cooltime'

export default function isDungeonChannel(channel: TextChannel) {
  return Object.keys(COOLTIME).includes(channel.id)
}
