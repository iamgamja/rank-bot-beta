import ChannelIsNotDungeonChannelError from '../../error/ChannelIsNotDungeonChannelError.js';
import UserNotFoundError from '../../error/UserNotFoundError.js';
import isDungeonChannel from '../check/isDungeonChannel.js';
import isUser from '../check/isUser.js';
import get던전쿨타임 from '../get/get던전쿨타임.js';
export default async function can던전쿨타임(member, channel) {
    if (!(await isUser(member)))
        throw new UserNotFoundError();
    if (!isDungeonChannel(channel))
        throw new ChannelIsNotDungeonChannelError();
    const cooltime = +(await get던전쿨타임(member, channel));
    return cooltime < Date.now();
}
