import { Snowflake } from 'discord.js'
import ParamNotFoundError from '../../error/ParamNotFoundError'
import { contains } from '../contains'
import { BlockedSubType } from '../../type/BlockedSubType'
import { BlockedType } from '../../type/BlockedType'

const BlockedString: { [type in BlockedType]: string } = {
  '관리자가 아님': '관리자 전용 명령어입니다.',
  '등록되지 않음': '등록되지 않은 유저입니다.',
  '잘못된 채널': '잘못된 채널입니다.',
  '출첵 쿨타임': '쿨타임을 기다려주세요.',
  '도박 쿨타임': '쿨타임을 기다려주세요.',
  '던전 쿨타임': '쿨타임을 기다려주세요.',
}

const BlockedSubString = {
  '잘못된 채널': (channelId: Snowflake) => `실행 가능한 채널: <#${channelId}>`,
  '출첵 쿨타임': (cooltime: string) => `실행 가능한 시간: <t:${Math.floor(+cooltime / 1000)}:R>`,
  '도박 쿨타임': (cooltime: string) => `실행 가능한 시간: <t:${Math.floor(+cooltime / 1000)}:R>`,
  '던전 쿨타임': (cooltime: string) => `실행 가능한 시간: <t:${Math.floor(+cooltime / 1000)}:R>`,
}

export function makeBlockedString<type extends BlockedType>(type: type, param: type extends BlockedSubType ? Snowflake | string : null) {
  let res = '```diff\n' + `- ${BlockedString[type]}\n` + '```\n'
  if (contains(BlockedSubType, type)) {
    if (!param) throw new ParamNotFoundError()
    res += `${BlockedSubString[type](param)}\n`
  }
  return res
}
