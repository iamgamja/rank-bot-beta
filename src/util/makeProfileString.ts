import { GuildMember } from 'discord.js'
import TEAR from '../data/tear'
import UserNotFoundError from '../error/UserNotFoundError'
import getUserData from './getUserData'
import isUser from './check/isUser'
import get남은경험치 from './get남은경험치'

export default async function makeProfileString(member: GuildMember) {
  if (!isUser(member)) throw new UserNotFoundError()

  const userData = await getUserData(member)
  const 남은경험치 = await get남은경험치(member)

  return (
    `${member.displayName}님 (ID: ${userData.id.toString().padStart(6, '0')}) 의 정보:\n` +
    '```\n' +
    `${TEAR[userData.티어]} Lv. ${userData.레벨} / EXP ${userData.경험치} (다음 레벨까지 EXP ${남은경험치})\n` +
    `공격력: ${userData.공격력} / 체력: ${userData.체력}\n` +
    `소지품:\n` +
    `  R ${userData.R}\n` +
    `장착:\n` +
    `  무기: ${userData.무기}\n` +
    `  방어구: ${userData.방어구}\n` +
    '```'
  )
}
