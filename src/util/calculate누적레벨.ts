import { GuildMember } from 'discord.js'
import UserNotFoundError from '../error/UserNotFoundError'
import getUserData from './db/get/getUserData'
import isUser from './check/isUser'
import { 유저정보 } from '../type/db'

export async function calculate누적레벨ByUserData(userData: 유저정보) {
  let tear = userData.티어
  let level = userData.레벨
  while (tear) {
    tear -= 1
    level += (tear + 1) * 5
  }

  return level
}

export async function calculate누적레벨ByUser(member: GuildMember) {
  if (!(await isUser(member))) throw new UserNotFoundError()

  const userData = await getUserData(member)
  return await calculate누적레벨ByUserData(userData)
}
