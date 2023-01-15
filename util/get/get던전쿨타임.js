import ChannelIsNotDungeonChannelError from '../../error/ChannelIsNotDungeonChannelError.js';
import UserNotFoundError from '../../error/UserNotFoundError.js';
import isDungeonChannel from '../check/isDungeonChannel.js';
import isUser from '../check/isUser.js';
import query from '../query.js';
export default async function get던전쿨타임(member, channel) {
    if (!(await isUser(member)))
        throw new UserNotFoundError();
    if (!isDungeonChannel(channel))
        throw new ChannelIsNotDungeonChannelError();
    const res = (await query(`select * from dungeon_cooltime where channelid="${channel.id}" and userid="${member.id}"`));
    if (res.length === 0)
        return '0';
    const cooltime = res[0].cooltime;
    return cooltime;
}
