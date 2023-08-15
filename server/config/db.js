const mysql=require('mysql2')
const dotenv=require('dotenv')
dotenv.config()

const db = mysql.createConnection({
    host:process.env.HOST_NAME,
    user:process.env.USER_NAME,
    password:process.env.PASSWORD,
    database:process.env.DATA_BASE,
})
// mysql Connection 
db.connect(error=>{
    if(error) throw error;
    console.log("Connected to DATABASE")
})

module.exports=db;