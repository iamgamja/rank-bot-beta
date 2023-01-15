import UserNotFoundError from '../../error/UserNotFoundError.js';
import isUser from '../check/isUser.js';
import query from '../query.js';
export default async function set도박쿨타임(member) {
    if (!(await isUser(member)))
        throw new UserNotFoundError();
    const newcooltime = Date.now() + 60 * 1000;
    await query(`
    insert into dd_cooltime values ("${member.id}", "${newcooltime}")
      ON DUPLICATE KEY UPDATE cooltime = "${newcooltime}";
  `);
}
