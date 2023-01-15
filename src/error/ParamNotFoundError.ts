export default class ParamNotFoundError extends Error {
  constructor() {
    super('Param not found.')
  }
}
