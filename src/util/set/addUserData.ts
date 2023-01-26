import { userData } from '../../type/userData'
import editUserInfoMsg from '../editUserInfoMsg'
import query from '../query'

export async function addUserData(userData: userData) {
  await query(`
    insert into user_data
    values(
      "${userData.id}",
      "${userData.userid}",
      "${userData.tear}",
      "${userData.level}",
      "${userData.exp}",
      "${userData.atk}",
      "${userData.hp}",
      "${userData.r}",
      "${userData.atkitem}",
      "${userData.defitem}"
    )
  `)

  await editUserInfoMsg()
}
