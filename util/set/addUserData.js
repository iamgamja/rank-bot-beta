import query from '../query.js';
export async function addUserData(userData) {
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
  `);
    // await editUserInfoMsg()
    /** @todo 완성되면 이거 주석 해제 */
}
