import { TextChannel } from 'discord.js'
import { bot } from '../main'
import { userData } from '../type/userData'
import { makeProfileStringByUserData } from './makeString/makeProfileString'
import query from './query'

export default async function editUserInfoMsg() {
  const userInfoMsg = await (bot.channels.cache.get('1025347124294070282') as TextChannel).messages.fetch('1025975950439088168')
  const res: string[] = []

  const data = (await query('select * from user_data')) as userData[]

  for (const userData of data) {
    res.push(await makeProfileStringByUserData(userData))
  }

  await userInfoMsg.edit(res.join('\n\n'))
}
