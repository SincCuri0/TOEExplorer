'use server'

import { compare, hash } from 'bcrypt'

// Password utilities that should only run on the server
export async function comparePasswords(
  plainPassword: string,
  hashedPassword: string
) {
  return compare(plainPassword, hashedPassword)
}

export async function hashPassword(password: string) {
  return hash(password, 10)
} 