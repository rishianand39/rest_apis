const app=require("./index")
const connect=require("./configs/db")
const dotenv=require("dotenv")
dotenv.config()

// PORT
const port=process.env.PORT || 5500

app.listen(port,async()=>{
    try {
        await connect()
        console.log(`Listening on port ${port}`)
      
    } catch (error) {
        console.log(error)
    }
})