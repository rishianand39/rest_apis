const connect=require('./configs/db')
const app = require('./index')
const dotenv=require("dotenv")
dotenv.config()

// PORT environment
const port=process.env.PORT || 5000


app.listen(port,async()=>{
    try {
        await connect()
        console.log(`Listening on port on ${port}`)
    } catch (error) {
        console.log("error",error)
    }
})