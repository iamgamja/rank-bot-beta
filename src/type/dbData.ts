import { 던전쿨타임db, 도박쿨타임db, 유저정보db, 출첵쿨타임db } from './db'
import { dbName } from './dbName'

export type dbData<name extends dbName> = name extends '유저 정보'
  ? 유저정보db
  : name extends '출첵 쿨타임'
  ? 출첵쿨타임db
  : name extends '던전 쿨타임'
  ? 던전쿨타임db
  : 도박쿨타임db
