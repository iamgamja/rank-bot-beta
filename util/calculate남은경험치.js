import UserNotFoundError from '../error/UserNotFoundError.js';
import getUserData from './get/getUserData.js';
import isUser from './check/isUser.js';
import { calculate누적레벨ByUserData } from './calculate누적레벨.js';
export async function calculate남은경험치ByUserData(userData) {
    const 누적레벨 = await calculate누적레벨ByUserData(userData);
    const 목표경험치 = 2 ** (누적레벨 - 1) * 1000;
    const 남은경험치 = 목표경험치 - userData.exp;
    return 남은경험치;
}
export async function calculate남은경험치ByUser(member) {
    if (!(await isUser(member)))
        throw new UserNotFoundError();
    const userData = await getUserData(member);
    return await calculate남은경험치ByUserData(userData);
}
