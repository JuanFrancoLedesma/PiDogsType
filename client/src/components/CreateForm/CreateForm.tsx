import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getTemperaments } from "../../redux/storeTemperament/temperamentAction";
import s from "./CreateForm.module.css";
import { inputInterface, errorInterface, DogCreate } from "../../types";
import ShowCard from "./ShowCard/ShowCard";
import { validate } from "./Functions/functions";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const CreateForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  let allTemperaments = useAppSelector(
    (state) => state.temperaments.allTemperaments
  );

  const [unit, setUnit] = useState(true);
  const [input, setInput] = useState<inputInterface>({
    name: "",
    password: "",
    minWeight: "",
    maxWeight: "",
    minHeight: "",
    maxHeight: "",
    minLifeSpan: "",
    maxLifeSpan: "",
    image: "",
    temperaments: [],
  });

  const [error, setError] = useState<errorInterface>({});

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setError(validate({ ...input, [e.target.name]: e.target.value }));
  };

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "default") return;
    if (input.temperaments.length === 6) return;
    if (input.temperaments.includes(e.target.value)) return;
    setInput({
      ...input,
      temperaments: [...input.temperaments, e.target.value],
    });
    setError(
      validate({
        ...input,
        temperaments: [...input.temperaments, e.target.value],
      })
    );
  };

  const handleDeleteTemperament = (e: MouseEvent<HTMLButtonElement>) => {
    const newTemperaments = input.temperaments.filter(
      (t) => t !== (e.target as HTMLButtonElement).value
    );
    setInput({
      ...input,
      temperaments: newTemperaments,
    });
    setError(validate({ ...input, temperaments: newTemperaments }));
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    let metric_weight : number[];
    let imperial_weight;
    let metric_height;
    let imperial_height;
    if(unit){
      metric_weight = [Number(input.minWeight), Number(input.maxWeight)]
      imperial_weight = [Number((Number(input.minWeight) *2.2).toFixed(0)), Number((Number(input.maxWeight) *2.2).toFixed(0))]
      metric_height = [Number(input.minWeight), Number(input.maxWeight)]
      imperial_height = [Number((Number(input.minWeight) *39.37).toFixed(0)), Number((Number(input.maxWeight) *39.37).toFixed(0))]
    } else {
      metric_weight = [Number((Number(input.minWeight)/2.2).toFixed(0)), Number((Number(input.maxWeight)/2.2).toFixed(0))]
      imperial_weight = [Number(input.minWeight), Number(input.maxWeight) ]
      metric_height = [Number((Number(input.minWeight)/39.37).toFixed(0)), Number((Number(input.maxWeight)/39.37).toFixed(0))]
      imperial_height = [Number(input.minWeight) , Number(input.maxWeight) ]
    }

    const newBreed : DogCreate= {
      name: input.name,
      password: input.password,
      metric_weight,
      imperial_weight,
      metric_height,
      imperial_height,
      life_span: [Number(input.minLifeSpan), Number(input.maxLifeSpan)],
      image: input.image,
      temperament: input.temperaments
    }

    try {
      await axios.post("http://localhost:3001/dog/create", newBreed)
      alert("Raza creada exitosamente!")
      // navigate("/home")
    } catch (error) {
      alert(`Algo fallo con el siguiente error: ${error} `)
    }
  }

  useEffect(() => {
    dispatch(getTemperaments());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={s.formContainer}>
      <div className={s.display}>
        <div className={s.form}>
          <div className={s.formTitle}>
            <h2>Crear Raza</h2>
            <button onClick={() => setUnit(!unit)}>Metric/Imperial</button>
          </div>
          <form>
            <div className={s.formSimple}>
              <input
                placeholder="Nombre"
                type="text"
                maxLength={22}
                value={input.name}
                name="name"
                onChange={(e) => handleInput(e)}
              />
            </div>
            <div className={s.formSimple}>
              <input
                placeholder="Contraseña"
                type="password"
                maxLength={22}
                value={input.password}
                name="password"
                onChange={(e) => handleInput(e)}
              />
            </div>
            <div className={s.formDoble}>
              <input
                placeholder={unit ? "Peso min Kg" : "Peso min lb"}
                type="number"
                max="200"
                min="1"
                value={input.minWeight}
                name="minWeight"
                onChange={(e) => handleInput(e)}
              />
              <input
                placeholder={unit ? "Peso max Kg" : "Peso max lb"}
                type="number"
                max="200"
                min="1"
                value={input.maxWeight}
                name="maxWeight"
                onChange={(e) => handleInput(e)}
              />
            </div>
            <div className={s.formDoble}>
              <input
                placeholder={unit ? "Altura min m" : "Altura min in"}
                type="number"
                max="110"
                min="7"
                value={input.minHeight}
                name="minHeight"
                onChange={(e) => handleInput(e)}
              />
              <input
                placeholder={unit ? "Altura max m" : "Altura max in"}
                type="number"
                max="110"
                min="7"
                value={input.maxHeight}
                name="maxHeight"
                onChange={(e) => handleInput(e)}
              />
            </div>
            <div className={s.formDoble}>
              <input
                placeholder="Vida min"
                type="number"
                min="1"
                value={input.minLifeSpan}
                name="minLifeSpan"
                onChange={(e) => handleInput(e)}
              />
              <input
                placeholder="Vida max"
                type="number"
                min="1"
                value={input.maxLifeSpan}
                name="maxLifeSpan"
                onChange={(e) => handleInput(e)}
              />
            </div>
            <div className={s.formSimple}>
              <input
                placeholder="Imagen"
                type="text"
                value={input.image}
                name="image"
                onChange={(e) => handleInput(e)}
              />
            </div>
            <div className={s.formSimple}>
              <select onChange={(e) => handleSelect(e)}>
                <option>Temperamentos</option>
                {allTemperaments?.map((temperament, index) => {
                  return (
                    <option
                      title="temperament"
                      value={temperament}
                      key={index + 1}
                    >
                      {temperament}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={s.formSimple}>
              {
              !input.name ||
              error.name ||
              error.weight ||
              error.height ||
              error.life_span ||
              error.temperaments ? (
                <button disabled={true} style={{backgroundColor : "red", color : "white"}}>Crear</button>
              ) : (
                <button onClick={(e) => handleSubmit(e)}>Crear</button>
              )}
            </div>
          </form>
        </div>
        <ShowCard
          input={input}
          unit={unit}
          handleDeleteTemperament={handleDeleteTemperament}
          error={error}
        />
      </div>
    </div>
  );
};

export default CreateForm;
