import { ChangeEvent, useState } from "react"
import { useAppDispatch } from "../../redux/store"
import { getBreedByName } from "../../redux/storeDog/dogActions"
import s from "./SearchBar.module.css"

interface str {
    handleRender : () => void
    page: (e:number) => void
}

const SearchBar = ( {handleRender, page} : str)  => {

    const dispatch = useAppDispatch()
    const [input, setInput] = useState("")

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
        dispatch(getBreedByName(e.target.value))
        handleRender()
        page(1)
        
    }

    const handleSubmit = (e : React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        dispatch(getBreedByName(""))
        setInput("")
    }

    return (
        <div className={s.searchContainer}>
            <input
            value={input}
            onChange={(e)=>handleInput(e)}
            placeholder="Ingrese busqueda"
            />
            <button onClick={(e)=>handleSubmit(e)}>Refresh</button>
        </div>
    )
}

export default SearchBar