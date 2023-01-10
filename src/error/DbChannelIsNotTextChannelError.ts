export default class DbChannelIsNotTextChannelError extends Error {
  constructor() {
    super('DB channel is not text channel.')
  }
}
