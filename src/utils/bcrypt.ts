import * as bcrypt from 'bcryptjs';

export async function hashedPassword(password: string) {
  const secret = 'miSecretoSuperSecreto';
  const passwordWithSecret = password + secret;
  const hashedPassword = await bcrypt.hash(passwordWithSecret, 10);
  return hashedPassword;
}

export async function comparePassword(
  password: string,
  hashedPassword: string,
) {
  const secret = 'miSecretoSuperSecreto';
  const passwordWithSecret = password + secret;
  const result = await bcrypt.compare(passwordWithSecret, hashedPassword);
  return result;
}
