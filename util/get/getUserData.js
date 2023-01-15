import query from '../query.js';
import UserNotFoundError from '../../error/UserNotFoundError.js';
export default async function getUserData(member) {
    const res = (await query(`select * from user_data where userid = "${member.id}"`));
    if (res.length === 0)
        throw new UserNotFoundError();
    return res[0];
}
