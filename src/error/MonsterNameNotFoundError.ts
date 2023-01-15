export default class MonsterNameNotFoundError extends Error {
  constructor() {
    super('Monster name not found.')
  }
}
