import { GuildMember } from 'discord.js'

export default async function isAdmin(member: GuildMember) {
  return !!member.roles.cache.get('953309071468007494')
  // return true // debug
}
