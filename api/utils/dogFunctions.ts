const axios = require('axios');
import db from "../models";
import { DogInterface } from "./types";

const Dog = db.Dog
const Temperament = db.Temperament

const dogsFromApi = async () => {
    const breeds = await axios.get('https://api.thedogapi.com/v1/breeds?api_key=live_ab4GxOCmAOv1Y4DibXhZ4E55EETxcSsLE12yQj0IzOBKhnRnRhlcMicJOcOjtZeL')
    return breeds.data
}

const dogsFromDb = async ()  => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })
}

//hacer logica para sacar el peso min y max


const formatApiBreed = (breeds : any[]): DogInterface[] => {
    const formatBreeds = breeds.map(e => {

        const metric_height : number[] = e.height.metric.split(" - ")
        const imperial_height: number[] = e.height.imperial.split(" - ")

        const metric_weight: number[] = e.weight.metric.split(" - ")
        const imperial_weight: number[] = e.weight.imperial.split(" - ")

        const life_span : number[] = []
        life_span.push(e.life_span.split(" ")[0])
        life_span.push(e.life_span.split(" ")[2])
        
         //doy un formato a las razas traidas desde la api

        return {
            id: String(e.id),
            name: String(e.name),
            metric_height,
            imperial_height,
            metric_weight,
            imperial_weight,
            metricWeightProm : (Number(metric_weight[0])+Number(metric_weight[1]))/2,
            imperialWeightProm : (Number(imperial_weight[0])+Number(imperial_weight[1]))/2,
            life_span, 
            image: String(e.image.url),
            temperament: String(e.temperament),
            createdByUser: false,
        }
    })
    return formatBreeds
}

const formatDbBreed = (breeds : any[] | undefined ): DogInterface[]  => {
    if(!breeds?.length) return []

    const formatDbBreed = breeds.map(e => {
        return {
            id: String(e.id),
            name: String(e.name),
            metric_height: e.metric_height,
            imperial_height: e.imperial_height,
            metric_weight: e.metric_weight,
            imperial_weight: e.imperial_weight,
            metricWeightProm : (Number(e.metric_weight[0])+Number(e.metric_weight[1]))/2,
            imperialWeightProm : (Number(e.imperial_weight[0])+Number(e.imperial_weight[1]))/2,
            life_span: e.life_span, 
            image: String(e.image),
            temperament: e.Temperaments.map((obj: { name: any; }) => obj.name).join(", "),
            createdByUser: false,
        }
    }) 
    return formatDbBreed
}

export const allBreeds = async () : Promise<DogInterface[]> => {
    const apiDogs = await dogsFromApi()
    const dbDogs = await dogsFromDb()
    const formatApiDogs = formatApiBreed(apiDogs)
    const formatDbDogs = dbDogs? formatDbBreed(dbDogs) : []
    const allDogs = formatApiDogs.concat(formatDbDogs)
    return allDogs
}

export const initBackend = async () : Promise<DogInterface[]> => {
    const apiDogs = await dogsFromApi()
    const dbDogs = await dogsFromDb()
    const formatApiDogs = formatApiBreed(apiDogs)
    const formatDbDogs = dbDogs? formatDbBreed(dbDogs) : []
    const allDogs = formatApiDogs.concat(formatDbDogs)
    await allTemperaments(apiDogs)
    return allDogs
}


export const filterByName = (breeds : DogInterface[], name : string) : DogInterface[] => {
    const filterBreeds = breeds.filter(e => e.name.toLowerCase().includes(name))
    return filterBreeds
}

export const filterById = (breeds : DogInterface[], id : string) : DogInterface | undefined => {
    console.log("IDDDDD ",id);
    const idDog = breeds.find(e => String(e.id) === id
    )
    console.log(idDog);
    
    return idDog
}

export const allTemperaments =  (breeds : DogInterface[]) : string[]  => {
    
        let temperaments : string[] = []
        const temperamentOfAllDogs = breeds.map(e => e.temperament)
        temperamentOfAllDogs.map(t => {
            if (!t) return
            return (t.split(',')
                .map(t => t.trim()).map(e => {
                    if (temperaments.some(t => t === e)) return
                    temperaments.push(e)
                }))
        })
        temperaments.map(async t => {
            await Temperament.findOrCreate({
                where: { name: t }
            })
        })
        return temperaments
    

}