import { GuildMember } from 'discord.js'
import TEAR from '../data/tear'
import UserNotFoundError from '../error/UserNotFoundError'
import getUserData from './get/getUserData'
import isUser from './check/isUser'
import calculate남은경험치 from './calculate남은경험치'

export default async function makeProfileString(member: GuildMember) {
  if (!(await isUser(member))) throw new UserNotFoundError()

  const userData = await getUserData(member)
  const 남은경험치 = await calculate남은경험치(member)

  return (
    `${member.displayName}님 (ID: ${userData.id.toString().padStart(6, '0')}) 의 정보:\n` +
    '```\n' +
    `${TEAR[userData.tear]} Lv. ${userData.level} / EXP ${userData.exp} (다음 레벨까지 EXP ${남은경험치})\n` +
    `공격력: ${userData.atk} / 체력: ${userData.hp}\n` +
    `소지품:\n` +
    `  R ${userData.r}\n` +
    `장착:\n` +
    `  무기: ${userData.atkitem}\n` +
    `  방어구: ${userData.defitem}\n` +
    '```'
  )
}
