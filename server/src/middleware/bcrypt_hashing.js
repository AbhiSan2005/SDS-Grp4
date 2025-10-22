import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
  try {
    const saltRounds = 10; //We can use higher numbers for additional security. Dunno what the downside is tho
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password: ' + error.message);
  }
};

export const comparePassword = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error('Error comparing password: ' + error.message);
  }
};