import { GuildMember } from 'discord.js'
import UserNotFoundError from '../error/UserNotFoundError'
import { addType } from '../type/addType'
import { 유저정보 } from '../type/db'
import calculateExp from './calculateExp'
import { calculate누적레벨ByUserData } from './calculate누적레벨'
import isUser from './check/isUser'
import getUserData from './db/get/getUserData'

export default async function add(member: GuildMember, name: addType, value: number, oldUserData?: 유저정보) {
  if (!(await isUser(member))) throw new UserNotFoundError()

  const newUserData = oldUserData ?? (await getUserData(member))

  if (name !== '경험치') {
    // 단순히 더하기만 해도 됨
    newUserData[name] += value
    return newUserData
  }

  // 경험치를 더하기

  // 이전 누적 레벨 계산
  const 이전누적레벨 = await calculate누적레벨ByUserData(newUserData)

  // 설정
  ;[newUserData.티어, newUserData.레벨, newUserData.경험치] = calculateExp(newUserData.티어, newUserData.레벨, newUserData.경험치 + value)

  // 나중 누적 레벨 계산
  const 나중누적레벨 = await calculate누적레벨ByUserData(newUserData)

  const 추가된누적레벨 = 나중누적레벨 - 이전누적레벨

  // 공격력, 체력 수정
  newUserData.공격력 += 추가된누적레벨
  newUserData.체력 += 추가된누적레벨

  return newUserData
}
