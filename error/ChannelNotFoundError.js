export default class ChannelNotFoundError extends Error {
    constructor() {
        super('Channel not found.');
    }
}
