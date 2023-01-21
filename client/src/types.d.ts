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

export interface DogCreate{
    name: string
    metric_weight: number[]
    imperial_weight: number[]
    metric_height: number[]
    imperial_height: number[]
    life_span: number[]
    password: string
    image:string
    temperament:string[]
}

export interface inputInterface {
    name: string;
    password: string;
    minWeight: string 
    maxWeight: string 
    minHeight: string 
    maxHeight: string
    minLifeSpan: string 
    maxLifeSpan: string 
    image: string;
    temperaments: string[];
  }

  export interface errorInterface {
    name?: string;
    password?: string;
    weight?: string;
    height?: string;
    life_span?: string
    image?: string;
    temperaments?: string;
  }