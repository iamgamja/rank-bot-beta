import UserNotFoundError from '../error/UserNotFoundError.js';
import getUserData from './get/getUserData.js';
import isUser from './check/isUser.js';
export async function calculate누적레벨ByUserData(userData) {
    let tear = userData.tear;
    let level = userData.level;
    while (tear) {
        tear -= 1;
        level += (tear + 1) * 5;
    }
    return level;
}
export async function calculate누적레벨ByUser(member) {
    if (!(await isUser(member)))
        throw new UserNotFoundError();
    const userData = await getUserData(member);
    return await calculate누적레벨ByUserData(userData);
}
