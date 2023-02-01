import * as dotenv from "dotenv";
dotenv.config()
export default ()=>({
    database: {
        type: process.env.DATABASE_TYPE,
        port: process.env.DATABASE_PORT,
        password: process.env.DATABASE_PASSWORD,
        username: process.env.DATABASE_USERNAME,
        name: process.env.DATABASE_NAME,
        host:process.env.DATABASE_HOST,
    }
})