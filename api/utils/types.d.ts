export interface DogInterface {
    id: string
    name: string
    metric_weight: number[]
    imperial_weight: number[]
    metric_height: number[]
    imperial_height: number[]
    life_span: number[]
    metricWeightProm: number
    imperialWeightProm: number
    createdByUser: boolean
    password?: string
    image:string
    temperament:string
}

export type DogAttributes = Omit<DogInterface, 'metricWeightProm' | "imperialWeightProm" | "temperament">

export type DogInputs = Omit<DogInterface, 'metricWeightProm' | "imperialWeightProm" | "createdByUser">

