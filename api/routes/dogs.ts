import { Router } from "express";
import db from "../models";
// import { DogInputs } from "../utils/types";
import {
  allBreeds,
  filterById,
  filterByName,
  initBackend,
} from "../utils/dogFunctions";
// import { DogAttributes, DogInputs, DogInterface } from "../utils/types";

const dogRouter = Router();

const Dogs = db.Dog;
const Temperaments = db.Temperament;

dogRouter.get("/", (req, res) => {
  const name: string = req.query.name as string;
  if (name === undefined) {
    initBackend()
      .then((allDogs) => res.send(allDogs))
      .catch((e) => console.log(e));
  } else {
    allBreeds()
      .then((r) => filterByName(r, name))
      .then((r) => res.send(r))
      .catch((e) => console.log(e));
  }
});

dogRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const allDogs = await allBreeds();
    const dog = filterById(allDogs, id);
    res.send(dog);
  } catch (error: any) {
    res.send(error.message);
  }
});

dogRouter.post("/create", async (req, res) => {
  const {
    name,
    metric_weight,
    imperial_weight,
    metric_height,
    imperial_height,
    life_span,
    password,
    image,
    temperament,
  } = req.body;
  console.log(req.body);
  
  if (
    !name ||
    !metric_weight ||
    !imperial_weight ||
    !metric_height ||
    !imperial_height ||
    !life_span ||
    !password 
  ) {
    res.status(400).send("Missing Data!");
  }
  const newBreed = await Dogs.create({
    name,
    metric_weight,
    imperial_weight,
    metric_height,
    imperial_height,
    life_span,
    password,
    image,
    createdByUser: true,
  });
  
  const breedTemperament = await Temperaments.findAll({
    where: { name: temperament },
  });

  await newBreed.addTemperament(breedTemperament)
  res.send(newBreed)
});

// dogRouter.put("/update/:id", async (req,res) => {
//   const {id} = req.params
//   const update = {...req.body}
//   try {
//     const oldVersionBreed : DogInterface = await Dogs.find({
//       where: {id}
//     })
//     if(oldVersionBreed.password !== update.password) return res.status(400).send("Wrong password!")

//     const updatedBreed : DogAttributes = {
//       id: oldVersionBreed.id,
//       name: update.name? update.name : oldVersionBreed.name,
//       metric_weight: update.metric_weight? update.metric_weight : oldVersionBreed.metric_weight,
//       imperial_weight: update.imperial_weight? update.imperial_weight : oldVersionBreed.imperial_weight,
//       metric_height: update.metric_height? update.metric_height : oldVersionBreed.metric_height,
//       imperial_height: update.imperial_height? update.imperial_height : oldVersionBreed.imperial_height,
//       life_span: update.life_span? update.life_span : oldVersionBreed.life_span,
//       image: update.image? update.image : oldVersionBreed.image,
//       createdByUser: oldVersionBreed.createdByUser
//     }

//     const breed = Dogs.update(updatedBreed)

//     if(update.newTemperaments?.length > 0) 
    
//   } catch (error) {
//     console.log(error);
//   }
// })

export default dogRouter;
