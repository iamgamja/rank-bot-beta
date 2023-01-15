import { GuildMember } from 'discord.js'
import UserNotFoundError from '../error/UserNotFoundError'
import getUserData from './get/getUserData'
import isUser from './check/isUser'
import { calculate누적레벨ByUserData } from './calculate누적레벨'
import { userData } from '../type/userData'

export async function calculate남은경험치ByUserData(userData: userData) {
  const 누적레벨 = await calculate누적레벨ByUserData(userData)
  const 목표경험치 = 2 ** (누적레벨 - 1) * 1000
  const 남은경험치 = 목표경험치 - userData.exp
  return 남은경험치
}

export async function calculate남은경험치ByUser(member: GuildMember) {
  if (!(await isUser(member))) throw new UserNotFoundError()

  const userData = await getUserData(member)
  return await calculate남은경험치ByUserData(userData)
}
