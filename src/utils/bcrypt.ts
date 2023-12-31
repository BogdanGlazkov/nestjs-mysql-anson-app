import * as bcrypt from 'bcrypt';

const SALT = 10;

export function encodePassword(rawPassword: string) {
  return bcrypt.hash(rawPassword, SALT);
}

export function comparePasswords(rawPassword: string, hash: string) {
  return bcrypt.compareSync(rawPassword, hash);
}
