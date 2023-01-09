import { Snowflake } from 'discord.js'

export type 유저정보 = {
  티어: number // 0-index
  레벨: number // 1-index
  경험치: number // 0-index
  공격력: number
  체력: number
  R: number
  무기: string
  방어구: string
  id: number
}

export type 유저정보db = {
  [id: Snowflake]: 유저정보
}

export interface 던전쿨타임db {
  [channelID: Snowflake]: {
    [userID: Snowflake]: number // timestamp, 이 timestamp가 지나야 다시 커맨드 사용 가능
  }
}

export interface 도박쿨타임db {
  [userID: Snowflake]: number // timestamp, 이 timestamp가 지나야 다시 커맨드 사용 가능
}

export interface 출첵쿨타임db {
  [userID: Snowflake]: number // timestamp, 이 timestamp가 지나야 다시 커맨드 사용 가능
}
