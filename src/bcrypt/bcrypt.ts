import bcrypt from 'bcrypt'

const saltRounds = 10;

export function hashPassword(plainPassword: string): string {
  return bcrypt.hashSync(plainPassword, saltRounds)
}

export function comparePassword(plainPassword: string, hash: string): boolean {
  return bcrypt.compareSync(plainPassword, hash)
}
