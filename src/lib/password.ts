import bcrypt from "bcryptjs";

export async function genPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function validPassword(
  password: string,
  userPassword: string,
): Promise<boolean> {
  return bcrypt.compare(password, userPassword);
}

