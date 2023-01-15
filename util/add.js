import UserNotFoundError from '../error/UserNotFoundError.js';
import calculateExp from './calculateExp.js';
import { calculate누적레벨ByUserData } from './calculate누적레벨.js';
import isUser from './check/isUser.js';
import getUserData from './get/getUserData.js';
import { setUserData } from './set/setUserData.js';
export default async function add(member, name, value) {
    if (!(await isUser(member)))
        throw new UserNotFoundError();
    const userData = await getUserData(member);
    if (name !== 'exp') {
        // 단순히 더하기만 해도 됨
        userData[name] += value;
        await setUserData(member, userData);
        return;
    }
    // 경험치를 더하기
    // 이전 누적 레벨 계산
    const 이전누적레벨 = await calculate누적레벨ByUserData(userData);
    [userData.tear, userData.level, userData.exp] = calculateExp(userData.tear, userData.level, userData.exp + value);
    // 나중 누적 레벨 계산
    const 나중누적레벨 = await calculate누적레벨ByUserData(userData);
    const 추가된누적레벨 = 나중누적레벨 - 이전누적레벨;
    // 공격력, 체력 수정
    userData.atk += 추가된누적레벨;
    userData.hp += 추가된누적레벨;
    await setUserData(member, userData);
}
