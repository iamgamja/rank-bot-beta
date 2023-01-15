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
  '이미 등록됨': '이미 등록되었습니다.',
  '배팅 단위가 맞지 않음': '배팅은 10 R 단위로 가능합니다.',
  '배팅 금액이 음수': '배팅 금액은 음수일 수 없습니다.',
  '재화 부족': 'R이 부족합니다.',
  '경험치 부족': '경험치가 부족합니다.',
  '이미 구매함': '이미 구매한 아이템입니다.',
  약함: '공격력/체력이 부족합니다.',
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
