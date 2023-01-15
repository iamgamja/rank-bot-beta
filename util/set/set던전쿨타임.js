import { COOLTIME } from '../../data/cooltime.js';
import ChannelIsNotDungeonChannelError from '../../error/ChannelIsNotDungeonChannelError.js';
import UserNotFoundError from '../../error/UserNotFoundError.js';
import isDungeonChannel from '../check/isDungeonChannel.js';
import isUser from '../check/isUser.js';
import query from '../query.js';
export default async function set던전쿨타임(member, channel) {
    if (!(await isUser(member)))
        throw new UserNotFoundError();
    if (!isDungeonChannel(channel))
        throw new ChannelIsNotDungeonChannelError();
    const newcooltime = Date.now() + COOLTIME[channel.id] * 1000;
    await query(`
    insert into dungeon_cooltime values ("${channel.id}", "${member.id}", "${newcooltime}")
      ON DUPLICATE KEY UPDATE cooltime = "${newcooltime}";
  `);
}
