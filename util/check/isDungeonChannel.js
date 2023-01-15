import { COOLTIME } from '../../data/cooltime.js';
export default function isDungeonChannel(channel) {
    return Object.keys(COOLTIME).includes(channel.id);
}
