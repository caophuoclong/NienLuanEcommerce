import * as bcrypt from "bcrypt"
import * as dotenv from "dotenv";
dotenv.config()
    const PEPPER = process.env.PASSWORD_PEPPER;
const SALT_ROUND = process.env.PASSWORD_SALT_ROUND;
export const hashPassword= async (password: string) => {
    const hash = bcrypt.hash(password+PEPPER, await genSalt())
    return hash
}
export const checkPassword = async (password: string, hash: string)=>{
    return await bcrypt.compare(password + PEPPER, hash);
}
export const genSalt = ()=>{
        return bcrypt.genSalt(+SALT_ROUND);
}