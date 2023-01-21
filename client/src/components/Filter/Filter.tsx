import { useState } from "react";
import { useAppDispatch } from "../../redux/store";
import { filterByTemperament, orderAlf, orderWeight } from "../../redux/storeDog/dogActions";
import s from "./Filter.module.css";

interface temperament {
  allTemperaments: string[];
  handleRender: () => void;
  page: (current : number) => void
}

const Filter = ({ allTemperaments, handleRender,page }: temperament) => {

  const dispatch = useAppDispatch()

  const [filter, setFilter] = useState<boolean>(false);
  // const [select, setSelect] = useState<string>("")

  const handleFilterByTemperament = (e: { target: { value: string; }; }) => {
    if(e.target.value === "default") return
    dispatch(filterByTemperament(e.target.value))
    page(1)
  }

  const handleOrderByName = (e: { target: { value: string; }; }) => {
    if(e.target.value === "default") return
    dispatch(orderAlf(e.target.value))
    handleRender()
  }
  const handleOrderByWeight = (e: { target: { value: string; }; }) => {
    if(e.target.value === "default") return
    dispatch(orderWeight(e.target.value))
    handleRender()
  }

  const handleFilter = (): void => {
    setFilter(!filter);
  };

  return (
    <div className={s.filterContainer}>
      <button className={s.filterButton} onClick={handleFilter}>
        Filtros/Ordenar{" "}
      </button>
      <div className={s.select}>
        {filter ? (
          <div className={s.orderSelect}>
            <div className={s.orderTitle}>
              <h2>Ordenar</h2>
            </div>
            <div className={s.orderOptions}>
              <select onChange={(e)=>handleOrderByName(e)}>
                <option value={"default"}>Nombre</option>
                <option value={"ABC"}>A - Z</option>
                <option value={"ZYX"}>Z - A</option>
              </select>
              <select onChange={(e)=>handleOrderByWeight(e)}>
                <option value={"default"}>Peso</option>
                <option value={"ASC"}>Ascendente</option>
                <option value={"DES"}>Descendente</option>
              </select>
            </div>
            <div className={s.orderButton}>
              <button>Ordenar</button>
            </div>
          </div>
        ) : (
          <div className={s.filterSelect}>
            <div className={s.filterTitle}>
              <h2>Filtros</h2>
            </div>
            <div className={s.filterOptions}>
              <select onChange={(e) => handleFilterByTemperament(e)}>
                <option value={"default"}>Temperamentos</option>
                {allTemperaments?.map((temperament) => {
                  return <option>{temperament}</option>;
                })}
              </select>
            </div>
            <div className={s.clearButton}>
              <button>Limpiar filtros</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
