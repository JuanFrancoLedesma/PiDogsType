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
    res.status(400).send(error.message);
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

  try {
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
    } else {
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

      await newBreed.addTemperament(breedTemperament);
      res.send(newBreed);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

export default dogRouter;
