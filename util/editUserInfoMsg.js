import { bot } from '../main.js';
import { makeProfileStringByUserData } from './makeString/makeProfileString.js';
import query from './query.js';
export default async function editUserInfoMsg() {
    const userInfoMsg = await bot.channels.cache.get('1025347124294070282').messages.fetch('1025975950439088168');
    const res = [];
    const data = (await query('select * from user_data'));
    for (const userData of data) {
        res.push(await makeProfileStringByUserData(userData));
    }
    await userInfoMsg.edit(res.join('\n\n'));
}
