export default class DbChannelNotFoundError extends Error {
    constructor() {
        super('DB channel not found.');
    }
}
