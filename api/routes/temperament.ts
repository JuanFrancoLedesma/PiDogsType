import  Router  from "express";
import db from "../models";
import { allTemperaments, initBackend } from "../utils/dogFunctions";

const Temperaments = db.Temperament;
const temperamentRouter = Router()

interface temperamentAttributes {
    id: string,
    name: string
}

temperamentRouter.get("/",async (_req,res)=>{
    try {
        const temperDb : temperamentAttributes[] = await Temperaments.findAll()
        console.log("hay algoooooo");
        if(temperDb.length>0) {
            const temperaments = temperDb.map(e => e.name)
            res.send(temperaments)
        }
        else {
            
            const allBreeds = await initBackend()
            const temperaments = await allTemperaments(allBreeds)
            res.send(temperaments)
        }
    } catch (error) {
        res.status(400).send(error)  
    }
})

export default temperamentRouter