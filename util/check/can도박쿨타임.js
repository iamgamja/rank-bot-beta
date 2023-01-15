import UserNotFoundError from '../../error/UserNotFoundError.js';
import isUser from '../check/isUser.js';
import get도박쿨타임 from '../get/get도박쿨타임.js';
export default async function can도박쿨타임(member) {
    if (!(await isUser(member)))
        throw new UserNotFoundError();
    const cooltime = +(await get도박쿨타임(member));
    return cooltime < Date.now();
}
