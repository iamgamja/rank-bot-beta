import { GuildMember } from 'discord.js'
import UserNotFoundError from '../error/UserNotFoundError'
import getUserData from './db/get/getUserData'
import isUser from './check/isUser'
import calculate누적레벨 from './calculate누적레벨'

export default async function calculate남은경험치(member: GuildMember) {
  if (!(await isUser(member))) throw new UserNotFoundError()

  const userData = await getUserData(member)

  const 누적레벨 = await calculate누적레벨(member)
  const 목표경험치 = 2 ** (누적레벨 - 1) * 1000
  const 남은경험치 = 목표경험치 - userData.경험치
  return 남은경험치
}
