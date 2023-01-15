import TEAR from '../../data/tear.js';
import UserNotFoundError from '../../error/UserNotFoundError.js';
import getUserData from '../get/getUserData.js';
import isUser from '../check/isUser.js';
import { calculate남은경험치ByUserData } from '../calculate남은경험치.js';
import { bot } from '../../main.js';
export async function makeProfileStringByUserData(userData) {
    const 남은경험치 = await calculate남은경험치ByUserData(userData);
    const guild = (await bot.guilds.fetch('953302487065034785'));
    const member = (await guild.members.fetch(userData.userid));
    return (`${member.displayName}님 (ID: ${userData.id.toString().padStart(6, '0')}) 의 정보:\n` +
        '```\n' +
        `${TEAR[userData.tear]} Lv. ${userData.level} / EXP ${userData.exp} (다음 레벨까지 EXP ${남은경험치})\n` +
        `공격력: ${userData.atk} / 체력: ${userData.hp}\n` +
        `소지품:\n` +
        `  R ${userData.r}\n` +
        `장착:\n` +
        `  무기: ${userData.atkitem}\n` +
        `  방어구: ${userData.defitem}\n` +
        '```');
}
export async function makeProfileStringByUser(member) {
    if (!(await isUser(member)))
        throw new UserNotFoundError();
    const userData = await getUserData(member);
    return await makeProfileStringByUserData(userData);
}
