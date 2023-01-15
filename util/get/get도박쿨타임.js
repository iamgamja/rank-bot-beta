import UserNotFoundError from '../../error/UserNotFoundError.js';
import isUser from '../check/isUser.js';
import query from '../query.js';
export default async function get도박쿨타임(member) {
    if (!(await isUser(member)))
        throw new UserNotFoundError();
    const res = (await query(`select * from dd_cooltime where userid="${member.id}"`));
    if (res.length === 0)
        return '0';
    const cooltime = res[0].cooltime;
    return cooltime;
}
