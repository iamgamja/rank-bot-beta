import UserNotFoundError from '../../error/UserNotFoundError.js';
import isUser from '../check/isUser.js';
import get출첵쿨타임 from '../get/get출첵쿨타임.js';
export default async function can출첵쿨타임(member) {
    if (!(await isUser(member)))
        throw new UserNotFoundError();
    const cooltime = +(await get출첵쿨타임(member));
    return cooltime < Date.now();
}
