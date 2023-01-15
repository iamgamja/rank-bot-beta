export default class EnvNotFoundError extends Error {
  constructor() {
    super('Env not found.')
  }
}
