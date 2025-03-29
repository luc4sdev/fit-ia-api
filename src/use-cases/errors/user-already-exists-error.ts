export class UserAlreadyExistsError extends Error {
  constructor() {
    super('Existe um usuário cadastrado com o mesmo email.')
  }
}
