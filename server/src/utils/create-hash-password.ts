import bcrypt from "bcrypt";

export const createHashPassword = async (password: string) => {
    const saltRounds = 10;

    const passwordHash = await bcrypt.hash(password, saltRounds);
    return passwordHash;
};
