import { GuildMember } from 'discord.js'
import UserNotFoundError from '../error/UserNotFoundError'
import { addType } from '../type/addType'
import { 유저정보 } from '../type/db'
import calculateExp from './calculateExp'
import { calculate누적레벨ByUserData } from './calculate누적레벨'
import isUser from './check/isUser'
import getUserData from './db/get/getUserData'

export async function addByUserData(name: addType, value: number, userData: 유저정보) {
  if (name !== '경험치') {
    // 단순히 더하기만 해도 됨
    userData[name] += value
    return userData
  }

  // 경험치를 더하기

  // 이전 누적 레벨 계산
  const 이전누적레벨 = await calculate누적레벨ByUserData(userData)

  // 설정
  ;[userData.티어, userData.레벨, userData.경험치] = calculateExp(userData.티어, userData.레벨, userData.경험치 + value)

  // 나중 누적 레벨 계산
  const 나중누적레벨 = await calculate누적레벨ByUserData(userData)

  const 추가된누적레벨 = 나중누적레벨 - 이전누적레벨

  // 공격력, 체력 수정
  userData.공격력 += 추가된누적레벨
  userData.체력 += 추가된누적레벨

  return userData
}

export async function addByUser(name: addType, value: number, member: GuildMember) {
  if (!(await isUser(member))) throw new UserNotFoundError()

  const userData = await getUserData(member)
  return await addByUserData(name, value, userData)
}
