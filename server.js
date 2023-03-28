//  dependecies
const {connmon, cbLog} = require("mongorester");
const express = require('express');
const app = express();

app.use(express.json());

// db connection


moongoose = connmon("mongodb://127.0.0.1:27017/embedrel")
const {Schema, model} = moongoose
// relationship adress
 const  Address = new Schema({
    street:String,
    state:String,
    zipCode:String
 })

 const Dog = new Schema({
   name:String,
   age:Number,
 })

 const OwnerSchema = new Schema({
   name:String,
   address:Address,
   dogs:[Dog]
 })

 const Owner = model("Owner", OwnerSchema)

//  Routes

app.post("/createowner",  async(req, res) => {
   res.json(await Owner.create(req.body))
})

app.post("/addr/:name", async(req, res) => {
   const {name}= req.params
   const owner = await Owner.findOne({name})
   owner.address = req.body
   owner.save()
   res.json(owner)
   })


app.post("/dog/:name", async(req, res) => {
      const {name}= req.params
      const owner = await Owner.findOne({name})
      owner.dogs.push(req.body)
      owner.save()
      res.json(owner)
      })

app.post("/abandon/:name/:id", async(req, res) => {
         const {name, id}= req.params
         const owner = await Owner.findOne({name})
         owner.dogs.splice(id, 1)
         owner.save()
         res.json(owner)
         })

 


// listener

app.listen(3000, cbLog("Server", "listening on port 3000"))