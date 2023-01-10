import { GuildMember } from 'discord.js'
import UserNotFoundError from '../../../error/UserNotFoundError'
import { 유저정보 } from '../../../type/db'
import isUser from '../../check/isUser'
import { getDbData } from '../getDb'
import setDb from '../setDb'

export async function setUserData(member: GuildMember, userData: 유저정보) {
  if (!(await isUser(member))) throw new UserNotFoundError()

  const allUserData = await getDbData('유저 정보')
  allUserData[member.id] = userData
  await setDb('유저 정보', allUserData)
}
