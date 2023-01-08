import { Snowflake } from 'discord.js'

type CooltimeData = { [channelId: Snowflake]: number }

const COOLTIME: CooltimeData = {
  '1025355108382421022': 10,
  '1026111522067460106': 15,
  '1026119448156966992': 30,
  '1026121469907968051': 60,
  '1026161001407725588': 30,
  '1026124882746032249': 1 * 60 * 60,
  '1026129415102550036': 6 * 60 * 60,
  '1032216362103353384': 30,
  '1035476140753703012': 0, // 여기는 쿨타임이 없는가
}

export default COOLTIME
