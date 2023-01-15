import UserNotFoundError from '../../error/UserNotFoundError.js';
import isUser from '../check/isUser.js';
import query from '../query.js';
export async function setUserData(member, userData) {
    if (!(await isUser(member)))
        throw new UserNotFoundError();
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
  `);
    // await editUserInfoMsg()
    /** @todo 완성되면 이거 주석 해제 */
}
