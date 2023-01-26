import { GuildMember } from 'discord.js'
import UserNotFoundError from '../../error/UserNotFoundError'
import { userData } from '../../type/userData'
import isUser from '../check/isUser'
import editUserInfoMsg from '../editUserInfoMsg'
import query from '../query'

export async function setUserData(member: GuildMember, userData: userData) {
  if (!(await isUser(member))) throw new UserNotFoundError()

  await query(`
    update user_data 
    set
      tear=${userData.tear},
      level=${userData.level},
      exp=${userData.exp},
      atk=${userData.atk},
      hp=${userData.hp},
      r=${userData.r},
      atkitem="${userData.atkitem}",
      defitem="${userData.defitem}"
    where userid = "${member.id}"
  `)

  await editUserInfoMsg()
}
