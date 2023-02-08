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
    },
    jwt:{
        secret: process.env.JWT_SECRET,
        accessTokenExpire: process.env.JWT_ACCESS_TOKEN_EXPIRE,
        refreshTokenExpire: process.env.JWT_REFRESH_TOKEN_EXPIRE,
    },
    redis:{
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD
    }
})