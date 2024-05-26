const express = require("express")
const cors = require("cors")
const userRouter = require("./router/userRouter.js")

const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (req, res)=>{
    res.json({menssagem: "menssagem teste"})
})

app.use("/user", userRouter)

app.listen(3000, ()=>{
    console.log("server rodando http://localhost:3000")
})